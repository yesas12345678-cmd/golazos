import { authHeader, apiUrl } from './loadEnv.mjs';

async function checkMenuLocations() {
  const base = apiUrl.replace('/wp/v2', '');
  // Check theme menu locations
  const res = await fetch(`${apiUrl}/menu-locations`, { headers: { 'Authorization': authHeader } });
  console.log('Menu locations status:', res.status);
  if (res.ok) {
    const locs = await res.json();
    console.log('Theme menu locations:', locs);
  }

  // Check menus
  const resMenus = await fetch(`${apiUrl}/menus`, { headers: { 'Authorization': authHeader } });
  if (resMenus.ok) {
    const menus = await resMenus.json();
    console.log('Menus:', menus.map(m => ({ id: m.id, name: m.name, slug: m.slug, locations: m.locations })));
  }
}

checkMenuLocations();
