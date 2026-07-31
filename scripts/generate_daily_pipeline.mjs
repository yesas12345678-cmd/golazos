import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { WP_API_URL, authHeader, DEEPSEEK_API_KEY, UNSPLASH_ACCESS_KEY } from './loadEnv.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Category mapping to WordPress IDs
const CATEGORIES_WP_MAP = {
  resultados: 2,
  estadisticas: 3,
  lesiones: 4,
  selecciones: 5
};

const DAILY_SCHEDULE = [
  { time: '08:00:00', type: 'Guía Definitiva / Pilar (2200 - 3000 palabras)', num: 1 },
  { time: '11:00:00', type: 'Tutorial Paso a Paso / "Cómo hacer" (2200 - 3000 palabras)', num: 2 },
  { time: '14:00:00', type: 'Comparativa / Lista Recomendada (Listicle) (2200 - 3000 palabras)', num: 3 },
  { time: '17:00:00', type: 'Caso Práctico / Resolución de Problema (2200 - 3000 palabras)', num: 4 },
  { time: '20:00:00', type: 'Tendencias / Preguntas Frecuentes (2200 - 3000 palabras)', num: 5 }
];

// Helper to query Unsplash API or fallback to LoremFlickr
async function fetchUnsplashImage(query, isFeatured = false) {
  if (!UNSPLASH_ACCESS_KEY) {
    console.log(`[Unsplash] UNSPLASH_ACCESS_KEY not configured. Using LoremFlickr fallback for: "${query}"`);
    const width = isFeatured ? 1200 : 800;
    const height = isFeatured ? 800 : 600;
    const lock = Math.floor(Math.random() * 1000000);
    return `https://loremflickr.com/${width}/${height}/soccer,football,stadium/all?lock=${lock}`;
  }

  try {
    const searchTerms = `${query} soccer football`.trim();
    console.log(`[Unsplash] Fetching image for search: "${searchTerms}"`);
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerms)}&per_page=15`, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        // Pick a random image from top results to avoid repeating
        const randomIndex = Math.floor(Math.random() * Math.min(10, data.results.length));
        const photo = data.results[randomIndex];
        const rawUrl = photo.urls.raw;
        const width = isFeatured ? 1200 : 800;
        const height = isFeatured ? 800 : 600;
        const optimizedUrl = `${rawUrl}&auto=format&fit=crop&q=80&w=${width}&h=${height}`;
        console.log(`[Unsplash] Selected image ID ${photo.id} by ${photo.user?.name || 'unknown'}`);
        return optimizedUrl;
      } else {
        console.warn(`[Unsplash] No results found for query "${searchTerms}". Falling back...`);
      }
    } else {
      console.warn(`[Unsplash] API error: HTTP ${res.status}`);
    }
  } catch (err) {
    console.error(`[Unsplash] Request failed:`, err.message);
  }

  // Final fallback
  const width = isFeatured ? 1200 : 800;
  const height = isFeatured ? 800 : 600;
  const lock = Math.floor(Math.random() * 1000000);
  return `https://loremflickr.com/${width}/${height}/soccer,football,stadium/all?lock=${lock}`;
}

// Helper to get or create tag IDs in WordPress
async function getOrCreateTagIds(tagNames) {
  if (!tagNames || tagNames.length === 0) return [];
  const tagIds = [];
  
  for (const name of tagNames) {
    try {
      const trimmedName = name.trim();
      if (!trimmedName) continue;

      console.log(`[Tags] Resolving tag: "${trimmedName}"...`);
      const res = await fetch(`${WP_API_URL}/tags`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: trimmedName })
      });

      if (res.ok) {
        const data = await res.json();
        console.log(`[Tags] Created new tag: "${trimmedName}" (ID: ${data.id})`);
        tagIds.push(data.id);
      } else {
        const data = await res.json();
        if (data.code === 'term_exists' && data.data && data.data.term_id) {
          console.log(`[Tags] Tag already exists: "${trimmedName}" (ID: ${data.data.term_id})`);
          tagIds.push(data.data.term_id);
        } else {
          console.warn(`[Tags] Failed to resolve tag "${trimmedName}":`, data.message);
        }
      }
    } catch (err) {
      console.warn(`[Tags] Network error resolving tag "${name}":`, err.message);
    }
  }
  return tagIds;
}



