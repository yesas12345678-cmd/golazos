import './loadEnv.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authHeader, apiUrl } from './loadEnv.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '../data');
const blueprintPath = path.resolve(dataDir, 'articles_blueprint.json');

const blueprint = JSON.parse(fs.readFileSync(blueprintPath, 'utf8'));

// Mapa de fuentes externas de máxima autoridad según temática
function getExternalLinkForArticle(title, categoryName) {
  const t = title.toLowerCase();

  if (categoryName === 'Reglamento y Arbitraje') {
    if (/ifab|regla|reglamento|tiempo añadido|penalti|mano|fuera de juego|falta/i.test(t)) {
      return {
        url: 'https://www.theifab.com/es/',
        anchor: 'la International Football Association Board (IFAB)'
      };
    }
    return {
      url: 'https://www.fifa.com/es/technical/refereeing',
      anchor: 'el Comité de Árbitros de la FIFA'
    };
  }

  if (categoryName === 'Grandes Torneos') {
    if (/libertadores/i.test(t)) {
      return {
        url: 'https://www.conmebol.com/',
        anchor: 'la Confederación Sudamericana de Fútbol (CONMEBOL)'
      };
    }
    if (/champions|suizo|fair play|remontadas/i.test(t)) {
      return {
        url: 'https://es.uefa.com/',
        anchor: 'la Unión de Federaciones Europeas de Fútbol (UEFA)'
      };
    }
    if (/balón de oro|balon de oro/i.test(t)) {
      return {
        url: 'https://es.uefa.com/ballondor/',
        anchor: 'la organización oficial del Ballon d\'Or'
      };
    }
    return {
      url: 'https://www.fifa.com/es',
      anchor: 'la Federación Internacional de Fútbol Asociación (FIFA)'
    };
  }

  if (categoryName === 'Táctica y Estrategia') {
    if (/xg|goles esperados|métrica|datos/i.test(t)) {
      return {
        url: 'https://www.laliga.com/',
        anchor: 'las métricas y estadísticas oficiales de LaLiga'
      };
    }
    return {
      url: 'https://www.fifatrainingcentre.com/es/',
      anchor: 'el Centro de Formación e Innovación Táctica de la FIFA (FIFA Training Centre)'
    };
  }

  // Entrenamiento y Rendimiento
  if (/isquiotibiales|ligamento|lesion|lesiones|readaptaci/i.test(t)) {
    return {
      url: 'https://www.fifa.com/es/technical/medical',
      anchor: 'la Red Médica y de Prevención de Lesiones de la FIFA (FIFA Medical Network)'
    };
  }
  if (/nutrici|hidrataci|sueno|sueño|descanso|ansiedad|psicol/i.test(t)) {
    return {
      url: 'https://olympics.com/es/',
      anchor: 'los estándares de ciencias del deporte del Comité Olímpico Internacional'
    };
  }
  return {
    url: 'https://www.fifatrainingcentre.com/es/',
    anchor: 'los programas de rendimiento físico de la FIFA'
  };
}

// Obtener dos artículos internos altamente relevantes
function getInternalLinksForArticle(currentArticle, allArticles) {
  const currentIndex = currentArticle.index - 1; // 0-based
  const currentCat = currentArticle.categoryName;

  // 1. Mismo Silo (Misma Categoría)
  const sameCatArticles = allArticles.filter(a => a.categoryName === currentCat && a.index !== currentArticle.index);
  // Escoger un artículo afín en la misma categoría
  const target1 = sameCatArticles[(currentIndex * 3) % sameCatArticles.length];

  // 2. Silo Complementario (Otra Categoría)
  let complementCat = '';
  if (currentCat === 'Grandes Torneos') complementCat = 'Táctica y Estrategia';
  else if (currentCat === 'Táctica y Estrategia') complementCat = 'Entrenamiento y Rendimiento';
  else if (currentCat === 'Entrenamiento y Rendimiento') complementCat = 'Reglamento y Arbitraje';
  else complementCat = 'Grandes Torneos';

  const complementArticles = allArticles.filter(a => a.categoryName === complementCat && a.index !== currentArticle.index);
  const target2 = complementArticles[(currentIndex * 5) % complementArticles.length];

  // Limpiar títulos para que sirvan de anchor natural fluido
  function cleanAnchor(title) {
    return title
      .replace(/^Cómo\s+/i, 'cómo ')
      .replace(/^Qué\s+/i, 'qué ')
      .replace(/^Por Qué\s+/i, 'por qué ')
      .replace(/^Las Claves de\s+/i, 'las claves de ')
      .replace(/^Guía Completa del\s+/i, 'el ')
      .trim();
  }

  return [
    {
      url: target1.link,
      anchor: cleanAnchor(target1.title),
      title: target1.title
    },
    {
      url: target2.link,
      anchor: cleanAnchor(target2.title),
      title: target2.title
    }
  ];
}

