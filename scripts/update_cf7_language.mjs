import './loadEnv.mjs';
import { authHeader } from './loadEnv.mjs';

async function updateFormLanguage() {
  const spanishFormContent = `<label> Tu nombre (obligatorio)
    [text* your-name autocomplete:name] </label>

<label> Tu correo electrónico (obligatorio)
    [email* your-email autocomplete:email] </label>

<label> Asunto
    [text* your-subject] </label>

<label> Tu mensaje (opcional)
    [textarea your-message] </label>

[submit "Enviar mensaje"]`;

  // Check what payload CF7 expects for updating form template
  const res = await fetch('https://golazos.co/wp-json/contact-form-7/v1/contact-forms/9', {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'Formulario de Contacto',
      locale: 'es_ES',
      form: spanishFormContent
    })
  });

  console.log('Update status:', res.status);
  const data = await res.json();
  console.log('Form 9 updated content:');
  console.log(data.properties?.form?.content);

  // Check the public /contactanos/ page
  console.log('\nComprobando página pública /contactanos/...');
  const pageRes = await fetch('https://golazos.co/contactanos/');
  const pageHtml = await pageRes.text();
  const hasSpanish = pageHtml.includes('Tu nombre') || pageHtml.includes('Tu correo electrónico');
  const hasEnglish = pageHtml.includes('Your name') || pageHtml.includes('Your email');
  console.log('¿Contiene español (Tu nombre)?', hasSpanish);
  console.log('¿Contiene inglés (Your name)?', hasEnglish);
}

updateFormLanguage().catch(console.error);
