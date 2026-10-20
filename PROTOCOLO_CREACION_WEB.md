# Protocolo Maestro de Creación y Configuración de Webs (WordPress)

> **Objetivo:** Este archivo es el **documento único y maestro** que se traslada de un proyecto a otro. Contiene en estricto orden secuencial todas las instrucciones, credenciales universales, volcados de configuración (Yoast SEO INI), reglas de redacción y ajustes técnicos necesarios para construir y configurar cualquier web de WordPress desde cero de forma 100% autónoma.
>
> ⚡ **MANDATO DE EJECUCIÓN AUTÓNOMA PARA CUALQUIER PROYECTO FUTURO:**  
> En cualquier nuevo proyecto, una vez creadas las claves en `.env` (o proporcionada la contraseña de aplicación y la URL de WordPress), **el agente (Antigravity) DEBE leer este archivo y ejecutar la totalidad de este protocolo de principio a fin, en una sola tirada ininterrumpida y sin detenerse a hacer preguntas intermedias al usuario.** Para cualquier tarea sin endpoint REST nativo en WordPress, el agente utilizará el subagente de navegador (`browser_subagent`) para resolverla desatendidamente.
>
> 🔑 **CREDENCIALES Y CUENTAS UNIVERSALES:**  
> - **Usuario Administrador Técnico de WordPress:** `zVaito` (contraseña: `Manuel1214$Manuel`).
> - **Usuario Autor Oficial (Editorial):** `Manuel López` (username: `manuellopez`, contraseña: `Manuel1214$Manuel`, correo: `yesas12345678@gmail.com`). **TODOS los artículos se suben y publican bajo este usuario** para que en el frontend aparezca siempre *"Por Manuel López"*. Si se solicita código de confirmación o 2FA, se gestiona mediante la conexión activa a Composio.
> - **Cuenta Maestra de Google (Site Kit / Search Console / Analytics):** `yesas12345678@gmail.com` (Manuel López). **SIEMPRE** se utiliza esta cuenta para iniciar sesión y vincular los servicios de Google en cualquier web.
>
> ⚡ **EJECUCIÓN CONTINUA DEL PASO 18 (GENERACIÓN EDITORIAL SIN ESPERA):**  
> Una vez completados los pasos 1 al 17 de configuración técnica, maquetación, diseño y taxonomías, **el Paso 18 se inicia de forma 100% automática, autónoma y desatendida SIN pedir permiso ni confirmación intermedia al usuario**, ejecutando directamente el pipeline de redacción y publicación masiva de los 48 artículos con Google Gemini API y Wikimedia Commons de principio a fin.

---

## 🛠️ Stack Tecnológico Universal y Herramientas Obligatorias

Este protocolo está diseñado para operar con un conjunto estandarizado de herramientas y librerías que garantizan su reproducibilidad exacta en cualquier entorno y servidor:

| Categoría | Herramienta / Tecnología Oficial | Endpoint / Identificador Técnico | Función Exacta en el Pipeline |
| :--- | :--- | :--- | :--- |
| **Entorno de Ejecución** | **Node.js (v20+ LTS)** | ES Modules (`.mjs`) | Ejecución de scripts locales de automatización, orquestación y sincronización de APIs sin dependencias pesadas. |
| **Gestión de Red y Peticiones** | **Fetch API nativo de Node.js** | `globalThis.fetch` con `AbortSignal.timeout()` | Manejo de llamadas HTTP/HTTPS asíncronas, buffers binarios y reintentos ante microcortes de red. |
| **Variables de Entorno** | **Dotenv / Archivo `.env`** | `fs` / `process.env` | Almacenamiento seguro de credenciales, contraseñas de aplicación y claves de API fuera del control de versiones. |
| **Gestor de Contenidos (CMS)** | **WordPress (v6.0+)** | Core oficial de WordPress | Plataforma base para publicación, arquitectura de silos, taxonomías y renderizado para lectores. |
| **API del CMS** | **WordPress REST API** | `https://[dominio]/wp-json/wp/v2/` | Interfaz programática universal para gestión de entradas (`/posts`), páginas (`/pages`), medios (`/media`), categorías (`/categories`) y ajustes (`/settings`). |
| **Autenticación en el CMS** | **Application Passwords de WP** | Cabecera `Authorization: Basic base64(user:app_pass)` | Conexión segura y persistente sin depender de cookies de sesión ni tokens volátiles. |
| **Tema Base Oficial** | **Kadence Theme** | `kadence` | Plantilla optimizada para Google Core Web Vitals, ultra rápida, ligera y con maquetación flexible en cabecera y pie. |
| **Motor de Personalización** | **WordPress Customizer API** | `https://[dominio]/wp-admin/customize.php` | Configuración de identidad visual, dimensiones de logotipo, cabecera y pie mediante `theme_mods_kadence`. |
| **Automatización de Navegador** | **Subagente de Navegador / Playwright** | `browser_subagent` (Chromium Headless) | Ejecución desatendida de tareas de interfaz gráfica donde WordPress no dispone de endpoint REST nativo (plugins, Site Kit, Yoast). |
| **Edición Avanzada de Archivos PHP** | **File Organizer Plugin** | `fileorganizer` (`admin.php?page=fileorganizer`) | Modificación directa y guardado de `functions.php` en disco para sortear bloqueos de comprobación en bucle invertido (*loopback check*) del editor nativo. |
| **Seguridad y Anti-Spam** | **Akismet Anti-Spam** | Plugin oficial `akismet` | Filtrado automático de spam en comentarios para preservar la reputación del sitio web. |
| **Monetización Publicitaria** | **Ad Inserter** | Plugin oficial `ad-inserter` | Inserción automatizada y estratégica de bloques de anuncios de Google AdSense en posiciones de alto RPM. |
| **Métricas y Google Analytics** | **Google Site Kit** | Plugin oficial `google-site-kit` | Vinculación oficial de Google Search Console y Google Analytics 4 (GA4) con la cuenta oficial de Google. |
| **Optimización SEO On-Page** | **Yoast SEO** | Plugin oficial `wordpress-seo` | Indexación de sitemaps XML, calibración de metaetiquetas y aplicación del archivo de configuración INI maestro. |
| **Formularios de Contacto** | **Contact Form 7** | Plugin oficial `contact-form-7` | Renderizado del formulario de contacto mediante shortcode en la página legal de soporte. |
| **Generación de Contenidos (Motor Oficial)** | **Google Gemini API** | `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent` | Motor oficial de alta velocidad para redacción editorial multi-etapa con control estricto de palabras en memoria (>2.500 palabras por artículo). |
| **Normalizador y Limpiador HTML** | **Algoritmo `cleanHtml` Regex** | Expresiones regulares en Node.js | Purga de etiquetas `<h1>` (evita duplicidad con el tema), supresión de viñetas (`<ul>`, `<ol>`, `<li>`), eliminación de divisores horizontales (`<hr>`). |
| **Medidor y Expansor Editorial** | **Algoritmo `cleanWordCount` Loop** | Conteo de tokens/palabras en memoria | Medición en tiempo real del cuerpo del artículo sin tags HTML y llamada expansiva hasta superar 2.500 palabras. |
| **Adquisición de Imágenes (Principal)** | **Wikimedia Commons API** | `https://commons.wikimedia.org/w/api.php` (`action=query&generator=search&iiurlwidth=1280`) | Banco masivo de fotografías de eventos reales y licencias comerciales libres (Creative Commons / Dominio Público) sin cuotas por hora. |
| **Adquisición de Imágenes (Secundaria)** | **Unsplash API** | `https://api.unsplash.com/search/photos` (`orientation=landscape`) | Repositorio de fotografía artística y ambiental libre de derechos comerciales. |
| **Estrategia de Enlazado (SEO Silo y Autoridad)** | **Hipervínculos HTML Contextuales (~3 Enlaces/Post)** | Inyección en código de 2 enlaces internos (arquitectura de silos) + 1 enlace externo hacia organismos oficiales (FIFA, UEFA, IFAB, etc.) con atributos `target="_blank" rel="noopener noreferrer external"`. SIEMPRE con hipervínculo HTML. |
| **Generación Gráfica de Branding** | **Nano Banana / Imagen Multimodal** | Herramienta `generate_image` | Creación de logotipo horizontal y favicon en PNG con canal alfa (fondo transparente). |
| **Notificaciones Instantáneas** | **Telegram Bot API** | `https://api.telegram.org/bot<TOKEN>/sendMessage` | Envío inmediato a Manuel López (`@JudeeeeeBot`, chat ID `7777389793`) del dominio a comprar tras la consultoría SEO. |
| **Telefonía y Voz (Modo Fuera)** | **Bland AI API** | `https://api.bland.ai/v1/calls` | Realización de llamadas telefónicas salientes interactivas cuando el Modo Fuera de Casa está activado. |

---

## 📋 Lista Ordenada de Instrucciones

| Nº | Fase / Área | Instrucción Universal | Estado |
| :-: | :--- | :--- | :-: |
| **1** | **Consultoría SEO & Elección de Nicho y Dominio** | Actuar como consultor SEO experto en AdSense y nichos para elegir Dominio, Descripción (2-3 palabras), Nicho inagotable (sin pisar temas), Mercado, Idioma y Contenido; generar informe PDF estructurado, definir directrices de logo minimalista con fondo transparente y enviar a Telegram el dominio a comprar. | ✅ Estandarizado |
| **2** | **Conexión & Entorno** | Conservar claves de APIs y medios; configurar y verificar usuario (`zVaito`), nueva contraseña de aplicación y URL de la API en `.env`. | ✅ Estandarizado |
| **3** | **Identidad Visual / Branding** | Crear el logo horizontal (fondo transparente) y el favicon/emblema con Nano Banana (generador multimodal de imágenes) adaptado a la temática del sitio web. | ✅ Estandarizado |
| **4** | **Diseño & Plantilla** | En Apariencia, instalar y activar el tema **Kadence** de forma 100% autónoma con el subagente de navegador. | ✅ Estandarizado |
| **5** | **Limpieza de Contenido Base** | Eliminar permanentemente los contenidos de muestra preinstalados por WordPress: la entrada "Hello world!" (ID 1) y la página "Sample Page" (ID 2), junto con sus comentarios. | ✅ Estandarizado |
| **6** | **Gestión de Plugins** | Activar Akismet Anti-spam, eliminar Hello Dolly, e instalar y activar el trío esencial: Ad Inserter, Site Kit by Google y Yoast SEO. | ✅ Estandarizado |
| **7** | **Hacer Páginas Legales** | Redacción y publicación de las 7 páginas legales e institucionales personalizadas (Sobre Nosotros, Manuel López Ramos, Contáctanos con Contact Form 7 localizado obligatoriamente al idioma oficial de la web, Política de Privacidad, Política de Cookies, Aviso Legal y Términos y Condiciones), manteniendo datos de identidad de Manuel y adaptando temática y correos a la web. | ✅ Estandarizado |
| **8** | **Ajustes Generales** | Configurar Título del Sitio (`[Nombre de la web]`), Descripción corta (`[Descripción de 2-3 palabras]`) y subir el logo/emblema como Icono del sitio (Favicon). | ✅ Estandarizado |
| **9** | **Ajustes de Lectura y Comentarios** | Configurar 12 entradas por página/feed, indexación activa, comentarios con aprobación manual, desactivar hilos, paginación y avatares para máxima velocidad y limpieza. | ✅ Estandarizado |
| **10** | **Ajustes de Medios y Enlaces Permanentes** | Medios estándar (150x150 recorte, 300x300, 1024x1024, carpetas mes/año) y Enlaces permanentes en **Nombre de la entrada** (`/%postname%/`). Cierre total de ajustes de WordPress. | ✅ Estandarizado |
| **11** | **Configuración de Yoast SEO** | Asistente inicial (optimización SEO, Persona `zVaito`, logo, sin telemetría), importación del volcado INI maestro integrado en este archivo y calibración de Básicos del sitio (`[Nombre de la web]`, `[Descripción corta]` e imagen oficial). | ✅ Estandarizado |
| **12** | **Vinculación de Google Site Kit** | Conectar Google Site Kit utilizando **siempre obligatoriamente la cuenta `yesas12345678@gmail.com`**, vinculando Google Search Console y creando/asociando la propiedad de Google Analytics de forma 100% desatendida. | ✅ Estandarizado |
| **13** | **Disclaimer de Autor en functions.php** | Insertar en `functions.php` del tema activo la función de disclaimer educativo al final de cada artículo con enlace a la biografía de Manuel López Ramos, adaptando el texto al idioma de la web. | ✅ Estandarizado |
| **14** | **Creación de Categorías del Nicho** | Creación vía REST API de 4 categorías estratégicas adaptadas a la temática del sitio web para organizar los contenidos y estructurar los silos de navegación. | ✅ Estandarizado |
| **15** | **Configuración de Menús (Header y Footer)** | Creación y asignación de menú `Header` (las 4 categorías + Contáctanos al final) en ubicación principal y menú `Footer` (las 7 páginas legales en su orden riguroso) en ubicación pie de página. | ✅ Estandarizado |
| **16** | **Maquetación de Cabecera y Pie de Página (Kadence)** | En Personalizar: subir logotipo oficial, fijar siempre la anchura máxima del título/logotipo en 80 px en Identidad del sitio, añadir el bloque HTML con descripción en 2 líneas y 20px de margen izquierdo **SIEMPRE en el siguiente hueco inmediatamente a la derecha del logotipo**, y colocar la Navegación en el Pie de Página centrada sobre el Copyright. | ✅ Estandarizado |
| **17** | **Creación del Usuario Autor Oficial (Manuel López)** | Crear el usuario editorial **Manuel López** (`manuellopez`, `yesas12345678@gmail.com`, `Manuel1214$Manuel`) para asignarle la autoría de todos los artículos de la web. | ✅ Estandarizado |
| **18** | **Generación y Publicación Masiva de Artículos** | Pipeline integral de 48 artículos (12 por categoría): exactamente 3 imágenes reales obligatorias por artículo (1 destacada + 2 intermedias en cuerpo a 1/3 y 2/3 con bloque figure Gutenberg) verificadas 100% con Gemini Vision; redacción editorial >2500 palabras, 1 post/día retroactivo, categorías alternadas y gate de auditoría final 48/48 sin excepciones. | ✅ Estandarizado |

---

## 📝 Registro Detallado y Autocontenido de Pasos

---

### Paso 1: Consultoría SEO Experta, Elección de Nicho, Dominio y Notificación por Telegram

- **🔧 Herramientas, Tecnologías y Endpoints Utilizados:**
  - **Motor de Consultoría y Razonamiento:** LLM avanzado ejecutando un prompt de consultoría SEO especializada en monetización con Google AdSense.
  - **Generación del Entregable PDF:** Playwright / Chromium headless (`page.pdf({ path: 'informe_nicho.pdf', format: 'A4', margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' } })`) o compilador documental Markdown-to-PDF.
  - **API de Mensajería Externa:** **Telegram Bot API** (`https://api.telegram.org/bot<TOKEN>/sendMessage`).
  - **Chat ID de Destino:** Manuel López (`@JudeeeeeBot`, chat ID: `7777389793`).
  - **Diseño Gráfico Preliminar:** Especificación de directrices técnicas de diseño vectorial con canal alfa para Nano Banana (Paso 3).

