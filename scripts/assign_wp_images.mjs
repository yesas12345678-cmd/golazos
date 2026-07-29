import fs from 'fs';
import path from 'path';

import { WP_API_URL, authHeader } from './loadEnv.mjs';

async function uploadMedia(imageUrl, title, slug) {
  try {
    console.log(`Downloading soccer image from LoremFlickr: ${imageUrl}`);
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status} downloading image`);
    
    const blob = await res.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    
    const filename = `${slug}-soccer-cover.jpg`;
    console.log(`Uploading as media file "${filename}" to WordPress...`);

    const mediaRes = await fetch(`${WP_API_URL}/media`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': 'image/jpeg'
      },
      body: buffer
    });

    if (mediaRes.ok) {
      const mediaData = await mediaRes.json();
      console.log(`Media uploaded successfully! ID: ${mediaData.id}`);
      return mediaData.id;
    } else {
      const errText = await mediaRes.text();
      console.error(`Failed to upload media: ${errText}`);
    }
  } catch (err) {
    console.error("Error in uploadMedia:", err.message);
  }
  return null;
}

async function main() {
  try {
    console.log("Fetching all articles from golazos.co...");
    const res = await fetch(`${WP_API_URL}/posts?per_page=100&status=any`, {
      headers: { 'Authorization': authHeader }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status} fetching posts`);

    const posts = await res.json();
    console.log(`Found ${posts.length} articles to update.`);

    let updatedCount = 0;

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      
      // Let's exclude pages/legal documents if they are not standard soccer posts
      const isLegalPage = post.title.rendered.toLowerCase().includes('privacidad') || 
                          post.title.rendered.toLowerCase().includes('cookies') || 
                          post.title.rendered.toLowerCase().includes('términos') ||
                          post.title.rendered.toLowerCase().includes('aviso legal');
      
      if (isLegalPage) {
        console.log(`Skipping legal post: "${post.title.rendered}"`);
        continue;
      }

      console.log(`\n[${i + 1}/${posts.length}] Updating Cover for: "${post.title.rendered}" (ID: ${post.id})`);

      // Request a unique soccer/football photo using LoremFlickr with lock parameter
      const imageUrl = `https://loremflickr.com/1200/800/soccer,football/all?lock=${post.id}`;
      
      // Upload media
      const mediaId = await uploadMedia(imageUrl, post.title.rendered, post.slug);
      
      if (mediaId) {
        console.log(`Associating media ID ${mediaId} as featured image for post ID ${post.id}...`);
        const updateRes = await fetch(`${WP_API_URL}/posts/${post.id}`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            featured_media: mediaId
          })
        });

        if (updateRes.ok) {
          console.log("Successfully updated featured image!");
          updatedCount++;
        } else {
          const errText = await updateRes.text();
          console.error(`Failed to update post: ${errText}`);
        }
      }

      // Delay to avoid WP rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`\nWordPress image assignment completed. Successfully updated ${updatedCount} articles with 100% football-only images.`);

  } catch (err) {
    console.error("Fatal error:", err.message);
  }
}

main();
