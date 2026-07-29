import { WP_API_URL, authHeader } from './loadEnv.mjs';

const ARTICLES = [
  // CATEGORY: resultados (13 articles)
  {
    keyword: "resultados mundial 2026",
    title: "Resultados del Mundial 2026: Marcadores y clasificación en vivo",
    meta_title: "Resultados Mundial 2026: Clasificación y Marcadores",
    meta_description: "Sigue todos los resultados del Mundial 2026 al instante. Marcadores detallados, clasificaciones de grupos y crónicas de los partidos de fútbol.",
    slug: "resultados-mundial-2026-marcadores-clasificacion"
  },
  {
    keyword: "calendario copa mundial 2026",
    title: "Calendario Copa Mundial 2026: Fechas, horarios y sedes oficiales",
    meta_title: "Calendario Copa Mundial 2026: Fechas y Sedes Oficiales",
    meta_description: "Consulta el calendario completo de la Copa Mundial 2026. Conoce las fechas clave, los horarios de los partidos y las sedes de Estados Unidos, México y Canadá.",
    slug: "calendario-copa-mundial-2026-fechas-horarios-sedes"
  },
  {
    keyword: "partido inaugural mundial 2026",
    title: "Partido inaugural Mundial 2026: Fecha, selecciones y detalles del debut",
    meta_title: "Partido Inaugural Mundial 2026: Todo sobre el Debut",
    meta_description: "Todo sobre el partido inaugural del Mundial 2026. Descubre la fecha, la selección anfitriona y el estadio que albergará el primer encuentro del torneo.",
    slug: "partido-inaugural-mundial-2026-fecha-detalles-debut"
  },
  {
    keyword: "fase de grupos mundial 2026",
    title: "Fase de grupos Mundial 2026: Análisis de los emparejamientos y favoritos",
    meta_title: "Fase de Grupos Mundial 2026: Emparejamientos y Análisis",
    meta_description: "Análisis exhaustivo de la fase de grupos del Mundial 2026. Evaluamos los grupos más competitivos y las selecciones favoritas para pasar a la siguiente ronda.",
    slug: "fase-de-grupos-mundial-2026-analisis-favoritos"
  },
  {
    keyword: "goleadores mundial 2026",
    title: "Goleadores Mundial 2026: Tabla de anotadores y máximos artilleros",
    meta_title: "Goleadores Mundial 2026: Tabla de Anotadores Oficial",
    meta_description: "Consulta la tabla de goleadores del Mundial 2026 en tiempo real. Los máximos artilleros del torneo, estadísticas de goles y rendimiento de los delanteros.",
    slug: "goleadores-mundial-2026-tabla-anotadores-artilleros"
  },
  {
    keyword: "octavos de final mundial 2026",
    title: "Octavos de final Mundial 2026: Cruces, fechas y clasificados oficiales",
    meta_title: "Octavos de Final Mundial 2026: Cruces y Fechas",
    meta_description: "Detalles completos de los octavos de final del Mundial 2026. Conoce los cruces de las selecciones clasificadas, fechas de juego y estadios confirmados.",
    slug: "octavos-de-final-mundial-2026-cruces-fechas"
  },
  {
    keyword: "cuartos de final mundial 2026",
    title: "Cuartos de final Mundial 2026: Emparejamientos y camino a semifinales",
    meta_title: "Cuartos de Final Mundial 2026: Emparejamientos Clave",
    meta_description: "Sigue la cobertura de los cuartos de final del Mundial 2026. Analizamos los emparejamientos de las ocho mejores selecciones del planeta en el camino al título.",
    slug: "cuartos-de-final-mundial-2026-emparejamientos-camino"
  },
  {
    keyword: "semifinales mundial 2026",
    title: "Semifinales Mundial 2026: Cruces decisivos por el pase a la gran final",
    meta_title: "Semifinales Mundial 2026: Duelos por la Final",
    meta_description: "Análisis previo de las semifinales del Mundial 2026. Conoce las fechas, estadios y las selecciones que buscarán un boleto para el partido por el campeonato.",
    slug: "semifinales-mundial-2026-cruces-decisivos-pase-final"
  },
  {
    keyword: "final copa mundial 2026",
    title: "Final Copa Mundial 2026: Horario, sede y crónica del partido definitivo",
    meta_title: "Final Copa Mundial 2026: Horario, Sede y Crónica",
    meta_description: "La guía definitiva de la final de la Copa Mundial 2026. Descubre el estadio, el horario del encuentro y el análisis táctico de las selecciones finalistas.",
    slug: "final-copa-mundial-2026-horario-sede-cronica"
  },
  {
    keyword: "clasificados mundial 2026",
    title: "Clasificados Mundial 2026: Lista de selecciones confirmadas por confederación",
    meta_title: "Clasificados Mundial 2026: Selecciones Confirmadas",
    meta_description: "Conoce a todas las selecciones clasificadas para el Mundial 2026. Lista oficial detallada por confederaciones de la UEFA, CONMEBOL, CONCACAF y más.",
    slug: "clasificados-mundial-2026-lista-selecciones-confirmadas"
  },
  {
    keyword: "sorpresas mundial 2026",
    title: "Sorpresas Mundial 2026: Las revelaciones de la fase de grupos",
    meta_title: "Sorpresas Mundial 2026: Las Grandes Revelaciones",
    meta_description: "Analizamos las mayores sorpresas del Mundial 2026 en la fase de grupos. Selecciones revelación, resultados inesperados y equipos que rompieron pronósticos.",
    slug: "sorpresas-mundial-2026-revelaciones-fase-grupos"
  },
  {
    keyword: "partidos fase eliminatoria mundial",
    title: "Partidos de la fase eliminatoria del Mundial: Guía y fechas de cruces",
    meta_title: "Partidos Fase Eliminatoria Mundial: Fechas y Cruces",
    meta_description: "Guía completa de los partidos de la fase eliminatoria del Mundial. Fechas, horarios, prórrogas, tanda de penaltis y cómo se definen las rondas finales.",
    slug: "partidos-fase-eliminatoria-mundial-guia-fechas-cruces"
  },
  {
    keyword: "marcador final mundial 2026",
    title: "Marcador final del Mundial 2026: Reporte y resumen del campeón",
    meta_title: "Marcador Final Mundial 2026: Resumen del Campeón",
    meta_description: "Detalles del marcador final del Mundial 2026 y el resumen de la coronación del nuevo campeón del mundo. Análisis del partido definitorio de la FIFA.",
    slug: "marcador-final-mundial-2026-reporte-resumen-campeon"
  },

  // CATEGORY: estadisticas (13 articles)
  {
    keyword: "estadisticas mundial 2026",
    title: "Estadísticas del Mundial 2026: Datos generales del torneo",
    meta_title: "Estadísticas Mundial 2026: Datos del Torneo",
    meta_description: "Descubre las estadísticas más importantes del Mundial 2026. Goles por partido, tarjetas, posesión media y rendimiento por confederación futbolística.",
    slug: "estadisticas-mundial-2026-datos-generales-torneo"
  },
  {
    keyword: "posesion de balon mundial 2026",
    title: "Posesión de balón en el Mundial 2026: Equipos con mayor control de juego",
    meta_title: "Posesión de Balón Mundial 2026: Equipos Líderes",
    meta_description: "Analizamos las estadísticas de posesión de balón en el Mundial 2026. Descubre cuáles son las selecciones que dominan el control del esférico y su efectividad.",
    slug: "posesion-balon-mundial-2026-equipos-control-juego"
  },
  {
    keyword: "maximos asistentes mundial 2026",
    title: "Máximos asistentes del Mundial 2026: La tabla de los creadores de juego",
    meta_title: "Máximos Asistentes Mundial 2026: Creadores de Juego",
    meta_description: "Consulta la tabla de máximos asistentes del Mundial 2026. Conoce a los mediocampistas y delanteros con mayor visión de juego y pases clave en el torneo.",
    slug: "maximos-asistentes-mundial-2026-tabla-creadores-juego"
  },
  {
    keyword: "remates a puerta mundial 2026",
    title: "Remates a puerta en el Mundial 2026: Eficacia ofensiva de las selecciones",
    meta_title: "Remates a Puerta Mundial 2026: Eficacia Ofensiva",
    meta_description: "Estadísticas de remates a puerta en el Mundial 2026. Evaluamos qué equipos disparan más, cuáles son los más efectivos y la eficiencia de los delanteros.",
    slug: "remates-puerta-mundial-2026-eficacia-ofensiva-selecciones"
  },
  {
    keyword: "tarjetas amarillas mundial 2026",
    title: "Tarjetas amarillas en el Mundial 2026: Equipos más sancionados del torneo",
    meta_title: "Tarjetas Amarillas Mundial 2026: Sanciones y Fair Play",
    meta_description: "Reporte de tarjetas amarillas y rojas en el Mundial 2026. Conoce a las selecciones más sancionadas, los jugadores amonestados y la clasificación del juego limpio.",
    slug: "tarjetas-amarillas-mundial-2026-equipos-sancionados"
  },
  {
    keyword: "porteros con mas paradas mundial",
    title: "Porteros con más paradas en el Mundial: Los guardianes de la portería",
    meta_title: "Porteros con Más Paradas en el Mundial 2026",
    meta_description: "Ranking de los porteros con más paradas y atajadas en el Mundial 2026. Analizamos la efectividad bajo los tres palos y los guantes de oro del torneo.",
    slug: "porteros-mas-paradas-mundial-guardianes-porteria"
  },
  {
    keyword: "kilometros recorridos mundial 2026",
    title: "Kilómetros recorridos en el Mundial 2026: El despliegue físico de las selecciones",
    meta_title: "Kilómetros Recorridos Mundial 2026: Despliegue Físico",
    meta_description: "Análisis de los kilómetros recorridos por selección y jugador en el Mundial 2026. Descubre qué equipos muestran mayor resistencia e intensidad en el campo.",
    slug: "kilometros-recorridos-mundial-2026-despliegue-fisico-equipos"
  },
  {
    keyword: "faltas cometidas mundial 2026",
    title: "Faltas cometidas en el Mundial 2026: Análisis de la agresividad defensiva",
    meta_title: "Faltas Cometidas Mundial 2026: Defensa y Fricción",
    meta_description: "Datos detallados de faltas cometidas y recibidas en el Mundial 2026. Comparamos los equipos con estilos de juego más físicos e infractores del torneo.",
    slug: "faltas-cometidas-mundial-2026-agresividad-defensiva"
  },
  {
    keyword: "goles de tiro libre mundial",
    title: "Goles de tiro libre en el Mundial: Especialistas a balón parado",
    meta_title: "Goles de Tiro Libre en el Mundial 2026",
    meta_description: "Estadísticas y análisis de los goles de tiro libre en el Mundial 2026. Descubre a los mejores lanzadores del torneo y las tácticas de balón parado.",
    slug: "goles-tiro-libre-mundial-especialistas-balon-parado"
  },
  {
    keyword: "estadisticas de penaltis mundial",
    title: "Estadísticas de penaltis en el Mundial: Eficacia e influencia de las tandas",
    meta_title: "Estadísticas de Penaltis en el Mundial 2026",
    meta_description: "Análisis de las estadísticas de penaltis en el Mundial 2026. Efectividad de los cobros durante el tiempo reglamentario y en las tandas de desempate.",
    slug: "estadisticas-penaltis-mundial-eficacia-tandas-desempate"
  },
  {
    keyword: "rendimiento selecciones mundial 2026",
    title: "Rendimiento de las selecciones en el Mundial 2026: Balance por confederación",
    meta_title: "Rendimiento Selecciones Mundial 2026: Balance General",
    meta_description: "Balance de rendimiento de las selecciones en el Mundial 2026. Datos comparativos de victorias, empates, goles a favor y rendimiento por regiones de la FIFA.",
    slug: "rendimiento-selecciones-mundial-2026-balance-confederacion"
  },
  {
    keyword: "pases completados mundial 2026",
    title: "Pases completados en el Mundial 2026: Precisión y circuitos asociativos",
    meta_title: "Pases Completados Mundial 2026: Precisión y Circuitos",
    meta_description: "Estadísticas de precisión de pases y combinaciones exitosas en el Mundial 2026. Descubre qué selecciones tienen los circuitos asociativos más pulidos.",
    slug: "pases-completados-mundial-2026-precision-circuitos-asociativos"
  },
  {
    keyword: "goles de cabeza mundial 2026",
    title: "Goles de cabeza en el Mundial 2026: La importancia del juego aéreo",
    meta_title: "Goles de Cabeza Mundial 2026: Dominio del Juego Aéreo",
    meta_description: "Estadísticas de goles de cabeza en el Mundial 2026. Evaluamos el impacto del juego aéreo, los cabeceadores más eficaces y los sistemas de defensa de centros.",
    slug: "goles-cabeza-mundial-2026-importancia-juego-aereo"
  },

  // CATEGORY: lesiones (12 articles)
  {
    keyword: "lesiones mundial 2026",
    title: "Lesiones en el Mundial 2026: Reporte médico de los futbolistas afectados",
    meta_title: "Lesiones Mundial 2026: Reporte Médico Oficial",
    meta_description: "Sigue el reporte continuo de lesiones en el Mundial 2026. Conoce a los jugadores que han sufrido percances físicos durante el transcurso del torneo de la FIFA.",
    slug: "lesiones-mundial-2026-reporte-medico-futbolistas-afectados"
  },
  {
    keyword: "bajas medicas mundial 2026",
    title: "Bajas médicas para el Mundial 2026: Jugadores que se pierden la cita",
    meta_title: "Bajas Médicas Mundial 2026: Ausencias Confirmadas",
    meta_description: "Lista completa de las bajas médicas definitivas para el Mundial 2026. Jugadores estrella descartados antes del inicio de la gran cita futbolística por lesión.",
    slug: "bajas-medicas-mundial-2026-jugadores-que-se-pierden-cita"
  },
  {
    keyword: "jugadores descartados mundial 2026",
    title: "Jugadores descartados en el Mundial 2026: Cambios de lista de última hora",
    meta_title: "Jugadores Descartados Mundial 2026: Cambios de Lista",
    meta_description: "Analizamos los jugadores descartados y las sustituciones permitidas por la FIFA en el Mundial 2026 por motivos médicos justificados antes del torneo.",
    slug: "jugadores-descartados-mundial-2026-cambios-lista-ultima-hora"
  },
  {
    keyword: "lesion de rodilla mundial 2026",
    title: "Lesión de rodilla en el Mundial 2026: El fantasma de los ligamentos",
    meta_title: "Lesión de Rodilla en el Mundial 2026: Casos y Tiempos",
    meta_description: "Reporte sobre los casos de lesión de rodilla en el Mundial 2026. Analizamos la incidencia de rotura de ligamentos, meniscos y los tiempos de recuperación.",
    slug: "lesion-rodilla-mundial-2026-fantasma-ligamentos-articulaciones"
  },
  {
    keyword: "recuperacion fisica mundial 2026",
    title: "Recuperación física en el Mundial 2026: Métodos modernos de kinesiología",
    meta_title: "Recuperación Física Mundial 2026: Métodos Modernos",
    meta_description: "Descubre las técnicas de recuperación física utilizadas en el Mundial 2026. Crioterapia, cámaras hiperbáricas y fisioterapia de élite en las concentraciones.",
    slug: "recuperacion-fisica-mundial-2026-metodos-kinesiologia-fisioterapia"
  },
  {
    keyword: "lesiones musculares mundial 2026",
    title: "Lesiones musculares en el Mundial 2026: Sobrecargas, tirones e isquiotibiales",
    meta_title: "Lesiones Musculares Mundial 2026: Sobrecargas y Tirones",
    meta_description: "Incidencia de lesiones musculares en el Mundial 2026. Evaluamos las causas de las roturas fibrilares, sobrecargas en isquiotibiales y gemelos por el calendario.",
    slug: "lesiones-musculares-mundial-2026-sobrecargas-tirones-isquiotibiales"
  },
  {
    keyword: "bajas de ultima hora mundial",
    title: "Bajas de última hora en el Mundial: El impacto en los planteamientos tácticos",
    meta_title: "Bajas de Última Hora Mundial: Impacto Táctico",
    meta_description: "Las bajas de última hora en el Mundial 2026 obligan a los entrenadores a cambiar sus esquemas. Analizamos las ausencias más repentinas y sus relevos tácticos.",
    slug: "bajas-ultima-hora-mundial-impacto-planteamientos-tacticos"
  },
  {
    keyword: "kinesiologia deportiva mundial 2026",
    title: "Kinesiología deportiva en el Mundial 2026: Prevención de lesiones de élite",
    meta_title: "Kinesiología Deportiva Mundial 2026: Prevención de Élite",
    meta_description: "Cómo trabaja la kinesiología deportiva en el Mundial 2026. Protocolos preventivos, masajes de descarga y vendajes neuromusculares para proteger a las estrellas.",
    slug: "kinesiologia-deportiva-mundial-2026-prevencion-lesiones-elite"
  },
  {
    keyword: "lesiones de ligamento cruzado mundial",
    title: "Lesiones de ligamento cruzado en el Mundial: Tratamientos y quirófano",
    meta_title: "Lesiones de Ligamento Cruzado en el Mundial 2026",
    meta_description: "Análisis de las graves lesiones de ligamento cruzado anterior (LCA) en el Mundial 2026. Casos confirmados, cirugía y el largo camino de la rehabilitación.",
    slug: "lesiones-ligamento-cruzado-mundial-tratamientos-quirofano-rehabilitacion"
  },
  {
    keyword: "parte medico selecciones mundial",
    title: "Parte médico de las selecciones del Mundial: Actualización diaria de bajas",
    meta_title: "Parte Médico Selecciones Mundial: Bajas Diarias",
    meta_description: "Consulta el parte médico unificado de todas las selecciones del Mundial 2026. Estado de salud de los jugadores golpeados y predicciones de retorno al campo.",
    slug: "parte-medico-selecciones-mundial-actualizacion-diaria-bajas"
  },
  {
    keyword: "jugadores en duda mundial 2026",
    title: "Jugadores en duda para el Mundial 2026: Pruebas físicas de última hora",
    meta_title: "Jugadores en Duda Mundial 2026: Pruebas Físicas",
    meta_description: "Lista de jugadores en duda para los próximos partidos del Mundial 2026. Conoce las pruebas físicas a contrarreloj y las posibilidades de que jueguen.",
    slug: "jugadores-duda-mundial-2026-pruebas-fisicas-ultima-hora"
  },
  {
    keyword: "lesion de tobillo mundial 2026",
    title: "Lesión de tobillo en el Mundial 2026: Esguinces por entradas duras",
    meta_title: "Lesión de Tobillo en el Mundial 2026: Esguinces y Bajas",
    meta_description: "Parte médico sobre las lesiones de tobillo en el Mundial 2026. Clasificación de esguinces, grado de afectación ligamentosa y tratamientos de crioterapia rápidos.",
    slug: "lesion-tobillo-mundial-2026-esguinces-entradas-duras"
  },

  // CATEGORY: selecciones (12 articles)
  {
    keyword: "selecciones mundial 2026",
    title: "Selecciones del Mundial 2026: Perfil y aspiraciones de los participantes",
    meta_title: "Selecciones Mundial 2026: Perfiles de Competidores",
    meta_description: "Analizamos en profundidad a las selecciones participantes del Mundial 2026. Historia, trayectoria reciente y aspiraciones reales en la gran cita futbolística.",
    slug: "selecciones-mundial-2026-perfil-aspiraciones-participantes"
  },
  {
    keyword: "convocados mundial 2026",
    title: "Convocados para el Mundial 2026: Listas de buena fe de los equipos",
    meta_title: "Convocados Mundial 2026: Listas Oficiales de Convocatorias",
    meta_description: "Consulta las listas oficiales de convocados para el Mundial 2026. Conoce a los jugadores seleccionados por cada federación para disputar la Copa del Mundo.",
    slug: "convocados-mundial-2026-listas-oficiales-buena-fe"
  },
  {
    keyword: "favoritos mundial 2026",
    title: "Favoritos al Mundial 2026: Selecciones con mayores opciones de título",
    meta_title: "Favoritos al Mundial 2026: Candidatos al Título",
    meta_description: "Las selecciones favoritas para ganar el Mundial 2026. Analizamos las cuotas de apuestas, planteles y el rendimiento de las principales potencias mundiales.",
    slug: "favoritos-mundial-2026-selecciones-candidatas-titulo"
  },
  {
    keyword: "plantillas mundial 2026",
    title: "Plantillas del Mundial 2026: Valor de mercado y promedio de edad",
    meta_title: "Plantillas Mundial 2026: Edades y Valores de Mercado",
    meta_description: "Estudio comparativo de las plantillas del Mundial 2026. Analizamos el valor de mercado de los planteles, promedio de edad y procedencia de sus futbolistas.",
    slug: "plantillas-mundial-2026-valor-mercado-promedio-edad"
  },
  {
    keyword: "analisis tactico mundial 2026",
    title: "Análisis táctico del Mundial 2026: Modelos de juego predominantes",
    meta_title: "Análisis Táctico Mundial 2026: Modelos de Juego",
    meta_description: "Análisis táctico de los esquemas de juego más utilizados en el Mundial 2026. Bloques defensivos, presión alta y la evolución de los sistemas de juego.",
    slug: "analisis-tactico-mundial-2026-modelos-juego-predominantes"
  },
  {
    keyword: "directores tecnicos mundial 2026",
    title: "Directores técnicos del Mundial 2026: Los cerebros en los banquillos",
    meta_title: "Directores Técnicos Mundial 2026: Entrenadores de Élite",
    meta_description: "Perfil de los directores técnicos que dirigen en el Mundial 2026. Entrenadores debutantes, experimentados, salarios y sus filosofías de juego en el campo.",
    slug: "directores-tecnicos-mundial-2026-entrenadores-banquillos"
  },
  {
    keyword: "alineaciones probables mundial 2026",
    title: "Alineaciones probables del Mundial 2026: Los once de gala perfilados",
    meta_title: "Alineaciones Probables Mundial 2026: Once de Gala",
    meta_description: "Predicciones de alineaciones probables para los encuentros del Mundial 2026. Analizamos los onces titulares tácticos de cada selección participante.",
    slug: "alineaciones-probables-mundial-2026-once-gala-selecciones"
  },
  {
    keyword: "capitanes mundial 2026",
    title: "Capitanes del Mundial 2026: Los líderes en el terreno de juego",
    meta_title: "Capitanes Mundial 2026: Líderes y Brazaletes Oficiales",
    meta_description: "Conoce a los capitanes oficiales en el Mundial 2026. Analizamos el liderazgo, la experiencia y la influencia de quienes portan el brazalete en cada selección.",
    slug: "capitanes-mundial-2026-lideres-brazaletes-terreno-juego"
  },
  {
    keyword: "sistemas de juego mundial 2026",
    title: "Sistemas de juego en el Mundial 2026: Defensa de tres o línea de cuatro",
    meta_title: "Sistemas de Juego Mundial 2026: Defensa y Formaciones",
    meta_description: "Estudio sobre los sistemas de juego y formaciones en el Mundial 2026. Defensa de tres, línea de cuatro, doble pivote y su impacto táctico en las transiciones.",
    slug: "sistemas-juego-mundial-2026-defensa-formaciones-tacticas"
  },
  {
    keyword: "debutantes mundial 2026",
    title: "Debutantes en el Mundial 2026: Nuevas naciones en la Copa del Mundo",
    meta_title: "Debutantes Mundial 2026: Nuevas Selecciones",
    meta_description: "Descubre a las selecciones debutantes en el Mundial 2026. El camino de clasificación de estos países y su preparación histórica para su estreno.",
    slug: "debutantes-mundial-2026-nuevas-naciones-copa-mundo"
  },
  {
    keyword: "renovacion generacional mundial 2026",
    title: "Renovación generacional en el Mundial 2026: Las jóvenes promesas al mando",
    meta_title: "Renovación Generacional Mundial 2026: Jóvenes Promesas",
    meta_description: "Estudio sobre la renovación generacional en el Mundial 2026. Analizamos a las selecciones que apuestan por jóvenes promesas frente a planteles veteranos.",
    slug: "renovacion-generacional-mundial-2026-jovenes-promesas-mando"
  },
  {
    keyword: "concentraciones selecciones mundial 2026",
    title: "Concentraciones de las selecciones en el Mundial 2026: Los búnkeres tácticos",
    meta_title: "Concentraciones Selecciones Mundial 2026: Búnkeres",
    meta_description: "La guía de sedes y bases de entrenamiento de las selecciones en el Mundial 2026. Dónde se concentran y preparan los partidos los diferentes planteles.",
    slug: "concentraciones-selecciones-mundial-2026-bases-entrenamiento-bunkeres"
  }
];