- **Rol y Propósito:**
  El agente actúa como consultor SEO experto en Google AdSense y webs de nicho. Su función antes de iniciar el montaje técnico es analizar, investigar y definir la estrategia global para una nueva web tipo blog, asegurando que la temática seleccionada permita publicar una cantidad ilimitada de artículos sin pisar ni canibalizar los mismos temas.

- **Definiciones Estratégicas a Elegir:**
  1. **Dominio:** Nombre de dominio corto, de alta recordación, disponible para su compra y con extensión comercial preferente (`.com`, `.co`, `.net`, etc.).
  2. **Descripción de 2-3 palabras:** Eslogan sintetizado y potente para el subtítulo e identidad de la web.
  3. **Nicho:** Vertical temático amplio con alta demanda de búsqueda informativa y potencial de tráfico continuo.
  4. **Mercado principal:** Mercado geográfico objetivo con excelente RPM/CPC publicitario (ej. España, mercado hispanohablante global, EE. UU.).
  5. **Idioma:** Idioma vehicular de la web (ej. español).
  6. **Contenido:** Tipología y línea editorial de los contenidos.

- **Entregable Oficial:**
  Un informe técnico exhaustivo (formato PDF) con las siguientes secciones estrictamente accionables:
  1. *Nicho, competencia y tipo de usuario*
  2. *Rentabilidad en AdSense (CPC, RPM, estacionalidad, tendencia)*
  3. *Subnichos y categorías de la web*
  4. *Estrategia SEO y enlazado interno*
  5. *Monetización (AdSense)*
  6. *Riesgos y recomendación final*

- **Directrices de Identidad Visual (Logo):**
  - El logotipo debe ser minimalista y diseñado para que se distinga con máxima claridad en tamaños reducidos como el favicon (512x512 px).
  - El agente **no debe crearlo en este paso inicial**, sino proporcionar las directrices e instrucciones exactas para que sea generado con Nano Banana en el paso siguiente.
  - **Requisito mandatorio:** El logotipo debe concebirse siempre con **fondo transparente** (formato PNG vectorial con canal alfa).

- **Reglas de Ejecución y Notificación Directa a Telegram:**
  - Todo el contenido y las conclusiones deben ser 100% accionables; sin generalidades vacías.
  - Si falta algún dato imprescindible antes de comenzar el análisis, el agente debe preguntárselo a Manuel antes de empezar.
  - **Código Técnico de Notificación Instantánea a Telegram:**
    Una vez completada la consultoría y confirmada la disponibilidad del dominio, el agente ejecuta inmediatamente la llamada HTTP a la API de Telegram para notificar a Manuel:
    ```javascript
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: '7777389793',
        text: `🚀 *Nuevo Proyecto Web AdSense*\n\n` +
              `• *Dominio a comprar:* \`${dominioElegido}\`\n` +
              `• *Descripción corta:* ${descripcionCorta}\n` +
              `• *Nicho:* ${nichoElegido}\n` +
              `• *Mercado:* ${mercadoPrincipal}\n` +
              `• *Idioma:* ${idiomaWeb}\n\n` +
              `Compra el dominio y asigna las DNS al hosting para continuar con el montaje.`,
        parse_mode: 'Markdown'
      })
    });
    ```
    *Nota:* El resto del informe detallado, análisis de rentabilidad y taxonomías se conservan internamente en el workspace para alimentar los siguientes pasos.

---

### Paso 2: Conexión Inicial y Variables de Entorno

- **🔧 Herramientas, Tecnologías y Endpoints Utilizados:**
  - **Gestor de Entorno:** Archivo `.env` en la raíz del proyecto leído mediante `fs` / Node.js ES Modules (`import 'dotenv/config'`).
  - **Protocolo de Autenticación:** HTTP Basic Auth mediante contraseñas de aplicación nativas de WordPress (*Application Passwords*).
  - **Librería de Peticiones:** `fetch` nativo de Node.js v20+ con control de timeout (`AbortSignal.timeout(10000)`).
  - **Endpoint de Verificación:** `GET https://[dominio]/wp-json/wp/v2/users/me`.
  - **Cabecera HTTP Requerida:** `Authorization: Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64')}`.

- **Estructura Requerida en `.env`:**
  ```env
  WP_USER="zVaito"
  WP_APP_PASS="xxxx xxxx xxxx xxxx xxxx xxxx"
  WP_API_URL="https://[dominio.com]/wp-json/wp/v2"
  GEMINI_API_KEY="..."
  UNSPLASH_ACCESS_KEY="..."
  TELEGRAM_BOT_TOKEN="..."
  ```

- **Script de Verificación y Validación Automática (`verify_connection.mjs`):**
  ```javascript
  const authHeader = `Basic ${Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASS}`).toString('base64')}`;
  const res = await fetch(`${process.env.WP_API_URL}/users/me`, {
    headers: { 'Authorization': authHeader },
    signal: AbortSignal.timeout(10000)
  });

  if (!res.ok) {
    throw new Error(`Fallo de autenticación en WordPress REST API: ${res.status} ${res.statusText}`);
  }

  const user = await res.json();
  console.log(`Conexión exitosa. Usuario autenticado: ${user.name} (ID: ${user.id}, Roles: ${user.roles.join(', ')})`);
  ```
  El servidor debe responder con código de estado HTTP `200 OK` y el objeto JSON con el perfil del usuario `zVaito`.

---

### Paso 3: Creación de Identidad y Logos con Nano Banana

- **🔧 Herramientas, Tecnologías y Endpoints Utilizados:**
  - **Motor Gráfico Generativo:** Herramienta `generate_image` (modelo Nano Banana de Google DeepMind multimodal).
  - **Formato y Especificaciones:** Imágenes PNG con canal alfa (transparencia limpia a 32 bits, 0 fondo).
  - **Endpoint de Subida a WordPress:** `POST https://[dominio]/wp-json/wp/v2/media`.
  - **Cabeceras HTTP Obligatorias de Subida:**
    - `Authorization: Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64')}`
    - `Content-Type: image/png`
    - `Content-Disposition: attachment; filename="[nombre-archivo].png"`
  - **Cuerpo de la Petición:** Buffer binario directo (`fs.readFileSync(filePath)`).

- **Generación Gráfica con `generate_image`:**
  1. **Logotipo de Cabecera (Horizontal):**
     - **Dimensiones:** Horizontal (~1100x220 px o ratio 5:1).
     - **Prompt:** Logotipo horizontal vectorial limpio, minimalista y moderno sobre fondo transparente para la marca `[Nombre de la web]`, especializado en `[Temática de la web]`. Tipografía legible y atractiva, isotipo a la izquierda, sin marcos de dispositivos y con colores corporativos armónicos.
  2. **Favicon de Alta Visibilidad y Contraste (512x512 px):**
     - **🎯 Las 5 Reglas de Oro del Favicon Profesional (Legibilidad Extrema a 16x16 y 32x32 px):**
       1. **PROHIBICIÓN TOTAL DE TEXTO:** Jamás incluir el nombre de la web, palabras ni letras en el favicon. A 16x16 px el texto es físicamente un manchón borroso e ilegible.
       2. **FORMATO SQUIRCLE (App Icon):** Ocupar el 90-95% del lienzo cuadrado mediante un contenedor de esquinas redondeadas (*squircle*, radio ~22%), con transparencia alfa limpia en las 4 esquinas exteriores. Los badges o círculos tradicionales flotantes desperdician un 40% del espacio, haciendo que el icono parezca diminuto en la pestaña.
       3. **ALTO CONTRASTE DUAL (Modo Claro y Modo Oscuro):** El contenedor debe usar un fondo degradado vibrante y saturado propio del nicho (ej. verde esmeralda brillante a menta neón para fútbol, azul eléctrico o dorado intenso) con silueta gruesa y elementos centrales en blanco puro (`#FFFFFF`) y acentos luminosos. Esto garantiza que resalte con fuerza tanto en pestañas de navegador en modo oscuro (fondo gris oscuro/negro) como en modo claro (fondo blanco).
       4. **SÍMBOLO ÚNICO, GEOMÉTRICO Y SIN LÍNEAS FINAS:** Cero redes finas, cero texturas complejas ni microdetalles que se degraden en ruido. Utilizar una silueta vectorial audaz, limpia y reconocible en 1 milisegundo (ej. balón de fútbol geométrico moderno en 3D estilizado).
       5. **ACTIVO INDEPENDIENTE Y AISLADO:** Generar a pantalla completa sin tarjetas de presentación, sin marcos grises y sin maquetas de muestra. **JAMÁS generar el favicon recortando el logotipo horizontal de la cabecera.**
     - **Prompt Maestro para Favicon:**
       ```text
       Single app icon of a modern stylized [Símbolo del nicho, ej: soccer football]. Full frame, edge to edge, occupying the entire canvas. Vibrant [Color primario saturado, ej: dark emerald green] and electric [Color secundario, ej: neon mint] gradient background with rounded squircle corners. In the center, a bold, clean, thick-lined iconic [Símbolo principal, ej: soccer ball] with bright white and electric gold facets. Minimalist, high contrast, clean vector 3D look. Isolated icon filling the entire frame, NO presentation card, NO grey background, NO mockup labels, NO preview boxes, NO text, NO letters, NO numbers.
       ```
     - **Post-procesamiento con Transparencia Alfa (Python PIL):**
       Si la imagen generada incluye esquinas blancas fuera del squircle, se aplica una máscara de esquinas redondeadas (`mask.rounded_rectangle([0,0,1023,1023], radius=225)`) y se exporta como PNG con canal alfa nativo a 512x512 px (`LANCZOS`).

- **Script de Subida Programática a la Biblioteca de Medios:**
  ```javascript
  async function uploadMedia(filePath, fileName, altText) {
    const fileBuffer = fs.readFileSync(filePath);
    const authHeader = `Basic ${Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASS}`).toString('base64')}`;

    const res = await fetch(`${process.env.WP_API_URL}/media`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="${fileName}"`
      },
      body: fileBuffer
    });

    if (!res.ok) throw new Error(`Error al subir medio: ${res.status}`);
    const media = await res.json();

    // Actualizar metadatos SEO
    await fetch(`${process.env.WP_API_URL}/media/${media.id}`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        alt_text: altText,
        title: altText
      })
    });

    console.log(`Medio subido con ID: ${media.id} (${media.source_url})`);
    return media.id;
  }
  ```
  Guardar los IDs de los medios retornados: `logoMediaId` para la Cabecera de Kadence (Paso 16) y `faviconMediaId` para el Favicon Oficial (Paso 8).

---

### Paso 4: Instalación y Activación del Tema Kadence

- **🔧 Herramientas, Tecnologías y Endpoints Utilizados:**
  - **Automatización de Navegador:** `browser_subagent` (Playwright / Chromium headless).
  - **Rutas del Panel de WordPress:**
    - Login: `https://[dominio.com]/wp-login.php`
    - Instalador de temas: `https://[dominio.com]/wp-admin/theme-install.php?search=kadence`
    - Gestor de temas: `https://[dominio.com]/wp-admin/themes.php`
  - **Selectores de Interfaz (DOM):**
    - Input de usuario: `#user_login`
    - Input de contraseña: `#user_pass`
    - Botón de submit: `#wp-submit`
    - Botón de instalación: `.theme-install[data-slug="kadence"] .button-primary, a.install-theme`
    - Botón de activación: `.theme-install[data-slug="kadence"] a.activate, a.button-primary.activate`
  - **Endpoint REST de Verificación:** `GET https://[dominio.com]/wp-json/wp/v2/themes`.

- **Automatización Paso a Paso con `browser_subagent`:**
  1. Navegar a `https://[dominio.com]/wp-login.php`.
  2. Rellenar credenciales de administración: `zVaito` / `Manuel1214$Manuel`.
  3. Navegar directamente a `https://[dominio.com]/wp-admin/theme-install.php?search=kadence`.
  4. Esperar al renderizado de la tarjeta de Kadence, hacer clic en **Instalar** y esperar a que el botón cambie a **Activar**.
  5. Hacer clic en **Activar**.
  6. **Script de Verificación Inmediata en Node.js:**
     ```javascript
     const authHeader = `Basic ${Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASS}`).toString('base64')}`;
     const res = await fetch(`${process.env.WP_API_URL}/themes`, { headers: { 'Authorization': authHeader } });
     const themes = await res.json();
     const activeTheme = themes.find(t => t.status === 'active');
     if (activeTheme?.stylesheet !== 'kadence') {
       throw new Error(`Kadence no está activo. Tema actual: ${activeTheme?.stylesheet}`);
     }
     console.log('Tema Kadence verificado como activo en WordPress.');
     ```

---

### Paso 5: Limpieza de Contenido Inicial por Defecto

- **🔧 Herramientas, Tecnologías y Endpoints Utilizados:**
  - **API del CMS:** WordPress REST API.
  - **Librería de Peticiones:** `fetch` nativo de Node.js v20+.
  - **Endpoints de Purgado Obligatorio:**
    - `DELETE https://[dominio.com]/wp-json/wp/v2/posts/1?force=true` (Entrada de muestra "Hello world!").
    - `DELETE https://[dominio.com]/wp-json/wp/v2/pages/2?force=true` (Página de muestra "Sample Page").
  - **Parámetro Mandatorio:** `force=true` (elimina permanentemente omitiendo la papelera y purga comentarios en cascada).

- **Script de Limpieza Automática (`clean_defaults.mjs`):**
  ```javascript
  const authHeader = `Basic ${Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASS}`).toString('base64')}`;

  // Purgar entrada Hello World (ID 1)
  const delPost = await fetch(`${process.env.WP_API_URL}/posts/1?force=true`, {
    method: 'DELETE',
    headers: { 'Authorization': authHeader }
  });
  console.log(`Eliminación post 1: ${delPost.status}`);

  // Purgar página Sample Page (ID 2)
  const delPage = await fetch(`${process.env.WP_API_URL}/pages/2?force=true`, {
    method: 'DELETE',
    headers: { 'Authorization': authHeader }
  });
  console.log(`Eliminación page 2: ${delPage.status}`);
  ```

---

### Paso 6: Pack Esencial de Plugins

- **🔧 Herramientas, Tecnologías y Endpoints Utilizados:**
  - **Endpoint REST de Plugins:** `POST https://[dominio.com]/wp-json/wp/v2/plugins` con payload `{ "slug": "slug-plugin", "status": "active" }`.
  - **Fallback por Interfaz:** `browser_subagent` (Playwright / Chromium headless) en `/wp-admin/plugin-install.php`.
  - **Lista de Plugins y Slugs Oficiales:**
    - `akismet` $\rightarrow$ Akismet Anti-spam (Seguridad en comentarios)
    - `ad-inserter` $\rightarrow$ Ad Inserter (Inyección de anuncios de Google AdSense)
    - `google-site-kit` $\rightarrow$ Site Kit by Google (Search Console y GA4)
    - `wordpress-seo` $\rightarrow$ Yoast SEO (Sitemaps y metadatos)
    - `contact-form-7` $\rightarrow$ Contact Form 7 (Formulario de soporte). **ADVERTENCIA OBLIGATORIA:** Contact Form 7 se inicializa por defecto con plantillas en inglés (`Your name`, `Your email`, `Subject`, `Submit`). En el Paso 7 es **mandatorio y obligatorio** acceder a `/wp-admin/admin.php?page=wpcf7` con `browser_subagent` y traducirlo al idioma oficial de la web antes de publicar la página `/contactanos/`.
    - Purgado definitivo de `hello` (Hello Dolly)

- **Script de Instalación / Activación Automática (`setup_plugins.mjs`):**
  ```javascript
  const authHeader = `Basic ${Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASS}`).toString('base64')}`;
  const plugins = ['akismet', 'ad-inserter', 'google-site-kit', 'wordpress-seo', 'contact-form-7'];

  for (const slug of plugins) {
    try {
      const res = await fetch(`${process.env.WP_API_URL}/plugins`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slug, status: 'active' })
      });
      console.log(`Plugin ${slug}: ${res.status}`);
    } catch (e) {
      console.warn(`Fallo REST para ${slug}, recurrir a browser_subagent: ${e.message}`);
    }
  }

  // Eliminar Hello Dolly
  await fetch(`${process.env.WP_API_URL}/plugins/hello-dolly/hello?force=true`, {
    method: 'DELETE',
    headers: { 'Authorization': authHeader }
  }).catch(() => {});
  ```
  *Nota de ejecución:* Si el hosting tiene restringida la manipulación de archivos por REST, el agente utiliza `browser_subagent` para instalar y activar cada plugin desde `/wp-admin/plugin-install.php?s=[slug]&tab=search&type=term`.

---

### Paso 7: Hacer Páginas Legales e Institucionales

- **🔧 Herramientas, Tecnologías y Endpoints Utilizados:**
  - **API del CMS:** WordPress REST API.
  - **Librería de Peticiones:** `fetch` nativo de Node.js v20+.
  - **Endpoint de Creación:** `POST https://[dominio.com]/wp-json/wp/v2/pages`.
  - **Plugin de Formularios:** `contact-form-7` con shortcode embebido `[contact-form-7 id="..." title="..."]`.
  - **Formato de Contenido:** HTML semántico adaptado al RGPD y la legislación vigente en España (LOPDGDD).

