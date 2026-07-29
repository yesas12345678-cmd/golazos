async function main() {
  const url = 'https://unsplash.com/s/photos/soccer';
  console.log(`Fetching ${url} to extract soccer photo IDs...`);
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    
    // Regex to match Unsplash photo IDs
    // Example: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2"
    const regex = /https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9-]+)/g;
    const matches = new Set();
    let match;
    
    while ((match = regex.exec(html)) !== null) {
      // Extract the photo ID part (it's between photo- and the next query param or character)
      const fullId = match[1].split('?')[0];
      if (fullId && fullId.length > 5) {
        matches.add(fullId);
      }
    }

    const ids = Array.from(matches);
    console.log(`Found ${ids.length} unique Unsplash photo IDs:`);
    console.log(JSON.stringify(ids, null, 2));

  } catch (err) {
    console.error("Failed to fetch soccer photos:", err.message);
  }
}

main();
