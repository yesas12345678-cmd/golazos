import { authHeader, apiUrl } from './loadEnv.mjs';

async function del() {
  const res = await fetch(`${apiUrl}/plugins/hello?force=true`, {
    method: 'DELETE',
    headers: { 'Authorization': authHeader }
  });
  console.log('Delete hello dolly:', res.status);
}

del();
