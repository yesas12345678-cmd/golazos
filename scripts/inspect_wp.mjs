import { authHeader, apiUrl } from './loadEnv.mjs';

async function inspect() {
  console.log('--- INSPECCIONANDO ESTADO ACTUAL DE WORDPRESS ---');
  
  // Themes
  try {
    const resThemes = await fetch(`${apiUrl}/themes`, { headers: { 'Authorization': authHeader } });
    if (resThemes.ok) {
      const themes = await resThemes.json();
      console.log('Temas activos:', themes.filter(t => t.status === 'active').map(t => `${t.name} (${t.theme_root || t.stylesheet})`));
    } else {
      console.log('Themes endpoint status:', resThemes.status);
    }
  } catch (e) { console.log('Error themes:', e.message); }

  // Settings
  try {
    const resSet = await fetch(`${apiUrl}/settings`, { headers: { 'Authorization': authHeader } });
    if (resSet.ok) {
      const set = await resSet.json();
      console.log('Ajustes:', { title: set.title, description: set.description, permalink_structure: set.permalink_structure, site_icon: set.site_icon });
    }
  } catch (e) { console.log('Error settings:', e.message); }

  // Categories
  try {
    const resCat = await fetch(`${apiUrl}/categories?per_page=100`, { headers: { 'Authorization': authHeader } });
    if (resCat.ok) {
      const cats = await resCat.json();
      console.log('Categorías existentes:', cats.map(c => ({ id: c.id, name: c.name, slug: c.slug, count: c.count })));
    }
  } catch (e) { console.log('Error categories:', e.message); }

  // Pages
  try {
    const resPages = await fetch(`${apiUrl}/pages?per_page=100`, { headers: { 'Authorization': authHeader } });
    if (resPages.ok) {
      const pages = await resPages.json();
      console.log('Páginas existentes:', pages.map(p => ({ id: p.id, title: p.title.rendered, slug: p.slug, status: p.status })));
    }
  } catch (e) { console.log('Error pages:', e.message); }

  // Posts
  try {
    const resPosts = await fetch(`${apiUrl}/posts?per_page=10`, { headers: { 'Authorization': authHeader } });
    if (resPosts.ok) {
      const posts = await resPosts.json();
      console.log('Posts existentes (total primeros 10):', posts.map(p => ({ id: p.id, title: p.title.rendered, date: p.date })));
    }
  } catch (e) { console.log('Error posts:', e.message); }

  // Users
  try {
    const resUsers = await fetch(`${apiUrl}/users?per_page=100`, { headers: { 'Authorization': authHeader } });
    if (resUsers.ok) {
      const users = await resUsers.json();
      console.log('Usuarios existentes:', users.map(u => ({ id: u.id, name: u.name, slug: u.slug })));
    }
  } catch (e) { console.log('Error users:', e.message); }
}

inspect();
