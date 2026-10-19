import { authHeader, apiUrl } from './loadEnv.mjs';

async function checkMenus() {
  const res = await fetch(`${apiUrl}/menus`, { headers: { 'Authorization': authHeader } });
  console.log('Menus REST status:', res.status);
  if (res.ok) {
    const data = await res.json();
    console.log('Menus:', data);
  }
}

checkMenus();
