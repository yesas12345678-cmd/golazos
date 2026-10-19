import './loadEnv.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authHeader, apiUrl } from './loadEnv.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '../data');
const usedImagesPath = path.resolve(dataDir, 'used_images.json');

const geminiKey = process.env.GEMINI_API_KEY;

// Negative patterns
const STRICT_BANNED_REGEX = /\.(pdf|djvu|ogg|oga|ogv|svg|eps|ai|tif|tiff)($|\?|\/)|fileicon|file-type-icons|page1-|page2-|thumbnail\.pdf|speaker|loudspeaker|sound\b|audio\b|icon\b|logo\b|symbol\b|emblem\b|crest\b|coat[ _-]of[ _-]arms|flag\b|map\b|chart\b|graph\b|table\b|diagram|schematic|formation|lineup|line_up|drawing|sketch|clipart|illustration|cartoon|book\b|journal\b|thesis\b|report\b|magazine\b|newspaper\b|archive\b|sign\b|traffic|cemetery|gravestone/i;

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

RULES:
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

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      console.warn(`Vision check API returned ${res.status}`);
      return { is_real_football_photo: false, reason: `API error ${res.status}` };
    }

    const data = await res.json();
    const textPart = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textPart) return { is_real_football_photo: false, reason: 'Empty response' };
    return JSON.parse(textPart);
  } catch (err) {
    console.warn(`Vision check failed:`, err.message);
    return { is_real_football_photo: false, reason: err.message };
  }
}

