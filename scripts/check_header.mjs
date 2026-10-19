async function check() {
  const res = await fetch('https://golazos.co/');
  const html = await res.text();
  const idx1 = html.indexOf('<header');
  const idx2 = html.indexOf('</header>');
  if (idx1 !== -1 && idx2 !== -1) {
    console.log(html.slice(idx1, idx2 + 9));
  } else {
    console.log('No header found, search for logo:');
    const matches = html.match(/<img[^>]+logo[^>]+>/gi);
    console.log(matches);
  }
}

check();
