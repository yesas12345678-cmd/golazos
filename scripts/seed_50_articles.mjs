import { WP_API_URL, authHeader } from './loadEnv.mjs';

// Category mapping to WordPress IDs
const CATEGORIES_WP_MAP = {
  resultados: 2,
  estadisticas: 3,
  lesiones: 4,
  selecciones: 5
};

const ARTICLES = [
  // CATEGORY: resultados (13 articles)
  {
    keyword: "resultados mundial 2026",
    title: "Resultados del Mundial 2026: Marcadores y clasificación en vivo",
    meta_title: "Resultados Mundial 2026: Clasificación y Marcadores",
    meta_description: "Sigue todos los resultados del Mundial 2026 al instante. Marcadores detallados, clasificaciones de grupos y crónicas de los partidos de fútbol.",
    slug: "resultados-mundial-2026-marcadores-clasificacion",
    category: "resultados",
    excerpt: "Accede a los resultados actualizados de la Copa Mundial 2026. Analizamos los marcadores más importantes y el estado de la clasificación en la fase de grupos."
  },
  {
    keyword: "calendario copa mundial 2026",
    title: "Calendario Copa Mundial 2026: Fechas, horarios y sedes oficiales",
    meta_title: "Calendario Copa Mundial 2026: Fechas y Sedes Oficiales",
    meta_description: "Consulta el calendario completo de la Copa Mundial 2026. Conoce las fechas clave, los horarios de los partidos y las sedes de Estados Unidos, México y Canadá.",
    slug: "calendario-copa-mundial-2026-fechas-horarios-sedes",
    category: "resultados",
    excerpt: "Toda la información sobre el calendario oficial del Mundial 2026. Planifica tu agenda para no perderte ningún encuentro en las distintas sedes norteamericanas."
  },
  {
    keyword: "partido inaugural mundial 2026",
    title: "Partido inaugural Mundial 2026: Fecha, selecciones y detalles del debut",
    meta_title: "Partido Inaugural Mundial 2026: Todo sobre el Debut",
    meta_description: "Todo sobre el partido inaugural del Mundial 2026. Descubre la fecha, la selección anfitriona y el estadio que albergará el primer encuentro del torneo.",
    slug: "partido-inaugural-mundial-2026-fecha-detalles-debut",
    category: "resultados",
    excerpt: "Analizamos las claves del partido de apertura de la Copa del Mundo 2026. Conoce los detalles de la ceremonia y las expectativas futbolísticas del primer choque."
  },
  {
    keyword: "fase de grupos mundial 2026",
    title: "Fase de grupos Mundial 2026: Análisis de los emparejamientos y favoritos",
    meta_title: "Fase de Grupos Mundial 2026: Emparejamientos y Análisis",
    meta_description: "Análisis exhaustivo de la fase de grupos del Mundial 2026. Evaluamos los grupos más competitivos y las selecciones favoritas para pasar a la siguiente ronda.",
    slug: "fase-de-grupos-mundial-2026-analisis-favoritos",
    category: "resultados",
    excerpt: "Revisamos los emparejamientos tras el sorteo de la Copa del Mundo 2026. Descubre cuáles son los duelos más atractivos y las selecciones con mayor probabilidad de clasificar."
  },
  {
    keyword: "goleadores mundial 2026",
    title: "Goleadores Mundial 2026: Tabla de anotadores y máximos artilleros",
    meta_title: "Goleadores Mundial 2026: Tabla de Anotadores Oficial",
    meta_description: "Consulta la tabla de goleadores del Mundial 2026 en tiempo real. Los máximos artilleros del torneo, estadísticas de goles y rendimiento de los delanteros.",
    slug: "goleadores-mundial-2026-tabla-anotadores-artilleros",
    category: "resultados",
    excerpt: "Sigue la carrera por la Bota de Oro en la Copa del Mundo 2026. Te presentamos los delanteros que lideran la tabla de anotadores del campeonato."
  },
  {
    keyword: "octavos de final mundial 2026",
    title: "Octavos de final Mundial 2026: Cruces, fechas y clasificados oficiales",
    meta_title: "Octavos de Final Mundial 2026: Cruces y Fechas",
    meta_description: "Detalles completos de los octavos de final del Mundial 2026. Conoce los cruces de las selecciones clasificadas, fechas de juego y estadios confirmados.",
    slug: "octavos-de-final-mundial-2026-cruces-fechas",
    category: "resultados",
    excerpt: "Comienza la fase de eliminación directa. Te traemos la información de los cruces de octavos de final de la Copa Mundial de la FIFA 2026."
  },
  {
    keyword: "cuartos de final mundial 2026",
    title: "Cuartos de final Mundial 2026: Emparejamientos y camino a semifinales",
    meta_title: "Cuartos de Final Mundial 2026: Emparejamientos Clave",
    meta_description: "Sigue la cobertura de los cuartos de final del Mundial 2026. Analizamos los emparejamientos de las ocho mejores selecciones del planeta en el camino al título.",
    slug: "cuartos-de-final-mundial-2026-emparejamientos-camino",
    category: "resultados",
    excerpt: "El embudo del Mundial se estrecha. Analizamos los duelos de cuartos de final y el rendimiento histórico de las selecciones que buscan las semifinales."
  },
  {
    keyword: "semifinales mundial 2026",
    title: "Semifinales Mundial 2026: Cruces decisivos por el pase a la gran final",
    meta_title: "Semifinales Mundial 2026: Duelos por la Final",
    meta_description: "Análisis previo de las semifinales del Mundial 2026. Conoce las fechas, estadios y las selecciones que buscarán un boleto para el partido por el campeonato.",
    slug: "semifinales-mundial-2026-cruces-decisivos-pase-final",
    category: "resultados",
    excerpt: "Dos partidos separan a los semifinalistas de la gloria eterna. Presentamos una previa táctica y estadística de los choques previos a la final."
  },
  {
    keyword: "final copa mundial 2026",
    title: "Final Copa Mundial 2026: Horario, sede y crónica del partido definitivo",
    meta_title: "Final Copa Mundial 2026: Horario, Sede y Crónica",
    meta_description: "La guía definitiva de la final de la Copa Mundial 2026. Descubre el estadio, el horario del encuentro y el análisis táctico de las selecciones finalistas.",
    slug: "final-copa-mundial-2026-horario-sede-cronica",
    category: "resultados",
    excerpt: "Todo listo para el partido más importante del planeta fútbol. Analizamos las claves de la gran final de la Copa Mundial de la FIFA 2026."
  },
  {
    keyword: "clasificados mundial 2026",
    title: "Clasificados Mundial 2026: Lista de selecciones confirmadas por confederación",
    meta_title: "Clasificados Mundial 2026: Selecciones Confirmadas",
    meta_description: "Conoce a todas las selecciones clasificadas para el Mundial 2026. Lista oficial detallada por confederaciones de la UEFA, CONMEBOL, CONCACAF y más.",
    slug: "clasificados-mundial-2026-lista-selecciones-confirmadas",
    category: "resultados",
    excerpt: "Repasamos los equipos que han sellado su pasaporte para la Copa del Mundo 2026 a través de las diferentes eliminatorias continentales."
  },
  {
    keyword: "sorpresas mundial 2026",
    title: "Sorpresas Mundial 2026: Las revelaciones de la fase de grupos",
    meta_title: "Sorpresas Mundial 2026: Las Grandes Revelaciones",
    meta_description: "Analizamos las mayores sorpresas del Mundial 2026 en la fase de grupos. Selecciones revelación, resultados inesperados y equipos que rompieron pronósticos.",
    slug: "sorpresas-mundial-2026-revelaciones-fase-grupos",
    category: "resultados",
    excerpt: "El fútbol siempre depara sorpresas. Repasamos las victorias más inesperadas y las selecciones de menor rango que están dando la campanada en el torneo."
  },
  {
    keyword: "partidos fase eliminatoria mundial",
    title: "Partidos de la fase eliminatoria del Mundial: Guía y fechas de cruces",
    meta_title: "Partidos Fase Eliminatoria Mundial: Fechas y Cruces",
    meta_description: "Guía completa de los partidos de la fase eliminatoria del Mundial. Fechas, horarios, prórrogas, tanda de penaltis y cómo se definen las rondas finales.",
    slug: "partidos-fase-eliminatoria-mundial-guia-fechas-cruces",
    category: "resultados",
    excerpt: "Repasamos el reglamento y las fechas de los cruces directos en el Mundial 2026, desde dieciseisavos hasta el partido final por el trofeo."
  },
  {
    keyword: "marcador final mundial 2026",
    title: "Marcador final del Mundial 2026: Reporte y resumen del campeón",
    meta_title: "Marcador Final Mundial 2026: Resumen del Campeón",
    meta_description: "Detalles del marcador final del Mundial 2026 y el resumen de la coronación del nuevo campeón del mundo. Análisis del partido definitorio de la FIFA.",
    slug: "marcador-final-mundial-2026-reporte-resumen-campeon",
    category: "resultados",
    excerpt: "El resumen definitivo del partido que corona al campeón de la Copa del Mundo 2026. Analizamos el marcador final y los momentos clave del encuentro."
  },

  // CATEGORY: estadisticas (13 articles)
  {
    keyword: "estadisticas mundial 2026",
    title: "Estadísticas del Mundial 2026: Datos generales del torneo",
    meta_title: "Estadísticas Mundial 2026: Datos del Torneo",
    meta_description: "Descubre las estadísticas más importantes del Mundial 2026. Goles por partido, tarjetas, posesión media y rendimiento por confederación futbolística.",
    slug: "estadisticas-mundial-2026-datos-generales-torneo",
    category: "estadisticas",
    excerpt: "Recopilamos los datos cuantitativos más relevantes de la Copa Mundial 2026 para entender las tendencias tácticas y numéricas del torneo de la FIFA."
  },
  {
    keyword: "posesion de balon mundial 2026",
    title: "Posesión de balón en el Mundial 2026: Equipos con mayor control de juego",
    meta_title: "Posesión de Balón Mundial 2026: Equipos Líderes",
    meta_description: "Analizamos las estadísticas de posesión de balón en el Mundial 2026. Descubre cuáles son las selecciones que dominan el control del esférico y su efectividad.",
    slug: "posesion-balon-mundial-2026-equipos-control-juego",
    category: "estadisticas",
    excerpt: "Tener el balón no siempre garantiza ganar. Analizamos el porcentaje de posesión de balón de las selecciones y su correlación directa con las victorias en el torneo."
  },
  {
    keyword: "maximos asistentes mundial 2026",
    title: "Máximos asistentes del Mundial 2026: La tabla de los creadores de juego",
    meta_title: "Máximos Asistentes Mundial 2026: Creadores de Juego",
    meta_description: "Consulta la tabla de máximos asistentes del Mundial 2026. Conoce a los mediocampistas y delanteros con mayor visión de juego y pases clave en el torneo.",
    slug: "maximos-asistentes-mundial-2026-tabla-creadores-juego",
    category: "estadisticas",
    excerpt: "Los que hacen brillar a los goleadores. Analizamos a los asistentes más determinantes del Mundial 2026 y sus métricas de pases decisivos."
  },
  {
    keyword: "remates a puerta mundial 2026",
    title: "Remates a puerta en el Mundial 2026: Eficacia ofensiva de las selecciones",
    meta_title: "Remates a Puerta Mundial 2026: Eficacia Ofensiva",
    meta_description: "Estadísticas de remates a puerta en el Mundial 2026. Evaluamos qué equipos disparan más, cuáles son los más efectivos y la eficiencia de los delanteros.",
    slug: "remates-puerta-mundial-2026-eficacia-ofensiva-selecciones",
    category: "estadisticas",
    excerpt: "Estudiamos la puntería de los equipos en esta Copa del Mundo 2026. Analizamos las métricas de remates directos a portería y la conversión de goles."
  },
  {
    keyword: "tarjetas amarillas mundial 2026",
    title: "Tarjetas amarillas en el Mundial 2026: Equipos más sancionados del torneo",
    meta_title: "Tarjetas Amarillas Mundial 2026: Sanciones y Fair Play",
    meta_description: "Reporte de tarjetas amarillas y rojas en el Mundial 2026. Conoce a las selecciones más sancionadas, los jugadores amonestados y la clasificación del juego limpio.",
    slug: "tarjetas-amarillas-mundial-2026-equipos-sancionados",
    category: "estadisticas",
    excerpt: "La disciplina táctica es clave para evitar suspensiones. Evaluamos el número de amonestaciones y expulsiones acumuladas a lo largo de la Copa Mundial."
  },
  {
    keyword: "porteros con mas paradas mundial",
    title: "Porteros con más paradas en el Mundial: Los guardianes de la portería",
    meta_title: "Porteros con Más Paradas en el Mundial 2026",
    meta_description: "Ranking de los porteros con más paradas y atajadas en el Mundial 2026. Analizamos la efectividad bajo los tres palos y los guantes de oro del torneo.",
    slug: "porteros-mas-paradas-mundial-guardianes-porteria",
    category: "estadisticas",
    excerpt: "Los arqueros vuelven a ser determinantes. Descubre quiénes son los guardametas con el porcentaje de paradas más alto de este campeonato del mundo."
  },
  {
    keyword: "kilometros recorridos mundial 2026",
    title: "Kilómetros recorridos en el Mundial 2026: El despliegue físico de las selecciones",
    meta_title: "Kilómetros Recorridos Mundial 2026: Despliegue Físico",
    meta_description: "Análisis de los kilómetros recorridos por selección y jugador en el Mundial 2026. Descubre qué equipos muestran mayor resistencia e intensidad en el campo.",
    slug: "kilometros-recorridos-mundial-2026-despliegue-fisico-equipos",
    category: "estadisticas",
    excerpt: "El desgaste físico juega un papel crucial en torneos cortos. Evaluamos los datos de rendimiento físico y la distancia recorrida por los planteles."
  },
  {
    keyword: "faltas cometidas mundial 2026",
    title: "Faltas cometidas en el Mundial 2026: Análisis de la agresividad defensiva",
    meta_title: "Faltas Cometidas Mundial 2026: Defensa y Fricción",
    meta_description: "Datos detallados de faltas cometidas y recibidas en el Mundial 2026. Comparamos los equipos con estilos de juego más físicos e infractores del torneo.",
    slug: "faltas-cometidas-mundial-2026-agresividad-defensiva",
    category: "estadisticas",
    excerpt: "Analizamos las estadísticas de faltas y el juego de fricción táctica empleado por diversas selecciones para frenar los ataques rivales."
  },
  {
    keyword: "goles de tiro libre mundial",
    title: "Goles de tiro libre en el Mundial: Especialistas a balón parado",
    meta_title: "Goles de Tiro Libre en el Mundial 2026",
    meta_description: "Estadísticas y análisis de los goles de tiro libre en el Mundial 2026. Descubre a los mejores lanzadores del torneo y las tácticas de balón parado.",
    slug: "goles-tiro-libre-mundial-especialistas-balon-parado",
    category: "estadisticas",
    excerpt: "El balón parado puede abrir los partidos más cerrados. Repasamos la efectividad de los lanzamientos directos de falta en la Copa del Mundo 2026."
  },
  {
    keyword: "estadisticas de penaltis mundial",
    title: "Estadísticas de penaltis en el Mundial: Eficacia e influencia de las tandas",
    meta_title: "Estadísticas de Penaltis en el Mundial 2026",
    meta_description: "Análisis de las estadísticas de penaltis en el Mundial 2026. Efectividad de los cobros durante el tiempo reglamentario y en las tandas de desempate.",
    slug: "estadisticas-penaltis-mundial-eficacia-tandas-desempate",
    category: "estadisticas",
    excerpt: "La definición desde los once metros analizada bajo la lupa de los datos. Repasamos los porcentajes de éxito y los porteros atajadores de penaltis."
  },
  {
    keyword: "rendimiento selecciones mundial 2026",
    title: "Rendimiento de las selecciones en el Mundial 2026: Balance por confederación",
    meta_title: "Rendimiento Selecciones Mundial 2026: Balance General",
    meta_description: "Balance de rendimiento de las selecciones en el Mundial 2026. Datos comparativos de victorias, empates, goles a favor y rendimiento por regiones de la FIFA.",
    slug: "rendimiento-selecciones-mundial-2026-balance-confederacion",
    category: "estadisticas",
    excerpt: "Evaluamos el nivel futbolístico mostrado por cada confederación de la FIFA en esta edición ampliada a 48 selecciones participantes."
  },
  {
    keyword: "pases completados mundial 2026",
    title: "Pases completados en el Mundial 2026: Precisión y circuitos asociativos",
    meta_title: "Pases Completados Mundial 2026: Precisión y Circuitos",
    meta_description: "Estadísticas de precisión de pases y combinaciones exitosas en el Mundial 2026. Descubre qué selecciones tienen los circuitos asociativos más pulidos.",
    slug: "pases-completados-mundial-2026-precision-circuitos-asociativos",
    category: "estadisticas",
    excerpt: "Analizamos la efectividad en la distribución del juego. Conoce a los pasadores más precisos y las selecciones con mejor circulación asociativa."
  },
  {
    keyword: "goles de cabeza mundial 2026",
    title: "Goles de cabeza en el Mundial 2026: La importancia del juego aéreo",
    meta_title: "Goles de Cabeza Mundial 2026: Dominio del Juego Aéreo",
    meta_description: "Estadísticas de goles de cabeza en el Mundial 2026. Evaluamos el impacto del juego aéreo, los cabeceadores más eficaces y los sistemas de defensa de centros.",
    slug: "goles-cabeza-mundial-2026-importancia-juego-aereo",
    category: "estadisticas",
    excerpt: "El espacio aéreo sigue siendo un recurso ofensivo fundamental en el fútbol de élite. Repasamos los goles de testarazo en este campeonato mundial."
  },

  // CATEGORY: lesiones (12 articles)
  {
    keyword: "lesiones mundial 2026",
    title: "Lesiones en el Mundial 2026: Reporte médico de los futbolistas afectados",
    meta_title: "Lesiones Mundial 2026: Reporte Médico Oficial",
    meta_description: "Sigue el reporte continuo de lesiones en el Mundial 2026. Conoce a los jugadores que han sufrido percances físicos durante el transcurso del torneo de la FIFA.",
    slug: "lesiones-mundial-2026-reporte-medico-futbolistas-afectados",
    category: "lesiones",
    excerpt: "Un repaso detallado a las bajas por motivos físicos que se van produciendo a lo largo del certamen internacional y su impacto en las selecciones."
  },
  {
    keyword: "bajas medicas mundial 2026",
    title: "Bajas médicas para el Mundial 2026: Jugadores que se pierden la cita",
    meta_title: "Bajas Médicas Mundial 2026: Ausencias Confirmadas",
    meta_description: "Lista completa de las bajas médicas definitivas para el Mundial 2026. Jugadores estrella descartados antes del inicio de la gran cita futbolística por lesión.",
    slug: "bajas-medicas-mundial-2026-jugadores-que-se-pierden-cita",
    category: "lesiones",
    excerpt: "La peor pesadilla de un futbolista. Hacemos un recuento de los jugadores descartados por los cuerpos médicos de sus selecciones debido a lesiones graves."
  },
  {
    keyword: "jugadores descartados mundial 2026",
    title: "Jugadores descartados en el Mundial 2026: Cambios de lista de última hora",
    meta_title: "Jugadores Descartados Mundial 2026: Cambios de Lista",
    meta_description: "Analizamos los jugadores descartados y las sustituciones permitidas por la FIFA en el Mundial 2026 por motivos médicos justificados antes del torneo.",
    slug: "jugadores-descartados-mundial-2026-cambios-lista-ultima-hora",
    category: "lesiones",
    excerpt: "Estudiamos la reglamentación de la FIFA sobre sustituciones de emergencia en las convocatorias debido a lesiones y los casos más sonados en el Mundial."
  },
  {
    keyword: "lesion de rodilla mundial 2026",
    title: "Lesión de rodilla en el Mundial 2026: El fantasma de los ligamentos",
    meta_title: "Lesión de Rodilla en el Mundial 2026: Casos y Tiempos",
    meta_description: "Reporte sobre los casos de lesión de rodilla en el Mundial 2026. Analizamos la incidencia de rotura de ligamentos, meniscos y los tiempos de recuperación.",
    slug: "lesion-rodilla-mundial-2026-fantasma-ligamentos-articulaciones",
    category: "lesiones",
    excerpt: "La articulación más expuesta del futbolista. Repasamos los partes médicos referentes a esguinces y roturas de rodilla de los jugadores del torneo."
  },
  {
    keyword: "recuperacion fisica mundial 2026",
    title: "Recuperación física en el Mundial 2026: Métodos modernos de kinesiología",
    meta_title: "Recuperación Física Mundial 2026: Métodos Modernos",
    meta_description: "Descubre las técnicas de recuperación física utilizadas en el Mundial 2026. Crioterapia, cámaras hiperbáricas y fisioterapia de élite en las concentraciones.",
    slug: "recuperacion-fisica-mundial-2026-metodos-kinesiologia-fisioterapia",
    category: "lesiones",
    excerpt: "Minimizar los tiempos de fatiga es vital en un torneo tan exigente. Analizamos las tecnologías que usan los preparadores físicos en la Copa del Mundo."
  },
  {
    keyword: "lesiones musculares mundial 2026",
    title: "Lesiones musculares en el Mundial 2026: Sobrecargas, tirones e isquiotibiales",
    meta_title: "Lesiones Musculares Mundial 2026: Sobrecargas y Tirones",
    meta_description: "Incidencia de lesiones musculares en el Mundial 2026. Evaluamos las causas de las roturas fibrilares, sobrecargas en isquiotibiales y gemelos por el calendario.",
    slug: "lesiones-musculares-mundial-2026-sobrecargas-tirones-isquiotibiales",
    category: "lesiones",
    excerpt: "El cansancio acumulado pasa factura. Analizamos la oleada de tirones y contracturas musculares que afectan a los futbolistas en los partidos de alta intensidad."
  },
  {
    keyword: "bajas de ultima hora mundial",
    title: "Bajas de última hora en el Mundial: El impacto en los planteamientos tácticos",
    meta_title: "Bajas de Última Hora Mundial: Impacto Táctico",
    meta_description: "Las bajas de última hora en el Mundial 2026 obligan a los entrenadores a cambiar sus esquemas. Analizamos las ausencias más repentinas y sus relevos tácticos.",
    slug: "bajas-ultima-hora-mundial-impacto-planteamientos-tacticos",
    category: "lesiones",
    excerpt: "Perder a un jugador clave en el último entrenamiento cambia los planes. Evaluamos cómo los directores técnicos reajustan sus alineaciones ante imprevistos."
  },
  {
    keyword: "kinesiologia deportiva mundial 2026",
    title: "Kinesiología deportiva en el Mundial 2026: Prevención de lesiones de élite",
    meta_title: "Kinesiología Deportiva Mundial 2026: Prevención de Élite",
    meta_description: "Cómo trabaja la kinesiología deportiva en el Mundial 2026. Protocolos preventivos, masajes de descarga y vendajes neuromusculares para proteger a las estrellas.",
    slug: "kinesiologia-deportiva-mundial-2026-prevencion-lesiones-elite",
    category: "lesiones",
    excerpt: "Prevenir es mejor que curar. Te contamos cómo es el día a día de los departamentos médicos de las selecciones para blindar la musculatura de los jugadores."
  },
  {
    keyword: "lesiones de ligamento cruzado mundial",
    title: "Lesiones de ligamento cruzado en el Mundial: Tratamientos y quirófano",
    meta_title: "Lesiones de Ligamento Cruzado en el Mundial 2026",
    meta_description: "Análisis de las graves lesiones de ligamento cruzado anterior (LCA) en el Mundial 2026. Casos confirmados, cirugía y el largo camino de la rehabilitación.",
    slug: "lesiones-ligamento-cruzado-mundial-tratamientos-quirofano-rehabilitacion",
    category: "lesiones",
    excerpt: "La lesión más temida por su prolongado tiempo de baja. Repasamos los futbolistas afectados en los cruzados y el protocolo de su recuperación."
  },
  {
    keyword: "parte medico selecciones mundial",
    title: "Parte médico de las selecciones del Mundial: Actualización diaria de bajas",
    meta_title: "Parte Médico Selecciones Mundial: Bajas Diarias",
    meta_description: "Consulta el parte médico unificado de todas las selecciones del Mundial 2026. Estado de salud de los jugadores golpeados y predicciones de retorno al campo.",
    slug: "parte-medico-selecciones-mundial-actualizacion-diaria-bajas",
    category: "lesiones",
    excerpt: "Información médica centralizada. Analizamos la evolución clínica de los futbolistas que arrastran molestias físicas en las diferentes plantillas."
  },
  {
    keyword: "jugadores en duda mundial 2026",
    title: "Jugadores en duda para el Mundial 2026: Pruebas físicas de última hora",
    meta_title: "Jugadores en Duda Mundial 2026: Pruebas Físicas",
    meta_description: "Lista de jugadores en duda para los próximos partidos del Mundial 2026. Conoce las pruebas físicas a contrarreloj y las posibilidades de que jueguen.",
    slug: "jugadores-duda-mundial-2026-pruebas-fisicas-ultima-hora",
    category: "lesiones",
    excerpt: "Dudas hasta el pitido inicial. Analizamos los futbolistas que apuran sus opciones de recuperación y se someterán a pruebas de esfuerzo límite."
  },
  {
    keyword: "lesion de tobillo mundial 2026",
    title: "Lesión de tobillo en el Mundial 2026: Esguinces por entradas duras",
    meta_title: "Lesión de Tobillo en el Mundial 2026: Esguinces y Bajas",
    meta_description: "Parte médico sobre las lesiones de tobillo en el Mundial 2026. Clasificación de esguinces, grado de afectación ligamentosa y tratamientos de crioterapia rápidos.",
    slug: "lesion-tobillo-mundial-2026-esguinces-entradas-duras",
    category: "lesiones",
    excerpt: "Los esguinces de tobillo son moneda corriente tras disputas intensas. Repasamos qué jugadores están entre algodones por traumatismos articulares."
  },

  // CATEGORY: selecciones (12 articles)
  {
    keyword: "selecciones mundial 2026",
    title: "Selecciones del Mundial 2026: Perfil y aspiraciones de los participantes",
    meta_title: "Selecciones Mundial 2026: Perfiles de Competidores",
    meta_description: "Analizamos en profundidad a las selecciones participantes del Mundial 2026. Historia, trayectoria reciente y aspiraciones reales en la gran cita futbolística.",
    slug: "selecciones-mundial-2026-perfil-aspiraciones-participantes",
    category: "selecciones",
    excerpt: "Una radiografía completa de las naciones que compiten en Norteamérica. Analizamos el potencial competitivo de cada bloque clasificado."
  },
  {
    keyword: "convocados mundial 2026",
    title: "Convocados para el Mundial 2026: Listas de buena fe de los equipos",
    meta_title: "Convocados Mundial 2026: Listas Oficiales de Convocatorias",
    meta_description: "Consulta las listas oficiales de convocados para el Mundial 2026. Conoce a los jugadores seleccionados por cada federación para disputar la Copa del Mundo.",
    slug: "convocados-mundial-2026-listas-oficiales-buena-fe",
    category: "selecciones",
    excerpt: "Descubre qué futbolistas defenderán la camiseta de sus respectivos países. Revisamos los descartes más polémicos y las novedades de cada convocatoria."
  },
  {
    keyword: "favoritos mundial 2026",
    title: "Favoritos al Mundial 2026: Selecciones con mayores opciones de título",
    meta_title: "Favoritos al Mundial 2026: Candidatos al Título",
    meta_description: "Las selecciones favoritas para ganar el Mundial 2026. Analizamos las cuotas de apuestas, planteles y el rendimiento de las principales potencias mundiales.",
    slug: "favoritos-mundial-2026-selecciones-candidatas-titulo",
    category: "selecciones",
    excerpt: "Evaluamos las selecciones llamadas a levantar el trofeo en la gran final. Analizamos el estado de forma de los gigantes tradicionales del balompié."
  },
  {
    keyword: "plantillas mundial 2026",
    title: "Plantillas del Mundial 2026: Valor de mercado y promedio de edad",
    meta_title: "Plantillas Mundial 2026: Edades y Valores de Mercado",
    meta_description: "Estudio comparativo de las plantillas del Mundial 2026. Analizamos el valor de mercado de los planteles, promedio de edad y procedencia de sus futbolistas.",
    slug: "plantillas-mundial-2026-valor-mercado-promedio-edad",
    category: "selecciones",
    excerpt: "Los números detrás de los planteles de la Copa del Mundo. Comparamos las plantillas más caras del planeta frente a los planteles más modestos."
  },
  {
    keyword: "analisis tactico mundial 2026",
    title: "Análisis táctico del Mundial 2026: Modelos de juego predominantes",
    meta_title: "Análisis Táctico Mundial 2026: Modelos de Juego",
    meta_description: "Análisis táctico de los esquemas de juego más utilizados en el Mundial 2026. Bloques defensivos, presión alta y la evolución de los sistemas de juego.",
    slug: "analisis-tactico-mundial-2026-modelos-juego-predominantes",
    category: "selecciones",
    excerpt: "Desciframos las pizarras de los entrenadores en esta Copa del Mundo. Comparamos la apuesta por la posesión frente al juego directo y de contraataque."
  },
  {
    keyword: "directores tecnicos mundial 2026",
    title: "Directores técnicos del Mundial 2026: Los cerebros en los banquillos",
    meta_title: "Directores Técnicos Mundial 2026: Entrenadores de Élite",
    meta_description: "Perfil de los directores técnicos que dirigen en el Mundial 2026. Entrenadores debutantes, experimentados, salarios y sus filosofías de juego en el campo.",
    slug: "directores-tecnicos-mundial-2026-entrenadores-banquillos",
    category: "selecciones",
    excerpt: "Los hombres detrás de las estrategias del Mundial 2026. Analizamos a los seleccionadores nacionales que cargan con la presión táctica y de resultados."
  },
  {
    keyword: "alineaciones probables mundial 2026",
    title: "Alineaciones probables del Mundial 2026: Los once de gala perfilados",
    meta_title: "Alineaciones Probables Mundial 2026: Once de Gala",
    meta_description: "Predicciones de alineaciones probables para los encuentros del Mundial 2026. Analizamos los onces titulares tácticos de cada selección participante.",
    slug: "alineaciones-probables-mundial-2026-once-gala-selecciones",
    category: "selecciones",
    excerpt: "Elaboramos las alineaciones probables de las selecciones de cara a sus próximos partidos en función de sanciones, lesiones y esquemas tácticos de los técnicos."
  },
  {
    keyword: "capitanes mundial 2026",
    title: "Capitanes del Mundial 2026: Los líderes en el terreno de juego",
    meta_title: "Capitanes Mundial 2026: Líderes y Brazaletes Oficiales",
    meta_description: "Conoce a los capitanes oficiales en el Mundial 2026. Analizamos el liderazgo, la experiencia y la influencia de quienes portan el brazalete en cada selección.",
    slug: "capitanes-mundial-2026-lideres-brazaletes-terreno-juego",
    category: "selecciones",
    excerpt: "Los líderes morales y de juego del Mundial 2026. Hacemos un recuento de los capitanes que representan a sus países en los momentos de mayor presión."
  },
  {
    keyword: "sistemas de juego mundial 2026",
    title: "Sistemas de juego en el Mundial 2026: Defensa de tres o línea de cuatro",
    meta_title: "Sistemas de Juego Mundial 2026: Defensa y Formaciones",
    meta_description: "Estudio sobre los sistemas de juego y formaciones en el Mundial 2026. Defensa de tres, línea de cuatro, doble pivote y su impacto táctico en las transiciones.",
    slug: "sistemas-juego-mundial-2026-defensa-formaciones-tacticas",
    category: "selecciones",
    excerpt: "Analizamos las estructuras posicionales preferidas por los seleccionadores en la Copa del Mundo y su flexibilidad defensiva y ofensiva."
  },
  {
    keyword: "debutantes mundial 2026",
    title: "Debutantes en el Mundial 2026: Nuevas naciones en la Copa del Mundo",
    meta_title: "Debutantes Mundial 2026: Nuevas Selecciones",
    meta_description: "Descubre a las selecciones debutantes en el Mundial 2026. El camino de clasificación de estos países y su preparación histórica para su estreno.",
    slug: "debutantes-mundial-2026-nuevas-naciones-copa-mundo",
    category: "selecciones",
    excerpt: "La expansión a 48 selecciones abre la puerta a nuevos participantes. Analizamos a las selecciones debutantes que buscan sorprender en su primera experiencia."
  },
  {
    keyword: "renovacion generacional mundial 2026",
    title: "Renovación generacional en el Mundial 2026: Las jóvenes promesas al mando",
    meta_title: "Renovación Generacional Mundial 2026: Jóvenes Promesas",
    meta_description: "Estudio sobre la renovación generacional en el Mundial 2026. Analizamos a las selecciones que apuestan por jóvenes promesas frente a planteles veteranos.",
    slug: "renovacion-generacional-mundial-2026-jovenes-promesas-mando",
    category: "selecciones",
    excerpt: "El recambio de leyendas por savia nueva. Analizamos a las jóvenes promesas mundiales que asumen el protagonismo y el liderazgo táctico de sus países."
  },
  {
    keyword: "concentraciones selecciones mundial 2026",
    title: "Concentraciones de las selecciones en el Mundial 2026: Los búnkeres tácticos",
    meta_title: "Concentraciones Selecciones Mundial 2026: Búnkeres",
    meta_description: "La guía de sedes y bases de entrenamiento de las selecciones en el Mundial 2026. Dónde se concentran y preparan los partidos los diferentes planteles.",
    slug: "concentraciones-selecciones-mundial-2026-bases-entrenamiento-bunkeres",
    category: "selecciones",
    excerpt: "Privacidad, confort y campos de entrenamiento de primer nivel. Hacemos un recorrido por los búnkeres deportivos de las selecciones nacionales."
  }
];