// Inyección matemática y semántica de los 3 enlaces en los párrafos del HTML
function injectLinksIntoHtml(html, extLink, intLink1, intLink2) {
  // Primero limpiamos cualquier enlace anterior para garantizar idempotencia
  let cleaned = html.replace(/<a\s+[^>]*href=["'][^"']+["'][^>]*>(.*?)<\/a>/gi, '$1');

  // Separar párrafos
  const pParts = cleaned.split('</p>');
  const totalP = pParts.length - 1; // El último elemento tras </p> suele ser vacío

  if (totalP < 6) {
    // Si tiene muy pocos párrafos, añadimos notas contextuales
    const linkExtHtml = `<a href="${extLink.url}" target="_blank" rel="noopener noreferrer external">${extLink.anchor}</a>`;
    const linkInt1Html = `<a href="${intLink1.url}">${intLink1.anchor}</a>`;
    const linkInt2Html = `<a href="${intLink2.url}">${intLink2.anchor}</a>`;

    return cleaned + `\n<p>Para profundizar en la reglamentación y estándares oficiales, consulta las directrices de ${linkExtHtml}. Asimismo, puedes ampliar tu visión táctica con nuestro análisis sobre ${linkInt1Html} y examinar nuestra guía sobre ${linkInt2Html}.</p>`;
  }

  // Índices estratégicos distribuidos:
  // - Enlace externo: en el primer tercio (~párrafo 4)
  // - Enlace interno 1: en el tercio medio (~párrafo 11)
  // - Enlace interno 2: en el último tercio (~párrafo 19)
  const idxExt = Math.max(2, Math.floor(totalP * 0.22));
  const idxInt1 = Math.floor(totalP * 0.52);
  const idxInt2 = Math.min(totalP - 2, Math.floor(totalP * 0.82));

  // Inyectar Enlace Externo en idxExt
  const extHtml = `<a href="${extLink.url}" target="_blank" rel="noopener noreferrer external">${extLink.anchor}</a>`;
  pParts[idxExt] = pParts[idxExt].trim() + ` En este contexto, resulta fundamental remitirse a los marcos y directrices oficiales dictados por ${extHtml}.`;

  // Inyectar Enlace Interno 1 en idxInt1
  const int1Html = `<a href="${intLink1.url}">${intLink1.anchor}</a>`;
  pParts[idxInt1] = pParts[idxInt1].trim() + ` Este principio se vincula de manera directa con los conceptos y fundamentos que desarrollamos al analizar ${int1Html}.`;

  // Inyectar Enlace Interno 2 en idxInt2
  const int2Html = `<a href="${intLink2.url}">${intLink2.anchor}</a>`;
  pParts[idxInt2] = pParts[idxInt2].trim() + ` Para complementar esta perspectiva y profundizar en su aplicación práctica, te recomendamos consultar nuestro estudio detallado sobre ${int2Html}.`;

  return pParts.join('</p>');
}