async function main() {
  console.log("Fetching all published posts from golazos.co...");
  const getRes = await fetch(`${WP_API_URL}/posts?per_page=100&status=any`, {
    headers: { 'Authorization': authHeader }
  });

  if (!getRes.ok) {
    console.error("Failed to fetch posts:", getRes.statusText);
    process.exit(1);
  }

  const posts = await getRes.json();
  console.log(`Found ${posts.length} posts to update metadata for.`);

  for (const post of posts) {
    // Find matching article by slug
    const article = ARTICLES.find(a => a.slug === post.slug);
    if (!article) {
      console.log(`No matching metadata found in our list for slug: "${post.slug}". Skipping.`);
      continue;
    }

    console.log(`Updating metadata for post ID ${post.id}: "${post.title.rendered}"`);
    console.log(` -> Focus Keyword: "${article.keyword}"`);
    console.log(` -> Meta Title: "${article.meta_title}"`);
    console.log(` -> Meta Desc: "${article.meta_description}"`);

    const updateData = {
      meta: {
        rank_math_focus_keyword: article.keyword,
        rank_math_title: article.meta_title,
        rank_math_description: article.meta_description
      }
    };

    try {
      const res = await fetch(`${WP_API_URL}/posts/${post.id}`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (res.ok) {
        const data = await res.json();
        console.log(` -> Successfully updated post ID ${post.id}!`);
      } else {
        const errText = await res.text();
        console.error(` -> Failed to update post ID ${post.id}:`, errText);
      }
    } catch (err) {
      console.error(` -> Network error updating post ID ${post.id}:`, err.message);
    }

    // Delay to prevent hitting API rate limits
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log("All metadata updates complete!");
}

main();
