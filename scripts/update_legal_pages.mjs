import './loadEnv.mjs';
import { authHeader, apiUrl } from './loadEnv.mjs';

const formId = 9;

// Páginas legales con redacción original, misma función legal, misma longitud y más o menos las mismas palabras
const legalPagesData = [
  {
    slug: 'sobre-nosotros',
    title: 'Sobre Nosotros',
    content: `
<h2>Sobre Nosotros</h2>

<p><strong>Golazos</strong> (golazos.co) fue concebida y fundada en 2025 con la firme determinación de brindar análisis minuciosos, transparentes y de máximo rigor editorial sobre el balompié internacional, la táctica deportiva y el rendimiento futbolístico. En un panorama mediático frecuentemente dominado por la polémica superficial, el rumor efímero y la inmediatez sensacionalista, en Golazos apostamos decididamente por la reflexión fundamentada, el estudio exhaustivo de las pizarras y la divulgación sustentada en datos contrastables.</p>

<p>Nuestro propósito central es facilitar a los aficionados, técnicos y seguidores del deporte rey las herramientas analíticas indispensables para comprender las dinámicas del juego moderno, a través de investigaciones periodísticas independientes, desgloses tácticos pedagógicos y guías formativas de aplicación real en el terreno de juego.</p>

<h3>Nuestro origen</h3>
<p>Golazos surgió inicialmente como una iniciativa editorial impulsada por <strong>Manuel López Ramos</strong>, originada ante la notable carencia de plataformas en español dedicadas al análisis táctico y reglamentario con un enfoque metódico y documentado. A lo largo del tiempo, la publicación ha crecido y madurado hasta consolidarse como un espacio de referencia dedicado a la divulgación deportiva de calidad, el estudio del arbitraje contemporáneo y la creación de contenidos de alto valor didáctico para la comunidad de entusiastas del fútbol.</p>

<h3>Sobre el fundador</h3>
<p>Manuel López Ramos aporta una dilatada trayectoria de estudio y seguimiento continuado en el ámbito del fútbol profesional, las metodologías de entrenamiento y la evolución táctica de los sistemas de juego, combinando una perspectiva formativa a largo plazo con el examen minucioso del comportamiento táctico y técnico de los equipos de élite.</p>
<p>Su filosofía de trabajo se articula en torno a tres directrices esenciales:</p>
<ul>
<li>Compromiso con el rigor frente a la improvisación y el debate superficial.</li>
<li>Comprobación sistemática de fuentes reglamentarias y datos estadísticos oficiales.</li>
<li>Vocación instructiva y analítica orientada al aprendizaje constante del lector.</li>
</ul>
<p>Vía de contacto directo: <a href="mailto:manuellopezramos@golazos.co">manuellopezramos@golazos.co</a></p>

<h3>Nuestra metodología</h3>
<ul>
<li>Trabajamos exclusivamente con estadísticas deportivas oficiales, actas arbitrales y fuentes públicas contrastadas.</li>
<li>Revisamos y actualizamos nuestras publicaciones y normativas de manera continuada.</li>
<li>Priorizamos la imparcialidad y la claridad conceptual sobre el sensacionalismo deportivo.</li>
<li>Preservamos una estricta autonomía editorial, sin condicionamientos derivados de intereses de clubes, patrocinadores comerciales ni presiones mediáticas.</li>
</ul>

<h3>A quién nos dirigimos</h3>
<p>Nuestras publicaciones están pensadas para entrenadores, analistas, jugadores y cualquier aficionado que desee explorar el fútbol desde un prisma analítico, pedagógico y estructurado.</p>

<h3>Valores</h3>
<p>La integridad informativa, la independencia crítica y la excelencia pedagógica constituyen las columnas fundamentales sobre las que descansa el proyecto editorial de Golazos.</p>

<h3>Aviso legal</h3>
<p>Los artículos y guías difundidos en este portal tienen una finalidad estrictamente pedagógica, divulgativa y deportiva, sin constituir asesoramiento técnico o profesional vinculante. Cada lector asume la responsabilidad de las conclusiones y decisiones derivadas de su lectura.</p>

<h3>Contacto</h3>
<ul>
<li>Sede y correspondencia: Calle Blas Infante, Córdoba, España.</li>
<li>Correo electrónico: <a href="mailto:contacto@golazos.co">contacto@golazos.co</a></li>
<li>Plazo habitual de respuesta: 24 a 48 horas laborables.</li>
</ul>
`
  },
  {
    slug: 'manuel-lopez-ramos',
    title: 'Manuel López Ramos',
    content: `
<h2>Manuel López Ramos</h2>

<p>Fundador de <strong>Golazos</strong>, director de publicación y analista deportivo especializado en táctica futbolística, preparación física aplicada y reglamentación oficial del arbitraje.</p>

<h3>Experiencia y Trayectoria:</h3>
<ul>
<li>Múltiples años dedicados a la investigación, observación analítica y divulgación especializada en el entorno del fútbol moderno y las principales competiciones continentales.</li>
<li>Especial atención al estudio estratégico de sistemas tácticos, modelos de juego posicional y dinámicas de rendimiento de alto nivel.</li>
<li>Interés preferente en la formación reglamentaria (directrices IFAB y protocolos VAR) y en la divulgación pedagógica para la comunidad deportiva.</li>
</ul>

<h3>Metodología Editorial:</h3>
<ul>
<li>Investigación analítica fundamentada en métricas avanzadas, reglamentos oficiales y fuentes documentadas.</li>
<li>Enfoque estrictamente divulgativo, didáctico y transparente.</li>
<li>Rechazo frontal de la crispación artificial, el amarillismo informativo y los juicios no contrastados.</li>
</ul>

<p>Este perfil corporativo responde al compromiso firme de Golazos con la trazabilidad, la transparencia editorial y el rigor profesional frente a sus lectores.</p>

<h3>Contacto Directo:</h3>
<ul>
<li>Correo profesional: <a href="mailto:manuellopezramos@golazos.co">manuellopezramos@golazos.co</a></li>
<li>Dirección postal: Calle Blas Infante, Córdoba, España.</li>
</ul>
`
  },
  {
    slug: 'contactanos',
    title: 'Contáctanos',
    content: `
<h2>Atención al Lector y Contacto Oficial</h2>

<p>En <strong>Golazos</strong> fomentamos un canal de comunicación permanente, fluido y cercano con nuestra comunidad de lectores, analistas y profesionales del deporte. Si deseas hacernos llegar sugerencias editoriales, proponer el análisis de un esquema táctico o partido concreto, remitir dudas sobre la normativa arbitral o plantear iniciativas de colaboración, puedes comunicarte con nuestro equipo mediante el formulario habilitado a continuación:</p>

[contact-form-7 id="${formId}" title="Formulario de contacto 1"]

<h3>Canales de Comunicación Alternativos:</h3>
<ul>
<li>Correo electrónico para consultas generales y soporte: <a href="mailto:contacto@golazos.co">contacto@golazos.co</a></li>
<li>Dirección editorial y correspondencia directa con la dirección: <a href="mailto:manuellopezramos@golazos.co">manuellopezramos@golazos.co</a></li>
<li>Domicilio postal oficial: Manuel López Ramos, Calle Blas Infante, Córdoba, España.</li>
<li>Plazo estimado de atención: entre 24 y 48 horas hábiles.</li>
</ul>
`
  },
  {
    slug: 'politica-de-privacidad',
    title: 'Política de Privacidad',
    content: `
<h2>POLÍTICA DE PRIVACIDAD – GOLAZOS</h2>
<p><strong>Sitio web:</strong> golazos.co<br>
<strong>Correo de contacto:</strong> <a href="mailto:contacto@golazos.co">contacto@golazos.co</a><br>
<strong>Última actualización:</strong> Octubre de 2026</p>

<h3>1. Responsable del tratamiento</h3>
<p>El responsable legal del tratamiento de los datos personales recopilados a través de este portal es:</p>
<ul>
<li><strong>Titular:</strong> Manuel López Ramos</li>
<li><strong>NIF:</strong> 45841212S</li>
<li><strong>Domicilio fiscal:</strong> Calle Blas Infante, Córdoba, España</li>
<li><strong>Correo electrónico:</strong> <a href="mailto:manuellopezramos@golazos.co">manuellopezramos@golazos.co</a></li>
</ul>

<h3>2. Datos personales que se recopilan</h3>
<p>A través de la interacción con el presente sitio web, pueden recabarse las siguientes categorías de datos personales:</p>
<ul>
<li>Información suministrada voluntariamente por el usuario mediante los formularios de contacto (nombre y dirección de correo electrónico).</li>
<li>Metadatos técnicos y de conectividad, tales como dirección IP, características del dispositivo, navegador utilizado y registro de páginas consultadas.</li>
<li>Parámetros capturados a través de cookies y herramientas de seguimiento, conforme a lo establecido en nuestra Política de Cookies.</li>
</ul>
<p>En ningún caso se solicitan ni almacenan datos bancarios, números de tarjeta de crédito ni información financiera de carácter sensible.</p>

<h3>3. Finalidad del tratamiento de los datos</h3>
<p>La información recopilada se destina a los siguientes propósitos legítimos:</p>
<ul>
<li>Tramitar y responder a los mensajes, consultas y peticiones remitidas por los usuarios.</li>
<li>Administrar las comunicaciones institucionales relativas a la actividad editorial de la web.</li>
<li>Optimizar la usabilidad, velocidad y experiencia global de navegación.</li>
<li>Gestionar la entrega de anuncios publicitarios personalizados y contextuales a través del programa Google AdSense.</li>
<li>Elaborar análisis estadísticos agregados sobre la audiencia y el tráfico web para mejorar nuestros contenidos.</li>
</ul>

<h3>4. Base legal del tratamiento</h3>
<p>La licitud del tratamiento de sus datos se sustenta en:</p>
<ul>
<li>El consentimiento libre, específico, informado e inequívoco otorgado por el usuario al enviar formularios o configurar cookies.</li>
<li>El interés legítimo del titular en garantizar la seguridad del sitio web y medir de forma básica su funcionamiento.</li>
<li>El cumplimiento riguroso de las obligaciones legales aplicables en virtud del RGPD y la normativa española.</li>
</ul>

<h3>5. Publicidad y Google AdSense</h3>
<p>Este portal digital implementa la plataforma Google AdSense con fines de monetización publicitaria. Google LLC y sus socios certificados pueden emplear identificadores y cookies con el fin de:</p>
<ul>
<li>Servir inserciones publicitarias adaptadas o no personalizadas según el perfil de navegación.</li>
<li>Cuantificar el rendimiento, visibilidad e impacto de las campañas publicitarias.</li>
<li>Prevenir la exposición reiterada a los mismos anuncios por parte de un mismo usuario.</li>
</ul>
<p>El usuario tiene la potestad de configurar y desactivar la personalización publicitaria en cualquier instante desde: <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer external">https://adssettings.google.com/</a></p>

<h3>6. Uso de cookies</h3>
<p>El sitio web recurre al empleo de cookies propias y provistas por terceros con finalidades técnicas, estadísticas y comerciales. Las condiciones de uso de dichos mecanismos se encuentran pormenorizadas en la Política de Cookies, donde el usuario puede otorgar, revocar o modular sus preferencias en cualquier fase de su navegación.</p>

<h3>7. Conservación de los datos</h3>
<p>La información personal facilitada se custodiará con las debidas garantías técnicas exclusivamente durante el lapso necesario para atender la consulta formulada o mientras permanezcan vigentes exigencias y plazos de prescripción legales.</p>

<h3>8. Comunicación de datos a terceros</h3>
<p>Los datos podrán ser accesibles o tratados por encargados de tratamiento estrictamente necesarios para la operatividad del sitio web:</p>
<ul>
<li>Google LLC (servicios de analítica Google Analytics 4 y red publicitaria Google AdSense).</li>
<li>Empresas proveedoras de alojamiento web (hosting), infraestructura de servidores y mantenimiento informático.</li>
</ul>
<p>Dichas entidades pueden procesar la información en territorios situados fuera del Espacio Económico Europeo al amparo de instrumentos y garantías contractuales adecuadas homologadas por la Comisión Europea.</p>

<h3>9. Derechos del usuario (RGPD)</h3>
<p>Conforme al Reglamento General de Protección de Datos (UE) 2016/679, el usuario ostenta los derechos de:</p>
<ul>
<li>Acceso a sus datos objeto de tratamiento.</li>
<li>Rectificación de datos inexactos o incompletos.</li>
<li>Supresión ("derecho al olvido") cuando los datos ya no resulten necesarios.</li>
<li>Limitación del alcance del tratamiento en supuestos tasados.</li>
<li>Oposición al tratamiento por motivos vinculados a su situación particular.</li>
<li>Portabilidad de los datos hacia otro responsable en formato estructurado.</li>
</ul>
<p>Para ejercitar cualquiera de estas facultades, bastará con remitir comunicación por escrito adjuntando documento acreditativo de identidad a: <a href="mailto:contacto@golazos.co">contacto@golazos.co</a>. Asimismo, el usuario tiene expedito el derecho a presentar reclamación formal ante la Agencia Española de Protección de Datos (AEPD).</p>

<h3>10. Seguridad de los datos</h3>
<p>El portal adopta medidas de seguridad técnicas y organizativas de vanguardia orientadas a preservar la confidencialidad de la información y prevenir su adulteración, extravío o acceso no autorizado, incluyendo:</p>
<ul>
<li>Cifrado integral de las comunicaciones mediante protocolo criptográfico HTTPS (SSL/TLS).</li>
<li>Restricción selectiva y autenticación reforzada en los accesos de administración.</li>
<li>Mecanismos perimetrales y cortafuegos de protección de servidores.</li>
</ul>

<h3>11. Menores de edad</h3>
<p>Nuestros servicios informativos no están enfocados a personas menores de 14 años. En ningún momento recabamos intencionadamente información referente a menores. En el supuesto de acreditarse la recepción de datos de un menor sin la preceptiva autorización tutelar, se procederá a su eliminación inmediata.</p>

<h3>12. Transferencias internacionales</h3>
<p>Determinados colaboradores tecnológicos, señaladamente Google, pueden almacenar registros en servidores situados fuera del ámbito territorial europeo. En tales situaciones, dichas transferencias operan bajo el marco de las Cláusulas Contractuales Tipo o mecanismos reconocidos internacionalmente de conformidad con el RGPD.</p>

<h3>13. Modificaciones en la política</h3>
<p>El responsable se reserva la facultad de adaptar la presente Política de Privacidad frente a modificaciones normativas, criterios jurisprudenciales o innovaciones técnicas en la web. El documento accesible en esta página reflejará siempre la versión vigente en cada momento.</p>

<h3>14. Contacto</h3>
<p>Para resolver cualquier consulta, duda o aclaración acerca de la presente política de privacidad, puede dirigirse a: <a href="mailto:contacto@golazos.co">contacto@golazos.co</a></p>
`
  },
  {
    slug: 'politica-de-cookies',
    title: 'Política de Cookies',
    content: `
<h2>POLÍTICA DE COOKIES – GOLAZOS</h2>
<p><strong>Última actualización:</strong> Octubre de 2026</p>

<h3>Resumen</h3>
<p><strong>Golazos</strong> (golazos.co) emplea cookies propias y gestionadas por terceros para posibilitar el correcto funcionamiento técnico de la plataforma, examinar el comportamiento de navegación de los lectores y, cuando corresponda, gestionar la inserción de espacios publicitarios. El usuario cuenta en todo instante con la posibilidad de aceptar, desestimar o configurar el uso de estas herramientas desde el panel de consentimiento habilitado en la cabecera o pie de página. Para información ampliada acerca del tratamiento de sus datos personales, le invitamos a revisar nuestra Política de Privacidad.</p>

<h3>¿Qué son las cookies?</h3>
<p>Las cookies son pequeños ficheros de texto plano que los portales web transmiten al navegador del dispositivo utilizado al visitarlos. Su cometido primordial es garantizar la operativa del servicio y recopilar parámetros estadísticos o técnicos de la navegación. Estas tecnologías almacenan identificadores anónimos, selecciones de idioma o preferencias del usuario orientadas a optimizar la experiencia interactiva en visitas sucesivas.</p>

<h3>Tipos de cookies utilizadas</h3>

<h4>A. Cookies técnicas (estrictamente necesarias)</h4>
<p>Resultan indispensables para asegurar la operatividad, navegabilidad y seguridad estructural del sitio web, por lo que no demandan consentimiento previo del usuario. Permiten funciones elementales como:</p>
<ul>
<li>Almacenar la selección del usuario en relación con el banner de consentimiento de cookies.</li>
<li>Garantizar la estabilidad y mitigación de amenazas de ciberseguridad en el servidor.</li>
<li>Posibilitar la correcta recepción y envío de los formularios de contacto.</li>
</ul>
<p>Estas cookies técnicas no se destinan a finalidades publicitarias ni a la monitorización individual del usuario.</p>

<h4>B. Cookies de análisis y medición</h4>
<p>Se orientan a estudiar de forma cuantitativa y agregada la manera en que los visitantes interactúan con los artículos de Golazos, posibilitando la mejora continua de la línea editorial.</p>
<p><strong>Herramienta:</strong> Google Analytics 4 (identificadores <code>_ga</code>, <code>_gid</code> y complementarios).<br>
<strong>Objetivos:</strong></p>
<ul>
<li>Medición de afluencia, volumen de sesiones y páginas leídas.</li>
<li>Detección de patrones temporales de lectura e itinerarios de navegación.</li>
<li>Evaluación y perfeccionamiento de la estructura informativa del sitio.</li>
</ul>
<p>La información es procesada de manera agregada y se encuentra sujeta a los estándares de privacidad de Google LLC.</p>

<h4>C. Cookies publicitarias</h4>
<p>En el supuesto de encontrarse activadas, servicios publicitarios gestionados por Google AdSense pueden emplear cookies destinadas a:</p>
<ul>
<li>Servir piezas publicitarias contextualizadas o personalizadas según intereses.</li>
<li>Auditar la efectividad de los anuncios mostrados.</li>
<li>Evitar la reiteración molesta de un mismo anuncio frente a un mismo lector.</li>
</ul>
<p>Estas cookies pueden nutrirse de la navegación efectuada en este y otros entornos digitales de internet.</p>

<h4>D. Cookies de terceros e incrustaciones</h4>
<p>Ciertos recursos integrados en nuestras publicaciones (como infografías interactivas, vídeos o plataformas sociales) pueden generar la descarga de cookies administradas por sus respectivos proveedores, sujetas a sus políticas particulares de privacidad.</p>

<h3>Cookies utilizadas en este sitio</h3>
<p>A título informativo y orientativo, el portal puede hacer uso de las siguientes cookies:</p>
<ul>
<li><code>cookie_consent</code>: administración y persistencia de las preferencias del panel de consentimiento.</li>
<li><code>_ga</code>: medición estadística global de visitantes únicos (Google Analytics).</li>
<li><code>_gid</code>: diferenciación y agrupación de sesiones de lectura (Google Analytics).</li>
<li><code>IDE</code>: orientación y medición de impactos publicitarios en la red de Google AdSense.</li>
</ul>
<p>El catálogo exacto puede experimentar oscilaciones puntuales según los módulos y herramientas técnicas habilitadas en cada fecha.</p>

<h3>Gestión y modulación del consentimiento</h3>
<p>Al acceder por primera ocasión al portal web, el lector dispone de la opción de:</p>
<ul>
<li>Prestar consentimiento a la totalidad de cookies.</li>
<li>Rechazar en bloque todas aquellas cookies de carácter no esencial.</li>
<li>Parametrizar detalladamente sus elecciones según la tipología de cookie.</li>
</ul>
<p>Dicho consentimiento puede ser reconfigurado en cualquier instante posterior accediendo al enlace "Configuración de cookies" ubicado en el pie del sitio web. Ninguna cookie no esencial se descarga ni procesa con anterioridad a que el usuario otorgue su aceptación expresa. El sistema opera de manera compatible y homologada con el protocolo Google Consent Mode v2.</p>

<h3>Cómo desactivar o eliminar las cookies</h3>
<p>Cualquier lector puede restringir, bloquear o suprimir las cookies almacenadas configurando las preferencias de su respectivo navegador web (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, Opera). Conviene reseñar que la desactivación de cookies técnicas esenciales puede impedir la correcta visualización de determinados elementos de la web.</p>

<h3>Tratamiento por entidades terceras</h3>
<p>Determinados proveedores tecnológicos externos, singularmente Google LLC, pueden acceder a métricas procedentes de cookies para tareas analíticas y difusión publicitaria, actuando como responsables autónomos bajo sus propias políticas. Golazos no recopila ni accede de manera directa a información nominativa combinada de dichos proveedores.</p>

<h3>Menores de edad</h3>
<p>Este espacio digital no está orientado específicamente a menores de 13 años. No se efectúa recopilación deliberada de datos de menores sin la correspondiente anuencia conforme al marco legal vigente.</p>

<h3>Actualizaciones</h3>
<p>La presente Política de Cookies podrá ser actualizada periódicamente para reflejar adaptaciones normativas, criterios de las agencias de control o mejoras en la arquitectura técnica de la web. La fecha de revisión incorporada al inicio constatará la vigencia del texto.</p>
`
  },
  {
    slug: 'aviso-legal',
    title: 'Aviso Legal',
    content: `
<h2>AVISO LEGAL – GOLAZOS</h2>
<p><strong>Última actualización:</strong> Octubre de 2026</p>

<h3>Identificación del titular del sitio web (LSSI-CE)</h3>
<p>En estricto cumplimiento de las previsiones contenidas en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se hace constar formalmente que la titularidad del portal web <strong>golazos.co</strong> corresponde a:</p>
<ul>
<li><strong>Titular:</strong> Manuel López Ramos</li>
<li><strong>NIF:</strong> 45841212S</li>
<li><strong>Domicilio:</strong> Calle Blas Infante, Córdoba, España</li>
<li><strong>Correo electrónico institucional:</strong> <a href="mailto:contacto@golazos.co">contacto@golazos.co</a></li>
</ul>
<p>Esta información legitima e identifica fehacientemente al titular de la plataforma digital a todos los efectos jurídicos oportunos.</p>

<h3>Finalidad del sitio web</h3>
<p><strong>Golazos</strong> es una plataforma editorial de carácter divulgativo, técnico y formativo especializada en:</p>
<ul>
<li>Análisis de táctica futbolística, modelos de juego y sistemas estratégicos del balompié contemporáneo.</li>
<li>Divulgación rigurosa de las Reglas de Juego de la IFAB, directrices arbitrales y funcionamiento de la tecnología VAR.</li>
<li>Guías especializadas sobre metodología de entrenamiento, preparación atlética y rendimiento físico para futbolistas.</li>
<li>Seguimiento de torneos mayores, eliminatorias continentales y cultura deportiva internacional.</li>
</ul>
<p>Toda la información expuesta tiene un propósito formativo y divulgativo de naturaleza general.</p>

<h3>Exención de responsabilidad – Carácter estrictamente informativo y no vinculante</h3>
<p>Los textos, desgloses tácticos, artículos y opiniones vertidas en Golazos no representan en caso alguno dictámenes profesionales vinculantes, asesoramiento médico deportivo prescriptivo, consejos legales ni recomendaciones de apuestas o inversión económica. Las informaciones publicadas poseen alcance pedagógico genérico y no contemplan las particularidades personales o de salud de cada individuo. Cualquier actuación, pauta de entrenamiento o determinación adoptada por el lector se efectúa bajo su entera y exclusiva responsabilidad, sin que el titular garantice resultados de ninguna índole derivados de la asimilación de dichos contenidos.</p>

<h3>Riesgo de la actividad física y deportiva</h3>
<p>La práctica deportiva, la ejercitación futbolística y la preparación atlética exigen una evaluación médica individual previa y una supervisión técnica profesional adaptada a las capacidades de cada practicante. El usuario manifiesta ser plenamente consciente de los riesgos inherentes al sobreentrenamiento o a la ejecución incorrecta de ejercicios físicos, asumiendo que el uso de los contenidos orientativos de este sitio web se desarrolla bajo su exclusivo criterio y responsabilidad.</p>

<h3>Publicidad, Google AdSense y enlaces de afiliación</h3>
<p>Este espacio digital incorpora publicidad servida a través de la red Google AdSense. Dichas comunicaciones comerciales pueden mostrarse personalizadas a partir del empleo de cookies e identificadores administrados por Google y terceros autorizados. De igual modo, el portal puede integrar enlaces de afiliación o menciones promocionales mediante las cuales el titular perciba comisiones sin que ello incremente coste alguno para el lector. Los emplazamientos publicitarios y contenidos patrocinados no implican respaldo editorial, aval técnico ni recomendación formal de los productos o servicios promocionados.</p>

<h3>Protección de datos personales (RGPD)</h3>
<p>Toda información de carácter personal recabada en el portal (a través de formularios de contacto o correspondencia) será procesada en rigurosa observancia del Reglamento (UE) 2016/679 (RGPD) y de la Ley Orgánica 3/2018 (LOPDGDD):</p>
<ul>
<li><strong>Finalidad del tratamiento:</strong> tramitación de solicitudes, consultas y correspondencia con el lector.</li>
<li><strong>Base legitimadora:</strong> consentimiento expreso e informado manifestado por el interesado.</li>
<li><strong>Plazo de custodia:</strong> estrictamente durante el tiempo indispensable para solventar la consulta o atender deberes legales.</li>
</ul>
<p>El usuario podrá ejercitar sus facultades legales de acceso, rectificación, supresión, limitación, oposición y portabilidad remitiendo solicitud por escrito a: <a href="mailto:contacto@golazos.co">contacto@golazos.co</a>. Para un detalle exhaustivo, consulte nuestra Política de Privacidad.</p>

<h3>Política de cookies</h3>
<p>El portal implementa cookies propias y de terceros, con inclusión de las requeridas por Google AdSense, orientadas a finalidades técnicas, estadísticas y de gestión publicitaria. El visitante dispone de herramientas para admitir, desestimar o configurar el uso de dichos elementos en cualquier instante. Para más detalles, acceda a la Política de Cookies.</p>

<h3>Propiedad intelectual e industrial</h3>
<p>La totalidad de creaciones albergadas en este portal, comprendiendo redacciones, artículos, diseño gráfico, logotipos, elementos tipográficos y estructura estética, constituyen propiedad intelectual del titular de la web o de terceros que han concedido su correspondiente autorización o licencia. Queda estrictamente prohibida la reproducción, difusión, distribución o transformación de estos elementos sin anuencia previa y por escrito del titular. En cuanto a las imágenes de terceros amparadas en licencias abiertas (como Wikimedia Commons o Unsplash), se respetan escrupulosamente sus términos atributivos y licencias de difusión.</p>

<h3>Enlaces a portales de terceros</h3>
<p>El portal puede enlazar hacia páginas web externas administradas por terceros. El titular no asume responsabilidad alguna sobre la disponibilidad, exactitud, contenidos o políticas de privacidad imperantes en dichos destinos externos.</p>

<h3>Limitación de responsabilidad</h3>
<p>El titular de Golazos declina toda responsabilidad derivada de:</p>
<ul>
<li>Eventuales imprecisiones u omisiones involuntarias en los textos informativos.</li>
<li>Falta de vigencia o retrasos puntuales en la actualización de contenidos reglamentarios o deportivos.</li>
<li>Resoluciones prácticas o decisiones tomadas por los lectores tras la lectura de los análisis publicados.</li>
<li>Perjuicios, anomalías o deterioros derivados del uso directo de la web o de incidencias técnicas en el servidor.</li>
</ul>
<p>El usuario accede y navega en el portal bajo su propia y exclusiva responsabilidad.</p>

<h3>Legislación aplicable y sumisión jurisdiccional</h3>
<p>Las cláusulas de este Aviso Legal se rigen y sancionan conforme al ordenamiento jurídico de España. Para la ventilación de cualquier controversia o disputa judicial vinculada al sitio web, las partes se someten voluntariamente a los Juzgados y Tribunales de Córdoba, España, con renuncia a cualquier otro fuero que pudiera corresponderles, excepto en los casos en que la normativa en materia de defensa de consumidores y usuarios imponga preceptivamente un fuero imperativo distinto.</p>

<h3>Modificaciones</h3>
<p>El titular se reserva el derecho de actualizar o perfeccionar los presentes términos en cualquier momento. Toda modificación producirá plenos efectos desde el momento mismo de su divulgación en el portal web.</p>
`
  },
  {
    slug: 'terminos-y-condiciones',
    title: 'Términos y Condiciones',
    content: `
<h2>TÉRMINOS Y CONDICIONES – GOLAZOS</h2>
<p><strong>Sitio web:</strong> golazos.co<br>
<strong>Correo de contacto:</strong> <a href="mailto:contacto@golazos.co">contacto@golazos.co</a><br>
<strong>Última actualización:</strong> Octubre de 2026</p>

<h3>1. Aceptación de los términos</h3>
<p>El mero acceso, navegación y utilización del portal web <strong>golazos.co</strong> confiere la condición de usuario e implica la aceptación cabal, íntegra y sin reservas de todos y cada uno de los presentes Términos y Condiciones. En caso de no mostrar conformidad con estas disposiciones, el usuario deberá suspender la navegación y abstenerse de utilizar el servicio.</p>

<h3>2. Objeto del sitio web</h3>
<p><strong>Golazos</strong> es una plataforma editorial dedicada a la publicación de textos informativos, formativos y de análisis especializado en fútbol, táctica, metodología de entrenamiento y reglamento deportivo. El conjunto de contenidos difundidos tiene un propósito exclusivamente educativo, divulgativo y de interés general.</p>

<h3>3. Uso permitido del sitio web</h3>
<p>El usuario adquiere el compromiso firme de realizar un uso legítimo, prudente y responsable del portal y de sus recursos interactivos, conforme a las leyes vigentes y a la buena fe. Queda expresamente prohibido:</p>
<ul>
<li>Utilizar el portal con propósitos contrarios a la ley, lesivos para terceros o de índole fraudulenta.</li>
<li>Ejecutar procesos sistemáticos o automáticos de copia masiva, extracción de datos o indexación no autorizada (scraping).</li>
<li>Introducir programas dañinos, virus informáticos o acometer acciones susceptibles de degradar o alterar la estabilidad del servidor.</li>
<li>Intentar vulnerar los mecanismos de seguridad de la web o acceder a espacios de administración restringidos sin autorización expresa.</li>
</ul>

<h3>4. Propiedad intelectual</h3>
<p>Todos los componentes del portal, incluyendo creaciones textuales, artículos analíticos, disposiciones gráficas, logotipos y material iconográfico, representan creaciones amparadas por la legislación de propiedad intelectual perteneciente al titular de Golazos o a terceros licenciantes. Se prohíbe de forma taxativa su comercialización, copia, reproducción o puesta a disposición pública sin consentimiento previo y documentado.</p>

<h3>5. Contenido informativo y ausencia de asesoramiento profesional</h3>
<p>La información albergada en Golazos no supone en ningún supuesto asesoramiento profesional vinculante, dictamen técnico directo ni prescripción médica o física personalizada. Los análisis y explicaciones se brindan con carácter general y no reemplazan la valoración directa de un profesional cualificado. El usuario asume en exclusiva la responsabilidad de las conclusiones y decisiones personales que adopte a partir de los contenidos de la web.</p>

<h3>6. Publicidad y Google AdSense</h3>
<p>El sitio web canaliza publicidad comercial administrada mediante la plataforma Google AdSense. Los anuncios desplegados pueden ampararse en el empleo de cookies y tecnologías análogas para adaptar las propuestas publicitarias a las preferencias del usuario. Google y su red de colaboradores procesan dichos datos bajo sus propias cláusulas de privacidad. La presencia de anuncios no implica recomendación, respaldo editorial ni asunción de responsabilidad alguna por parte de Golazos respecto a los bienes o servicios ofertados.</p>

<h3>7. Enlaces de afiliados</h3>
<p>El portal puede albergar enlaces comerciales de afiliación. Dicha circunstancia implica que el titular de la plataforma podría percibir una gratificación económica o comisión si el lector formaliza una adquisición a través de ellos, sin que ello conlleve recargo alguno en el precio final soportado por el usuario.</p>

<h3>8. Enlaces a terceros</h3>
<p>Nuestras publicaciones pueden incorporar hipervínculos dirigidos a espacios web pertenecientes a terceros. El titular no asume vigilancia ni responsabilidad en torno a los contenidos, seguridad, veracidad o normativas de privacidad que gobiernen dichos entornos externos.</p>

<h3>9. Limitación de responsabilidad</h3>
<p>El titular del portal web no será responsable en circunstancia alguna de:</p>
<ul>
<li>Equívocos, erratas u omisiones circunstanciales en el cuerpo de los artículos.</li>
<li>Desactualización eventual de ciertas publicaciones ante modificaciones inmediatas de normativas deportivas.</li>
<li>Decisiones técnicas, físicas o personales acordadas por los usuarios a partir de la lectura del portal.</li>
<li>Menoscabos o perjuicios indirectos ocasionados por el uso o por la imposibilidad de uso del portal web.</li>
<li>Averías técnicas, retrasos o cortes imprevistos en la conectividad del servidor.</li>
</ul>
<p>El usuario utiliza los servicios de Golazos bajo su cuenta y riesgo exclusivos.</p>

<h3>10. Disponibilidad del sitio web</h3>
<p>El titular no garantiza la operatividad continuada y sin interrupciones del servicio digital. El titular conserva la facultad discrecional de rediseñar, suspender, interrumpir temporalmente o cancelar la prestación del portal en cualquier momento sin necesidad de requerimiento o preaviso.</p>

<h3>11. Protección de datos y cookies</h3>
<p>El tratamiento riguroso de la información personal de los lectores y la utilización de herramientas de rastreo digital se encuentran normados en la Política de Privacidad y en la Política de Cookies, permanentemente accesibles para consulta pública en la web.</p>

<h3>12. Modificaciones de los términos</h3>
<p>El titular se reserva el derecho de modificar o actualizar estos Términos y Condiciones en cualquier fecha. Toda alteración adquirirá vigencia legal a partir del momento de su incorporación y publicación en la web.</p>

<h3>13. Legislación aplicable y sumisión jurisdiccional</h3>
<p>Los presentes Términos y Condiciones se rigen bajo el ordenamiento legal del Reino de España. Para la dilucidación de cualquier litigio derivado de la interpretación o ejecución de este contrato digital, las partes se someten expresamente a la jurisdicción de los Juzgados y Tribunales de la ciudad de Córdoba, España, con renuncia a cualquier fuero que pudiere corresponderles, salvo disposición legal imperativa en contrario para personas con la condición legal de consumidores.</p>
`
  }
];

