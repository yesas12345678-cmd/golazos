import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authHeader, apiUrl } from './loadEnv.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createAuthor() {
  console.log('--- CREANDO / VERIFICANDO USUARIO AUTOR EDITORIAL (MANUEL LÓPEZ) ---');

  // Verificar si ya existe
  const checkRes = await fetch(`${apiUrl}/users?search=manuellopez`, {
    headers: { 'Authorization': authHeader }
  });
  const existingUsers = await checkRes.json();
  let authorId;

  const found = existingUsers.find(u => u.slug === 'manuellopez' || u.username === 'manuellopez');
  if (found) {
    authorId = found.id;
    console.log(`Usuario Manuel López ya existente con ID: ${authorId}`);
  } else {
    console.log('Creando usuario manuellopez...');
    const createRes = await fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: "manuellopez",
        name: "Manuel López",
        first_name: "Manuel",
        last_name: "López",
        email: "yesas12345678@gmail.com",
        password: "Manuel1214$Manuel",
        roles: ["administrator"]
      })
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      throw new Error(`Error al crear usuario autor: ${createRes.status} - ${err}`);
    }

    const newUser = await createRes.json();
    authorId = newUser.id;
    console.log(`Usuario Manuel López creado con ID: ${authorId}`);
  }

  fs.writeFileSync(path.resolve(__dirname, '../data_author.json'), JSON.stringify({ authorId, name: 'Manuel López', slug: 'manuellopez' }, null, 2));
  console.log(`✅ Autor oficial configurado con ID: ${authorId}`);
}

createAuthor().catch(err => {
  console.error('❌ Error en createAuthor:', err);
  process.exit(1);
});