// Helper to upload media to WordPress
async function uploadMedia(imageUrl, title, slug, suffix) {
  try {
    console.log(`[Media] Downloading image: ${imageUrl}`);
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status} downloading image`);
    
    const blob = await res.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    
    const filename = `${slug}-${suffix}.jpg`;
    console.log(`[Media] Uploading as media file "${filename}" to WordPress...`);

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
      console.log(`[Media] Uploaded successfully! ID: ${mediaData.id} | URL: ${mediaData.source_url}`);
      return { id: mediaData.id, url: mediaData.source_url };
    } else {
      const errText = await mediaRes.text();
      console.error(`[Media] Failed to upload media: ${errText}`);
    }
  } catch (err) {
    console.error(`[Media] Error uploading media from ${imageUrl}:`, err.message);
  }
  return null;
}

// Generate topics dynamically using DeepSeek if not provided locally
async function generateDailyTopics() {
  console.log("Calling DeepSeek API to brainstorm 5 trending SEO football topics for tomorrow...");
  try {
    const prompt = `
Genera un objeto JSON con exactamente 5 temas/palabras clave principales de alta tendencia sobre fútbol mundial (enfocado en el Mundial 2026, fichajes, estrellas mundiales o táctica moderna) para escribir mañana.
Deben distribuirse exactamente en estos 5 formatos secuenciales (todos con una extensión obligatoria de entre 2200 y 3000 palabras):
1. Guía Definitiva / Pilar: Palabra clave de gran volumen.
2. Tutorial / "Cómo hacer": Intención resolutiva de problemas prácticos del hincha o jugador.
3. Comparativa / Listicle: Lista de elementos comparados.
4. Caso Práctico: Long-tail sobre un caso táctico, revelación, lesión o club específico.
5. Tendencias / FAQ: Optimizado para Snippets / Discover sobre una tendencia candente.

El JSON devuelto debe tener esta estructura exacta:
{
  "topics": [
    {
      "num": 1,
      "category": "selecciones", // uno de: "resultados", "estadisticas", "lesiones", "selecciones"
      "keyword": "táctica argentina mundial 2026", // palabra clave principal foco
      "title": "La revolución táctica de Argentina rumbo al Mundial 2026: Guía completa",
      "nicho": "Fútbol / Mundial 2026",
      "audience": "Aficionados de fútbol táctico e hinchas latinoamericanos"
    },
    ...
  ]
}

Asegúrate de que las categorías no se repitan demasiado y se distribuyan entre "resultados", "estadisticas", "lesiones", "selecciones".
Devuelve solo el JSON válido sin markdown ni explicaciones adicionales.
`;

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
            content: 'Eres un estratega de contenido SEO deportivo de clase mundial. Responde únicamente con el JSON solicitado.'
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
      throw new Error(`HTTP ${response.status} - ${errText}`);
    }

    const data = await response.json();
    let cleaned = data.choices[0].message.content.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
    }
    const parsed = JSON.parse(cleaned);
    return parsed.topics;
  } catch (err) {
    console.error("Failed to generate topics, using fallbacks:", err.message);
    // Fallbacks in case DeepSeek fails
    return [
      { num: 1, category: "selecciones", keyword: "favoritos mundial 2026", title: "Favoritos Mundial 2026: Análisis de las potencias candidatas al título", nicho: "Fútbol / Mundial", audience: "Aficionados del fútbol global" },
      { num: 2, category: "resultados", keyword: "entradas mundial 2026", title: "Cómo comprar entradas para el Mundial 2026: Tutorial paso a paso", nicho: "Fútbol / Entradas", audience: "Aficionados que planean viajar al Mundial" },
      { num: 3, category: "estadisticas", keyword: "estadios mundial 2026", title: "Los 10 mejores estadios del Mundial 2026: Capacidad, sedes y tecnología", nicho: "Fútbol / Estadios", audience: "Seguidores de infraestructura deportiva" },
      { num: 4, category: "lesiones", keyword: "lesion cruzado futbolistas", title: "Rotura de ligamento cruzado anterior: Proceso de recuperación en futbolistas de élite", nicho: "Fútbol / Salud deportiva", audience: "Futbolistas, preparadores y aficionados" },
      { num: 5, category: "selecciones", keyword: "formato mundial 2026 faq", title: "El nuevo formato del Mundial 2026 explicado: Preguntas Frecuentes", nicho: "Fútbol / Mundial", audience: "Seguidores curiosos sobre las reglas de la FIFA" }
    ];
  }
}

async function main() {
  try {
    console.log("=== INICIANDO PIPELINE DIARIO DE 5 ARTÍCULOS ===");
    
    // 1. Determine topics (check local json daily_topics.json or generate)
    const localTopicsPath = path.resolve(__dirname, 'daily_topics.json');
    let topics = [];
    if (fs.existsSync(localTopicsPath)) {
      console.log("Reading daily topics from local daily_topics.json file...");
      const localData = JSON.parse(fs.readFileSync(localTopicsPath, 'utf8'));
      topics = localData.topics || localData;
    } else {
      topics = await generateDailyTopics();
    }

    console.log(`Topics defined for tomorrow:`);
    topics.forEach((t, index) => {
      console.log(`- Post ${index + 1}: [${t.category.toUpperCase()}] "${t.title}" (KW: ${t.keyword})`);
    });

    // 2. Set Target Date (Tomorrow)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1);
    const dateYMD = targetDate.toISOString().slice(0, 10); // YYYY-MM-DD
    console.log(`Target Publication Date: ${dateYMD}`);

    // System Prompt for Editorial Director
    const SYSTEM_PROMPT = `
Eres un Director Editorial Senior, Especialista en SEO On-Page/EEAT (Experiencia, Pericia, Autoridad y Confiabilidad) y Arquitecto de Contenidos Digitales. Tu objetivo exclusivo es generar e implementar diariamente un pipeline de artículos únicos, exhaustivos, optimizados para buscadores y con tono humano natural, listos para su publicación directa en WordPress.

DEBES responder con un objeto JSON estricto que contenga los campos detallados al final.

### INSTRUCCIONES EDITORIALES DE ALTO IMPACTO (ANTI-AI PATTERN)
- **Tono**: Profesional, de autoridad, directo pero accesible y empático.
- **Prohibidas muletillas de IA**: "En el acelerado mundo actual", "En conclusión", "Es fundamental recordar", "Desbloquea el potencial", "En resumen", "Como conclusión".
- **Sintaxis**: Variada y fluida. Frases cortas de impacto alternadas con explicaciones desarrolladas y con ejemplos reales del fútbol actual.
- **Formato HTML**: Usa etiquetas semánticas y clases de Tailwind CSS con comillas simples (').
  - Contenedor principal: <div class='space-y-8'>
  - Párrafos comunes: <p class='text-slate-700 leading-relaxed font-sans mb-4'>
  - Párrafos introductorios destacados: <p class='text-lg text-slate-700 leading-relaxed font-sans font-medium'>
  - Encabezados (H2): <h2 class='font-display text-2xl font-extrabold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2'>
  - Subencabezados (H3): <h3 class='font-display text-xl font-bold text-slate-900 mt-8 mb-3'>
  - Listas elegantes: Usa <ul> o <ol> estructurados con <li> y SVGs (si corresponde).
  - Tablas comparativas: <div class='overflow-x-auto my-6 border border-slate-200 rounded-2xl shadow-sm'><table class='w-full text-left border-collapse'>...
  - Bloques de alerta (Fondo ámbar): <div class='my-6 p-5 rounded-2xl bg-amber-50/70 border-l-4 border-amber-500 text-amber-900 shadow-sm'>...
  - Bloques de consejo (Fondo verde): <div class='my-6 p-5 rounded-2xl bg-teal-50/70 border-l-4 border-teal-500 text-teal-900 shadow-sm'>...
  - FAQ Acordeones desplegables con <details class='group border border-slate-200 rounded-2xl bg-white p-5 transition-all duration-300 open:shadow-sm'>...
- **Sin caracteres \\n o \\\\n en el HTML**: Usa bloques de párrafo y etiquetas de salto.
- **Sin emojis** en ningún campo (título, meta descripción, cuerpo).

### INSERCIÓN DE MULTIMEDIA Y PROMPTS
- Debes incluir exactamente 2 comentarios HTML de posición para imágenes internas: \`<!-- INSERTA IMAGEN 1 AQUÍ -->\` y \`<!-- INSERTA IMAGEN 2 AQUÍ -->\` en puntos coherentes del contenido (por ejemplo, después de los primeros H2 o antes de la tabla).
- En el JSON de respuesta debes proveer prompts detallados en inglés para generar estas imágenes (adecuados para Midjourney o DALL-E) y sus correspondientes ALT tags optimizados en español.

### OPTIMIZACIÓN FEATURED SNIPPET
- En tu primer H2, debes responder de manera directa a la intención de búsqueda principal en un párrafo conciso de exactamente 40-50 palabras, en formato definición/respuesta directa.

### FORMATO JSON DE SALIDA ESPERADO:
{
  "title": "[Título magnético, < 65 caracteres, con palabra clave y disparador emocional]",
  "meta_title": "[Metatítulo SEO de 50-60 caracteres sin emojis]",
  "meta_description": "[Metadescripción SEO de 140-160 caracteres con CTA, sin emojis]",
  "excerpt": "[Extracto breve de 2-3 líneas para previsualización, sin emojis]",
  "content": "[Cuerpo del artículo en HTML semántico limpio, usando Tailwind CSS con comillas simples, sin \\\\n]",
  "slug": "[slug-amigable-en-kebab-case]",
  "tags": ["etiqueta1", "etiqueta2", "etiqueta3", "etiqueta4", "etiqueta5"],
  "schema_json_ld": { ... }, // Bloque Schema.org válido en formato objeto (Article o FAQPage)
  "visual_prompt_featured": {
    "prompt": "[Midjourney prompt in English for the cover photo]",
    "alt": "[Texto ALT SEO en español]"
  },
  "visual_prompt_internal_1": {
    "prompt": "[Midjourney prompt in English for image 1]",
    "alt": "[Texto ALT SEO en español]"
  },
  "visual_prompt_internal_2": {
    "prompt": "[Midjourney prompt in English for image 2]",
    "alt": "[Texto ALT SEO en español]"
  }
}
`;

    // 3. Process each article
    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      const scheduleItem = DAILY_SCHEDULE[i];
      const publishTimeISO = `${dateYMD}T${scheduleItem.time}`; // Local time representation
      
      console.log(`\n------------------------------------------------------------`);
      console.log(`[POST ${i+1}/5] Generating: "${topic.title}"`);
      console.log(`Scheduled Publish Time: ${publishTimeISO}`);
      console.log(`Format constraint: ${scheduleItem.type}`);
      console.log(`------------------------------------------------------------`);

      const userPrompt = `
Parámetros de entrada para el artículo:
- **NÚMERO DE ARTÍCULO EN EL PIPELINE**: ${scheduleItem.num} de 5
- **TIPO DE ARTÍCULO**: ${scheduleItem.type}
- **NICHO / SITIO WEB**: ${topic.nicho || 'Fútbol / Copa Mundial de la FIFA 2026'}
- **TEMA O PALABRA CLAVE**: "${topic.keyword}"
- **TÍTULO PROPUESTO**: "${topic.title}"
- **AUDIENCIA OBJETIVO**: ${topic.audience || 'Aficionados del fútbol español y mundial'}
- **HORA PROGRAMADA DE PUBLICACIÓN**: ${publishTimeISO}

Aplica con rigor de hierro los 6 pasos editorial-SEO:
1. Integra "${topic.keyword}" de forma natural en el H1 (Título), primer párrafo, un H2 y los metadatos. Añade al menos 8 palabras clave LSI semánticas.
2. Estructura obligatoriamente con un mínimo de 6 o 7 encabezados H2 principales ordenados lógicamente, y al menos 2 subsecciones H3 detalladas dentro de cada H2 principal. Agrega un Índice de Contenidos (Table of Contents) estructurado semánticamente al inicio.
3. EXTENSIÓN OBLIGATORIA: El artículo debe tener entre 2200 y 3000 palabras reales en el cuerpo del texto (excluyendo etiquetas HTML). Para lograrlo:
   - Desarrolla cada sección H2 y H3 con explicaciones extremadamente exhaustivas, profundas e informativas.
   - Escribe al menos 4 párrafos largos de 100-150 palabras para cada encabezado H2 y H3.
   - Prohibido resumir conceptos, usar respuestas cortas o dejar secciones vacías. Usa explicaciones periodísticas detalladas, telemetría táctica, datos y ejemplos históricos del fútbol.
   - Respeta estrictamente la regla de estilo humano (sin muletillas de IA).
4. Inserta los placeholders \`<!-- INSERTA IMAGEN 1 AQUÍ -->\` y \`<!-- INSERTA IMAGEN 2 AQUÍ -->\`.
5. Asegura un JSON-LD schema válido y metadatos SEO.
6. Respuesta estrictamente en formato JSON válido.
`;

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
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userPrompt }
              ],
              response_format: { type: 'json_object' }
            })
          });

          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`HTTP ${response.status} - ${errText}`);
          }

          const data = await response.json();
          let rawContent = data.choices[0].message.content.trim();
          
          if (rawContent.startsWith('```')) {
            rawContent = rawContent.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
          }

          parsed = JSON.parse(rawContent);

          // Validation
          if (!parsed.title || !parsed.content || !parsed.meta_title || !parsed.meta_description) {
            throw new Error("Required JSON keys (title, content, meta_title, meta_description) missing.");
          }

          const textOnly = parsed.content.replace(/<[^>]*>/g, ' ');
          const wordCount = textOnly.trim().split(/\s+/).filter(w => w.length > 0).length;
          console.log(`Success! Article generated: ${wordCount} words.`);
          break;
        } catch (err) {
          console.error(`Attempt ${attempt} failed:`, err.message);
          if (attempt >= maxAttempts) {
            console.error(`Could not generate content for topic: ${topic.title}`);
          }
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }

      if (parsed) {
        // 4. Handle Visuals / Images
        let featuredMediaId = 0;
        let finalContentHtml = parsed.content;

        // Auto-download and upload images to make the article look professional using Unsplash
        
        // A. Featured Image (Cover)
        console.log(`[Images] Sourcing featured image from Unsplash for "${parsed.slug}"...`);
        const coverUrl = await fetchUnsplashImage(topic.keyword, true);
        const coverMedia = await uploadMedia(coverUrl, parsed.title, parsed.slug, 'cover');
        if (coverMedia) {
          featuredMediaId = coverMedia.id;
        }

        // B. Internal Image 1
        console.log(`[Images] Sourcing internal image 1 from Unsplash...`);
        // Use alt tag for contextual searching on Unsplash if available, fallback to keyword
        const search1 = parsed.visual_prompt_internal_1?.alt || topic.keyword;
        const img1Url = await fetchUnsplashImage(search1, false);
        const img1Media = await uploadMedia(img1Url, parsed.title, parsed.slug, 'internal-1');
        if (img1Media) {
          const img1Alt = parsed.visual_prompt_internal_1?.alt || 'Análisis táctico del partido de fútbol';
          const img1Html = `
<div class='my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-white p-2 max-w-2xl mx-auto'>
  <img src='${img1Media.url}' alt='${img1Alt}' class='w-full h-auto rounded-xl object-cover max-h-[450px]' />
  <p class='text-xs text-slate-500 font-sans italic text-center mt-2'>${img1Alt}</p>
</div>
`;
          // Replace placeholder
          if (finalContentHtml.includes('<!-- INSERTA IMAGEN 1 AQUÍ -->')) {
            finalContentHtml = finalContentHtml.replace('<!-- INSERTA IMAGEN 1 AQUÍ -->', img1Html);
          } else {
            // Append
            finalContentHtml += img1Html;
          }
        }

        // C. Internal Image 2
        console.log(`[Images] Sourcing internal image 2 from Unsplash...`);
        const search2 = parsed.visual_prompt_internal_2?.alt || `${topic.category} match`;
        const img2Url = await fetchUnsplashImage(search2, false);
        const img2Media = await uploadMedia(img2Url, parsed.title, parsed.slug, 'internal-2');
        if (img2Media) {
          const img2Alt = parsed.visual_prompt_internal_2?.alt || 'Estadísticas y jugadas del encuentro';
          const img2Html = `
<div class='my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-white p-2 max-w-2xl mx-auto'>
  <img src='${img2Media.url}' alt='${img2Alt}' class='w-full h-auto rounded-xl object-cover max-h-[450px]' />
  <p class='text-xs text-slate-500 font-sans italic text-center mt-2'>${img2Alt}</p>
</div>
`;
          // Replace placeholder
          if (finalContentHtml.includes('<!-- INSERTA IMAGEN 2 AQUÍ -->')) {
            finalContentHtml = finalContentHtml.replace('<!-- INSERTA IMAGEN 2 AQUÍ -->', img2Html);
          } else {
            // Append
            finalContentHtml += img2Html;
          }
        }

        // 5. Resolve tags to WordPress tag IDs
        console.log(`Resolving tags for WordPress...`);
        const resolvedTagIds = await getOrCreateTagIds(parsed.tags || []);

        // 6. Publish to WordPress with 'future' status
        console.log(`Scheduling post on WordPress for ${publishTimeISO}...`);
        const catId = CATEGORIES_WP_MAP[topic.category] || 2; // Default to 'resultados' (2)

        const postBody = {
          title: parsed.title,
          slug: parsed.slug,
          status: 'future', // Crucial for scheduling
          date: publishTimeISO, // WP schedules the post at this date-time
          excerpt: parsed.excerpt,
          content: finalContentHtml,
          categories: [catId],
          tags: resolvedTagIds,
          meta: {
            rank_math_focus_keyword: topic.keyword,
            rank_math_title: parsed.meta_title,
            rank_math_description: parsed.meta_description
          }
        };

        if (featuredMediaId > 0) {
          postBody.featured_media = featuredMediaId;
        }

        const wpRes = await fetch(`${WP_API_URL}/posts`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postBody)
        });

        if (wpRes.ok) {
          const wpPost = await wpRes.json();
          console.log(`SUCCESS: Scheduled post "${parsed.title}" (ID: ${wpPost.id}) for publishing at ${publishTimeISO}!`);
        } else {
          const wpErr = await wpRes.text();
          console.error(`WordPress API Error: Failed to schedule post: ${wpErr}`);
        }
      }

      // Delay to avoid hitting API rate limits or spamming server
      console.log("Waiting 3 seconds before next generation...");
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    console.log("\n=== DAILY 5-ARTICLE PIPELINE GENERATED AND SCHEDULED SUCCESSFULLY ===");
  } catch (err) {
    console.error("Fatal error in daily pipeline main execution:", err.message);
  }
}

main();
