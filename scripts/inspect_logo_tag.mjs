async function checkLogoTag() {
  const res = await fetch('https://golazos.co/');
  const html = await res.text();
  const brand = html.match(/<a class="brand"[\s\S]*?<\/a>/i)?.[0];
  console.log('Brand HTML:', brand);
  
  // Also check inline styles for logo
  const logoStyles = html.match(/\.custom-logo[\s\S]*?\}/gi);
  console.log('Logo styles:', logoStyles);
}

checkLogoTag();