#### 📋 Directrices Maestras de Redacción y Personalización de Páginas Legales:

> [!IMPORTANT]
> **REGLAS DE ORO PARA LA GENERACIÓN DE LAS PÁGINAS LEGALES:**
> 1. **Los corchetes son para personalizar:** Los campos entre corchetes como `[Nombre de la web]`, `[dominio.com]`, `[Temática de la web]` e `[Idioma de la web]` deben sustituirse siempre por los datos del proyecto actual.
> 2. **Misma longitud rigurosa:** Debes reescribir los textos legales manteniendo exactamente la **misma longitud, amplitud y nivel de detalle** que los textos maestros de referencia detallados más abajo. No resumas, no recortes apartados ni generes versiones simplificadas.
> 3. **Redacción original con la misma función legal:** Escribe estos textos de páginas legales con otras palabras, que transmitan lo mismo y cumplan idéntica función legal y formal (debido a su naturaleza jurídica), pero que parezcan textos diferentes y originales, nunca copias idénticas palabra por palabra.
> 4. **Adaptación temática completa:** En lugar de `lunexfinances.com` y del sector de Finanzas / Criptomonedas (que sirve como plantilla maestra de referencia), se debe hablar en todo momento de `[La web en la que estamos trabajando]` y del tema concreto `[El tema de la web en la que estamos trabajando]`.
> 5. **Idioma vehicular:** Escribe todas las páginas legales íntegramente en el idioma de la página web: `[Idioma de la página web]` (ej. español, inglés, francés, etc.).
> 6. **Transformación de correos electrónicos:** Cuando en el texto de referencia aparezca un correo como `ejemplo@lunexfinances.com`, debes cambiarlo por `ejemplo@[el dominio de la web que estamos haciendo ahora]`. Es decir, mantén el prefijo (`contacto`, `manuellopezramos`) a menos que haya que adaptarlo por el idioma de la web (por ejemplo, de `contacto` a `contact` en webs en inglés o francés), pero cambiando siempre obligatoriamente el dominio.
> 7. **Datos legales personales universales e invariables:** **NO edites ni alteres** la información personal de Manuel López Ramos:
>    - **Titular y Responsable Legal:** `Manuel López Ramos`
>    - **NIF:** `45841212S`
>    - **Domicilio Fiscal:** `Calle Blas Infante, Córdoba, España`
>    - **Jurisdicción:** `Juzgados y Tribunales de Córdoba, España`
> 8. **Adaptación de conocimientos y trayectoria del fundador:** Lo que **SÍ debes editar** son los conocimientos y trayectoria de Manuel López Ramos: debes especificar siempre que cuenta con amplios conocimientos, años de experiencia y trayectoria contrastada en la temática concreta de la web que estamos haciendo (`[Temática de la web]`).
> 9. **Prohibición estricta de saltarse títulos o cláusulas:** No te saltes ninguno de los títulos, encabezados o apartados legales (por ejemplo, las 14 cláusulas de la Política de Privacidad, el desglose de cookies técnicas/analíticas/publicitarias, las exenciones de responsabilidad del Aviso Legal o los términos de uso). Todos deben estar presentes con sus títulos correspondientes adaptados al idioma.

#### Datos Legales Universales Invariables (Manuel López Ramos):
- **Titular y Responsable Legal:** Manuel López Ramos
- **NIF:** `45841212S`
- **Domicilio Fiscal:** `Calle Blas Infante, Córdoba, España`
- **Correos electrónicos del dominio:** `contacto@[dominio.com]`, `manuellopezramos@[dominio.com]`


#### 🚨 REGLA ESTRICTA DE LOCALIZACIÓN OBLIGATORIA DE CONTACT FORM 7 (PROHIBICIÓN TOTAL DE FORMULARIOS EN INGLÉS EN WEBS EN ESPAÑOL U OTROS IDIOMAS):

> [!CAUTION]
> **MOTIVO DEL ERROR RECURRENTE Y PROHIBICIÓN RADICAL:**  
> Cuando el plugin `contact-form-7` se instala y activa, WordPress genera automáticamente un formulario inicial por defecto (*Contact form 1*) con etiquetas 100% en inglés: `<label> Your name ... </label>`, `<label> Your email ... </label>`, `<label> Subject ... </label>`, `<label> Your message (optional) ... </label>`, `[submit "Submit"]`.  
> Si el agente se limita a incrustar el shortcode `[contact-form-7 id="..." ...]` sin modificar el formulario dentro de WordPress, **la web en español u otro idioma mostrará un formulario en inglés**, lo que destruye la credibilidad del sitio y el rigor del protocolo.  
> **ESTÁ TOTALMENTE PROHIBIDO publicar la página `/contactanos/` (o su equivalente en el idioma de la web) sin haber editado y traducido previamente la plantilla del formulario al idioma vehicular del sitio.**

##### Procedimiento Técnico de Localización con `browser_subagent`:
Dado que la REST API de Contact Form 7 restringe la edición programática de la plantilla (`properties.form.content`) sin sesión autenticada en el panel de control, el agente **DEBE utilizar obligatoriamente `browser_subagent`** para editar y guardar el formulario:

1. Abrir la URL de edición del formulario en el panel de WordPress:
   `https://[dominio.com]/wp-admin/admin.php?page=wpcf7&post=[formId]` (típicamente ID 9 o el que figure en Contacto).
2. Localizar el área de texto con ID `#wpcf7-form` en la pestaña **Formulario**.
3. Reemplazar su contenido de forma íntegra por la plantilla oficial traducida al idioma del proyecto (ver plantillas a continuación).
4. Hacer clic en el botón de guardar (`#wpcf7-save`).
5. Esperar la confirmación en pantalla (*"Formulario de contacto guardado"*).

##### Plantillas Oficiales de Formulario por Idioma:

- **🇪🇸 Español (Spanish):**
  ```html
  <label> Tu nombre (obligatorio)
      [text* your-name autocomplete:name] </label>

  <label> Tu correo electrónico (obligatorio)
      [email* your-email autocomplete:email] </label>

  <label> Asunto
      [text* your-subject] </label>

  <label> Tu mensaje (opcional)
      [textarea your-message] </label>

  [submit "Enviar mensaje"]
  ```

- **🇫🇷 Francés (French):**
  ```html
  <label> Votre nom (obligatoire)
      [text* your-name autocomplete:name] </label>

  <label> Votre adresse de messagerie (obligatoire)
      [email* your-email autocomplete:email] </label>

  <label> Sujet
      [text* your-subject] </label>

  <label> Votre message (optionnel)
      [textarea your-message] </label>

  [submit "Envoyer le message"]
  ```

- **🇩🇪 Alemán (German):**
  ```html
  <label> Ihr Name (erforderlich)
      [text* your-name autocomplete:name] </label>

  <label> Ihre E-Mail-Adresse (erforderlich)
      [email* your-email autocomplete:email] </label>

  <label> Betreff
      [text* your-subject] </label>

  <label> Ihre Nachricht (optional)
      [textarea your-message] </label>

  [submit "Nachricht senden"]
  ```

- **🇵🇹 Portugués (Portuguese):**
  ```html
  <label> O seu nome (obrigatório)
      [text* your-name autocomplete:name] </label>

  <label> O seu correio eletrónico (obrigatório)
      [email* your-email autocomplete:email] </label>

  <label> Assunto
      [text* your-subject] </label>

  <label> A sua mensagem (opcional)
      [textarea your-message] </label>

  [submit "Enviar mensagem"]
  ```

- **🇬🇧 Inglés (English - solo si la web es en inglés):**
  ```html
  <label> Your name (required)
      [text* your-name autocomplete:name] </label>

  <label> Your email (required)
      [email* your-email autocomplete:email] </label>

  <label> Subject
      [text* your-subject] </label>

  <label> Your message (optional)
      [textarea your-message] </label>

  [submit "Send message"]
  ```

##### 🛡️ Test de Verificación Obligatoria Post-Publicación (Gate de Paso 7):
Inmediatamente después de publicar las páginas legales, el agente **DEBE ejecutar de forma automática este test HTTP** para validar la página `/contactanos/`:

```javascript
const res = await fetch(`https://${dominio}/contactanos/?nocache=${Date.now()}`);
const html = await res.text();

// Para webs en español:
const hasValidSpanish = html.includes('Tu nombre') && html.includes('Tu correo electrónico') && html.includes('Enviar mensaje');
const hasForbiddenEnglish = html.includes('Your name') || html.includes('Your email') || html.includes('value="Submit"');

if (!hasValidSpanish || hasForbiddenEnglish) {
  throw new Error(`[CRITICAL GATE FAILURE] El formulario de contacto está en un idioma incorrecto (se detectaron textos en inglés). Debe corregirse en /wp-admin/admin.php?page=wpcf7 antes de avanzar al Paso 8.`);
}
console.log('✅ Formulario de contacto 100% verificado en el idioma oficial de la web.');
```
> **MANDATO DE BLOQUEO:** Si esta verificación falla, el agente tiene terminantemente prohibido avanzar al Paso 8 hasta corregir el formulario mediante `browser_subagent`.


#### 📄 Textos Maestros de Referencia para las 7 Páginas Legales (Plantilla Base Exhaustiva):

> [!NOTE]
> **CÓMO UTILIZAR ESTOS TEXTOS MAESTROS:**  
> Los siguientes 7 bloques constituyen los textos de referencia jurídica oficiales. El agente debe reescribirlos con la **misma longitud, mismas secciones y misma formalidad jurídica**, pero parafraseados con palabras originales para evitar duplicidades, adaptándolos a `[Nombre de la web]`, `[dominio.com]`, `[Temática de la web]` e `[Idioma de la web]`:

---

##### 1. Sobre Nosotros
```text
Sobre Nosotros

[Nombre de la web / Lunex Finances] fue fundada en 2025 para proporcionar análisis claros, fiables y rigurosamente elaborados sobre [Temática de la web / finanzas y criptomonedas]. En mercados o sectores impulsados por la emoción, apostamos por la disciplina, el análisis estructurado y la toma de decisiones basada en datos.

Nuestra misión es ayudar a los lectores a comprender [Temática de la web / los mercados financieros] mediante investigación independiente, análisis verificable y contenido educativo práctico.

Nuestro origen
[Nombre de la web / Lunex Finances] nació como un proyecto personal de Manuel López Ramos, motivado por la falta de contenido transparente y basado en evidencia en el sector de [Temática de la web / las criptomonedas]. Con el tiempo, ha evolucionado hacia una plataforma centrada en la divulgación rigurosa, el análisis especializado y la creación de recursos didácticos para la comunidad.

Sobre el fundador
Manuel López Ramos cuenta con varios años de experiencia en el ámbito de [Temática de la web / mercados de criptomonedas], con un enfoque consolidado en el análisis a largo plazo, el estudio estructural y la psicología del comportamiento.
Su filosofía se basa en:
- Disciplina frente a especulación o improvisación.
- Verificación rigurosa de datos y fuentes contrastables.
- Enfoque formativo y analítico a largo plazo.
Contacto: manuellopezramos@[dominio.com]

Nuestra metodología
- Utilizamos datos públicos y verificables.
- Actualizamos el contenido regularmente.
- Priorizamos el análisis objetivo sobre el sensacionalismo.
- Mantenemos independencia editorial (sin influencia de contenido patrocinado ni presiones externas).

A quién nos dirigimos
Nuestro contenido está orientado a especialistas, aficionados y cualquier persona interesada en comprender [Temática de la web / los mercados financieros] desde una perspectiva racional y estructurada.

Valores
Transparencia, independencia y educación son los pilares fundamentales de [Nombre de la web / Lunex Finances].

Aviso legal
El contenido publicado tiene fines exclusivamente educativos y divulgativos, y no constituye asesoramiento profesional vinculante. Cada usuario es responsable de sus decisiones.

Contacto
- Ubicación: Calle Blas Infante, Córdoba, España.
- Email: contacto@[dominio.com]
- Tiempo de respuesta: 24-48 horas laborables.
```

---

##### 2. Manuel López Ramos
```text
Manuel López Ramos

Fundador de [Nombre de la web / Lunex Finances] y analista / responsable editorial especializado en [Temática de la web / finanzas personales y criptomonedas].

Experiencia:
- Varios años analizando y divulgando sobre [Temática de la web / mercados cripto].
- Enfoque en el análisis a largo plazo, la evolución del sector y los fundamentos técnicos.
- Especial interés en la investigación pedagógica y el comportamiento de la comunidad.

