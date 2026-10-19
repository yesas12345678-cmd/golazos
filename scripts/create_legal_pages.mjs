import { authHeader, apiUrl } from './loadEnv.mjs';

const formId = 9;

const pages = [
  {
    title: 'Sobre Nosotros',
    slug: 'sobre-nosotros',
    content: `
<h2>Nuestra Misión Editorial</h2>
<p>Bienvenido a <strong>Golazos</strong> (golazos.co), un portal digital independiente fundado y dirigido por Manuel López Ramos, dedicado en exclusiva al análisis riguroso, la divulgación táctica y el seguimiento exhaustivo del fútbol nacional e internacional.</p>
<p>En Golazos entendemos el fútbol no solo como un espectáculo de masas, sino como una disciplina táctica compleja, una ciencia física y un fenómeno cultural de alcance global. Nuestra meta es ofrecer a los aficionados, técnicos y entusiastas del deporte rey contenidos detallados, análisis en profundidad de sistemas de juego, coberturas pedagógicas sobre el reglamento y arbitraje, así como guías formativas sobre preparación física y rendimiento en el campo.</p>

<h2>Independencia y Rigor</h2>
<p>Todos nuestros artículos se fundamentan en el rigor informativo, la imparcialidad y la pasión por el juego limpio. Nuestro equipo editorial investiga, coteja y estructura cada temática para garantizar que la información brindada sea didáctica, amena y técnicamente precisa, contribuyendo positivamente a la cultura deportiva de nuestra comunidad de lectores.</p>

<h2>Dirección y Contacto</h2>
<p>La dirección editorial de Golazos está radicada en Córdoba, España, bajo el liderazgo directo de su fundador, Manuel López Ramos. Para cualquier cuestión relativa a nuestra línea editorial, colaboraciones o consultas técnicas, los lectores pueden comunicarse a través de nuestra página de contacto oficial.</p>
`
  },
  {
    title: 'Manuel López Ramos',
    slug: 'manuel-lopez-ramos',
    content: `
<h2>Perfil del Fundador y Editor Jefe</h2>
<p><strong>Manuel López Ramos</strong> es el fundador, editor jefe y responsable máximo de contenidos de <strong>Golazos</strong>. Apasionado del fútbol, la táctica deportiva y el periodismo digital divulgativo, Manuel cuenta con una amplia experiencia en el análisis de competiciones, la evolución histórica de los sistemas tácticos y la aplicación del reglamento oficial en el balompié moderno.</p>

<h2>Trayectoria y Filosofía Deportiva</h2>
<p>A lo largo de su carrera vinculada al deporte y a la comunicación digital, Manuel ha defendido un enfoque pedagógico del fútbol, priorizando la comprensión de la pizarra, la preparación atlética de los futbolistas y el entendimiento sereno del arbitraje y del VAR sobre la polémica sensacionalista.</p>
<p>Como director de Golazos, Manuel supervisa personalmente la calidad técnica y la veracidad de cada publicación, asegurando que todos los análisis cumplan con los más altos estándares de rigor periodístico y respeto a las normas del juego limpio establecidas por la IFAB y la FIFA.</p>

<h2>Datos de Contacto y Transparencia</h2>
<p>En cumplimiento de las directrices de transparencia y buenas prácticas editoriales, Manuel López Ramos pone a disposición de lectores, entidades deportivas y medios de comunicación las siguientes vías directas de correspondencia:</p>
<p><strong>Correo electrónico:</strong> <a href="mailto:manuellopezramos@golazos.co">manuellopezramos@golazos.co</a></p>
<p><strong>Ubicación:</strong> Calle Blas Infante, Córdoba, España.</p>
`
  },
  {
    title: 'Contáctanos',
    slug: 'contactanos',
    content: `
<h2>Atención al Lector y Consultas Editoriales</h2>
<p>En <strong>Golazos</strong> valoramos profundamente la comunicación directa y constructiva con nuestra audiencia. Si deseas plantearnos una consulta sobre nuestros análisis, sugerir la cobertura de un partido o torneo específico, solicitar correcciones informativas o proponer colaboraciones periodísticas, no dudes en escribirnos.</p>

<h2>Formulario de Contacto</h2>
<p>Rellena el siguiente formulario y responderemos a tu mensaje a la mayor brevedad posible:</p>
[contact-form-7 id="${formId}" title="Contact form 1"]

<h2>Canales Directos de Comunicación</h2>
<p>Si prefieres el contacto por correo electrónico ordinario, puedes escribir directamente a nuestras direcciones oficiales:</p>
<p><strong>Consultas generales:</strong> <a href="mailto:contacto@golazos.co">contacto@golazos.co</a></p>
<p><strong>Dirección editorial:</strong> <a href="mailto:manuellopezramos@golazos.co">manuellopezramos@golazos.co</a></p>
<p><strong>Domicilio de correspondencia:</strong> Manuel López Ramos, Calle Blas Infante, Córdoba, España.</p>
`
  },
  {
    title: 'Política de Privacidad',
    slug: 'politica-de-privacidad',
    content: `
<h2>1. Responsable del Tratamiento</h2>
<p>En cumplimiento de lo establecido en el Reglamento (UE) 2016/679 General de Protección de Datos (RGPD) y en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), se informa a los usuarios del sitio web <strong>golazos.co</strong> de los siguientes extremos:</p>
<p><strong>Identidad del Responsable:</strong> Manuel López Ramos<br>
<strong>NIF:</strong> 45841212S<br>
<strong>Domicilio:</strong> Calle Blas Infante, Córdoba, España<br>
<strong>Correo electrónico:</strong> <a href="mailto:contacto@golazos.co">contacto@golazos.co</a></p>

<h2>2. Finalidad del Tratamiento de los Datos</h2>
<p>En Golazos recopilamos y tratamos los datos personales que el usuario nos facilita voluntariamente con las siguientes finalidades:</p>
<p>Gestionar las consultas, peticiones de información y mensajes remitidos a través del formulario de contacto.<br>
Garantizar la seguridad técnica y operativa de la plataforma web frente a ataques o accesos no autorizados.<br>
Analizar la navegación y métricas de audiencia de forma agregada y anónima mediante Google Analytics 4 (Google Site Kit).<br>
Gestionar la visualización de espacios publicitarios personalizados o no personalizados a través de Google AdSense conforme al consentimiento otorgado.</p>

<h2>3. Legitimación del Tratamiento</h2>
<p>La base legal para el tratamiento de sus datos es el consentimiento expreso del usuario al remitir el formulario de contacto o al aceptar la instalación de cookies analíticas y publicitarias mediante nuestro banner de consentimiento.</p>

<h2>4. Conservación de los Datos</h2>
<p>Los datos personales facilitados a través de formularios se conservarán durante el tiempo estrictamente necesario para responder a la consulta planteada y, en su caso, mientras subsistan obligaciones legales.</p>

<h2>5. Derechos del Usuario</h2>
<p>El usuario tiene derecho a solicitar el acceso a sus datos personales, su rectificación o supresión, la limitación de su tratamiento, la oposición al mismo, así como el derecho a la portabilidad de los datos. Para ejercer estos derechos, puede remitir una solicitud por escrito acompañada de copia de su documento de identidad a <strong>contacto@golazos.co</strong>. Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).</p>
`
  },
  {
    title: 'Política de Cookies',
    slug: 'politica-de-cookies',
    content: `
<h2>1. ¿Qué son las Cookies?</h2>
<p>Una cookie es un pequeño archivo de texto que los sitios web descargan en su navegador cuando los visita. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.</p>

<h2>2. Tipos de Cookies Utilizadas en Golazos</h2>
<p><strong>Cookies técnicas necesarias:</strong> Son aquellas imprescindibles para la navegación y el buen funcionamiento de la página web, como el control del tráfico y la gestión de sesiones de usuario.</p>
<p><strong>Cookies analíticas (Google Analytics 4):</strong> Nos permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico de la utilización que hacen los usuarios de los artículos de Golazos, con el fin de mejorar nuestra oferta informativa.</p>
<p><strong>Cookies publicitarias (Google AdSense):</strong> Gestionan de la forma más eficaz posible la oferta de los espacios publicitarios que hay en la página web, adecuando el contenido del anuncio al contenido del servicio solicitado o al uso que realice de nuestra página web.</p>

<h2>3. Gestión y Configuración de Cookies</h2>
<p>El usuario puede en cualquier momento aceptar, rechazar o revocar el consentimiento prestado para el uso de cookies a través del banner de configuración de la web, así como configurar su navegador de internet para bloquear o eliminar las cookies instaladas en su equipo.</p>
`
  },
  {
    title: 'Aviso Legal',
    slug: 'aviso-legal',
    content: `
<h2>1. Información Legal (LSSI-CE)</h2>
<p>En cumplimiento con el deber de información estipulado en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan a continuación los datos identificativos del titular del sitio web <strong>golazos.co</strong>:</p>
<p><strong>Titular:</strong> Manuel López Ramos<br>
<strong>NIF:</strong> 45841212S<br>
<strong>Domicilio:</strong> Calle Blas Infante, Córdoba, España<br>
<strong>Correo electrónico de contacto:</strong> <a href="mailto:contacto@golazos.co">contacto@golazos.co</a></p>

<h2>2. Condiciones de Uso y Responsabilidad</h2>
<p>El acceso y navegación por el portal Golazos atribuye la condición de usuario e implica la aceptación plena de todas las disposiciones incluidas en este Aviso Legal. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios de conformidad con la ley, la buena fe, el orden público y los usos del tráfico.</p>
<p>Manuel López Ramos no se hace responsable del uso ilícito, negligente, fraudulento o contrario a este Aviso Legal que pudieran realizar los usuarios de los contenidos difundidos en la web.</p>

<h2>3. Propiedad Intelectual e Industrial</h2>
<p>Todos los derechos sobre los contenidos, textos, artículos didácticos, análisis, logotipos, código fuente y diseño gráfico de <strong>golazos.co</strong> pertenecen en exclusiva a Manuel López Ramos o a sus legítimos licenciantes (incluyendo imágenes procedentes de bancos abiertos bajo licencias libres de Wikimedia Commons y Unsplash). Queda prohibida la reproducción total o parcial sin autorización previa y expresa.</p>

<h2>4. Legislación Aplicable y Jurisdicción</h2>
<p>Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o de las actividades en él desarrolladas, será de aplicación la legislación española, siendo competentes los juzgados y tribunales de Córdoba (España).</p>
`
  },
  {
    title: 'Términos y Condiciones',
    slug: 'terminos-y-condiciones',
    content: `
<h2>1. Objeto y Ámbito de Aplicación</h2>
<p>Los presentes Términos y Condiciones regulan el acceso, navegación y uso del sitio web <strong>golazos.co</strong> (en adelante, Golazos), así como las responsabilidades derivadas de la utilización de sus contenidos informativos, tácticos y periodísticos sobre el fútbol.</p>

<h2>2. Finalidad Divulgativa y Educativa</h2>
<p>Los contenidos publicados en Golazos tienen un carácter estrictamente divulgativo, periodístico y formativo. Los análisis de sistemas tácticos, entrenamientos y normativas deportivas se ofrecen con fines didácticos para enriquecer el conocimiento general de la comunidad futbolística.</p>

<h2>3. Obligaciones del Usuario</h2>
<p>El usuario se compromete expresamente a no emplear los contenidos y servicios de Golazos para:</p>
<p>Difundir contenidos delictivos, violentos, racistas, xenófobos, pornográficos, de apología del terrorismo o atentatorios contra los derechos humanos o el espíritu deportivo.<br>
Introducir en la red virus informáticos o realizar actuaciones susceptibles de alterar, estropear, interrumpir o generar errores en los sistemas telemáticos de Golazos.<br>
Vulnerar los derechos de propiedad intelectual o industrial de Golazos o de terceros colaboradores.</p>

<h2>4. Modificación de los Términos</h2>
<p>Manuel López Ramos se reserva el derecho de modificar los presentes Términos y Condiciones en cualquier momento para adaptarlos a novedades legislativas, jurisprudenciales o técnicas. Dichas modificaciones serán vinculantes desde el momento de su publicación en el sitio web.</p>
`
  }
];

