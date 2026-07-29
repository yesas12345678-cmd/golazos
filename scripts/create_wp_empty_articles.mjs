import fs from 'fs';
import path from 'path';

import { WP_API_URL, authHeader, DEEPSEEK_API_KEY } from './loadEnv.mjs';
let deepseekApiKey = DEEPSEEK_API_KEY;

// Category mapping to WordPress IDs
const CATEGORIES_WP_MAP = {
  resultados: 2,
  estadisticas: 3,
  lesiones: 4,
  selecciones: 5
};

async function generateEmptyArticles() {
  console.log("Calling DeepSeek API to generate 50 SEO-optimized empty articles metadata...");
  try {
    const prompt = `
Genera un array JSON con exactamente 50 objetos. Cada objeto debe representar un artículo único sobre el Mundial de Fútbol de la FIFA 2026 (nicho: noticias, selecciones, resultados, estadísticas y lesiones) y contener los siguientes campos exactos:
- "title": Título optimizado para SEO, atractivo pero serio, sin emojis.
- "meta_title": Metatítulo SEO de 50-60 caracteres, sin emojis.
- "meta_description": Metadescripción SEO de 140-160 caracteres, sin emojis.
- "slug": URL slug amigable (ej: "alemania-paraguay-cronica-mundial").
- "excerpt": Extracto breve de 2-3 líneas para la tarjeta de previsualización, sin emojis.
- "keyword": Palabra clave principal única para este artículo (no debe repetirse ninguna entre los 50 artículos).
- "category": Uno de los siguientes valores exactos: "resultados", "lesiones", "estadisticas", "selecciones".

Asegúrate de que la distribución de categorías sea equilibrada (aproximadamente 12-13 de cada una). Devuelve solo el JSON válido sin envoltorios de código ni explicaciones.
`;

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepseekApiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'Eres un estratega de contenido SEO experto. Responde únicamente con el array JSON solicitado.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`DeepSeek API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    let cleaned = data.choices[0].message.content.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
    }

    // DeepSeek response format might have a top-level key or be a direct array
    let parsed = JSON.parse(cleaned);
    let articles = [];
    if (Array.isArray(parsed)) {
      articles = parsed;
    } else if (parsed.articles && Array.isArray(parsed.articles)) {
      articles = parsed.articles;
    } else {
      // Find any array in the object
      const key = Object.keys(parsed).find(k => Array.isArray(parsed[k]));
      if (key) articles = parsed[key];
    }

    if (articles.length !== 50) {
      console.warn(`Warning: DeepSeek returned ${articles.length} articles instead of 50. Adjusting...`);
    }

    return articles.slice(0, 50);
  } catch (err) {
    console.error("Failed to generate articles from DeepSeek:", err.message);
    process.exit(1);
  }
}

async function main() {
  const rawArticles = await generateEmptyArticles();
  console.log(`Successfully generated metadata for ${rawArticles.length} articles.`);

  // 1. Group articles by category to interleave them and avoid consecutive duplicates
  const groups = { resultados: [], lesiones: [], estadisticas: [], selecciones: [] };
  for (const art of rawArticles) {
    const cat = art.category || 'resultados';
    if (groups[cat]) {
      groups[cat].push(art);
    } else {
      groups['resultados'].push(art);
    }
  }

  // Interleave
  const interleaved = [];
  const keys = Object.keys(groups);
  let lastCategory = null;

  for (let i = 0; i < 50; i++) {
    // Find a category with remaining items that is different from lastCategory
    let chosenKey = keys.find(k => groups[k].length > 0 && k !== lastCategory);
    if (!chosenKey) {
      // Fallback
      chosenKey = keys.find(k => groups[k].length > 0);
    }
    if (chosenKey) {
      const art = groups[chosenKey].pop();
      interleaved.push(art);
      lastCategory = chosenKey;
    }
  }

  // 2. Publish to WordPress with historical dates (last 50 days, 1 article per day)
  const today = new Date();
  console.log(`Publishing ${interleaved.length} interleaved empty articles to WordPress...`);

  for (let i = 0; i < interleaved.length; i++) {
    const article = interleaved[i];
    
    // Date calculation: i days ago from 50 days ago (meaning day 50 is yesterday/today)
    const daysAgo = 50 - i;
    const dateObj = new Date(today.getTime());
    dateObj.setDate(today.getDate() - daysAgo);

    // Random hour between 09:00 and 20:00
    const hour = Math.floor(Math.random() * (20 - 9 + 1)) + 9;
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);
    dateObj.setHours(hour, minute, second);

    const isoString = dateObj.toISOString().slice(0, 19); // YYYY-MM-DDTHH:MM:SS

    const categoryId = CATEGORIES_WP_MAP[article.category] || 2; // Default to Resultados (2)

    console.log(`[${i + 1}/50] Publishing: "${article.title}" | Category: ${article.category} (${categoryId}) | Date: ${isoString}`);

    const postData = {
      title: article.title,
      slug: article.slug,
      status: 'publish',
      date: isoString,
      excerpt: article.excerpt,
      content: '', // 0 words in the body initially
      categories: [categoryId],
      meta: {
        rank_math_focus_keyword: article.keyword,
        rank_math_title: article.meta_title || article.title,
        rank_math_description: article.meta_description || article.excerpt
      }
    };

    try {
      const res = await fetch(`${WP_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (res.ok) {
        const data = await res.json();
        console.log(`Successfully published! Post ID: ${data.id}`);
      } else {
        const errText = await res.text();
        console.error(`Failed to publish post: ${errText}`);
      }
    } catch (err) {
      console.error(`Network error:`, err.message);
    }

    // Delay to avoid WP rate limits
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  console.log("All 50 articles seeded on WordPress successfully!");
}

main();
