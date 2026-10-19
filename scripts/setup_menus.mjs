import { authHeader, apiUrl } from './loadEnv.mjs';

async function setupMenus() {
  console.log('--- CONFIGURANDO MENÚS VIA REST API ---');

  // 1. Crear Menú Header
  console.log('Creando Menú Header...');
  const headerRes = await fetch(`${apiUrl}/menus`, {
    method: 'POST',
    headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Header',
      slug: 'header',
      locations: ['primary']
    })
  });
  const headerMenu = await headerRes.json();
  console.log(`Header Menu ID: ${headerMenu.id}`);

  // Items para Header
  const headerItems = [
    { title: 'Grandes Torneos', type: 'taxonomy', object: 'category', object_id: 4, order: 1 },
    { title: 'Táctica y Estrategia', type: 'taxonomy', object: 'category', object_id: 5, order: 2 },
    { title: 'Entrenamiento y Rendimiento', type: 'taxonomy', object: 'category', object_id: 6, order: 3 },
    { title: 'Reglamento y Arbitraje', type: 'taxonomy', object: 'category', object_id: 7, order: 4 },
    { title: 'Contáctanos', type: 'post_type', object: 'page', object_id: 13, order: 5 }
  ];

  for (const item of headerItems) {
    const itemRes = await fetch(`${apiUrl}/menu-items`, {
      method: 'POST',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        menus: headerMenu.id,
        title: item.title,
        type: item.type,
        object: item.object,
        object_id: item.object_id,
        menu_order: item.order,
        status: 'publish'
      })
    });
    const data = await itemRes.json();
    console.log(`  Item añadido: ${item.title} (ID: ${data.id})`);
  }

  // 2. Crear Menú Footer
  console.log('Creando Menú Footer...');
  const footerRes = await fetch(`${apiUrl}/menus`, {
    method: 'POST',
    headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Footer',
      slug: 'footer',
      locations: ['footer']
    })
  });
  const footerMenu = await footerRes.json();
  console.log(`Footer Menu ID: ${footerMenu.id}`);

  // Items para Footer en orden riguroso
  const footerPages = [
    { title: 'Sobre Nosotros', id: 11, order: 1 },
    { title: 'Manuel López Ramos', id: 12, order: 2 },
    { title: 'Contáctanos', id: 13, order: 3 },
    { title: 'Política de Privacidad', id: 14, order: 4 },
    { title: 'Política de Cookies', id: 15, order: 5 },
    { title: 'Aviso Legal', id: 16, order: 6 },
    { title: 'Términos y Condiciones', id: 17, order: 7 }
  ];

  for (const page of footerPages) {
    const itemRes = await fetch(`${apiUrl}/menu-items`, {
      method: 'POST',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        menus: footerMenu.id,
        title: page.title,
        type: 'post_type',
        object: 'page',
        object_id: page.id,
        menu_order: page.order,
        status: 'publish'
      })
    });
    const data = await itemRes.json();
    console.log(`  Item añadido: ${page.title} (ID: ${data.id})`);
  }

  console.log('✅ Menús Header y Footer creados y asignados.');
}

setupMenus().catch(err => {
  console.error('❌ Error configurando menús:', err);
  process.exit(1);
});
