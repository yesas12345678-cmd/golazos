async function printSections() {
  const res = await fetch('https://golazos.co/');
  const html = await res.text();
  
  // Extract header
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
  console.log('--- HEADER ---');
  console.log(headerMatch ? headerMatch[0].slice(0, 1000) : 'No header tag');
  
  // Extract footer
  const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
  console.log('--- FOOTER ---');
  console.log(footerMatch ? footerMatch[0].slice(0, 1000) : 'No footer tag');

  // Favicon check
  const iconMatch = html.match(/<link rel="(icon|shortcut icon|apple-touch-icon)"[\s\S]*?>/gi);
  console.log('--- ICONS ---', iconMatch);
}

printSections();
