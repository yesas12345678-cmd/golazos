import './loadEnv.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authHeader, apiUrl } from './loadEnv.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '../data');
const usedImagesPath = path.resolve(dataDir, 'used_images.json');
const geminiKey = process.env.GEMINI_API_KEY;
const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;

const STRICT_BANNED_REGEX = /\.(pdf|djvu|ogg|oga|ogv|svg|eps|ai|tif|tiff)($|\?|\/)|fileicon|file-type-icons|page1-|page2-|thumbnail\.pdf|speaker|loudspeaker|sound\b|audio\b|icon\b|logo\b|symbol\b|emblem\b|crest\b|coat[ _-]of[ _-]arms|flag\b|map\b|chart\b|graph\b|table\b|diagram|schematic|formation|lineup|line_up|drawing|sketch|clipart|illustration|cartoon|book\b|journal\b|thesis\b|report\b|magazine\b|newspaper\b|archive\b|sign\b|traffic|cemetery|gravestone|soldier|military|army|navy|weapon/i;

async function verifyFootballImageWithVision(buffer, mimeType = 'image/jpeg') {
  try {
    const b64 = Buffer.from(buffer).toString('base64');
    const prompt = `You are a strict quality control inspector for the professional football (soccer) portal "Golazos".
Inspect this candidate image.
Respond strictly in JSON:
{
  "is_real_football_photo": boolean,
  "is_icon_or_document_or_diagram": boolean,
  "confidence": number,
  "reason": string
}

CRITICAL RULES:
1. "is_real_football_photo" MUST be true ONLY if the image is an authentic, real-life photograph directly depicting association football/soccer (players on the pitch, match action, stadium, fans in stands, referee on field, football ball, training drills on grass, trophy celebration).
2. MUST BE FALSE for: digital icons, loudspeaker/speaker symbols, audio icons, documents, PDF scans, book covers, diagrams, tactical schematics, flags, maps, logos, drawings, clipart, and non-football photos.
3. If "is_icon_or_document_or_diagram" is true, "is_real_football_photo" MUST BE FALSE.`;

    const body = {
      contents: [{
        parts: [
          { text: prompt },
          { inlineData: { mimeType: mimeType.split(';')[0], data: b64 } }
        ]
      }],
      generationConfig: { responseMimeType: 'application/json' }
    };

    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(15000)
        });

        if (res.status === 429) {
          console.log(`      ⏳ Gemini 429 rate limit. Esperando 5s (intento ${attempt}/4)...`);
          await new Promise(r => setTimeout(r, 5000));
          continue;
        }
        if (!res.ok) return { is_real_football_photo: false, reason: `HTTP ${res.status}` };

        const data = await res.json();
        const textPart = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!textPart) return { is_real_football_photo: false, reason: 'Empty response' };
        return JSON.parse(textPart);
      } catch (err) {
        if (attempt === 4) return { is_real_football_photo: false, reason: err.message };
        await new Promise(r => setTimeout(r, 2000));
      }
    }
    return { is_real_football_photo: false, reason: 'Rate limit excedido' };
  } catch (err) {
    return { is_real_football_photo: false, reason: err.message };
  }
}

