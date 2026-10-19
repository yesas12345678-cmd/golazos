import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authHeader, apiUrl } from './loadEnv.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function uploadMedia(filePath, fileName, altText, titleText) {
  const fullPath = path.resolve(__dirname, '..', filePath);
  const fileBuffer = fs.readFileSync(fullPath);

  console.log(`Subiendo ${fileName} (${fileBuffer.length} bytes)...`);
  const res = await fetch(`${apiUrl}/media`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="${fileName}"`
    },
    body: fileBuffer
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error al subir ${fileName}: ${res.status} ${res.statusText} - ${err}`);
  }

  const media = await res.json();
  console.log(`Medio subido con ID: ${media.id} (${media.source_url})`);

  // Actualizar metadatos
  const metaRes = await fetch(`${apiUrl}/media/${media.id}`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      alt_text: altText,
      title: titleText
    })
  });

  if (metaRes.ok) {
    console.log(`Metadatos actualizados para ID ${media.id}`);
  }

  return { id: media.id, url: media.source_url };
}

async function run() {
  const logo = await uploadMedia('public/logo.png', 'golazos-logo.png', 'Golazos - Fútbol y Actualidad', 'Golazos Logo');
  const favicon = await uploadMedia('public/favicon.png', 'golazos-favicon.png', 'Golazos Favicon', 'Golazos Favicon');

  const brandingData = {
    logoId: logo.id,
    logoUrl: logo.url,
    faviconId: favicon.id,
    faviconUrl: favicon.url
  };

  fs.writeFileSync(path.resolve(__dirname, '../data_branding.json'), JSON.stringify(brandingData, null, 2));
  console.log('✅ Branding subido y guardado en data_branding.json:', brandingData);
}

run().catch(err => {
  console.error('❌ Error en upload_branding:', err);
  process.exit(1);
});
