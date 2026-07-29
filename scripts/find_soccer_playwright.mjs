import { chromium } from 'playwright';

async function main() {
  console.log("Launching Playwright Chromium...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log("Navigating to Unsplash soccer photos page...");
    await page.goto('https://unsplash.com/s/photos/soccer', { timeout: 60000 });
    await page.waitForTimeout(5000);

    console.log("Extracting photo IDs from image sources...");
    const photoIds = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const ids = new Set();
      
      for (const img of imgs) {
        const src = img.src || '';
        const match = src.match(/images\.unsplash\.com\/photo-([a-zA-Z0-9-]+)/);
        if (match) {
          const id = match[1].split('?')[0];
          if (id && id.length > 5) {
            ids.add(id);
          }
        }
      }
      return Array.from(ids);
    });

    console.log(`Found ${photoIds.length} soccer photo IDs:`);
    console.log(JSON.stringify(photoIds, null, 2));

  } catch (err) {
    console.error("Playwright extraction failed:", err);
  } finally {
    await browser.close();
  }
}

main();
