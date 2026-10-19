async function checkFrontend() {
  const res = await fetch('https://golazos.co/');
  console.log('Homepage HTTP status:', res.status);
  const html = await res.text();
  console.log('Title found:', html.match(/<title>(.*?)<\/title>/i)?.[1]);
  console.log('Has logo:', html.includes('golazos-logo.png'));
  console.log('Has favicon:', html.includes('golazos-favicon.png'));
  console.log('Has header menu:', html.includes('Grandes Torneos') && html.includes('Táctica y Estrategia'));
  console.log('Has footer legal pages:', html.includes('Sobre Nosotros') && html.includes('Aviso Legal'));
}

checkFrontend();
