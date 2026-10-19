import { authHeader, apiUrl } from './loadEnv.mjs';

async function activateAkismetAndTheme() {
  // 1. Activate akismet
  const resPlugins = await fetch(`${apiUrl}/plugins`, { headers: { 'Authorization': authHeader } });
  const allPlugins = await resPlugins.json();
  console.log('Plugins instalados:', allPlugins.map(p => ({ plugin: p.plugin, status: p.status })));

  const akismet = allPlugins.find(p => p.plugin.includes('akismet'));
  if (akismet && akismet.status !== 'active') {
    const actRes = await fetch(`${apiUrl}/plugins/${akismet.plugin}`, {
      method: 'POST',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'active' })
    });
    console.log(`Akismet activation: ${actRes.status}`);
  }

  // 2. Try theme kadence install via REST
  try {
    const themeRes = await fetch(`${apiUrl}/themes`, {
      method: 'POST',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: 'kadence', status: 'active' })
    });
    console.log(`Theme kadence install REST: ${themeRes.status}`);
    const text = await themeRes.text();
    console.log(`Theme response: ${text.slice(0, 200)}`);
  } catch (e) {
    console.log('Theme REST error:', e.message);
  }
}

activateAkismetAndTheme();
