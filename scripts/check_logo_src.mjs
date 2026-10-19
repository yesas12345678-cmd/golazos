async function checkLogo() {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch('https://golazos.co/', { signal: AbortSignal.timeout(15000) });
      const html = await res.text();
      const m = html.match(/<img[^>]+custom-logo[^>]+>/i);
      console.log('Logo img tag:', m ? m[0] : 'None');
      return;
    } catch (e) {
      console.log(`Intento ${i+1} falló:`, e.message);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

checkLogo();