async function addLinksToAllArticles() {
  console.log('================================================================');
  console.log('🔗 PROCESO MASIVO DE ENLAZADO INTERNO Y EXTERNO (~3 ENLACES/POST)');
  console.log('================================================================\n');

  console.log(`Cargando los 48 artículos de articles_blueprint.json...`);

  // Descargar todos los posts de WordPress para tener sus contenidos actualizados
  let allWPPosts = [];
  let page = 1;
  while (true) {
    const res = await fetch(`${apiUrl}/posts?per_page=100&page=${page}`, { headers: { Authorization: authHeader } });
    const posts = await res.json();
    if (!posts || !Array.isArray(posts) || posts.length === 0) break;
    allWPPosts.push(...posts);
    page++;
  }

  console.log(`Posts obtenidos de WordPress: ${allWPPosts.length}\n`);

  let updatedCount = 0;

  for (let i = 0; i < blueprint.length; i++) {
    const art = blueprint[i];
    const wpPost = allWPPosts.find(p => p.id === art.wpPostId);
    if (!wpPost) {
      console.warn(`⚠️ Post WP no encontrado para blueprint ID ${art.wpPostId} ("${art.title}")`);
      continue;
    }

    console.log(`[${art.index}/48] Procesando Post ID ${wpPost.id}: "${art.title}"`);

    // 1. Determinar enlace externo y 2 enlaces internos
    const extLink = getExternalLinkForArticle(art.title, art.categoryName);
    const [intLink1, intLink2] = getInternalLinksForArticle(art, blueprint);

    console.log(`   🌐 Ext: ${extLink.anchor} -> ${extLink.url}`);
    console.log(`   🔗 Int 1: ${intLink1.anchor} -> ${intLink1.url}`);
    console.log(`   🔗 Int 2: ${intLink2.anchor} -> ${intLink2.url}`);

    // 2. Inyectar enlaces en el HTML
    const newHtml = injectLinksIntoHtml(wpPost.content.rendered, extLink, intLink1, intLink2);

    // 3. Validar con Puerta Estricta (Gate)
    const linksFound = newHtml.match(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi) || [];
    const internalFound = linksFound.filter(l => l.includes('golazos.co'));
    const externalFound = linksFound.filter(l => !l.includes('golazos.co'));

    if (linksFound.length !== 3 || internalFound.length !== 2 || externalFound.length !== 1) {
      console.error(`   ❌ Error de validación de enlaces en post ${wpPost.id}: total=${linksFound.length}, int=${internalFound.length}, ext=${externalFound.length}`);
      continue;
    }

    // 4. Guardar en WordPress con reintentos
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const updateRes = await fetch(`${apiUrl}/posts/${wpPost.id}`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: newHtml }),
          signal: AbortSignal.timeout(20000)
        });

        if (!updateRes.ok) {
          const errText = await updateRes.text();
          throw new Error(`HTTP ${updateRes.status}: ${errText}`);
        }

        updatedCount++;
        console.log(`   ✅ Post ID ${wpPost.id} actualizado exitosamente (3 enlaces verificados).\n`);
        break;
      } catch (err) {
        console.warn(`   ⚠️ Intento ${attempt}/3 falló para post ${wpPost.id}: ${err.message}`);
        if (attempt === 3) throw err;
        await new Promise(r => setTimeout(r, 2000));
      }
    }

    // Pausa breve entre peticiones para proteger el servidor
    await new Promise(r => setTimeout(r, 400));
  }

  console.log('\n================================================================');
  console.log(`🏁 FINALIZADO: ${updatedCount}/48 artículos actualizados con enlaces.`);
  console.log('================================================================');

  // Auditoría final 48/48
  console.log('\n--- AUDITORÍA FINAL DE ENLACES (100% DE LOS 48 ARTÍCULOS) ---');
  let auditPosts = [];
  page = 1;
  while (true) {
    const res = await fetch(`${apiUrl}/posts?per_page=100&page=${page}`, { headers: { Authorization: authHeader } });
    const posts = await res.json();
    if (!posts || !Array.isArray(posts) || posts.length === 0) break;
    auditPosts.push(...posts);
    page++;
  }

  let failingArticles = [];
  for (const p of auditPosts) {
    const links = p.content.rendered.match(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi) || [];
    const intCount = links.filter(l => l.includes('golazos.co')).length;
    const extCount = links.filter(l => !l.includes('golazos.co')).length;

    if (links.length !== 3 || intCount !== 2 || extCount !== 1) {
      failingArticles.push({ id: p.id, title: p.title.rendered, total: links.length, int: intCount, ext: extCount });
    }
  }

  console.log(`Artículos totales en WordPress: ${auditPosts.length}`);
  console.log(`Artículos con fallo en enlace de 3 enlaces (2 internos + 1 externo): ${failingArticles.length}`);
  if (failingArticles.length === 0) {
    console.log('🎉 AUDITORÍA 100% SUPERADA: Los 48 artículos tienen exactamente sus 3 enlaces (2 internos + 1 externo) SIEMPRE con hipervínculo HTML.');
  } else {
    console.error('Artículos que requieren revisión:', failingArticles);
    throw new Error(`Auditoría fallida en ${failingArticles.length} artículos.`);
  }
}

addLinksToAllArticles().catch(err => {
  console.error('Fallo en addLinksToAllArticles:', err);
  process.exit(1);
});
