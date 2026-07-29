import fs from 'fs';
import path from 'path';

import { WP_API_URL, authHeader, DEEPSEEK_API_KEY } from './loadEnv.mjs';

// Category mapping helper
const CAT_WP_TO_KEY = {
  2: 'resultados',
  3: 'estadísticas',
  4: 'lesiones',
  5: 'selecciones'
};

async function main() {
  try {
    const templatePath = path.resolve('template_general.md');
    if (!fs.existsSync(templatePath)) {
      console.error("Error: template_general.md not found.");
      process.exit(1);
    }
    const templateText = fs.readFileSync(templatePath, 'utf8');

    // Parse limit argument
    let limitVal = null;
    const limitArg = process.argv.find(arg => arg.startsWith('--limit='));
    if (limitArg) {
      limitVal = parseInt(limitArg.split('=')[1], 10);
    }

    console.log("Fetching all articles from golazos.co...");
    const res = await fetch(`${WP_API_URL}/posts?per_page=100&status=any`, {
      headers: { 'Authorization': authHeader }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status} fetching posts`);

    const posts = await res.json();
    
    // Filter posts that are empty (0 words in content)
    const emptyPosts = posts.filter(post => {
      // Exclude pages/legal docs
      const isLegalPage = post.title.rendered.toLowerCase().includes('privacidad') || 
                          post.title.rendered.toLowerCase().includes('cookies') || 
                          post.title.rendered.toLowerCase().includes('términos') ||
                          post.title.rendered.toLowerCase().includes('aviso legal');
      if (isLegalPage) return false;

      const cleanText = (post.content.rendered || '').replace(/<[^>]*>/g, ' ');
      const wordCount = cleanText.trim().split(/\s+/).filter(w => w.length > 0).length;
      return wordCount === 0;
    });

    console.log(`Found ${emptyPosts.length} empty posts (Limit: ${limitVal || 'None'}).`);

    const postsToProcess = limitVal ? emptyPosts.slice(0, limitVal) : emptyPosts;

    for (let i = 0; i < postsToProcess.length; i++) {
      const post = postsToProcess[i];
      console.log(`\n[${i + 1}/${postsToProcess.length}] Generating content for: "${post.title.rendered}" (ID: ${post.id})`);

      // Extract metadata from post
      const catId = post.categories?.[0];
      const catName = CAT_WP_TO_KEY[catId] || 'resultados';
      const keyword = post.meta?.rank_math_focus_keyword || '';

      // Prepare prompt
      let promptText = templateText;
      promptText = promptText.replace('[INSERTAR NICHO O SECTOR AQUÍ]', `Fútbol e Información del Mundial de la FIFA 2026 - Categoría: ${catName}`);
      promptText = promptText.replace('[INSERTAR TÍTULO AQUÍ]', post.title.rendered);
      promptText = promptText.replace('[INSERTAR KEYWORDS AQUÍ]', keyword);
      promptText = promptText.replace('[OPCIONAL: INSERTAR DETALLES ADICIONALES]', `Detalles: Artículo periodístico deportivo optimizado para el Mundial de Fútbol 2026.`);

      let parsed = null;
      let attempt = 0;
      const maxAttempts = 3;

      while (attempt < maxAttempts) {
        attempt++;
        try {
          console.log(`Calling DeepSeek API (Attempt ${attempt}/${maxAttempts})...`);
          const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages: [
                {
                  role: 'system',
                  content: 'Eres un redactor experto en SEO, redacción deportiva y EEAT. Debes responder únicamente con el objeto JSON solicitado, sin explicaciones ni markdown que lo envuelva. Tu artículo debe ser extremadamente detallado y tener obligatoriamente entre 2000 y 2500 palabras de texto legible (excluyendo etiquetas HTML).'
                },
                {
                  role: 'user',
                  content: promptText
                }
              ],
              response_format: { type: 'json_object' }
            })
          });

          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`HTTP ${response.status} - ${errText}`);
          }

          const data = await response.json();
          const rawContent = data.choices[0].message.content.trim();
          
          let cleaned = rawContent;
          if (cleaned.startsWith('```')) {
            cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
          }

          parsed = JSON.parse(cleaned);
          
          if (!parsed.content || !parsed.meta_title || !parsed.meta_description) {
            throw new Error("Missing required JSON fields in API response.");
          }

          const textOnly = parsed.content.replace(/<[^>]*>/g, ' ');
          const wordCount = textOnly.trim().split(/\s+/).filter(w => w.length > 0).length;
          console.log(`Generated body word count: ${wordCount} words.`);
          break;

        } catch (err) {
          console.error(`Attempt ${attempt} failed:`, err.message);
          if (attempt >= maxAttempts) {
            console.error(`Failed to generate content for post ID ${post.id}.`);
          }
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }

      if (parsed) {
        console.log(`Updating WordPress post ID ${post.id} with generated content...`);

        // Format HTML content to display nicely in standard block theme
        // Embed the cover image and middle image dynamically inside the content
        let inlineImageHtml = '';
        if (post.featured_media && post.featured_media !== 0) {
          // Fetch featured image URL to use inside the content too
          try {
            const mediaRes = await fetch(`${WP_API_URL}/media/${post.featured_media}`, {
              headers: { 'Authorization': authHeader }
            });
            if (mediaRes.ok) {
              const mediaData = await mediaRes.json();
              const imageUrl = mediaData.source_url;
              inlineImageHtml = `
<div class='my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-white p-2 max-w-2xl mx-auto'>
  <img src='${imageUrl}' alt='Análisis visual en el terreno de juego' class='w-full h-auto rounded-xl object-cover max-h-[450px]' />
  <p class='text-xs text-slate-500 font-sans italic text-center mt-2'>Análisis visual y telemetría táctica de las jugadas en el terreno de juego.</p>
</div>
`;
            }
          } catch (e) {
            console.warn("Could not fetch media details for inline image:", e.message);
          }
        }

        let finalContent = parsed.content || '';
        if (finalContent && inlineImageHtml) {
          const paragraphSplit = finalContent.split('</p>');
          if (paragraphSplit.length >= 4) {
            const middleIndex = Math.floor(paragraphSplit.length / 2);
            paragraphSplit[middleIndex] = paragraphSplit[middleIndex] + inlineImageHtml;
            finalContent = paragraphSplit.join('</p>');
          } else {
            finalContent += inlineImageHtml;
          }
        }

        const updateRes = await fetch(`${WP_API_URL}/posts/${post.id}`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: finalContent,
            excerpt: parsed.excerpt || '',
            meta: {
              rank_math_title: parsed.meta_title,
              rank_math_description: parsed.meta_description
            }
          })
        });

        if (updateRes.ok) {
          console.log(`Successfully filled content for article ID ${post.id}!`);
        } else {
          const errText = await updateRes.text();
          console.error(`Failed to update post content: ${errText}`);
        }
      }

      // Delay to avoid WP rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log("WordPress articles content generation completed successfully!");

  } catch (err) {
    console.error("Fatal error:", err.message);
  }
}

main();
