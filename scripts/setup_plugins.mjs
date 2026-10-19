import { authHeader, apiUrl } from './loadEnv.mjs';

async function testPlugins() {
  const plugins = ['akismet', 'ad-inserter', 'google-site-kit', 'wordpress-seo', 'contact-form-7'];
  
  for (const slug of plugins) {
    try {
      const res = await fetch(`${apiUrl}/plugins`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slug, status: 'active' })
      });
      console.log(`Plugin ${slug}: ${res.status}`);
      if (!res.ok) {
        const text = await res.text();
        console.log(`  Response: ${text.slice(0, 150)}`);
      }
    } catch (e) {
      console.log(`Error plugin ${slug}:`, e.message);
    }
  }

  // Delete hello dolly
  try {
    const delRes = await fetch(`${apiUrl}/plugins/hello-dolly/hello?force=true`, {
      method: 'DELETE',
      headers: { 'Authorization': authHeader }
    });
    console.log(`Delete hello dolly: ${delRes.status}`);
  } catch (e) {}
}

testPlugins();