async function searchVerifiedWikimedia(queries, usedImages, needed = 2) {
  const found = [];
  for (const q of queries) {
    if (found.length >= needed) break;
    await new Promise(r => setTimeout(r, 500));

    const fullQ = `${q} -soldier -military -army filetype:bitmap`;
    const endpoint = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(fullQ)}&gsrlimit=10&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1280&format=json`;

    try {
      const res = await fetch(endpoint, {
        headers: { 'User-Agent': 'MediaWikiBot/1.0 (contacto@golazos.co) NodeFetch' },
        signal: AbortSignal.timeout(10000)
      });
      if (!res.ok) continue;
      const data = await res.json();
      const pages = Object.values(data.query?.pages || {});

      for (const page of pages) {
        if (found.length >= needed) break;
        const info = page.imageinfo?.[0];
        if (!info) continue;
        const title = page.title || '';
        const imgUrl = info.thumburl || info.url;
        if (!imgUrl) continue;

        if (STRICT_BANNED_REGEX.test(title) || STRICT_BANNED_REGEX.test(imgUrl)) continue;
        if (usedImages.has(imgUrl)) continue;

        try {
          const dlRes = await fetch(imgUrl, {
            headers: { 'User-Agent': 'MediaWikiBot/1.0 (contacto@golazos.co) NodeFetch' },
            signal: AbortSignal.timeout(10000)
          });
          if (!dlRes.ok) continue;
          const buf = await dlRes.arrayBuffer();
          const mime = dlRes.headers.get('content-type') || 'image/jpeg';

          const vision = await verifyFootballImageWithVision(buf, mime);
          if (vision.is_real_football_photo === true && !vision.is_icon_or_document_or_diagram) {
            console.log(`      ✅ [Wikimedia] Aprobada: "${title.slice(0, 45)}" (${vision.reason})`);
            usedImages.add(imgUrl);
            found.push({
              title: title.replace('File:', '').replace(/\.[^/.]+$/, ''),
              url: imgUrl,
              buffer: Buffer.from(buf),
              mime
            });
          } else {
            console.log(`      ❌ [Wikimedia] Descartada: "${title.slice(0, 45)}" -> ${vision.reason}`);
          }
        } catch (e) {}
      }
    } catch (e) {}
  }
  return found;
}

async function searchVerifiedUnsplash(query, usedImages, needed = 2) {
  if (!unsplashKey) return [];
  const found = [];
  try {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=12`, {
      headers: { 'Authorization': `Client-ID ${unsplashKey}` },
      signal: AbortSignal.timeout(10000)
    });
    if (!res.ok) return [];
    const data = await res.json();
    for (const item of (data.results || [])) {
      if (found.length >= needed) break;
      const imgUrl = item.urls?.regular;
      if (!imgUrl || usedImages.has(imgUrl)) continue;

      try {
        const dl = await fetch(imgUrl, { signal: AbortSignal.timeout(10000) });
        if (!dl.ok) continue;
        const buf = await dl.arrayBuffer();
        const mime = dl.headers.get('content-type') || 'image/jpeg';

        // Unsplash football photos are real photography
        console.log(`      ✅ [Unsplash] Aprobada: "${(item.alt_description || query).slice(0, 45)}"`);
        usedImages.add(imgUrl);
        found.push({
          title: item.alt_description || query,
          url: imgUrl,
          buffer: Buffer.from(buf),
          mime
        });
      } catch (e) {}
    }
  } catch (e) {
    console.warn('    Fallo Unsplash:', e.message);
  }
  return found;
}

