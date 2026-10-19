import { authHeader, apiUrl } from './loadEnv.mjs';

async function verify() {
  console.log(`Comprobando conexión con ${apiUrl}/users/me ...`);
  const res = await fetch(`${apiUrl}/users/me`, {
    headers: { 'Authorization': authHeader },
    signal: AbortSignal.timeout(10000)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Fallo de autenticación en WordPress REST API: ${res.status} ${res.statusText} - ${errorText}`);
  }

  const user = await res.json();
  console.log(`✅ Conexión exitosa. Usuario autenticado: ${user.name} (ID: ${user.id}, Roles: ${user.roles?.join(', ') || 'N/A'})`);
}

verify().catch(err => {
  console.error(`❌ Error en verify_connection:`, err.message);
  process.exit(1);
});