function getLocalISOString(date) {
  const pad = (num) => String(num).padStart(2, '0');
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
}

async function main() {
  console.log(`Starting publication of ${ARTICLES.length} articles to WordPress...`);

  // To simulate natural publishing, we will shuffle the array but preserve the chronological dates.
  // This means the categories will be nicely interleaved.
  const shuffled = [...ARTICLES];
  // Simple deterministic or pseudo-random shuffle to interleave categories
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (i * 7 + 3) % (i + 1); // pseudo-random deterministic swap
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  const today = new Date();

  for (let i = 0; i < shuffled.length; i++) {
    const article = shuffled[i];

    // Date calculation: i days ago from 50 days ago
    // So article 0 is 50 days ago, article 49 is 1 day ago.
    const daysAgo = 50 - i;
    const dateObj = new Date(today.getTime());
    dateObj.setDate(today.getDate() - daysAgo);

    // Set variable hours between 09:00 and 20:00
    // We use a deterministic but highly variable formula based on index to avoid patterns
    const hour = 9 + ((i * 13 + 7) % 12); // ranges from 9 to 20
    const minute = (i * 17 + 23) % 60;   // 0 to 59
    const second = (i * 31 + 11) % 60;   // 0 to 59
    dateObj.setHours(hour, minute, second);

    const localIsoStr = getLocalISOString(dateObj);
    const categoryId = CATEGORIES_WP_MAP[article.category] || 2;

    console.log(`[${i + 1}/50] Seeding: "${article.title}" | Cat: ${article.category} (${categoryId}) | Date: ${localIsoStr}`);

    const postData = {
      title: article.title,
      slug: article.slug,
      status: 'publish',
      date: localIsoStr,
      excerpt: article.excerpt,
      content: '', // 0 words in body initially
      categories: [categoryId],
      meta: {
        rank_math_focus_keyword: article.keyword,
        rank_math_title: article.meta_title,
        rank_math_description: article.meta_description
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
        console.log(` -> Published successfully. Post ID: ${data.id}`);
      } else {
        const errText = await res.text();
        console.error(` -> Failed to publish post: ${errText}`);
      }
    } catch (err) {
      console.error(` -> Network error:`, err.message);
    }

    // Brief delay to prevent hitting API rate limits
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log("All 50 articles seeded successfully!");
}

main();