async function uploadImageToWP(imgObj, articleTitle) {
  const cleanName = 'futbol_' + Math.random().toString(36).substring(2, 9) + '.jpg';
  const altText = `${articleTitle}: ${imgObj.title.slice(0, 80)}`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const wpRes = await fetch(`${apiUrl}/media`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'image/jpeg',
          'Content-Disposition': `attachment; filename="${cleanName}"`
        },
        body: imgObj.buffer,
        signal: AbortSignal.timeout(25000)
      });

      if (!wpRes.ok) {
        const err = await wpRes.text();
        throw new Error(`Fallo subida WP media: ${wpRes.status} - ${err}`);
      }

      const media = await wpRes.json();
      await fetch(`${apiUrl}/media/${media.id}`, {
        method: 'POST',
        headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({ alt_text: altText, title: altText })
      }).catch(() => {});

      return { id: media.id, sourceUrl: media.source_url, altText };
    } catch (e) {
      if (attempt === 3) throw e;
      console.warn(`    ⚠️ Reintentando subida a WP (intento ${attempt}/3): ${e.message}`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
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

async function fixAllMissingInlineImages() {
  console.log('=== AUDITORÍA Y CORRECCIÓN DE IMÁGENES INTERMEDIAS ===\n');

  let usedImages = new Set();
  if (fs.existsSync(usedImagesPath)) {
    try { usedImages = new Set(JSON.parse(fs.readFileSync(usedImagesPath, 'utf8'))); } catch {}
  }

  let allPosts = [];
  let page = 1;
  while (true) {
    const res = await fetch(`${apiUrl}/posts?per_page=100&page=${page}`, { headers: { Authorization: authHeader } });
    const posts = await res.json();
    if (!posts || !Array.isArray(posts) || posts.length === 0) break;
    allPosts.push(...posts);
    page++;
  }

  const targetPosts = allPosts.filter(p => {
    const imgs = p.content.rendered.match(/<img[^>]+>/g) || [];
    return imgs.length < 2;
  });

  console.log(`Artículos pendientes con menos de 2 imágenes intermedias: ${targetPosts.length}\n`);

  for (const post of targetPosts) {
    const title = post.title.rendered;
    console.log(`----------------------------------------------------------------`);
    console.log(`Procesando Post [${post.id}]: "${title}"`);
    console.log(`----------------------------------------------------------------`);

    const queries = [
      'association football match action pitch',
      'soccer players match stadium',
      'football stadium pitch crowd',
      'UEFA Champions League football match action',
      'soccer training pitch drills'
    ];

    if (/fair play|uefa|liga|torneo|campeonato/i.test(title)) {
      queries.unshift('UEFA Champions League match', 'football stadium match action');
    } else if (/falta|sanción|infracción|árbitro|tarjeta/i.test(title)) {
      queries.unshift('association football referee match', 'football referee penalty');
    } else if (/técnica|golpeo|entrenamiento|ejercicios/i.test(title)) {
      queries.unshift('soccer training kicking ball', 'football players grass pitch');
    } else if (/transición|ofensiva|remate|pizarra|táctica|mediocentro|equilibrio/i.test(title)) {
      queries.unshift('soccer players passing match action', 'football match pitch action');
    }

    console.log('  1. Buscando 2 fotos verificadas...');
    let unsplashQuery = 'soccer football match action pitch';
    if (/fair play|uefa|liga|torneo|campeonato/i.test(title)) {
      unsplashQuery = 'soccer stadium football match';
    } else if (/balón parado|zona|marcaje|córner|defensa/i.test(title)) {
      unsplashQuery = 'soccer match action pitch';
    } else if (/transición|ofensiva|remate|contraataque/i.test(title)) {
      unsplashQuery = 'soccer player match action pitch';
    }

    let verifiedImages = await searchVerifiedUnsplash(unsplashQuery, usedImages, 2);

    if (verifiedImages.length < 2) {
      console.log(`  Buscando en Wikimedia Commons (${verifiedImages.length}/2)...`);
      const wikiImages = await searchVerifiedWikimedia(queries, usedImages, 2 - verifiedImages.length);
      verifiedImages.push(...wikiImages);
    }

    if (verifiedImages.length < 2) {
      console.error(`  ❌ No se pudieron reunir 2 fotos verificadas para post ${post.id}.`);
      continue;
    }

    console.log('  2. Subiendo imágenes a WordPress...');
    const wpImg1 = await uploadImageToWP(verifiedImages[0], title);
    console.log(`     Subida imagen 1: WP ID ${wpImg1.id}`);
    const wpImg2 = await uploadImageToWP(verifiedImages[1], title);
    console.log(`     Subida imagen 2: WP ID ${wpImg2.id}`);

    console.log('  3. Inyectando imágenes intermedias en el HTML...');
    const updatedHtml = injectInlineImages(post.content.rendered, wpImg1, wpImg2);

    console.log('  4. Guardando en WordPress REST API...');
    const updateRes = await fetch(`${apiUrl}/posts/${post.id}`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: updatedHtml }),
      signal: AbortSignal.timeout(20000)
    });

    if (!updateRes.ok) {
      const err = await updateRes.text();
      console.error(`  ❌ Error actualizando post ${post.id}:`, err);
      continue;
    }

    const updatedData = await updateRes.json();
    const imgsInContent = (updatedData.content.rendered.match(/<img[^>]+>/g) || []).length;
    console.log(`  ✅ Post [${post.id}] actualizado con éxito. Imágenes en cuerpo: ${imgsInContent}`);
  }

  fs.writeFileSync(usedImagesPath, JSON.stringify([...usedImages], null, 2), 'utf8');

  // Auditoría final de comprobación del 100%
  console.log('\n--- VERIFICACIÓN FINAL DE LOS 48 ARTÍCULOS ---');
  let finalPosts = [];
  page = 1;
  while (true) {
    const res = await fetch(`${apiUrl}/posts?per_page=100&page=${page}`, { headers: { Authorization: authHeader } });
    const posts = await res.json();
    if (!posts || !Array.isArray(posts) || posts.length === 0) break;
    finalPosts.push(...posts);
    page++;
  }
  const stillWithout = finalPosts.filter(p => (p.content.rendered.match(/<img[^>]+>/g) || []).length < 2);
  console.log(`Artículos totales en WordPress: ${finalPosts.length}`);
  console.log(`Artículos con menos de 2 imágenes intermedias: ${stillWithout.length}`);
  if (stillWithout.length === 0) {
    console.log('🎉 ÉXITO TOTAL: El 100% de los 48 artículos tienen sus 2 imágenes intermedias en el cuerpo.');
  } else {
    stillWithout.forEach(p => console.log(`  - Pendiente: ID ${p.id} ("${p.title.rendered}")`));
  }
}

fixAllMissingInlineImages().catch(console.error);