async function searchVerifiedWikimediaImage(queries, usedImages) {
  for (const q of queries) {
    const endpoint = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(q)}&gsrlimit=15&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1280&format=json`;
    try {
      const res = await fetch(endpoint, {
        headers: { 'User-Agent': 'MediaWikiBot/1.0 (contacto@golazos.co) NodeFetch' },
        signal: AbortSignal.timeout(15000)
      });
      if (!res.ok) continue;
      const data = await res.json();
      const pages = Object.values(data.query?.pages || {});

      for (const page of pages) {
        const info = page.imageinfo?.[0];
        if (!info) continue;
        const title = page.title || '';
        const imgUrl = info.thumburl || info.url;
        if (!imgUrl) continue;

        // Hard regex filter on title and URL
        if (STRICT_BANNED_REGEX.test(title) || STRICT_BANNED_REGEX.test(imgUrl)) {
          continue;
        }

        if (usedImages.has(imgUrl)) continue;

        // Download candidate image buffer
        const dlRes = await fetch(imgUrl, {
          headers: { 'User-Agent': 'MediaWikiBot/1.0 (contacto@golazos.co) NodeFetch' },
          signal: AbortSignal.timeout(20000)
        });
        if (!dlRes.ok) continue;
        const buf = await dlRes.arrayBuffer();
        const mime = dlRes.headers.get('content-type') || 'image/jpeg';

        // Pre-flight Vision verification gate
        console.log(`    Analizando con Gemini Vision: "${title.slice(0, 50)}"...`);
        const visionResult = await verifyFootballImageWithVision(buf, mime);
        if (visionResult.is_real_football_photo === true && !visionResult.is_icon_or_document_or_diagram) {
          console.log(`    ✅ APROBADA: ${visionResult.reason}`);
          usedImages.add(imgUrl);
          return {
            title: title.replace('File:', '').replace(/\.[^/.]+$/, ''),
            url: imgUrl,
            buffer: Buffer.from(buf),
            mime
          };
        } else {
          console.log(`    ❌ RECHAZADA (${visionResult.reason || 'No es foto real de fútbol'})`);
        }
      }
    } catch (e) {
      console.warn(`    Fallo búsqueda "${q}":`, e.message);
    }
  }
  return null;
}

async function uploadVerifiedImageToWP(imgObj, articleTitle) {
  const cleanName = 'futbol_' + Math.random().toString(36).substring(2, 9) + '.jpg';
  const altText = `${articleTitle}: fotografía en acción de fútbol`;

  const wpRes = await fetch(`${apiUrl}/media`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `attachment; filename="${cleanName}"`
    },
    body: imgObj.buffer
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
}

async function runAudit() {
  console.log('=== AUDITORÍA Y CORRECCIÓN DE IMÁGENES PUBLICADAS (PASO 18) ===');

  let usedImages = new Set();
  if (fs.existsSync(usedImagesPath)) {
    try {
      usedImages = new Set(JSON.parse(fs.readFileSync(usedImagesPath, 'utf8')));
    } catch {}
  }

  // Fetch all published posts
  const postsRes = await fetch(`${apiUrl}/posts?per_page=100&_embed`, {
    headers: { 'Authorization': authHeader }
  });
  if (!postsRes.ok) throw new Error(`Fallo obtener posts: ${postsRes.status}`);
  const posts = await postsRes.json();
  console.log(`Total artículos en WordPress: ${posts.length}`);

  let replacedCount = 0;

  for (const post of posts) {
    const postTitle = post.title?.rendered || `Post ${post.id}`;
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const featuredUrl = featuredMedia?.source_url || '';
    const featuredMediaId = post.featured_media;

    console.log(`\nRevisando Post [${post.id}]: "${postTitle}"`);
    console.log(`  Featured Media ID: ${featuredMediaId}, URL: ${featuredUrl}`);

    let needsReplacement = false;
    let failReason = '';

    if (!featuredMediaId || !featuredUrl) {
      needsReplacement = true;
      failReason = 'Sin imagen destacada';
    } else {
      // Check hard regex on URL
      if (STRICT_BANNED_REGEX.test(featuredUrl)) {
        needsReplacement = true;
        failReason = `URL coincide con patrón prohibido: ${featuredUrl.slice(-40)}`;
      } else {
        // Download and verify with Gemini Vision
        try {
          const imgRes = await fetch(featuredUrl, { signal: AbortSignal.timeout(10000) });
          if (!imgRes.ok) {
            needsReplacement = true;
            failReason = `HTTP ${imgRes.status} al descargar imagen actual`;
          } else {
            const buf = await imgRes.arrayBuffer();
            const mime = imgRes.headers.get('content-type') || 'image/jpeg';
            const vision = await verifyFootballImageWithVision(buf, mime);
            if (!vision.is_real_football_photo || vision.is_icon_or_document_or_diagram) {
              needsReplacement = true;
              failReason = `Gemini Vision la rechazó: ${vision.reason}`;
            } else {
              console.log(`  ✅ Imagen actual válida: ${vision.reason}`);
            }
          }
        } catch (err) {
          needsReplacement = true;
          failReason = `Error analizando imagen: ${err.message}`;
        }
      }
    }

    if (needsReplacement) {
      console.log(`  ⚠️ REEMPLAZO OBLIGATORIO: ${failReason}`);
      // Find new image
      const queries = [
        `${postTitle} association football`,
        `association football match pitch`,
        `soccer stadium crowd match action`,
        `football referee match action`,
        `soccer player training drills`
      ];

      const newCandidate = await searchVerifiedWikimediaImage(queries, usedImages);
      if (newCandidate) {
        console.log(`  Subiendo nueva imagen a WordPress...`);
        const uploaded = await uploadVerifiedImageToWP(newCandidate, postTitle);

        // Update post featured_media
        const patchRes = await fetch(`${apiUrl}/posts/${post.id}`, {
          method: 'POST',
          headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
          body: JSON.stringify({ featured_media: uploaded.id })
        });

        if (patchRes.ok) {
          console.log(`  🎉 Post [${post.id}] actualizado exitosamente con nuevo Media ID ${uploaded.id}!`);
          replacedCount++;
        } else {
          console.error(`  Fallo actualizando post: ${patchRes.status}`);
        }
      } else {
        console.error(`  No se pudo encontrar imagen válida para post [${post.id}]!`);
      }
    }
  }

  // Save cleaned used_images.json without bad URLs
  const cleanUsed = Array.from(usedImages).filter(u => !STRICT_BANNED_REGEX.test(u));
  fs.writeFileSync(usedImagesPath, JSON.stringify(cleanUsed, null, 2), 'utf8');

  console.log(`\n=== AUDITORÍA FINALIZADA ===`);
  console.log(`Artículos revisados: ${posts.length}`);
  console.log(`Imágenes defectuosas reemplazadas por fotos de fútbol 100% verificadas: ${replacedCount}`);
}

runAudit().catch(console.error);