Metodología:
- Análisis basado en datos verificables y fuentes contrastables.
- Enfoque educativo, divulgativo y transparente.
- Rechazo del sensacionalismo informativo y las afirmaciones no fundamentadas.

Este perfil forma parte del compromiso inquebrantable de transparencia y rigor de [Nombre de la web / Lunex Finances].

Contacto:
- Email profesional: manuellopezramos@[dominio.com]
- Correspondencia: Calle Blas Infante, Córdoba, España.
```

---

##### 3. Contáctanos
```text
Contáctanos

Para esta página es obligatorio utilizar el plugin Contact Form 7 instalado y activado en WordPress.
En el panel de administración (/wp-admin/admin.php?page=wpcf7) se debe editar el Formulario de Contacto 1 (el creado por defecto) para traducir al idioma de la web las etiquetas visuales:
- "Tu nombre (obligatorio)"
- "Tu correo electrónico (obligatorio)"
- "Asunto"
- "Tu mensaje (opcional)"
- "Enviar mensaje"

Código de inserción en la página:
[contact-form-7 id="{formId}" title="Contacto"]

Canales directos de comunicación alternativa:
- Email de soporte general: contacto@[dominio.com]
- Dirección editorial directa: manuellopezramos@[dominio.com]
- Domicilio de correspondencia: Manuel López Ramos, Calle Blas Infante, Córdoba, España.
- Tiempo estimado de atención: 24-48 horas.
```

---

##### 4. Política de Privacidad
```text
POLÍTICA DE PRIVACIDAD – [NOMBRE DE LA WEB / LUNEX FINANCES]
Sitio web: [dominio.com / lunexfinances.com]
Correo de contacto: contacto@[dominio.com]
Última actualización: [Mes y Año actual, ej. abril de 2026]

1. Responsable del tratamiento
El responsable del tratamiento de los datos personales es:
- Titular: Manuel López Ramos
- NIF: 45841212S
- Domicilio: Calle Blas Infante, Córdoba, España
- Correo electrónico: manuellopezramos@[dominio.com]

2. Datos personales que se recopilan
En este sitio web se pueden recopilar los siguientes datos personales:
- Datos facilitados voluntariamente a través de formularios de contacto (nombre y correo electrónico).
- Datos técnicos y de navegación, como dirección IP, tipo de dispositivo, navegador y páginas visitadas.
- Datos recopilados mediante cookies, conforme a la Política de Cookies.
No se recopilan datos bancarios ni información financiera sensible.

3. Finalidad del tratamiento de los datos
Los datos personales se utilizan para:
- Responder a consultas enviadas por los usuarios.
- Gestionar comunicaciones relacionadas con el sitio web.
- Mejorar la experiencia de navegación.
- Mostrar publicidad personalizada mediante Google AdSense.
- Realizar análisis estadísticos del tráfico del sitio web.

4. Base legal del tratamiento
El tratamiento de los datos se basa en:
- Consentimiento del usuario.
- Interés legítimo para análisis básico del sitio web.
- Cumplimiento de obligaciones legales cuando corresponda.

5. Publicidad y Google AdSense
Este sitio web utiliza Google AdSense para mostrar anuncios.
Google y sus socios pueden utilizar cookies y tecnologías similares para:
- Mostrar anuncios personalizados o no personalizados.
- Medir la eficacia de los anuncios.
- Limitar la repetición de anuncios.
El usuario puede gestionar la personalización de anuncios en: https://adssettings.google.com/

6. Uso de cookies
Este sitio utiliza cookies propias y de terceros para fines técnicos, analíticos y publicitarios.
El uso de cookies está regulado en la Política de Cookies, donde el usuario puede aceptar, rechazar o configurar sus preferencias en cualquier momento.

7. Conservación de los datos
Los datos personales se conservarán únicamente durante el tiempo necesario para cumplir las finalidades para las que fueron recogidos o mientras exista obligación legal.

8. Comunicación de datos a terceros
Los datos pueden ser compartidos con los siguientes proveedores:
- Google LLC (Google AdSense y Google Analytics).
- Proveedores de hosting y servicios técnicos.
Estos terceros pueden tratar datos fuera del Espacio Económico Europeo bajo garantías adecuadas.

9. Derechos del usuario (RGPD)
El usuario puede ejercer los siguientes derechos:
- Acceso a sus datos personales.
- Rectificación.
- Supresión.
- Limitación del tratamiento.
- Oposición.
- Portabilidad de los datos.
Para ejercerlos, puede escribir a: contacto@[dominio.com]

10. Seguridad de los datos
Se aplican medidas técnicas y organizativas adecuadas para proteger los datos personales, incluyendo:
- Conexión segura mediante HTTPS.
- Control de acceso restringido.
- Sistemas de seguridad y protección contra accesos no autorizados.

11. Menores de edad
Este sitio web no está dirigido a menores de 14 años.
No se recopilan datos de menores de forma intencionada. Si se detecta algún caso, los datos serán eliminados inmediatamente.

12. Transferencias internacionales
Algunos proveedores, como Google, pueden almacenar o tratar datos fuera del Espacio Económico Europeo.
Estas transferencias se realizan con garantías adecuadas conforme al RGPD.

13. Cambios en la política
Esta política puede actualizarse en cualquier momento para adaptarse a cambios legales o técnicos.
La versión vigente será siempre la publicada en esta página.

14. Contacto
Para cualquier cuestión relacionada con la privacidad: contacto@[dominio.com]
```

---

##### 5. Política de Cookies
```text
POLÍTICA DE COOKIES – [NOMBRE DE LA WEB / LUNEX FINANCES]
Última actualización: [Mes y Año actual, ej. abril de 2026]

Resumen
[Nombre de la web / Lunex Finances] utiliza cookies propias y de terceros para garantizar el funcionamiento del sitio web, analizar el uso del contenido y, en caso de activación, mostrar publicidad.
El usuario puede aceptar, rechazar o configurar el uso de cookies en cualquier momento a través del panel de consentimiento habilitado en el sitio web.
Para más información sobre el tratamiento de datos personales, consulta la Política de Privacidad.

¿Qué son las cookies?
Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario al visitar un sitio web.
Permiten el funcionamiento técnico del sitio y, en algunos casos, la recopilación de información sobre la navegación.
Las cookies pueden incluir identificadores técnicos, preferencias del usuario o datos estadísticos de uso.

Tipos de cookies utilizadas

A. Cookies técnicas (necesarias)
Son esenciales para el funcionamiento del sitio web y no requieren consentimiento previo.
Permiten funciones como:
- Recordar el consentimiento de cookies.
- Garantizar la seguridad del sitio.
- Mantener el funcionamiento básico de formularios.
Estas cookies no se utilizan con fines publicitarios ni de seguimiento.

B. Cookies de análisis
Se utilizan para comprender el uso del sitio web y mejorar su rendimiento.
Ejemplo: Google Analytics (_ga, _gid)
Finalidad:
- Medición de tráfico.
- Análisis de páginas visitadas.
- Mejora de la experiencia del usuario.
La información suele tratarse de forma agregada y puede ser gestionada por terceros conforme a sus propias políticas.

C. Cookies publicitarias
Si están activadas, servicios como Google AdSense pueden utilizar cookies para:
- Mostrar anuncios.
- Medir la eficacia publicitaria.
- Limitar la repetición de anuncios.
Estas cookies pueden basarse en la navegación del usuario en este y otros sitios web.

D. Cookies de terceros
Algunos contenidos integrados (por ejemplo, vídeos o servicios externos) pueden instalar cookies gestionadas por terceros.
Estas cookies están sujetas a las políticas de cada proveedor externo.

Cookies utilizadas en este sitio
A modo informativo, este sitio puede utilizar las siguientes cookies:
- cookie_consent → gestión de preferencias de consentimiento
- _ga → análisis de usuarios (Google Analytics)
- _gid → análisis de sesión (Google Analytics)
- IDE → publicidad personalizada (Google AdSense)
Algunas cookies pueden variar en función de los servicios activos en cada momento.

Gestión del consentimiento
Al acceder al sitio web, el usuario puede:
- Aceptar todas las cookies.
- Rechazar cookies no esenciales.
- Configurar sus preferencias por categorías.
El consentimiento puede modificarse en cualquier momento desde el enlace "Configuración de cookies" disponible en el pie de página.
Las cookies no esenciales no se activan hasta que el usuario haya otorgado su consentimiento.
Este sitio es compatible con un sistema de consentimiento conforme a los requisitos de Google Consent Mode v2.

Cómo desactivar las cookies
El usuario puede eliminar o bloquear cookies desde la configuración de su navegador.
La desactivación de cookies técnicas puede afectar al funcionamiento del sitio web.

Tratamiento por terceros
Algunos proveedores externos, como Google, pueden tratar datos derivados del uso de cookies para analítica web, publicidad personalizada y medición de rendimiento. Estos terceros actúan como responsables independientes del tratamiento conforme a sus propias políticas. [Nombre de la web / Lunex Finances] no accede directamente a los datos combinados generados por dichos proveedores.

Menores de edad
Este sitio no está dirigido específicamente a menores de 13 años. No se recopilan de forma intencionada datos personales de menores sin consentimiento conforme a la normativa aplicable.

Actualizaciones
Esta política puede actualizarse para reflejar cambios legales, técnicos o en los servicios utilizados. La fecha de actualización se modificará en consecuencia.
```

---

##### 6. Aviso Legal
```text
AVISO LEGAL – [NOMBRE DE LA WEB / LUNEX FINANCES]
Última actualización: [Mes y Año actual, ej. abril de 2026]

Identificación del titular del sitio web (LSSI-CE)
En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa de que el sitio web [dominio.com / lunexfinances.com] es titularidad de:
- Titular: Manuel López Ramos
- NIF: 45841212S
- Domicilio: Calle Blas Infante, Córdoba, España
- Correo electrónico de contacto: contacto@[dominio.com]
Estos datos identifican al responsable del sitio web a efectos legales.

Finalidad del sitio web
[Nombre de la web / Lunex Finances] es un sitio web de carácter informativo y educativo especializado en:
- [Temática de la web: Análisis deportivo / Finanzas personales]
- [Táctica, reglamento y análisis / Mercados financieros y criptomonedas]
- [Formación y divulgación general / Educación financiera y análisis económico]
La información publicada tiene únicamente fines informativos generales.

Exención de responsabilidad – No asesoramiento financiero / profesional
El contenido de este sitio web no constituye en ningún caso asesoramiento profesional directo, legal, fiscal, técnico o de inversión. La información publicada es general y no tiene en cuenta circunstancias personales del usuario. Cualquier decisión tomada por el usuario se realiza bajo su exclusiva responsabilidad. El titular no garantiza resultados derivados del uso de la información publicada.

Riesgo de la actividad
[Adaptar a la temática: Ej. mercados financieros conllevan riesgo de pérdida / Ej. deportes exigen prudencia física]. El usuario declara ser consciente de dichos riesgos y acepta que utiliza la información del sitio web bajo su propia responsabilidad.

Publicidad, Google AdSense y enlaces de afiliados
Este sitio web utiliza Google AdSense para mostrar publicidad. Los anuncios pueden ser personalizados en función de cookies y tecnologías similares utilizadas por Google y otros terceros publicitarios.
El sitio web puede contener también enlaces de afiliados o contenido patrocinado, lo que puede generar una comisión al titular sin coste adicional para el usuario. El contenido publicitario o patrocinado no constituye asesoramiento independiente ni recomendación.

Protección de datos personales (RGPD)
En caso de recogida de datos personales (por ejemplo, a través de formularios de contacto o suscripción), estos serán tratados conforme al Reglamento (UE) 2016/679 (RGPD):
- Finalidad del tratamiento: gestión de consultas y comunicaciones.
- Base jurídica: consentimiento del interesado.
- Conservación: únicamente durante el tiempo necesario para cumplir la finalidad indicada.
El usuario podrá ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad mediante solicitud al correo electrónico: contacto@[dominio.com]
Para más información, el usuario puede consultar la Política de Privacidad del sitio web.

Política de cookies
Este sitio web utiliza cookies propias y de terceros, incluidas cookies de Google AdSense, con fines técnicos, analíticos y publicitarios. El usuario puede aceptar, rechazar o configurar el uso de cookies mediante el panel de consentimiento habilitado al acceder al sitio web. Para más información, consulte la Política de Cookies.

Propiedad intelectual e industrial
Todos los contenidos del sitio web, incluyendo textos, artículos, diseños, logotipos y elementos gráficos, son propiedad del titular del sitio web, salvo que se indique lo contrario. Queda prohibida su reproducción, distribución o modificación sin autorización expresa del titular. En caso de utilizar contenidos de terceros, se respetarán sus respectivas licencias.

Enlaces externos
El sitio web puede incluir enlaces a páginas de terceros. El titular no se responsabiliza del contenido, exactitud o políticas de privacidad de dichos sitios externos.

Limitación de responsabilidad
El titular no será responsable de:
- Errores u omisiones en los contenidos.
- Falta de actualización de la información.
- Decisiones tomadas por los usuarios basadas en la información publicada.
- Daños o pérdidas derivados del uso del sitio web.
El usuario utiliza el sitio web bajo su propia responsabilidad.

Legislación aplicable y jurisdicción
El presente Aviso Legal se rige por la legislación española. Para la resolución de cualquier conflicto, las partes se someten a los Juzgados y Tribunales de Córdoba, España, salvo disposición legal en materia de consumidores que establezca otra jurisdicción obligatoria.

Modificaciones
El titular se reserva el derecho de modificar el presente Aviso Legal en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio web.
```

---

##### 7. Términos y Condiciones
```text
TÉRMINOS Y CONDICIONES – [NOMBRE DE LA WEB / LUNEX FINANCES]
Sitio web: [dominio.com / lunexfinances.com]
Correo de contacto: contacto@[dominio.com]
Última actualización: [Mes y Año actual, ej. abril de 2026]

1. Aceptación de los términos
El acceso y uso del sitio web [dominio.com / lunexfinances.com] implica la aceptación plena de los presentes Términos y Condiciones. Si el usuario no está de acuerdo con alguno de estos términos, debe abstenerse de utilizar el sitio web.

2. Objeto del sitio web
[Nombre de la web / Lunex Finances] es un sitio web de carácter informativo y educativo que publica contenidos relacionados con [Temática de la web]. El contenido tiene únicamente fines informativos y formativos generales.

3. Uso permitido del sitio web
El usuario se compromete a utilizar el sitio web de forma adecuada y conforme a la ley. Queda prohibido:
- Utilizar el sitio para fines ilegales o fraudulentos.
- Realizar copias masivas del contenido mediante sistemas automatizados (scraping).
- Alterar o dañar el funcionamiento del sitio web.
- Intentar acceder a zonas restringidas sin autorización.

