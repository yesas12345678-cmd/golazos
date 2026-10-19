async function inspectHtml() {
  const res = await fetch('https://golazos.co/');
  const html = await res.text();
  
  // Header
  const header = html.match(/<header id="masthead"[\s\S]*?<\/header>/i)?.[0] || 'No header';
  console.log('=== HEADER HTML ===');
  console.log(header);

  // Footer
  const footer = html.match(/<footer id="colophon"[\s\S]*?<\/footer>/i)?.[0] || 'No footer';
  console.log('=== FOOTER HTML ===');
  console.log(footer);
}

inspectHtml();
