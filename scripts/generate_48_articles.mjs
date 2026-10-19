import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authHeader, apiUrl } from './loadEnv.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '../data');
const blueprintPath = path.resolve(dataDir, 'articles_blueprint.json');
const usedImagesPath = path.resolve(dataDir, 'used_images.json');

const geminiKey = process.env.GEMINI_API_KEY;
const AUTHOR_ID = 2; // Manuel López

// 1. Antislop & Banned patterns
const BANNED_PATTERNS = [
  /sign\b/i, /prohibido/i, /traffic/i, /car\b/i, /vehicle/i, /road\b/i, /street\b/i,
  /cemetery/i, /gravestone/i, /grave\b/i, /police/i, /cop\b/i, /tarot/i, /scrabble/i,
  /wooden block/i, /brick wall/i, /graffiti/i, /cat\b/i, /dog\b/i, /umbrella/i,
  /american football/i, /nfl/i, /rugby/i, /cricket/i, /baseball/i, /basketball/i,
  /military/i, /soldier/i, /army/i, /weapon/i
];

function countWords(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .split(/\s+/)
    .filter(w => w.length > 0).length;
}

function cleanHtml(content) {
  return content
    .replace(/```html?/gi, '').replace(/```/g, '')
    .replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, '')
    .replace(/<ul[^>]*>[\s\S]*?<\/ul>/gi, (m) => m.replace(/<li[^>]*>(.*?)<\/li>/gi, '<p>$1</p>').replace(/<\/?ul[^>]*>/gi, ''))
    .replace(/<ol[^>]*>[\s\S]*?<\/ol>/gi, (m) => m.replace(/<li[^>]*>(.*?)<\/li>/gi, '<p>$1</p>').replace(/<\/?ol[^>]*>/gi, ''))
    .replace(/<hr\s*\/?>/gi, '')
    .replace(/<p>\s*<\/p>/gi, '')
    .trim();
}

function getSearchQueries(title, categoryName) {
  const t = title.toLowerCase();
  const queries = [];
  if (/var|árbitro|tarjeta|regla|fuera de juego|penalti|mano|tiempo añadido/i.test(t)) {
    queries.push('association football referee', 'football referee penalty', 'assistant referee football');
  } else if (/táctica|sistema|4-3-3|3-5-2|presión|defensa|bloque|transición|falso nueve|xg|goles esperados/i.test(t)) {
    queries.push('soccer tactical formation', 'association football match pitch', 'football players tactical action');
  } else if (/entrenamiento|físico|resistencia|velocidad|nutrición|lesión|gps|isquiotibiales|sueño|fuerza/i.test(t)) {
    queries.push('soccer player training pitch', 'football training drills', 'association football workout');
  } else if (/champions|mundial|libertadores|torneo|copa|estadio|balón de oro|remontadas/i.test(t)) {
    queries.push('UEFA Champions League match', 'FIFA World Cup match', 'association football stadium match');
  }
  queries.push('association football match pitch', 'soccer player match ball', 'association football match');
  return queries;
}

async function fetchWikimediaImages(queries, usedImages, neededCount = 3) {
  const found = [];

  for (const q of queries) {
    if (found.length >= neededCount) break;
    const endpoint = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(q)}&gsrlimit=12&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1280&format=json`;

    try {
      const res = await fetch(endpoint, {
        headers: { 'User-Agent': 'MediaWikiBot/1.0 (contacto@golazos.co) NodeFetch' },
        signal: AbortSignal.timeout(15000)
      });
      if (!res.ok) continue;
      const data = await res.json();
      const pages = Object.values(data.query?.pages || {});

      for (const page of pages) {
        if (found.length >= neededCount) break;
        const info = page.imageinfo?.[0];
        if (!info) continue;
        const title = page.title || '';
        if (BANNED_PATTERNS.some(p => p.test(title))) continue;

        const imgUrl = info.thumburl || info.url;
        if (!imgUrl || !/\.(jpe?g|png|webp)/i.test(imgUrl)) continue;
        if (usedImages.has(imgUrl)) continue;

        usedImages.add(imgUrl);
        found.push({ title: title.replace('File:', '').replace(/\.[^/.]+$/, ''), url: imgUrl });
      }
    } catch (e) {
      console.warn(`    Fallo búsqueda Wikimedia "${q}":`, e.message);
    }
  }

  return found;
}

async function uploadImageToWordPress(imgObj, articleTitle) {
  const res = await fetch(imgObj.url, {
    headers: { 'User-Agent': 'MediaWikiBot/1.0 (contacto@golazos.co) NodeFetch' },
    signal: AbortSignal.timeout(20000)
  });
  if (!res.ok) throw new Error(`Fallo descarga imagen ${imgObj.url}: ${res.status}`);
  const buffer = await res.arrayBuffer();
  const fileBytes = Buffer.from(buffer);

  const cleanName = 'img_' + Math.random().toString(36).substring(2, 9) + '.jpg';
  const altText = `${articleTitle}: ${imgObj.title.slice(0, 80)}`;

  const wpRes = await fetch(`${apiUrl}/media`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `attachment; filename="${cleanName}"`
    },
    body: fileBytes
  });

  if (!wpRes.ok) {
    const err = await wpRes.text();
    throw new Error(`Fallo subida WP media: ${wpRes.status} - ${err}`);
  }

  const media = await wpRes.json();

  // Actualizar alt text
  await fetch(`${apiUrl}/media/${media.id}`, {
    method: 'POST',
    headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify({ alt_text: altText, title: altText })
  }).catch(() => {});

  return { id: media.id, sourceUrl: media.source_url, altText };
}

async function callGemini(prompt) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 8192, temperature: 0.7 }
        }),
        signal: AbortSignal.timeout(60000)
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Gemini ${res.status}: ${err}`);
      }
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (e) {
      console.warn(`    Reintento Gemini (${attempt}/4): ${e.message}`);
      if (attempt === 4) throw e;
      await new Promise(r => setTimeout(r, 2500 * attempt));
    }
  }
}