async function createPages() {
  console.log('--- CREANDO PÁGINAS LEGALES E INSTITUCIONALES ---');
  
  // Check existing pages
  const existingRes = await fetch(`${apiUrl}/pages?per_page=100`, { headers: { 'Authorization': authHeader } });
  const existing = await existingRes.json();
  const existingMap = new Map(existing.map(p => [p.slug, p.id]));

  for (const page of pages) {
    if (existingMap.has(page.slug)) {
      const pageId = existingMap.get(page.slug);
      console.log(`Página '${page.title}' ya existe (ID: ${pageId}). Actualizando contenido...`);
      const updateRes = await fetch(`${apiUrl}/pages/${pageId}`, {
        method: 'POST',
        headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: page.title,
          content: page.content,
          status: 'publish'
        })
      });
      console.log(`  Actualizada con status: ${updateRes.status}`);
    } else {
      console.log(`Creando página '${page.title}'...`);
      const createRes = await fetch(`${apiUrl}/pages`, {
        method: 'POST',
        headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: page.title,
          slug: page.slug,
          content: page.content,
          status: 'publish'
        })
      });
      const data = await createRes.json();
      console.log(`  Creada con ID: ${data.id} (slug: ${data.slug})`);
    }
  }
  console.log('✅ Todas las páginas legales e institucionales listas.');

  // Verificación obligatoria de localización de Contact Form 7
  console.log('\n--- VERIFICANDO IDIOMA DE CONTACT FORM 7 EN VIVO ---');
  const contactRes = await fetch('https://golazos.co/contactanos/?t=' + Date.now());
  const contactHtml = await contactRes.text();
  const hasSpanish = contactHtml.includes('Tu nombre') && contactHtml.includes('Tu correo electrónico');
  const hasEnglish = contactHtml.includes('Your name') || contactHtml.includes('Your email');

  if (hasEnglish || !hasSpanish) {
    throw new Error('❌ [ERROR FATAL] El formulario de contacto está en inglés. Debe configurarse en español en /wp-admin/admin.php?page=wpcf7');
  }
  console.log('✅ Formulario de contacto 100% verificado en español en https://golazos.co/contactanos/');
}

createPages().catch(err => {
  console.error('❌ Error creando páginas legales:', err);
  process.exit(1);
});