function countWords(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .split(/\s+/)
    .filter(w => w.length > 0).length;
}

async function updateAllLegalPages() {
  console.log('================================================================');
  console.log('📜 ACTUALIZACIÓN DE PÁGINAS LEGALES CON NUEVAS DIRECTRICES');
  console.log('================================================================\n');

  // Obtener páginas existentes en WordPress
  const res = await fetch(`${apiUrl}/pages?per_page=50`, { headers: { Authorization: authHeader } });
  if (!res.ok) throw new Error(`Fallo al obtener páginas de WP: ${res.status}`);
  const wpPages = await res.json();

  console.log(`Páginas encontradas en WordPress: ${wpPages.length}`);

  for (const pageData of legalPagesData) {
    const wpPage = wpPages.find(p => p.slug === pageData.slug);
    const words = countWords(pageData.content);

    console.log(`\n----------------------------------------------------`);
    console.log(`Procesando "${pageData.title}" (/page/${pageData.slug}/)`);
    console.log(`Palabras generadas: ${words} palabras.`);

    if (!wpPage) {
      console.log(`Página no existe. Creando nueva página...`);
      const createRes = await fetch(`${apiUrl}/pages`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: pageData.title,
          slug: pageData.slug,
          content: pageData.content,
          status: 'publish'
        })
      });
      if (!createRes.ok) {
        console.error(`❌ Error creando página ${pageData.slug}:`, await createRes.text());
        continue;
      }
      const created = await createRes.json();
      console.log(`✅ Creada con ID ${created.id}`);
    } else {
      console.log(`Actualizando página existente ID ${wpPage.id}...`);
      const updateRes = await fetch(`${apiUrl}/pages/${wpPage.id}`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: pageData.title,
          content: pageData.content,
          status: 'publish'
        })
      });
      if (!updateRes.ok) {
        console.error(`❌ Error actualizando página ${pageData.slug}:`, await updateRes.text());
        continue;
      }
      const updated = await updateRes.json();
      console.log(`✅ Página ID ${updated.id} actualizada con éxito (${words} palabras).`);
    }
  }

  console.log('\n================================================================');
  console.log('🏁 AUDITORÍA FINAL DE LAS 7 PÁGINAS LEGALES');
  console.log('================================================================');

  const checkRes = await fetch(`${apiUrl}/pages?per_page=50`, { headers: { Authorization: authHeader } });
  const finalPages = await checkRes.json();

  for (const pageData of legalPagesData) {
    const p = finalPages.find(item => item.slug === pageData.slug);
    if (!p) {
      console.error(`❌ Falta página: ${pageData.slug}`);
      continue;
    }
    const finalWords = countWords(p.content.rendered);
    console.log(`  - [ID ${p.id}] ${p.title.rendered.padEnd(25)}: ${finalWords} palabras (URL: ${p.link})`);
  }
}

updateAllLegalPages().catch(console.error);