async function generateArticleContent(title, category) {
  // Etapa 1: Introducción y Fundamentos
  const p1 = `Actúa como un veterano periodista deportivo y analista táctico de élite para el portal especializado Golazos.
Escribe la PRIMERA PARTE de un extenso artículo sobre: "${title}" (Categoría: ${category}).
REGLAS EDITORIALES OBLIGATORIAS:
- Idioma: Español neutro, natural y riguroso.
- Solo HTML semántico con <h2>, <h3> y <p>.
- PROHIBIDO <h1> (el título ya lo renderiza la plantilla del tema).
- PROHIBIDO listas o viñetas (<ul>, <ol>, <li>). Todo redactado en párrafos narrativos argumentados.
- PROHIBIDO líneas separadoras (<hr>).
- Párrafos de menos de 150 palabras.
- Desarrolla una introducción profunda y los fundamentos esenciales del tema con mínimo 800 palabras.`;

  const s1 = await callGemini(p1);
  let totalHtml = cleanHtml(s1);
  let words = countWords(totalHtml);

  // Etapa 2: Análisis Táctico y Técnico Detallado
  const p2 = `Actúa como analista deportivo de élite para Golazos.
Continúa el artículo sobre: "${title}".
Escribe la SEGUNDA PARTE centrada en: Análisis Táctico, Técnico y Pizarra en Detalle.
REGLAS:
- Solo HTML con <h2>, <h3> y <p>.
- NO repitas la introducción. Inicia con un nuevo <h2> relevante.
- PROHIBIDO <h1>, PROHIBIDO listas (<ul>, <ol>, <li>), PROHIBIDO <hr>.
- Párrafos de menos de 150 palabras.
- Desarrolla análisis exhaustivo con mínimo 800 palabras.`;

  const s2 = await callGemini(p2);
  totalHtml += '\n' + cleanHtml(s2);
  words = countWords(totalHtml);

  // Etapa 3: Casos Reales, Precedentes Históricos y Datos
  const p3 = `Actúa como analista deportivo de élite para Golazos.
Continúa el artículo sobre: "${title}".
Escribe la TERCERA PARTE centrada en: Casos Reales de Estudio, Equipos Emblemáticos, Precedentes Históricos y Datos Clave.
REGLAS:
- Solo HTML con <h2>, <h3> y <p>.
- Inicia con un nuevo <h2>.
- PROHIBIDO <h1>, PROHIBIDO listas, PROHIBIDO <hr>.
- Párrafos <150 palabras. Mínimo 800 palabras.`;

  const s3 = await callGemini(p3);
  totalHtml += '\n' + cleanHtml(s3);
  words = countWords(totalHtml);

  // Etapa 4: Conclusiones y Perspectivas si hace falta para superar holgadamente las 2500 palabras
  if (words < 2500) {
    const p4 = `Actúa como analista deportivo de élite para Golazos.
Completa el artículo sobre: "${title}".
Escribe la CUARTA PARTE: Preparación Específica, Metodología de Éxito, Perspectivas Modernas y Conclusiones Editoriales.
REGLAS:
- Solo HTML con <h2>, <h3> y <p>.
- Inicia con un nuevo <h2>.
- PROHIBIDO <h1>, PROHIBIDO listas, PROHIBIDO <hr>.
- Redacta mínimo 600 palabras para culminar el ensayo con máxima solvencia periodística.`;

    const s4 = await callGemini(p4);
    totalHtml += '\n' + cleanHtml(s4);
    words = countWords(totalHtml);
  }

  return { html: totalHtml, words };
}

function injectInlineImages(html, img1, img2) {
  const figure1 = `\n<figure class="wp-block-image size-large"><img src="${img1.sourceUrl}" alt="${img1.altText}" /><figcaption>${img1.altText}</figcaption></figure>\n`;
  const figure2 = `\n<figure class="wp-block-image size-large"><img src="${img2.sourceUrl}" alt="${img2.altText}" /><figcaption>${img2.altText}</figcaption></figure>\n`;

  const paragraphs = html.split('</p>');
  if (paragraphs.length < 6) {
    return html + figure1 + figure2;
  }

  const idx1 = Math.floor(paragraphs.length / 3);
  const idx2 = Math.floor((paragraphs.length * 2) / 3);

  paragraphs.splice(idx1, 0, figure1);
  paragraphs.splice(idx2 + 1, 0, figure2);
  return paragraphs.join('</p>');
}

