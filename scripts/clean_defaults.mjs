import { authHeader, apiUrl } from './loadEnv.mjs';

async function cleanDefaults() {
  console.log('--- PURGANDO CONTENIDOS DE MUESTRA ---');
  
  // Purgar post 1
  try {
    const resPost = await fetch(`${apiUrl}/posts/1?force=true`, {
      method: 'DELETE',
      headers: { 'Authorization': authHeader }
    });
    console.log(`Eliminación post 1 ("Hello world!"): status ${resPost.status}`);
  } catch (e) {
    console.warn(`Error eliminando post 1:`, e.message);
  }

  // Purgar page 2
  try {
    const resPage = await fetch(`${apiUrl}/pages/2?force=true`, {
      method: 'DELETE',
      headers: { 'Authorization': authHeader }
    });
    console.log(`Eliminación page 2 ("Sample Page"): status ${resPage.status}`);
  } catch (e) {
    console.warn(`Error eliminando page 2:`, e.message);
  }
}

cleanDefaults();
