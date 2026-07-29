import { WP_API_URL, authHeader } from './loadEnv.mjs';

async function deletePost(id) {
  try {
    const res = await fetch(`${WP_API_URL}/posts/${id}?force=true`, {
      method: 'DELETE',
      headers: { 'Authorization': authHeader }
    });
    if (res.ok) {
      console.log(`Deleted post ID: ${id}`);
      return true;
    } else {
      const text = await res.text();
      console.error(`Failed to delete post ID ${id}: ${text}`);
    }
  } catch (err) {
    console.error(`Error deleting post ID ${id}:`, err.message);
  }
  return false;
}

async function main() {
  try {
    console.log("Fetching all posts from golazos.co...");
    const res = await fetch(`${WP_API_URL}/posts?per_page=100&status=any`, {
      headers: { 'Authorization': authHeader }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status} fetching posts`);

    const posts = await res.json();
    console.log(`Found ${posts.length} posts to delete.`);

    for (const post of posts) {
      await deletePost(post.id);
      // Brief delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log("All posts deleted successfully!");

  } catch (err) {
    console.error("Fatal error:", err.message);
  }
}

main();