async function runPipeline() {
  console.log('====================================================');
  console.log('🚀 INICIANDO PIPELINE DE 48 ARTÍCULOS - GOLAZOS.CO');
  console.log('====================================================\n');

  const blueprint = JSON.parse(fs.readFileSync(blueprintPath, 'utf8'));
  let usedImagesList = [];
  if (fs.existsSync(usedImagesPath)) {
    try { usedImagesList = JSON.parse(fs.readFileSync(usedImagesPath, 'utf8')); } catch (e) {}
  }
  const usedImages = new Set(usedImagesList);

  let publishedCount = blueprint.filter(a => a.status === 'published').length;
  console.log(`Progreso inicial: ${publishedCount}/48 artículos ya publicados.\n`);

  for (let i = 0; i < blueprint.length; i++) {
    const article = blueprint[i];
    if (article.status === 'published') {
      console.log(`[${article.index}/48] Ya publicado previamente: "${article.title}" (ID: ${article.wpPostId}) - Omitiendo.`);
      continue;
    }

    console.log(`\n----------------------------------------------------`);
    console.log(`[${article.index}/48] Procesando: "${article.title}"`);
    console.log(`     Categoría: ${article.categoryName} (ID: ${article.categoryId})`);
    console.log(`     Fecha retroactiva: ${article.publishDate}`);
    console.log(`----------------------------------------------------`);

    try {
      // 1. Obtener 3 imágenes de Wikimedia Commons
      console.log('  1. Buscando 3 imágenes en Wikimedia Commons...');
      const queries = getSearchQueries(article.title, article.categoryName);
      const rawImages = await fetchWikimediaImages(queries, usedImages, 3);

      const uploadedImages = [];
      for (const img of rawImages) {
        try {
          const wpMedia = await uploadImageToWordPress(img, article.title);
          uploadedImages.push(wpMedia);
          console.log(`     Subida imagen WP ID: ${wpMedia.id}`);
        } catch (err) {
          console.warn(`     Error subiendo imagen ${img.url}:`, err.message);
        }
      }

      const featuredMediaId = uploadedImages[0]?.id || 0;
      const inlineImg1 = uploadedImages[1] || uploadedImages[0];
      const inlineImg2 = uploadedImages[2] || uploadedImages[0];

      // 2. Generar contenido editorial exhaustivo (>2500 palabras)
      console.log('  2. Generando texto editorial exhaustivo (>2500 palabras)...');
      const { html, words } = await generateArticleContent(article.title, article.categoryName);
      console.log(`     Contenido redactado: ${words} palabras.`);

      // 3. Inyectar imágenes intermedias
      let finalContent = html;
      if (inlineImg1 && inlineImg2) {
        finalContent = injectInlineImages(html, inlineImg1, inlineImg2);
      }

      // 4. Publicar en WordPress
      console.log('  3. Publicando artículo en WordPress REST API...');
      const postRes = await fetch(`${apiUrl}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: article.title,
          content: finalContent,
          status: 'publish',
          author: AUTHOR_ID,
          categories: [article.categoryId],
          featured_media: featuredMediaId,
          date: article.publishDate
        })
      });

      if (!postRes.ok) {
        const err = await postRes.text();
        throw new Error(`Error publicando post en WP: ${postRes.status} - ${err}`);
      }

      const newPost = await postRes.json();
      publishedCount++;
      console.log(`  ✅ [${publishedCount}/48] PUBLICADO CON ÉXITO:`);
      console.log(`     Post ID: ${newPost.id}`);
      console.log(`     URL: ${newPost.link}`);
      console.log(`     Palabras: ${words}`);
      console.log(`     Autor: Manuel López (ID ${AUTHOR_ID})`);

      // 5. Actualizar blueprint y persistencia
      article.status = 'published';
      article.wpPostId = newPost.id;
      article.words = words;
      article.featuredMediaId = featuredMediaId;
      article.link = newPost.link;

      fs.writeFileSync(blueprintPath, JSON.stringify(blueprint, null, 2));
      fs.writeFileSync(usedImagesPath, JSON.stringify(Array.from(usedImages), null, 2));

      // Breve pausa para no saturar APIs
      await new Promise(r => setTimeout(r, 1500));

    } catch (err) {
      console.error(`❌ Error procesando artículo ${article.index} ("${article.title}"):`, err.message);
      // Guardar estado actual
      fs.writeFileSync(blueprintPath, JSON.stringify(blueprint, null, 2));
      fs.writeFileSync(usedImagesPath, JSON.stringify(Array.from(usedImages), null, 2));
      // Pequeña pausa antes de reintentar el siguiente
      await new Promise(r => setTimeout(r, 4000));
    }
  }

  console.log('\n====================================================');
  console.log(`🏁 PIPELINE FINALIZADO. Total publicados: ${publishedCount}/48`);
  console.log('====================================================');
}

runPipeline().catch(err => {
  console.error('Fallo crítico en runPipeline:', err);
  process.exit(1);
});