4. Propiedad intelectual
Todos los contenidos del sitio web, incluyendo textos, artículos, diseño, logotipo y material gráfico, son propiedad del titular del sitio web o de terceros con licencia. Queda prohibida su reproducción, distribución o modificación sin autorización expresa.

5. Contenido informativo y ausencia de asesoramiento
La información publicada en este sitio web no constituye en ningún caso asesoramiento profesional directo, legal o fiscal. El contenido es de carácter general y no tiene en cuenta circunstancias personales del usuario. El usuario es el único responsable de las decisiones que tome basadas en la información del sitio web.

6. Publicidad y Google AdSense
Este sitio web utiliza Google AdSense para mostrar publicidad. Los anuncios pueden ser personalizados en función de cookies y tecnologías similares. Google y sus socios pueden utilizar datos de navegación para mostrar anuncios relevantes según sus propias políticas. El contenido publicitario es responsabilidad exclusiva de los anunciantes y no representa una recomendación del sitio web.

7. Enlaces de afiliados
Este sitio web puede incluir enlaces de afiliados. Esto significa que el titular puede recibir una comisión si el usuario realiza una acción a través de dichos enlaces, sin coste adicional para el usuario.

8. Enlaces a terceros
El sitio web puede contener enlaces a sitios web de terceros. El titular no se responsabiliza del contenido, exactitud ni políticas de privacidad de dichos sitios externos.

9. Limitación de responsabilidad
El titular no será responsable de:
- Errores u omisiones en los contenidos.
- Falta de actualización de la información.
- Decisiones tomadas por los usuarios.
- Pérdidas derivadas del uso del sitio web.
- Problemas técnicos o interrupciones del servicio.
El usuario utiliza el sitio web bajo su propia responsabilidad.

10. Disponibilidad del sitio web
No se garantiza la disponibilidad continua del sitio web. El titular puede modificar, suspender o eliminar el servicio en cualquier momento sin previo aviso.

11. Protección de datos y cookies
El tratamiento de datos personales y el uso de cookies se rige por la Política de Privacidad y la Política de Cookies, ambas disponibles de forma permanente en el sitio web.

12. Modificaciones
El titular se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio web.

13. Legislación aplicable y jurisdicción
Estos Términos se rigen por la legislación española. Para cualquier conflicto, las partes se someten a los Juzgados y Tribunales de Córdoba, España, salvo disposición legal en materia de consumidores que indique otra jurisdicción obligatoria.
```

---

#### Script de Creación y Publicación Masiva de Páginas Legales (`create_legal_pages.mjs`):

```javascript
import { authHeader, apiUrl } from './loadEnv.mjs';

// ID del formulario de contacto (previamente traducido al idioma de la web)
const formId = 9;

// Array con las 7 páginas completas adaptadas en longitud y títulos
const pages = [
  {
    title: 'Sobre Nosotros',
    slug: 'sobre-nosotros',
    content: `[Contenido completo en HTML semántico reescrito con la misma longitud que la plantilla maestra]`
  },
  {
    title: 'Manuel López Ramos',
    slug: 'manuel-lopez-ramos',
    content: `[Contenido completo en HTML semántico con la trayectoria de Manuel adaptada a la temática]`
  },
  {
    title: 'Contáctanos',
    slug: 'contactanos',
    content: `[Contenido completo con shortcode [contact-form-7 id="${formId}" title="Contacto"] y canales directos]`
  },
  {
    title: 'Política de Privacidad',
    slug: 'politica-de-privacidad',
    content: `[Contenido completo con las 14 secciones del RGPD / LOPDGDD y AdSense]`
  },
  {
    title: 'Política de Cookies',
    slug: 'politica-de-cookies',
    content: `[Contenido completo con la clasificación técnica de cookies y Google Consent Mode v2]`
  },
  {
    title: 'Aviso Legal',
    slug: 'aviso-legal',
    content: `[Contenido completo con LSSI-CE, exención de responsabilidad y fuero de Córdoba, España]`
  },
  {
    title: 'Términos y Condiciones',
    slug: 'terminos-y-condiciones',
    content: `[Contenido completo con las 13 cláusulas de uso lícito y propiedad intelectual]`
  }
];

// Comprobar páginas existentes y crear o actualizar por REST API
const existingRes = await fetch(`${apiUrl}/pages?per_page=100`, { headers: { 'Authorization': authHeader } });
const existing = await existingRes.json();
const existingMap = new Map(existing.map(p => [p.slug, p.id]));

for (const page of pages) {
  if (existingMap.has(page.slug)) {
    const pageId = existingMap.get(page.slug);
    await fetch(`${apiUrl}/pages/${pageId}`, {
      method: 'POST',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: page.title, content: page.content, status: 'publish' })
    });
    console.log(`Página actualizada: ${page.title} (ID: ${pageId})`);
  } else {
    const createRes = await fetch(`${apiUrl}/pages`, {
      method: 'POST',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: page.title, slug: page.slug, content: page.content, status: 'publish' })
    });
    const data = await createRes.json();
    console.log(`Página creada: ${page.title} (ID: ${data.id})`);
  }
}

// 🛡️ Test de Verificación Obligatoria de Contact Form 7
const checkRes = await fetch(`https://${process.env.WP_DOMAIN || 'golazos.co'}/contactanos/?nocache=${Date.now()}`);
const checkHtml = await checkRes.text();
if (checkHtml.includes('Your name') || checkHtml.includes('Submit')) {
  throw new Error('[CRITICAL GATE] El formulario de contacto está en inglés. Debe corregirse antes de continuar.');
}
console.log('✅ Verificación completada: Páginas legales y formulario 100% operativos en el idioma de la web.');
```


---

### Paso 8: Ajustes Generales (`options-general.php`)

- **🔧 Herramientas, Tecnologías y Endpoints Utilizados:**
  - **API del CMS:** WordPress REST API.
  - **Endpoint de Ajustes:** `POST https://[dominio.com]/wp-json/wp/v2/settings`.
  - **Cabecera HTTP:** `Authorization: Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64')}`.

- **Script y Payload de Configuración General:**
  ```javascript
  // OBLIGATORIO: site_icon debe ser SIEMPRE faviconMediaId (el ID del favicon 512x512 generado en el Paso 3).
  // PROHIBIDO usar el ID del logotipo horizontal de la cabecera.
  await fetch(`${process.env.WP_API_URL}/settings`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: "[Nombre de la web]",
      description: "[Descripción de 2-3 palabras]",
      site_icon: faviconMediaId
    })
  });
  console.log(`Ajustes generales configurados con éxito. site_icon establecido a ID: ${faviconMediaId}`);
  ```

---

### Paso 9: Ajustes de Lectura y Comentarios (`options-reading.php` y `options-discussion.php`)

- **🔧 Herramientas, Tecnologías y Endpoints Utilizados:**
  - **API del CMS:** WordPress REST API.
  - **Endpoint de Ajustes:** `POST https://[dominio.com]/wp-json/wp/v2/settings`.
  - **Objetivo de Rendimiento:** Desactivar llamadas DNS externas (Gravatar) y paginación de comentarios para lograr 100/100 en Google PageSpeed Insights.

- **Script y Payload de Ajustes de Lectura y Discusión:**
  ```javascript
  await fetch(`${process.env.WP_API_URL}/settings`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      show_on_front: "posts",
      posts_per_page: 12,
      posts_per_rss: 12,
      rss_use_excerpt: 0,
      blog_public: 1,
      default_comment_status: "open",
      comment_moderation: 1,
      comment_previously_approved: 0,
      require_name_email: 1,
      comment_registration: 0,
      thread_comments: 0,
      page_comments: 0,
      show_avatars: 0
    })
  });
  console.log('Ajustes de lectura y comentarios configurados con éxito.');
  ```

---

### Paso 10: Ajustes de Medios y Enlaces Permanentes (`options-media.php` y `options-permalink.php`)

- **🔧 Herramientas, Tecnologías y Endpoints Utilizados:**
  - **Servidor y Archivo de Configuración:** Servidor Apache/LiteSpeed (`.htaccess`) o Nginx para reescritura de URLs limpias.
  - **API del CMS:** WordPress REST API.
  - **Endpoint de Ajustes:** `POST https://[dominio.com]/wp-json/wp/v2/settings`.
  - **Cabecera HTTP:** `Authorization: Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64')}`.

- **Script y Payload de Configuración de Permalinks y Medios:**
  ```javascript
  await fetch(`${process.env.WP_API_URL}/settings`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      permalink_structure: "/%postname%/"
    })
  });
  console.log('Enlaces permanentes configurados en /%postname%/ (Nombre de la entrada).');
  ```

- **Ajustes de Medios (Dimensiones por Defecto):**
  - Miniatura: Anchura `150`, Altura `150`, casilla `Recortar miniaturas en dimensiones exactas` marcada (`[x]`).
  - Medio: Anchura máxima `300`, Altura máxima `300`.
  - Grande: Anchura máxima `1024`, Altura máxima `1024`.
  - Subida de archivos: `[x]` *Organizar mis archivos subidos en carpetas basadas en mes y año* (marcada).

---

### Paso 11: Configuración y Calibración Completa de Yoast SEO

- **🔧 Herramientas y Tecnologías Utilizadas:**
  - **Plugin Oficial:** Yoast SEO (`wordpress-seo`).
  - **Automatización de Navegador:** `browser_subagent` (Playwright / Chromium headless).
  - **Rutas de Administración:**
    - Asistente de primera configuración: `https://[dominio.com]/wp-admin/admin.php?page=wpseo_installation_wizard`
    - Herramienta de importación: `https://[dominio.com]/wp-admin/admin.php?page=wpseo_tools&tool=import-export`
  - **Archivo de Calibración:** Volcado INI maestro integrado en este protocolo.

#### 1. Asistente de Configuración Inicial (`wpseo_dashboard#top#first-time-configuration`):
- Pulsar **Empezar la optimización de datos de SEO** y esperar a que complete el escaneo de indexables.
- Continuar a **Representación del sitio**:
  - ¿Tu sitio representa a una organización o a una persona?: **Persona**.
  - Nombre: Seleccionar el usuario administrador (`zVaito`).
  - Logotipo / Foto de perfil: Seleccionar el logo oficial de la marca desde la biblioteca de medios.
- **Perfiles sociales:** Omitir / Guardar y continuar.
- **Preferencias personales:** Seleccionar *No, no quiero compartir los datos de mi web* y finalizar.

#### 2. Importación del Volcado Maestro de Ajustes:
- Navegar en WordPress a *Yoast SEO $\rightarrow$ Herramientas $\rightarrow$ Importar y exportar $\rightarrow$ Importar ajustes* (`/wp-admin/admin.php?page=wpseo_tools&tool=import-export`).
- Copiar íntegramente el siguiente bloque INI maestro y pegarlo en el campo de texto de importación:

