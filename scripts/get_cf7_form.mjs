import { authHeader, apiUrl } from './loadEnv.mjs';

async function getCF7() {
  const base = apiUrl.replace('/wp/v2', '');
  try {
    const res = await fetch(`${base}/contact-form-7/v1/contact-forms`, {
      headers: { 'Authorization': authHeader }
    });
    console.log('CF7 REST status:', res.status);
    if (res.ok) {
      const forms = await res.json();
      console.log('CF7 forms:', forms);
      return forms[0]?.id;
    }
  } catch (e) {
    console.log('CF7 error:', e.message);
  }
}

getCF7();
