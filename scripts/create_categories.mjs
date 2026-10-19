import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authHeader, apiUrl } from './loadEnv.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const categories = [
  { name: "Grandes Torneos", slug: "grandes-torneos", description: "Análisis y seguimiento de los grandes torneos del fútbol mundial: Champions League, Mundiales, Eurocopas y ligas de élite." },
  { name: "Táctica y Estrategia", slug: "tactica-y-estrategia", description: "Estudio profundo de sistemas tácticos, pizarras de entrenadores, formaciones y evolución estratégica en el campo." },
  { name: "Entrenamiento y Rendimiento", slug: "entrenamiento-y-rendimiento", description: "Preparación física, nutrición, prevención de lesiones y métodos de optimización del rendimiento en futbolistas." },
  { name: "Reglamento y Arbitraje", slug: "reglamento-y-arbitraje", description: "Divulgación de las reglas de juego de la IFAB, análisis de decisiones arbitrales y funcionamiento del VAR." }
];

async function createCategories() {
  console.log('--- CREANDO LAS 4 CATEGORÍAS ESTRATÉGICAS ---');
  
  const existingRes = await fetch(`${apiUrl}/categories?per_page=100`, { headers: { 'Authorization': authHeader } });
  const existing = await existingRes.json();
  const existingMap = new Map(existing.map(c => [c.slug, c.id]));

  const categoryMap = {};

  for (const cat of categories) {
    if (existingMap.has(cat.slug)) {
      const id = existingMap.get(cat.slug);
      console.log(`Categoría '${cat.name}' ya existe (ID: ${id})`);
      categoryMap[cat.name] = { id, slug: cat.slug };
    } else {
      console.log(`Creando categoría '${cat.name}'...`);
      const res = await fetch(`${apiUrl}/categories`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cat)
      });
      const data = await res.json();
      console.log(`  Creada con ID: ${data.id} (slug: ${data.slug})`);
      categoryMap[cat.name] = { id: data.id, slug: data.slug };
    }
  }

  fs.writeFileSync(path.resolve(__dirname, '../data_categories.json'), JSON.stringify(categoryMap, null, 2));
  console.log('✅ Categorías guardadas en data_categories.json:', categoryMap);
}

createCategories().catch(err => {
  console.error('❌ Error en createCategories:', err);
  process.exit(1);
});
