import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authHeader, apiUrl } from './loadEnv.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandingPath = path.resolve(__dirname, '../data_branding.json');
let faviconId = 8;
if (fs.existsSync(brandingPath)) {
  const b = JSON.parse(fs.readFileSync(brandingPath, 'utf8'));
  if (b.faviconId) faviconId = b.faviconId;
}

async function configureSettings() {
  console.log('--- APLICANDO AJUSTES GENERALES, LECTURA, DISCUSIÓN Y PERMALINKS ---');

  const settingsPayload = {
    // Paso 8: Ajustes Generales
    title: "Golazos",
    description: "Fútbol y Actualidad",
    site_icon: faviconId,

    // Paso 9: Ajustes de Lectura y Comentarios
    show_on_front: "posts",
    posts_per_page: 12,
    posts_per_rss: 12,
    rss_use_excerpt: 0,
    blog_public: 1,
    default_comment_status: "open",
    comment_moderation: 1,
    comment_previously_approved: 0,
    require_name_email: 1,
    comment_registration: 0,
    thread_comments: 0,
    page_comments: 0,
    show_avatars: 0,

    // Paso 10: Permalinks
    permalink_structure: "/%postname%/"
  };

  const res = await fetch(`${apiUrl}/settings`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(settingsPayload)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error aplicando ajustes: ${res.status} ${res.statusText} - ${err}`);
  }

  const result = await res.json();
  console.log('✅ Ajustes configurados con éxito:');
  console.log({
    title: result.title,
    description: result.description,
    site_icon: result.site_icon,
    posts_per_page: result.posts_per_page,
    permalink_structure: result.permalink_structure,
    show_avatars: result.show_avatars,
    thread_comments: result.thread_comments
  });
}

configureSettings().catch(err => {
  console.error('❌ Error en configureSettings:', err);
  process.exit(1);
});