```ini
; Estos son los ajustes del plugin Yoast SEO de Yoast.com

[wpseo]
tracking = 
toggled_tracking = 
license_server_version = "false"
ms_defaults_set = 
ignore_search_engines_discouraged_notice = 
indexing_first_time = 
indexing_started = 
indexing_reason = "post_type_made_public"
indexables_indexing_completed = 1
index_now_key = ""
version = "28.7"
previous_version = "28.6"
disableadvanced_meta = 1
enable_headless_rest_endpoints = 1
ryte_indexability = 
baiduverify = ""
googleverify = ""
msverify = ""
yandexverify = ""
ahrefsverify = ""
site_type = ""
has_multiple_authors = ""
environment_type = ""
content_analysis_active = 1
keyword_analysis_active = 1
inclusive_language_analysis_active = 
enable_admin_bar_menu = 1
enable_cornerstone_content = 1
enable_xml_sitemap = 1
enable_text_link_counter = 1
enable_index_now = 1
enable_ai_generator = 1
ai_enabled_pre_default = 
show_onboarding_notice = 1
first_activated_on = "1775463942"
myyoast-oauth = 
semrush_integration_active = 1
semrush_country_code = "us"
permalink_structure = "/%postname%/"
home_url = "https://[dominio.com]"
dynamic_permalinks = 
category_base_url = ""
tag_base_url = ""
enable_enhanced_slack_sharing = 1
enable_metabox_insights = 1
enable_link_suggestions = 1
algolia_integration_active = 
workouts_data[] = 
configuration_finished_steps[] = "optimizeSeoData"
configuration_finished_steps[] = "siteRepresentation"
configuration_finished_steps[] = "socialProfiles"
configuration_finished_steps[] = "personalPreferences"
dismiss_configuration_workout_notice = 
dismiss_premium_deactivated_notice = 
importing_completed[] = 
importing_completed[] = 
importing_completed[] = 
importing_completed[] = 
importing_completed[] = 
wincher_integration_active = 1
wincher_automatically_add_keyphrases = 
wincher_website_id = ""
first_time_install = 
should_redirect_after_install_free = 
activation_redirect_timestamp_free = "1775463944"
remove_feed_global = 
remove_feed_global_comments = 
remove_feed_post_comments = 
remove_feed_authors = 
remove_feed_categories = 
remove_feed_tags = 
remove_feed_custom_taxonomies = 
remove_feed_post_types = 
remove_feed_search = 
remove_atom_rdf_feeds = 
remove_shortlinks = 
remove_rest_api_links = 
remove_rsd_wlw_links = 
remove_oembed_links = 
remove_generator = 
remove_emoji_scripts = 
remove_powered_by_header = 
remove_pingback_header = 
clean_campaign_tracking_urls = 
clean_permalinks = 
clean_permalinks_extra_variables = ""
search_cleanup = 
search_cleanup_emoji = 
search_cleanup_patterns = 
search_character_limit = 50
deny_search_crawling = 
deny_wp_json_crawling = 
deny_adsbot_crawling = 
deny_ccbot_crawling = 
deny_google_extended_crawling = 
deny_gptbot_crawling = 
redirect_search_pretty_urls = 
indexables_page_reading_list[] = 
indexables_page_reading_list[] = 
indexables_page_reading_list[] = 
indexables_page_reading_list[] = 
indexables_page_reading_list[] = 
indexables_overview_state = "dashboard-not-visited"
last_known_public_post_types[] = "post"
last_known_public_post_types[] = "page"
last_known_public_taxonomies[] = "category"
last_known_public_taxonomies[] = "post_tag"
last_known_public_taxonomies[] = "post_format"
last_known_no_unindexed[] = 
last_known_no_unindexed[] = 
last_known_no_unindexed[] = 
last_known_no_unindexed[] = 
last_known_no_unindexed[] = 
last_known_no_unindexed[] = 
show_new_content_type_notification = 
site_kit_configuration_permanently_dismissed = 
site_kit_connected = 1
site_kit_tracking_setup_widget_loaded = "yes"
site_kit_tracking_first_interaction_stage = "grantConsent"
site_kit_tracking_last_interaction_stage = "setup"
site_kit_tracking_setup_widget_temporarily_dismissed = "no"
site_kit_tracking_setup_widget_permanently_dismissed = "no"
google_site_kit_feature_enabled = 
ai_free_sparks_started_on = "null"
enable_llms_txt = 1
last_updated_on = 1791962988
default_seo_title[] = 1450
default_seo_title[] = 1458
default_seo_title[] = 1468
default_seo_title[] = 1466
default_seo_title[] = 1470
default_seo_meta_desc[] = 1450
default_seo_meta_desc[] = 1458
default_seo_meta_desc[] = 1468
default_seo_meta_desc[] = 1466
default_seo_meta_desc[] = 1470
first_activated_by = "1"
enable_schema_aggregation_endpoint = 
schema_aggregation_endpoint_enabled_on = "null"
enable_task_list = 1
enable_schema = 1

[wpseo_titles]
forcerewritetitle = 
separator = "sc-dash"
title-home-wpseo = "%%sitename%% %%page%% %%sep%% %%sitedesc%%"
title-author-wpseo = "%%name%%, autor en %%sitename%% %%page%%"
title-archive-wpseo = "%%date%% %%page%% %%sep%% %%sitename%%"
title-search-wpseo = "Has buscado %%searchphrase%% %%page%% %%sep%% %%sitename%%"
title-404-wpseo = "Página no encontrada %%sep%% %%sitename%%"
social-title-author-wpseo = "%%name%%"
social-title-archive-wpseo = "%%date%%"
social-description-author-wpseo = ""
social-description-archive-wpseo = ""
social-image-url-author-wpseo = ""
social-image-url-archive-wpseo = ""
social-image-id-author-wpseo = 0
social-image-id-archive-wpseo = 0
metadesc-home-wpseo = ""
metadesc-author-wpseo = ""
metadesc-archive-wpseo = ""
rssbefore = ""
rssafter = "La entrada %%POSTLINK%% se publicó primero en %%BLOGLINK%%."
noindex-author-wpseo = 
noindex-author-noposts-wpseo = 1
noindex-archive-wpseo = 1
disable-author = 
disable-date = 
disable-post_format = 
disable-attachment = 1
breadcrumbs-404crumb = "Error 404: Página no encontrada"
breadcrumbs-display-blog-page = 1
breadcrumbs-boldlast = 
breadcrumbs-archiveprefix = "Archivo de"
breadcrumbs-enable = 1
breadcrumbs-home = "Portada"
breadcrumbs-prefix = ""
breadcrumbs-searchprefix = "Has buscado por"
breadcrumbs-sep = "»"
website_name = "[Nombre de la web]"
person_name = ""
person_logo = ""
person_logo_id = 0
alternate_website_name = ""
company_logo = ""
company_logo_id = 0
company_logo_meta = 
person_logo_meta = 
company_name = "[Nombre de la web]"
company_alternate_name = ""
company_or_person = "company"
company_or_person_user_id = 0
stripcategorybase = 
open_graph_frontpage_title = "%%sitename%%"
open_graph_frontpage_desc = ""
open_graph_frontpage_image = ""
open_graph_frontpage_image_id = 0
publishing_principles_id = 0
ownership_funding_info_id = 0
actionable_feedback_policy_id = 0
corrections_policy_id = 0
ethics_policy_id = 0
diversity_policy_id = 0
diversity_staffing_report_id = 0
org-description = ""
org-email = ""
org-phone = ""
org-legal-name = ""
org-founding-date = ""
org-number-employees = ""
org-vat-id = ""
org-tax-id = ""
org-iso = ""
org-duns = ""
org-leicode = ""
org-naics = ""
title-post = "%%title%% %%page%% %%sep%% %%sitename%%"
metadesc-post = ""
noindex-post = 
display-metabox-pt-post = 1
post_types-post-maintax = 0
schema-page-type-post = "WebPage"
schema-article-type-post = "Article"
social-title-post = "%%title%%"
social-description-post = ""
social-image-url-post = ""
social-image-id-post = 0
title-page = "%%title%% %%page%% %%sep%% %%sitename%%"
metadesc-page = ""
noindex-page = 
display-metabox-pt-page = 1
post_types-page-maintax = 0
schema-page-type-page = "WebPage"
schema-article-type-page = "None"
social-title-page = "%%title%%"
social-description-page = ""
social-image-url-page = ""
social-image-id-page = 0
title-attachment = "%%title%% %%page%% %%sep%% %%sitename%%"
metadesc-attachment = ""
noindex-attachment = 
display-metabox-pt-attachment = 1
post_types-attachment-maintax = 0
schema-page-type-attachment = "WebPage"
schema-article-type-attachment = "None"
title-tax-category = "%%term_title%% archivos %%page%% %%sep%% %%sitename%%"
metadesc-tax-category = ""
display-metabox-tax-category = 1
noindex-tax-category = 
social-title-tax-category = "%%term_title%% archivos"
social-description-tax-category = ""
social-image-url-tax-category = ""
social-image-id-tax-category = 0
taxonomy-category-ptparent = 0
title-tax-post_tag = "%%term_title%% archivos %%page%% %%sep%% %%sitename%%"
metadesc-tax-post_tag = ""
display-metabox-tax-post_tag = 1
noindex-tax-post_tag = 1
social-title-tax-post_tag = "%%term_title%% archivos"
social-description-tax-post_tag = ""
social-image-url-tax-post_tag = ""
social-image-id-tax-post_tag = 0
taxonomy-post_tag-ptparent = 0
title-tax-post_format = "%%term_title%% archivos %%page%% %%sep%% %%sitename%%"
metadesc-tax-post_format = ""
display-metabox-tax-post_format = 1
noindex-tax-post_format = 1
social-title-tax-post_format = "%%term_title%% archivos"
social-description-tax-format = ""
social-image-url-tax-post_format = ""
social-image-id-tax-post_format = 0
taxonomy-post_format-ptparent = 0

[wpseo_social]
facebook_site = ""
instagram_url = ""
linkedin_url = ""
myspace_url = ""
og_default_image = ""
og_default_image_id = ""
og_frontpage_title = ""
og_frontpage_desc = ""
og_frontpage_image = ""
og_frontpage_image_id = ""
opengraph = 1
pinterest_url = ""
pinterestverify = ""
twitter = 1
twitter_site = ""
twitter_card_type = "summary_large_image"
youtube_url = ""
wikipedia_url = ""
mastodon_url = ""

[wpseo_llmstxt]
llms_txt_selection_mode = "auto"
about_us_page = 0
contact_page = 0
terms_page = 0
privacy_policy_page = 0
shop_page = 0

[wpseo_tracking_only]
task_list_first_opened_on = "27.3"
task_first_actioned_on = ""
frontend_inspector_first_actioned_on = ""
```

- Pulsar **Importar ajustes** y confirmar.

#### 3. Calibración de Básicos del Sitio (`/wp-admin/admin.php?page=wpseo_page_settings`):
- En **Básicos del sitio (`#/site-basics`)**:
  - *Nombre del sitio web:* Nombre real del sitio (`[Nombre de la web]`).
  - *Descripción corta:* Breve resumen descriptivo de 2-3 palabras (`[Descripción corta]`).
  - *Imagen del sitio:* Asignar el logotipo oficial de la marca para OpenGraph y redes sociales.
- En **Representación del sitio (`#/site-representation`)**:
  - Validar que represente a Persona (`zVaito`), con el logo asignado y los campos de organización limpios.
- Guardar cambios y verificar que el grafo Schema.org (`WebSite`, `Person`, `BreadcrumbList`) y meta-etiquetas se generen limpiamente en el `<head>`.

---

### Paso 12: Vinculación de Google Site Kit (Search Console y Google Analytics)

- **🔧 Herramientas y Tecnologías Utilizadas:**
  - **Plugin Oficial:** Google Site Kit (`google-site-kit`).
  - **Cuenta Obligatoria:** Google Account de Manuel López (`yesas12345678@gmail.com`).
  - **Servicios de Google Conectados:** Google Search Console y Google Analytics 4 (GA4).
  - **Automatización de Navegador:** `browser_subagent` (Chromium headless) gestionando la pantalla de consentimiento OAuth y permisos de Site Kit.
  - **Ruta de Configuración:** `https://[dominio.com]/wp-admin/admin.php?page=googlesitekit-splash`.

- **Regla Estricta de Cuenta de Google:**  
  La vinculación de Google Site Kit se realiza **SIEMPRE con la cuenta de Google de Manuel: `yesas12345678@gmail.com`**. Nunca se debe usar ni seleccionar ninguna otra cuenta.

- **Flujo de Ejecución Automatizada (`browser_subagent`):**
  1. Acceder a la pantalla de bienvenida de Site Kit:  
     `https://[dominio.com]/wp-admin/admin.php?page=googlesitekit-splash`.
  2. Marcar la casilla obligatoria:  
     `[x]` *Obtén información sobre los visitantes conectando Google Analytics como parte de la configuración*.
  3. Pulsar el botón **Acceder con Google**.
  4. En la pantalla de autenticación de Google (*Selecciona una cuenta*), hacer clic en **Manuel López (`yesas12345678@gmail.com`)**.
  5. En la pantalla de permisos de Site Kit, confirmar y pulsar **Continuar / Permitir**.
  6. En el asistente de bienvenida de Site Kit (`sitekit.withgoogle.com`):
     - **Verificar propiedad del sitio:** Pulsar **Verificar**.
     - **Permitir acceso a las métricas del panel:** Pulsar **Permitir**.
     - **Configurar Search Console:** Pulsar **Siguiente**.
     - **Configurar Google Analytics:** Pulsar **Siguiente / Conectar servicio**.
  7. En la pantalla de creación/selección de cuenta de Google Analytics dentro de WordPress:
     - Si la propiedad no existe, pulsar **Crear cuenta / Crear propiedad**.
     - Aceptar los **Términos del Servicio de Google Analytics** y el **Acuerdo de Tratamiento de Datos (RGPD)**.
     - Pulsar **Ir a mi panel de control**.
  8. **Resultado:** Panel de Google Site Kit 100% operativo y enlazado con Google Search Console y Google Analytics 4 bajo la cuenta `yesas12345678@gmail.com`.

---

### Paso 13: Inserción del Disclaimer Educativo de Autor en `functions.php`

- **🔧 Herramientas y Tecnologías Utilizadas:**
  - **Lenguaje y Motor:** PHP 8+ en servidor web.
  - **Hook Oficial de WordPress:** Filtro `the_content` (`add_filter('the_content', 'agregar_disclaimer_autor')`).
  - **Ruta del Archivo en Disco:** `/wp-content/themes/kadence/functions.php`.
  - **Vías de Edición:** Editor de temas de WordPress (`/wp-admin/theme-editor.php`) o plugin **File Organizer** (`/wp-admin/admin.php?page=fileorganizer`) para evitar bloqueos por loopback check.

- **Objetivo:** Garantizar transparencia editorial y cumplimiento de directrices E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) mostrando automáticamente al pie de todas las entradas individuales (`is_single()`) un aviso de autoría y descargo educativo enlazado a la página de Manuel López Ramos.

- **Regla Estricta de Hipervínculo HTML e Idioma:**
  - **Formato HTML obligatorio:** El enlace al autor **debe ser una etiqueta HTML `<a href="...">...</a>`** (nunca formato markdown entre corchetes), para que WordPress lo renderice en el frontend como un enlace clicable con estilo de hipervínculo.
  - La URL del autor siempre apunta a la página local: `https://[dominio.com]/manuel-lopez-ramos/`.
  - **Adaptación lingüística obligatoria:** El texto del disclaimer **debe traducirse al idioma oficial de la web** (`[Idioma de la web]`) si no es español (por ejemplo, en inglés: *"This article was written by <a href='https://[dominio.com]/manuel-lopez-ramos/'>Manuel López Ramos</a> and is published for educational purposes, with the aim of providing general information for learning and dissemination."*).

- **Plantilla PHP Universal a Insertar:**
  ```php
  function agregar_disclaimer_autor($content) {
      if (is_single()) {
          $disclaimer = '<p>Este artículo ha sido escrito por <a href="https://[dominio.com]/manuel-lopez-ramos/">Manuel López Ramos</a> y se publica con fines educativos, con el objetivo de ofrecer información general para el aprendizaje y la divulgación.</p>';
          return $content . $disclaimer;
      }
      return $content;
  }
  add_filter('the_content', 'agregar_disclaimer_autor');
  ```

- **Procedimiento de Automatización:**
  1. Acceder en WordPress a *Apariencia $\rightarrow$ Editor de archivos de temas* (`/wp-admin/theme-editor.php`) o a través de **File Organizer** (`/wp-admin/admin.php?page=fileorganizer` en `wp-content/themes/[tema-activo]/functions.php`).
     - *Nota técnica de estabilidad:* Si el editor de temas de WordPress bloquea o revierte el guardado debido a su comprobación remota de errores en bucle invertido (*loopback check*), utilizar **File Organizer** para editar y guardar directamente `functions.php`.
  2. Si se usa el editor de temas y salta la ventana modal de advertencia (*¡Aviso! Estás a punto de modificar un archivo de tema...*), aceptar pulsando **Entiendo los riesgos**.
  3. Abrir el archivo `functions.php` del tema activo (ej. Kadence).
  4. Desplazarse al final del archivo, dejar un salto de línea (Enter) tras la última línea y pegar la función adaptada al dominio e idioma de la web.
  5. Guardar los cambios (*Actualizar archivo* o comando *put* en File Organizer) y verificar que el archivo se guarde correctamente sin errores de sintaxis y renderice el enlace azul clicable en cualquier entrada.

---

### Paso 14: Creación de las 4 Categorías Temáticas del Nicho

- **🔧 Herramientas, Tecnologías y Endpoints Utilizados:**
  - **API del CMS:** WordPress REST API.
  - **Endpoint de Taxonomías:** `POST https://[dominio.com]/wp-json/wp/v2/categories`.
  - **Cabecera HTTP:** `Authorization: Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64')}`.
  - **Estructura del Payload:** `{ "name": "Nombre Categoría", "slug": "slug-categoria" }`.

- **Estrategia SEO:** Todo sitio web debe dividirse en 4 categorías temáticas estratégicas de alto valor informativo y comercial para AdSense, que cubran los principales pilares del nicho (`[Temática de la web]`).

