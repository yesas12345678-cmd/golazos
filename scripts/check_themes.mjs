import { authHeader, apiUrl } from './loadEnv.mjs';

async function check() {
  const res = await fetch(`${apiUrl}/themes`, { headers: { 'Authorization': authHeader } });
  const data = await res.json();
  console.log('Temas instalados:', data.map(t => ({
    theme: t.stylesheet,
    name: t.name,
    status: t.status
  })));
}

check();
