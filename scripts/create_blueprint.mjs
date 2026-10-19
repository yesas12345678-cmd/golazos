import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const categories = [
  { id: 4, name: 'Grandes Torneos', slug: 'grandes-torneos' },
  { id: 5, name: 'Táctica y Estrategia', slug: 'tactica-y-estrategia' },
  { id: 6, name: 'Entrenamiento y Rendimiento', slug: 'entrenamiento-y-rendimiento' },
  { id: 7, name: 'Reglamento y Arbitraje', slug: 'reglamento-y-arbitraje' }
];

const catTitles = {
  // Cat 1: Grandes Torneos
  4: [
    'Cómo Funcionan las Fases Eliminatorias de la UEFA Champions League',
    'Guía Completa del Nuevo Formato Suizo de la Champions League',
    'Por Qué la Copa Libertadores es el Torneo Más Intenso del Mundo',
    'Evolución Táctica de los Equipos Campeones de la Copa del Mundo',
    'Cómo se Determinan las Sedes y Estadios para un Mundial de Fútbol',
    'Qué Factores Deciden el Éxito en una Tanda de Penaltis en Torneos',
    'La Historia y Criterios Detrás del Balón de Oro y Sus Votaciones',
    'Cómo Influye el Factor Campo en las Eliminatorias a Doble Partido',
    'Las Diferencias Clave Entre el Fútbol de Selecciones y el de Clubes',
    'Cómo Funciona el Fair Play Financiero de la UEFA en Grandes Ligas',
    'Los Secretos Detrás de las Mayores Remontadas en la Champions League',
    'Cómo se Organiza la Logística de un Equipo en un Torneo Internacional'
  ],
  // Cat 2: Táctica y Estrategia
  5: [
    'Cómo Funciona el Sistema Táctico 4-3-3 y Cuándo Debe Utilizarse',
    'Las Claves de la Presión Tras Pérdida y el Gegenpressing Moderno',
    'Cómo Romper un Bloque Defensivo Bajo con Movilidad y Paciencia',
    'Ventajas y Desventajas de Jugar con Línea Defensiva de Tres Centrales',
    'El Rol del Extremo a Pierna Cambiada en el Ataque Posicional Moderno',
    'Cómo se Coordina la Salida de Balón Lavolpiana con Máximo Éxito',
    'Qué es el Tercer Hombre y Cómo Genera Superioridades en el Centro',
    'La Evolución del Falso Nueve Desde Messi Hasta el Fútbol Actual',
    'Cómo Defender el Balón Parado en Zona o con Marcaje Mixto Eficaz',
    'Las Transiciones Ofensivas Rápidas: De la Recuperación al Remate',
    'Cómo Medir y Utilizar la Métrica de Goles Esperados xG en Táctica',
    'El Perfil del Mediocentro Posicional y su Impacto en el Equilibrio'
  ],
  // Cat 3: Entrenamiento y Rendimiento
  6: [
    'Cómo Planificar una Pretemporada de Fútbol para Prevenir Lesiones',
    'La Preparación Física Integrada con Balón en el Fútbol Moderno',
    'Pautas de Nutrición e Hidratación para Futbolistas en Día de Partido',
    'Cómo Desarrollar la Resistencia Específica para los 90 Minutos',
    'Prevención de Lesiones de Isquiotibiales y Ligamento Cruzado en Fútbol',
    'El Papel del Entrenamiento de Fuerza y Potencia en la Velocidad',
    'Cómo Funciona la Crioterapia y los Métodos de Recuperación Rápida',
    'Protocolos de Readaptación Física Tras una Lesión Muscular Grave',
    'La Importancia del Sueño y Descanso en el Rendimiento del Futbolista',
    'Ejercicios Fundamentales para Mejorar la Técnica de Golpeo de Balón',
    'Cómo Utilizar la Monitorización GPS para Controlar la Carga Semanal',
    'Preparación Psicológica y Control de la Ansiedad en la Competición'
  ],
  // Cat 4: Reglamento y Arbitraje
  7: [
    'Cómo Funciona el Protocolo del VAR y Cuándo Puede Intervenir',
    'Las Claves del Fuera de Juego y la Tecnología Semiautomática',
    'Qué Criterios Arbitrales Separan la Mano Involuntaria de la Penalti',
    'Diferencia Entre Conducta Violenta y Tarjeta Roja por Juego Brusco',
    'Cómo se Aplica la Regla de la Ventaja en Jugaciones Clave de Peligro',
    'La Regla de los Segundos del Portero y la Pérdida Deliberada de Tiempo',
    'Criterios de la IFAB Sobre la Invasión en el Lanzamiento de Penalti',
    'Cómo Funciona la Comunicación Interna Entre el Árbitro y la Sala VOR',
    'Evolución Histórica de las Reglas del Fútbol y Cambios Previstos',
    'Qué Sanciones Disciplinarias Implica la Reiteración de Infracciones',
    'Las Nuevas Directrices Sobre el Tiempo Añadido en los Partidos',
    'Cómo Interpretar las Faltas Tácticas que Cortan Ataques Prometedores'
  ]
};

// Build 48 articles alternating cyclically: Cat 4 -> Cat 5 -> Cat 6 -> Cat 7 -> Cat 4...
const blueprint = [];
const catIndices = { 4: 0, 5: 0, 6: 0, 7: 0 };
const now = Date.now();

for (let i = 0; i < 48; i++) {
  const cat = categories[i % 4];
  const title = catTitles[cat.id][catIndices[cat.id]++];
  const daysAgo = 48 - i;
  const publishDate = new Date(now - daysAgo * 86400000).toISOString();

  blueprint.push({
    index: i + 1,
    title,
    categoryId: cat.id,
    categoryName: cat.name,
    categorySlug: cat.slug,
    publishDate,
    status: 'pending',
    words: 0,
    wpPostId: null
  });
}

const blueprintPath = path.resolve(dataDir, 'articles_blueprint.json');
fs.writeFileSync(blueprintPath, JSON.stringify(blueprint, null, 2));
console.log(`✅ Blueprint creado con 48 artículos en ${blueprintPath}`);
console.log('Muestra de los primeros 4 artículos:');
console.log(blueprint.slice(0, 4));
