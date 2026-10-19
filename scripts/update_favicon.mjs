import './loadEnv.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authHeader, apiUrl } from './loadEnv.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const faviconPath = path.resolve(__dirname, '../public/favicon_512.png');

async function uploadAndSetFavicon() {
  console.log('1. Leyendo favicon 512x512 generado...');
  const fileBytes = fs.readFileSync(faviconPath);

  const cleanName = 'golazos_favicon_pro.png';
  const altText = 'Golazos Favicon Oficial';

  console.log('2. Subiendo a la biblioteca de medios de WordPress...');
  const wpRes = await fetch(`${apiUrl}/media`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="${cleanName}"`
    },
    body: fileBytes
  });

  if (!wpRes.ok) {
    const err = await wpRes.text();
    throw new Error(`Error al subir medio: ${wpRes.status} - ${err}`);
  }

  const media = await wpRes.json();
  console.log(`✅ Medio subido con éxito. ID: ${media.id} (${media.source_url})`);

  // Actualizar metadatos
  await fetch(`${apiUrl}/media/${media.id}`, {
    method: 'POST',
    headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify({ alt_text: altText, title: altText })
  });

  console.log('3. Asignando como site_icon en Ajustes Generales (/wp/v2/settings)...');
  const setRes = await fetch(`${apiUrl}/settings`, {
    method: 'POST',
    headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify({ site_icon: media.id })
  });

  if (!setRes.ok) {
    const err = await setRes.text();
    throw new Error(`Error al actualizar site_icon: ${setRes.status} - ${err}`);
  }

  const settings = await setRes.json();
  console.log(`✅ site_icon actualizado exitosamente en settings: ID ${settings.site_icon}`);

  // Verificar que el frontend de golazos.co ahora tiene el favicon nuevo
  console.log('4. Verificando en la página web pública...');
  const homeRes = await fetch('https://golazos.co/');
  const html = await homeRes.text();
  const iconMatch = html.match(/<link rel="icon" href="([^"]+)"/i) || html.match(/<link rel="apple-touch-icon" href="([^"]+)"/i);
  console.log('Favicon detectado en el HTML público:', iconMatch ? iconMatch[1] : 'No regex match');

  return media.id;
}

uploadAndSetFavicon().catch(console.error);