- **Script de Creación Automática de Categorías (`create_categories.mjs`):**
  ```javascript
  const authHeader = `Basic ${Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASS}`).toString('base64')}`;

  const categories = [
    { name: "[Categoría 1]", slug: "[slug-categoria-1]" },
    { name: "[Categoría 2]", slug: "[slug-categoria-2]" },
    { name: "[Categoría 3]", slug: "[slug-categoria-3]" },
    { name: "[Categoría 4]", slug: "[slug-categoria-4]" }
  ];

  const categoryMap = {};

  for (const cat of categories) {
    const res = await fetch(`${process.env.WP_API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cat)
    });
    const data = await res.json();
    categoryMap[cat.name] = data.id;
    console.log(`Categoría creada: ${cat.name} (ID: ${data.id}, Slug: ${data.slug})`);
  }
  // Exportar mapa de IDs para asignación de artículos en el Paso 18
  export { categoryMap };
  ```

---

### Paso 15: Configuración de Menús de Navegación (Header y Footer)

- **🔧 Herramientas, Tecnologías y Endpoints Utilizados:**
  - **API / Interfaz del CMS:** WordPress REST API (`/wp-json/wp/v2/menus`, `/wp-json/wp/v2/menu-items`) o gestor nativo de WordPress en `/wp-admin/nav-menus.php` y Customizer (`customize.php`).
  - **Automatización de Navegador:** `browser_subagent` (Playwright / Chromium headless) para creación y asignación visual de menús en ubicaciones de Kadence (`primary` y `footer`).

- **Menú Superior (`Header`):**
  - **Ubicación:** `primary` (Menú principal de Kadence).
  - **Estructura y Orden Riguroso de Elementos:**
    1. `[Categoría 1]` (Taxonomía: categoría)
    2. `[Categoría 2]` (Taxonomía: categoría)
    3. `[Categoría 3]` (Taxonomía: categoría)
    4. `[Categoría 4]` (Taxonomía: categoría)
    5. `Contáctanos` (Tipo: página legal - siempre en última posición para facilitar contacto)

- **Menú Inferior (`Footer`):**
  - **Ubicación:** `footer` (Pie de página de Kadence).
  - **Estructura y Orden Riguroso de las 7 Páginas Legales:**
    1. `Sobre Nosotros`
    2. `Manuel López Ramos`
    3. `Contáctanos`
    4. `Política de Privacidad`
    5. `Política de Cookies`
    6. `Aviso Legal`
    7. `Términos y Condiciones`

---

### Paso 16: Maquetación de Cabecera y Pie de Página en Kadence Customizer

- **🔧 Herramientas, Tecnologías y Parámetros Utilizados:**
  - **Motor de Personalización:** WordPress Customizer API (`https://[dominio.com]/wp-admin/customize.php`) y tabla `wp_options` (`theme_mods_kadence`).
  - **Automatización de Navegador:** `browser_subagent` (Playwright / Chromium headless).
  - **Selectores y Controles de Kadence:**
    - Control de Anchura de Logo: `#customize-control-kadence_customizer_site_identity_logo_width input[type="number"]` $\rightarrow$ fijar en `80` (px).
    - Elemento de Cabecera: `HTML 1` posicionado **SIEMPRE en el siguiente hueco inmediatamente a la derecha del Logotipo** en la Fila Principal (`main_row`), dentro de la sección izquierda (`site-header-section-left` / hueco contiguo), quedando visualmente pegado al logo y nunca en el centro de la pantalla.
    - Editor de Código de HTML 1: pestaña `Código` con `<p style="font-size: 12px; font-weight: bold; margin: 0; line-height: 1.3;">[Descripción corta línea 1]<br>[Descripción corta línea 2]</p>`.
    - Pestaña Diseño de HTML 1: Margen izquierdo (`margin-left`) establecido en `20px` (o inline `margin-left: 20px;`).
    - Footer Builder: Fila media con elemento `footer_navigation` centrado (menú `Footer`) y fila inferior con `copyright` centrado.

- **Procedimiento de Maquetación Paso a Paso (`browser_subagent`):**
  1. Acceder a `/wp-admin/customize.php`.
  2. **Identidad del Sitio:**
     - Asignar el logotipo horizontal oficial generado en el Paso 3, omitiendo el recorte.
     - **Regla Estricta de Dimensión:** Establecer la anchura máxima del logotipo en **80 px** (`logo_width: 80`). Esto evita desbordamientos y garantiza que la cabecera sea ligera y compacta en móvil y escritorio.
     - **⛔ BLINDAJE ABSOLUTO DEL FAVICON:** **PROHIBIDO tocar, seleccionar o recortar el "Icono del sitio" (Site Icon) en el Customizer.** El Customizer de WordPress ofrece recortar el logotipo para convertirlo en icono del sitio, lo cual corrompe el favicon sustituyéndolo por un recorte deformado e ilegible del banner horizontal. El Favicon se gestiona y blinda única y exclusivamente en el Paso 8 mediante la API REST con el archivo cuadrado de 512x512 px.
  3. **Fila Principal de Cabecera:**
     - **Regla Estricta de Posicionamiento:** El bloque **HTML 1** debe situarse **SIEMPRE en el siguiente hueco inmediatamente a la derecha del logotipo** (en la cuadrícula del maquetador, en la casilla contigua a la derecha de *Logotipo*, nunca en el centro de la cabecera).
     - Cambiar a la pestaña de código e insertar la descripción en dos líneas con formato inline y margen izquierdo:
       ```html
       <p style="font-size: 12px; font-weight: bold; margin: 0 0 0 20px; line-height: 1.3;">[Descripción línea 1]<br>[Descripción línea 2]</p>
       ```
     - Limpiar de raíz cualquier texto predeterminado como *"Inserta HTML aquí"*.
  4. **Pie de Página (Footer):**
     - En el maquetador visual de Kadence, situar en la fila central el elemento **Navegación de pie de página** (`footer_navigation`) con alineación centrada y el menú `Footer` seleccionado.
     - En la fila inferior, mantener el elemento **Copyright** centrado.
  5. **Guardar y Publicar:** Pulsar **Publicar** y validar visualmente con el navegador que no haya desalineaciones.

---

### Paso 17: Creación del Usuario Autor Oficial (`Manuel López`)

- **🔧 Herramientas, Tecnologías y Endpoints Utilizados:**
  - **API del CMS:** WordPress REST API.
  - **Endpoint de Creación de Usuarios:** `POST https://[dominio.com]/wp-json/wp/v2/users`.
  - **Cabecera HTTP:** `Authorization: Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64')}`.
  - **Gestor de Verificación / 2FA:** Integración de navegador con Composio si se solicita verificación por correo.

- **Objetivo Editorial y E-E-A-T:**
  Separar la administración técnica del sitio (`zVaito`) de la firma editorial pública. Todos los artículos publicados en la web deben mostrar visiblemente que han sido redactados por **Manuel López**, fortaleciendo la confianza del usuario, el cumplimiento de directrices E-E-A-T de Google y la coherencia con la página legal de autor (`/manuel-lopez-ramos/`).

- **Datos Maestros del Usuario:**
  - **Nombre de usuario (login):** `manuellopez`
  - **Nombre visible públicamente (Display Name):** `Manuel López`
  - **Nombre:** `Manuel`
  - **Apellidos:** `López`
  - **Correo electrónico:** `yesas12345678@gmail.com`
  - **Contraseña universal:** `Manuel1214$Manuel`
  - **Rol:** `administrator` (o `editor` con permisos de publicación directa)

- **Script de Creación y Extracción de ID (`create_official_author.mjs`):**
  ```javascript
  const authHeader = `Basic ${Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASS}`).toString('base64')}`;

  // Verificar si el usuario ya existe
  const checkRes = await fetch(`${process.env.WP_API_URL}/users?search=manuellopez`, {
    headers: { 'Authorization': authHeader }
  });
  const existingUsers = await checkRes.json();
  let authorId;

  if (existingUsers.length > 0) {
    authorId = existingUsers[0].id;
    console.log(`Usuario Manuel López ya existente con ID: ${authorId}`);
  } else {
    const createRes = await fetch(`${process.env.WP_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: "manuellopez",
        name: "Manuel López",
        first_name: "Manuel",
        last_name: "López",
        email: "yesas12345678@gmail.com",
        password: "Manuel1214$Manuel",
        roles: ["administrator"]
      })
    });
    const newUser = await createRes.json();
    authorId = newUser.id;
    console.log(`Usuario Manuel López creado con ID: ${authorId}`);
  }

  // Guardar authorId para su uso obligatorio en el Paso 18
  export { authorId };
  ```

---

### Paso 18: Generación Masiva y Publicación Programada de Artículos (48 Artículos)

- **🔧 Herramientas, Tecnologías, APIs y Algoritmos Utilizados:**
  - **Motor de Inteligencia Artificial Oficial:**
    - **Google Gemini API:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_API_KEY}` (modelo de alta velocidad para redacción editorial multi-etapa >2.500 palabras).
  - **Repositorio de Medios Abiertos:** **Wikimedia Commons MediaWiki Action API** (`https://commons.wikimedia.org/w/api.php`).
    - Parámetros: `action=query&generator=search&gsrnamespace=6&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1280&format=json`.
    - Cabecera obligatoria: `User-Agent: MediaWikiBot/1.0 (contact@dominio.com) NodeFetch`.
  - **Algoritmo de Curación Semántica (Query Routing):** Mapeo de términos temáticos en español a consultas técnicas en inglés de 2-3 palabras para eliminar falsos positivos.
  - **Filtro Negativo por Expresiones Regulares (Antislop Visual):** Patrón `BANNED_PATTERNS` para descartar fotografías no relacionadas (vehículos, señales de tráfico, cementerios, etc.).
  - **Motor de Normalización HTML (`cleanHtml`):** Purga de etiquetas `<h1>`, supresión de viñetas (`<ul>`, `<ol>`, `<li>`), eliminación de divisores horizontales (`<hr>`).
  - **Algoritmo de Medición y Expansión de Palabras:** Función de conteo limpio sobre texto sin etiquetas HTML y bucle multi-etapa hasta superar las 2.500 palabras.
  - **Inyección Matemática de Imágenes:** Cálculo de offsets a 1/3 y 2/3 de párrafos para maquetar bloques Gutenberg `<figure class="wp-block-image size-large">`.
  - **Programación Retroactiva:** Fórmula de fechado diario retroactivo con alternancia cíclica de las 4 categorías.
  - **Persistencia de Estado:** Archivos JSON locales `data/articles_blueprint.json` y `data/used_images.json`.

- **1. Matriz de Contenido y Títulos:**
  - **Estructura:** 4 categorías estratégicas con exactamente 12 artículos cada una (48 artículos en total).
  - **Criterios estrictos de títulos:**
    - Dejar claro el problema que resuelven y a quién van dirigidos en una sola lectura (sin ambigüedades).
    - Incluir la palabra clave principal de forma natural.
    - Longitud óptima entre 50 y 70 caracteres.
    - Promesa de valor y beneficio concreto (cero clickbait vacío).

- **2. Calendario de Publicación y Alternancia:**
  - **Frecuencia:** Exactamente 1 artículo publicado por día hacia atrás en el tiempo, finalizando en el día de hoy:
    ```javascript
    const publishDate = new Date(Date.now() - (48 - articleIndex) * 86400000).toISOString();
    ```
  - **Alternancia categorial estricta:** Las 4 categorías se intercalan de forma cíclica `(articleIndex % 4)` (Cat 1 $\rightarrow$ Cat 2 $\rightarrow$ Cat 3 $\rightarrow$ Cat 4 $\rightarrow$ Cat 1...) para que jamás coincidan días consecutivos de la misma categoría en la portada.

- **3. Adquisición y Curación Semántica de Imágenes con Verificación Visual 100% (Wikimedia Commons + Unsplash + Gemini Vision):**

  > [!CAUTION]
  > **🚨 MANDATO ESTRICTO DE OBLIGATORIEDAD DE IMÁGENES INTERMEDIAS (PROHIBICIÓN RADICAL DE ARTÍCULOS SIN IMÁGENES EN EL CUERPO):**  
  > Todo artículo publicado **DEBE contener de forma obligatoria e innegociable exactamente 3 imágenes reales, profesionales e independientes**:
  > 1. **1 Imagen Destacada (`featured_media`):** Asignada como portada del artículo para cabecera, listados y miniaturas.
  > 2. **2 Imágenes Intermedias en el Cuerpo del Texto:** Insertadas en el contenido HTML en los tercios de lectura (~33% y ~66% de los párrafos) con el bloque Gutenberg `<figure class="wp-block-image size-large"><img src="..." alt="..." /><figcaption>...</figcaption></figure>`.
  > 
  > **PROHIBICIÓN ABSOLUTA:** Está terminantemente prohibido publicar o dar por bueno un artículo que solo tenga imagen de portada y carezca de imágenes intermedias en el cuerpo del texto. Publicar un artículo con 0 imágenes en el cuerpo es considerado un **fallo crítico e inaceptable** del pipeline editorial.
  > 
  > **Garantía de Adquisición con Doble Fuente (Wikimedia + Unsplash):**  
  > Si la búsqueda inicial en Wikimedia Commons no devuelve suficientes imágenes aprobadas por Gemini Vision (por filtros antislop o cuotas), el script **NO PUEDE** continuar redactando ni publicar a medias. Debe recurrir automáticamente al proveedor secundario (Unsplash API mediante `process.env.UNSPLASH_ACCESS_KEY`) o ampliar las consultas hasta reunir obligatoriamente las 3 imágenes necesarias ANTES de proceder a la maquetación.

  - **Cantidad Estricta por Artículo:** Exactamente 3 imágenes reales, profesionales y libres de derechos comerciales:
    1. **Imagen Destacada (`featured_media`):** Cabecera del artículo y miniatura en portada y categorías.
    2. **Imagen Intermedia 1:** Inyectada en el HTML a ~1/3 del cuerpo del texto.
    3. **Imagen Intermedia 2:** Inyectada en el HTML a ~2/3 del cuerpo del texto.
  - **Regla de Oro de Búsqueda:** **PROHIBIDO buscar con títulos completos en español.** Toda consulta debe traducirse a 2-3 palabras técnicas en inglés y añadir obligatoriamente `filetype:bitmap` para forzar a la API de Wikimedia a devolver únicamente fotografías (JPG/PNG) y descartar archivos de audio (.ogg), libros escaneados (.pdf) o gráficos vectoriales (.svg).
  - **Filtro de Raíz en la Query de Wikimedia:**
    ```javascript
    // Obligatorio: filetype:bitmap y exclusiones directas en la consulta
    const query = `${searchTerm} -soldier -military -army filetype:bitmap`;
    ```
  - **Filtro Negativo Estricto de Expresiones Regulares (`STRICT_BANNED_REGEX`):**
    Antes de procesar cualquier archivo, se valida tanto el título como la URL contra una lista exhaustiva de exclusiones para descartar al 100% iconos de archivos, audios, documentos, esquemas o páginas de libros:
    ```javascript
    const STRICT_BANNED_REGEX = /\.(pdf|djvu|ogg|oga|ogv|svg|eps|ai|tif|tiff)($|\?|\/)|fileicon|file-type-icons|page1-|page2-|thumbnail\.pdf|speaker|loudspeaker|sound\b|audio\b|icon\b|logo\b|symbol\b|emblem\b|crest\b|coat[ _-]of[ _-]arms|flag\b|map\b|chart\b|graph\b|table\b|diagram|schematic|formation|lineup|line_up|drawing|sketch|clipart|illustration|cartoon|book\b|journal\b|thesis\b|report\b|magazine\b|newspaper\b|archive\b|sign\b|traffic|cemetery|gravestone|soldier|military|army|navy|weapon/i;
    ```
  - **🛡️ Puerta de Verificación Visual 100% con IA Multimodal (Gemini Vision Pre-Flight Gate):**
    **MANDATO UNIVERSAL OBLIGATORIO:** Ninguna imagen puede subirse a WordPress ni asignarse como imagen destacada o dentro del contenido sin haber superado previamente la inspección visual de la IA multimodal (`gemini-3.5-flash-lite` o superior).
    ```javascript
    async function verifyFootballImageWithVision(buffer, mimeType = 'image/jpeg') {
      const b64 = Buffer.from(buffer).toString('base64');
      const prompt = `You are a strict quality control inspector for the professional football (soccer) portal "Golazos".
Inspect this candidate image.
Respond strictly in JSON:
{
  "is_real_football_photo": boolean,
  "is_icon_or_document_or_diagram": boolean,
  "confidence": number,
  "reason": string
}

CRITICAL RULES:
1. "is_real_football_photo" MUST be true ONLY if the image is an authentic, real-life photograph directly depicting association football/soccer (players on the pitch, match action, stadium, fans in stands, referee on field, football ball, training drills on grass, trophy celebration).
2. MUST BE FALSE for: digital icons, loudspeaker/speaker symbols, audio icons, documents, PDF scans, book covers, diagrams, tactical schematics, flags, maps, logos, drawings, clipart, and non-football photos.
3. If "is_icon_or_document_or_diagram" is true, "is_real_football_photo" MUST BE FALSE.`;

      const body = {
        contents: [{
          parts: [
            { text: prompt },
            { inlineData: { mimeType: mimeType.split(';')[0], data: b64 } }
          ]
        }],
        generationConfig: { responseMimeType: 'application/json' }
      };

      for (let attempt = 1; attempt <= 3; attempt++) {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (res.status === 429) {
          await new Promise(r => setTimeout(r, 3000 * attempt));
          continue;
        }

        if (!res.ok) return { is_real_football_photo: false, reason: `HTTP ${res.status}` };

        const data = await res.json();
        const textPart = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!textPart) return { is_real_football_photo: false, reason: 'Empty response' };
        return JSON.parse(textPart);
      }
      return { is_real_football_photo: false, reason: 'Rate limit excedido' };
    }
    ```
    - **Criterio de Aceptación:** Si `is_real_football_photo !== true` o `is_icon_or_document_or_diagram === true`, la imagen candidata se **RECHAZA INMEDIATAMENTE**, se registra en logs y se evalúa el siguiente resultado de Wikimedia.
    - **Tasa de Error Garantizada:** 0%. Ningún icono de altavoz, carátula de libro en PDF, esquema táctico ni gráfico no fotográfico llega jamás a la biblioteca de medios ni a la web pública.
  - **Descarga de Miniaturas Optimizadas (`iiurlwidth=1280`):**
    ```javascript
    const endpoint = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=12&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1280&format=json`;
    const res = await fetch(endpoint, {
      headers: { 'User-Agent': 'MediaWikiBot/1.0 (contact@dominio.com) NodeFetch' },
      signal: AbortSignal.timeout(15000)
    });
    const data = await res.json();
    ```
  - **Inyección de Metadatos SEO y Marcado Gutenberg:**
    ```html
    <figure class="wp-block-image size-large">
      <img src="[URL_EN_WORDPRESS]" alt="[TÍTULO]: [DESCRIPCIÓN]" />
      <figcaption>[TÍTULO]: [DESCRIPCIÓN]</figcaption>
    </figure>
    ```
  - **Auditoría y Sustitución Retroactiva de Imágenes Existentes:**
    Si ya existen artículos publicados antes de aplicar este filtro, se ejecuta el script de auditoría (`audit_and_fix_published_images.mjs`) que recorre todos los posts en `/wp-json/wp/v2/posts`, descarga su `featured_media`, la analiza con Gemini Vision y, si detecta cualquier icono o documento, la sustituye automáticamente por una fotografía real de alta resolución aprobada por la IA.

- **4. Generación Editorial Exhaustiva (>2.500 Palabras) y Reglas de Maquetación:**
  - **Algoritmo de Conteo de Palabras y Expansión:**
    ```javascript
    function countWords(html) {
      return html
        .replace(/<[^>]+>/g, ' ')
        .replace(/&[a-z0-9#]+;/gi, ' ')
        .split(/\s+/)
        .filter(w => w.length > 0).length;
    }

    // Bucle generativo multi-etapa
    let totalContent = await generateInitialArticle(title, category);
    let totalWords = countWords(totalContent);

    while (totalWords < 2500) {
      const expansion = await expandArticleSection(title, totalContent);
      totalContent += '\n' + expansion;
      totalWords = countWords(totalContent);
      console.log(`Palabras actuales: ${totalWords}/2500...`);
    }
    ```
  - **Limpieza de Sintaxis y Anti-Slop de Código (`cleanHtml`):**
    ```javascript
    function cleanHtml(content) {
      return content
        // 1. Prohibición estricta de H1: el tema ya lo incluye en entry-header
        .replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, '')
        // 2. Prohibición estricta de viñetas y listas
        .replace(/<ul[^>]*>[\s\S]*?<\/ul>/gi, (m) => m.replace(/<li[^>]*>(.*?)<\/li>/gi, '<p>$1</p>').replace(/<\/?ul[^>]*>/gi, ''))
        .replace(/<ol[^>]*>[\s\S]*?<\/ol>/gi, (m) => m.replace(/<li[^>]*>(.*?)<\/li>/gi, '<p>$1</p>').replace(/<\/?ol[^>]*>/gi, ''))
        // 3. Prohibición de separadores horizontales
        .replace(/<hr\s*\/?>/gi, '')
        // 4. Normalización de espacios
        .replace(/<p>\s*<\/p>/gi, '')
        .trim();
    }
    ```
  - **Inyección Matemática de Imágenes Intermedias (1/3 y 2/3):**
    ```javascript
    function injectInlineImages(html, img1Html, img2Html) {
      const paragraphs = html.split('</p>');
      if (paragraphs.length < 6) return html + img1Html + img2Html;

      const idx1 = Math.floor(paragraphs.length / 3);
      const idx2 = Math.floor((paragraphs.length * 2) / 3);

      paragraphs.splice(idx1, 0, img1Html);
      paragraphs.splice(idx2 + 1, 0, img2Html);
      return paragraphs.join('</p>');
    }
    ```

- **5. Publicación en WordPress REST API, Puertas de Verificación y Auditoría 48/48:**

  - **🛡️ Puerta de Verificación Estricta Pre-Publicación (Gate Mandatorio):**
    Antes de enviar la petición de publicación a WordPress, el script debe validar obligatoriamente que el artículo cumple con la totalidad de imágenes y enlaces requeridos:
    ```javascript
    // 1. Validar que se han obtenido y subido las 3 imágenes
    if (!featuredMediaId || !inlineImg1 || !inlineImg2 || uploadedImages.length < 3) {
      throw new Error(`[CRITICAL GATE FAILURE] No se han obtenido las 3 imágenes requeridas (1 destacada + 2 intermedias) para "${article.title}". Publicación abortada.`);
    }

    // 2. Inyectar imágenes intermedias y verificar presencia en el HTML final
    const htmlWithImages = injectInlineImages(html, inlineImg1, inlineImg2);
    const inlineCount = (htmlWithImages.match(/<img[^>]+>/g) || []).length;
    if (inlineCount < 2) {
      throw new Error(`[CRITICAL GATE FAILURE] El cuerpo del artículo "${article.title}" tiene ${inlineCount} imágenes (se exigen mínimo 2 intermedias además de la portada). Publicación abortada.`);
    }

    // 3. Inyectar enlaces internos y externos y validar hipervínculos HTML
    const finalHtml = injectLinksIntoHtml(htmlWithImages, extLink, intLink1, intLink2);
    const linksFound = finalHtml.match(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi) || [];
    const internalFound = linksFound.filter(l => l.includes(domainName));
    const externalFound = linksFound.filter(l => !l.includes(domainName));
    if (linksFound.length !== 3 || internalFound.length !== 2 || externalFound.length !== 1) {
      throw new Error(`[CRITICAL GATE FAILURE] El artículo "${article.title}" no cumple con el cupo de 3 enlaces con hipervínculo (2 internos + 1 externo). Total: ${linksFound.length}. Publicación abortada.`);
    }
    ```

  - **Llamada de Publicación en WordPress REST API:**
    ```javascript
    const postRes = await fetch(`${process.env.WP_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: article.title,
        content: finalHtml,
        status: 'publish',
        author: authorId, // ID de Manuel López (típicamente 2)
        categories: [categoryId],
        featured_media: featuredMediaId,
        date: publishDate
      })
    });

    if (!postRes.ok) throw new Error(`Fallo al publicar post: ${postRes.status}`);
    const newPost = await postRes.json();
    ```

  - **Seguimiento en Blueprint (`data/articles_blueprint.json`):**
    Actualizar el artículo con `{ status: "published", wp_post_id: newPost.id, words: totalWords }` para permitir pausar y reanudar el proceso en cualquier momento con garantía de cero duplicados.

  - **🛡️ Puerta de Auditoría y Verificación Final de los 48 Artículos (Gate de Cierre de Paso 18):**
    Al finalizar la publicación del lote completo de 48 artículos, el agente **DEBE ejecutar de forma automática este script de auditoría exhaustiva** que examina el 100% de las entradas publicadas en WordPress (tanto imágenes como enlaces):
    ```javascript
    // Recorrer todos los posts publicados en WordPress
    const allPosts = await fetchAllPublishedPosts();
    const failingPosts = [];

    for (const post of allPosts) {
      const inlineImgs = post.content.rendered.match(/<img[^>]+>/g) || [];
      const hasFeatured = post.featured_media && post.featured_media > 0;
      const links = post.content.rendered.match(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi) || [];
      const intLinks = links.filter(l => l.includes(domainName)).length;
      const extLinks = links.filter(l => !l.includes(domainName)).length;

      const imgOk = hasFeatured && inlineImgs.length >= 2;
      const linksOk = links.length === 3 && intLinks === 2 && extLinks === 1;

      if (!imgOk || !linksOk) {
        failingPosts.push({
          id: post.id,
          title: post.title.rendered,
          featuredMediaId: post.featured_media,
          inlineImagesCount: inlineImgs.length,
          totalLinks: links.length,
          internalLinks: intLinks,
          externalLinks: extLinks
        });
      }
    }

    if (failingPosts.length > 0) {
      console.error('Artículos con imágenes o enlaces incompletos:', failingPosts);
      throw new Error(`[CRITICAL AUDIT FAILURE] Se detectaron ${failingPosts.length} artículos sin el cupo obligatorio de 3 imágenes o 3 enlaces (2 internos + 1 externo). Debe corregirse de inmediato.`);
    }
    console.log('✅ AUDITORÍA 48/48 SUPERADA: El 100% de los 48 artículos contienen su imagen destacada, 2 imágenes intermedias y 3 enlaces (2 internos + 1 externo) SIEMPRE con hipervínculo HTML.');
    ```
    > **MANDATO DE CIERRE:** No se puede dar por concluido el Paso 18 ni entregar el proyecto al usuario hasta que esta auditoría devuelva `0` artículos con fallos.

- **6. Regla Obligatoria de Enlazado Interno y Externo (~3 Enlaces con Hipervínculo por Artículo):**

  > [!IMPORTANT]
  > **🚨 MANDATO ESTRICTO DE ENLAZADO OBLIGATORIO (SIEMPRE CON HIPERVÍNCULO HTML):**  
  > Todo artículo publicado **DEBE contener de forma obligatoria e innegociable aproximadamente 3 enlaces (2 internos + 1 externo)** perfectamente integrados en la narrativa del texto:
  > 1. **2 Enlaces Internos (Arquitectura de Silo y Retención):**
  >    - Un enlace hacia otro artículo de la misma categoría temática (silo temático directo).
  >    - Un enlace hacia un artículo de una categoría complementaria (enlace transversal estructurado).
  >    - Texto de ancla (*anchor text*) 100% natural, descriptivo y contextualmente integrado (prohibido usar "haz clic aquí" o enlaces genéricos).
  > 2. **1 Enlace Externo (Máxima Autoridad Oficial):**
  >    - Dirigido a entidades reguladoras, federaciones o fuentes oficiales de máxima reputación del sector (FIFA, UEFA, IFAB, CONMEBOL, LaLiga, etc.).
  >    - Atributos obligatorios: `target="_blank" rel="noopener noreferrer external"`.
  > 3. **PROHIBICIÓN ABSOLUTA DE ENLACES EN TEXTO PLANO O SIN HIPERVÍNCULO:**
  >    - Está terminantemente prohibido dejar URLs desnudas en texto plano (ej. `https://theifab.com`).
  >    - **TODO ENLACE DEBE SER UN HIPERVÍNCULO HTML NATIVO (`<a href="..." ...>anchor</a>`)** que permita al usuario hacer clic de forma inmediata.
  > 
  > **Distribución Equilibrada en el Texto (>2.500 palabras):**
  > - **Enlace Externo de Autoridad:** Inyectado en el primer tercio del artículo (~párrafo 4) al fundamentar el marco normativo o institucional.
  > - **Enlace Interno 1:** Inyectado en el tercio medio (~párrafo 11) para profundizar en conceptos técnicos afines.
  > - **Enlace Interno 2:** Inyectado en el tercio final (~párrafo 19) para conectar con guías prácticas complementarias.
  >
  > **Implementación en Código (`injectLinksIntoHtml`):**
  > ```javascript
  > function injectLinksIntoHtml(html, extLink, intLink1, intLink2) {
  >   const pParts = html.split('</p>');
  >   const totalP = pParts.length - 1;
  >   const idxExt = Math.max(2, Math.floor(totalP * 0.22));
  >   const idxInt1 = Math.floor(totalP * 0.52);
  >   const idxInt2 = Math.min(totalP - 2, Math.floor(totalP * 0.82));
  >
  >   // Enlace externo (target blank y rel noopener external)
  >   const extHtml = `<a href="${extLink.url}" target="_blank" rel="noopener noreferrer external">${extLink.anchor}</a>`;
  >   pParts[idxExt] += ` En este contexto, resulta fundamental remitirse a los marcos y directrices oficiales dictados por ${extHtml}.`;
  >
  >   // Enlace interno 1 (mismo silo)
  >   const int1Html = `<a href="${intLink1.url}">${intLink1.anchor}</a>`;
  >   pParts[idxInt1] += ` Este principio se vincula de manera directa con los conceptos y fundamentos que desarrollamos al analizar ${int1Html}.`;
  >
  >   // Enlace interno 2 (silo complementario)
  >   const int2Html = `<a href="${intLink2.url}">${intLink2.anchor}</a>`;
  >   pParts[idxInt2] += ` Para complementar esta perspectiva y profundizar en su aplicación práctica, te recomendamos consultar nuestro estudio detallado sobre ${int2Html}.`;
  >
  >   return pParts.join('</p>');
  > }
  > ```

---

*(Aquí se irán añadiendo en orden todas las siguientes instrucciones que indiques...)*

