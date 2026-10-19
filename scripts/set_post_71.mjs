import './loadEnv.mjs';
import { authHeader, apiUrl } from './loadEnv.mjs';

async function updatePost71() {
  const imgUrl = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Recibimiento_Copa_Libertadores_Racing.jpg/1280px-Recibimiento_Copa_Libertadores_Racing.jpg';
  const imgRes = await fetch(imgUrl, { headers: { 'User-Agent': 'MediaWikiBot/1.0 (contacto@golazos.co)' } });
  const buf = await imgRes.arrayBuffer();

  const wpRes = await fetch(`${apiUrl}/media`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'image/jpeg',
      'Content-Disposition': 'attachment; filename="copa_libertadores_racing_estadio.jpg"'
    },
    body: Buffer.from(buf)
  });
  const media = await wpRes.json();
  console.log('Uploaded media ID:', media.id, media.source_url);

  // Update alt text
  await fetch(`${apiUrl}/media/${media.id}`, {
    method: 'POST',
    headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      alt_text: 'Recibimiento multitudinario y bengalas en la Copa Libertadores',
      title: 'Copa Libertadores ambiente de máxima intensidad'
    })
  });

  // Set featured_media on Post 71
  const patch = await fetch(`${apiUrl}/posts/71`, {
    method: 'POST',
    headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify({ featured_media: media.id })
  });
  console.log('Post 71 updated successfully:', patch.status);
}

updatePost71().catch(console.error);
