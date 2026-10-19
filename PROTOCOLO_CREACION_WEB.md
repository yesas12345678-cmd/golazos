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
| **7** | **Hacer Páginas Legales** | Redacción y publicación de las 7 páginas legales e institucionales personalizadas (Sobre Nosotros, Manuel López Ramos, Contáctanos con Contact Form 7 en el idioma de la web, Política de Privacidad, Política de Cookies, Aviso Legal y Términos y Condiciones), manteniendo datos de identidad de Manuel y adaptando temática y correos a la web. | ✅ Estandarizado |
| **8** | **Ajustes Generales** | Configurar Título del Sitio (`[Nombre de la web]`), Descripción corta (`[Descripción de 2-3 palabras]`) y subir el logo/emblema como Icono del sitio (Favicon). | ✅ Estandarizado |
| **9** | **Ajustes de Lectura y Comentarios** | Configurar 12 entradas por página/feed, indexación activa, comentarios con aprobación manual, desactivar hilos, paginación y avatares para máxima velocidad y limpieza. | ✅ Estandarizado |
| **10** | **Ajustes de Medios y Enlaces Permanentes** | Medios estándar (150x150 recorte, 300x300, 1024x1024, carpetas mes/año) y Enlaces permanentes en **Nombre de la entrada** (`/%postname%/`). Cierre total de ajustes de WordPress. | ✅ Estandarizado |
| **11** | **Configuración de Yoast SEO** | Asistente inicial (optimización SEO, Persona `zVaito`, logo, sin telemetría), importación del volcado INI maestro integrado en este archivo y calibración de Básicos del sitio (`[Nombre de la web]`, `[Descripción corta]` e imagen oficial). | ✅ Estandarizado |
| **12** | **Vinculación de Google Site Kit** | Conectar Google Site Kit utilizando **siempre obligatoriamente la cuenta `yesas12345678@gmail.com`**, vinculando Google Search Console y creando/asociando la propiedad de Google Analytics de forma 100% desatendida. | ✅ Estandarizado |
| **13** | **Disclaimer de Autor en functions.php** | Insertar en `functions.php` del tema activo la función de disclaimer educativo al final de cada artículo con enlace a la biografía de Manuel López Ramos, adaptando el texto al idioma de la web. | ✅ Estandarizado |
| **14** | **Creación de Categorías del Nicho** | Creación vía REST API de 4 categorías estratégicas adaptadas a la temática del sitio web para organizar los contenidos y estructurar los silos de navegación. | ✅ Estandarizado |
| **15** | **Configuración de Menús (Header y Footer)** | Creación y asignación de menú `Header` (las 4 categorías + Contáctanos al final) en ubicación principal y menú `Footer` (las 7 páginas legales en su orden riguroso) en ubicación pie de página. | ✅ Estandarizado |
| **16** | **Maquetación de Cabecera y Pie de Página (Kadence)** | En Personalizar: subir logotipo oficial, fijar siempre la anchura máxima del título/logotipo en 80 px en Identidad del sitio, añadir bloque HTML con descripción en 2 líneas y 20px de margen izquierdo junto al logo, y colocar la Navegación en el Pie de Página centrada sobre el Copyright. | ✅ Estandarizado |
| **17** | **Creación del Usuario Autor Oficial (Manuel López)** | Crear el usuario editorial **Manuel López** (`manuellopez`, `yesas12345678@gmail.com`, `Manuel1214$Manuel`) para asignarle la autoría de todos los artículos de la web. | ✅ Estandarizado |
| **18** | **Generación y Publicación Masiva de Artículos** | Pipeline integral de 48 artículos (12 por categoría): 3 imágenes reales con curación semántica y filtro antislop sin repetición, redacción editorial de >2500 palabras (sin viñetas ni separadores, párrafos <150 palabras), 1 post/día retroactivo con categorías alternadas y firma de Manuel López. | ✅ Estandarizado |

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
     - Prompt: Logotipo horizontal vectorial limpio, minimalista y moderno sobre fondo transparente para la marca `[Nombre de la web]`, especializado en `[Temática de la web]`. Tipografía legible, sin marcos de dispositivos y con colores corporativos armónicos.
  2. **Emblema / Favicon Circular (512x512 px):**
     - Prompt: Isotipo, insignia o badge circular vectorial representativo del nicho `[Temática de la web]`, diseño plano minimalista de alta definición con fondo transparente, centrado, ideal para favicon de navegador e icono de aplicación móvil.

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
  Guardar los IDs de los medios retornados para su asignación en el Favicon (Paso 8) y la Cabecera de Kadence (Paso 16).

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
    - `contact-form-7` $\rightarrow$ Contact Form 7 (Formulario de soporte)
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

#### Instrucción Maestra de Redacción:
> **Regla de Adaptación:** Los textos legales deben reescribirse íntegramente con una longitud y estructura similares, manteniendo total formalidad legal sin duplicar textos palabra por palabra. Se adapta la temática (`[Temática de la web]`), el dominio de los correos (`[dominio.com]`) y el idioma al de la web.

#### Datos Legales Universales Invariables (Manuel López Ramos):
- **Titular y Responsable Legal:** Manuel López Ramos
- **NIF:** `45841212S`
- **Domicilio Fiscal:** `Calle Blas Infante, Córdoba, España`
- **Correos electrónicos del dominio:** `contacto@[dominio.com]`, `manuellopezramos@[dominio.com]`

#### Configuración de Contact Form 7:
1. Instalar y activar el plugin `contact-form-7`.
2. Obtener el ID del formulario creado por defecto (o crear uno vía navegador en `/wp-admin/admin.php?page=wpcf7`) y configurar la plantilla de formulario en el idioma de la web:
   ```html
   <p><label> Tu nombre<br />[text* your-name autocomplete:name] </label></p>
   <p><label> Tu correo electrónico<br />[email* your-email autocomplete:email] </label></p>
   <p><label> Asunto<br />[text* your-subject] </label></p>
   <p><label> Tu mensaje (opcional)<br />[textarea your-message] </label></p>
   <p>[submit "Enviar"]</p>
   ```

#### Script de Creación Masiva de Páginas Legales (`create_legal_pages.mjs`):
```javascript
const authHeader = `Basic ${Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASS}`).toString('base64')}`;

const pages = [
  {
    title: 'Sobre Nosotros',
    slug: 'sobre-nosotros',
    content: `<p>Bienvenido a [Nombre de la web], un portal digital independiente fundado y dirigido por Manuel López Ramos, dedicado en exclusiva al análisis riguroso, la divulgación y el estudio de [Temática de la web]...</p>`
  },
  {
    title: 'Manuel López Ramos',
    slug: 'manuel-lopez-ramos',
    content: `<p>Manuel López Ramos es el fundador, editor jefe y responsable de contenidos de [Nombre de la web]. Con una dilatada trayectoria vinculada al análisis de [Temática de la web]...</p>`
  },
  {
    title: 'Contáctanos',
    slug: 'contactanos',
    content: `<p>Si tienes alguna consulta, sugerencia editorial o propuesta de colaboración, puedes ponerte en contacto directamente con Manuel López Ramos y el equipo editorial:</p>[contact-form-7 id="${formId}" title="Contacto"]<p>Correo de contacto directo: contacto@[dominio.com]</p>`
  },
  {
    title: 'Política de Privacidad',
    slug: 'politica-de-privacidad',
    content: `<p>En cumplimiento del Reglamento General de Protección de Datos (RGPD) 2016/679 y la Ley Orgánica 3/2018 (LOPDGDD), se informa que los datos personales recabados a través de este sitio son tratados bajo la responsabilidad de Manuel López Ramos (NIF: 45841212S)...</p>`
  },
  {
    title: 'Política de Cookies',
    slug: 'politica-de-cookies',
    content: `<p>Este sitio web utiliza cookies técnicas, analíticas (Google Analytics 4 / Site Kit) y publicitarias (Google AdSense) con la finalidad de ofrecer la mejor experiencia de navegación y contenidos personalizados...</p>`
  },
  {
    title: 'Aviso Legal',
    slug: 'aviso-legal',
    content: `<p>En cumplimiento del artículo 10 de la Ley 34/2002 (LSSI-CE), se informa que el responsable de este sitio web es Manuel López Ramos, NIF 45841212S, con domicilio en Calle Blas Infante, Córdoba, España. Correo: contacto@[dominio.com]...</p>`
  },
  {
    title: 'Términos y Condiciones',
    slug: 'terminos-y-condiciones',
    content: `<p>El acceso y uso de este sitio web atribuye la condición de usuario, aceptando desde dicho acceso los presentes Términos y Condiciones de Uso relativos a los contenidos sobre [Temática de la web]...</p>`
  }
];

for (const p of pages) {
  const res = await fetch(`${process.env.WP_API_URL}/pages`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...p, status: 'publish' })
  });
  const data = await res.json();
  console.log(`Página creada: ${p.title} (ID: ${data.id}, Slug: ${data.slug})`);
}
```

---

### Paso 8: Ajustes Generales (`options-general.php`)

- **🔧 Herramientas, Tecnologías y Endpoints Utilizados:**
  - **API del CMS:** WordPress REST API.
  - **Endpoint de Ajustes:** `POST https://[dominio.com]/wp-json/wp/v2/settings`.
  - **Cabecera HTTP:** `Authorization: Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64')}`.

- **Script y Payload de Configuración General:**
  ```javascript
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
  console.log('Ajustes generales configurados con éxito.');
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
    - Elemento de Cabecera: `HTML 1` posicionado inmediatamente a la derecha del Logo en la Fila Principal (`main_row`).
    - Editor de Código de HTML 1: pestaña `Código` con `<p style="font-size: 12px; font-weight: bold; margin: 0; line-height: 1.3;">[Descripción corta línea 1]<br>[Descripción corta línea 2]</p>`.
    - Pestaña Diseño de HTML 1: Margen izquierdo (`margin-left`) establecido en `20px` (o inline `margin-left: 20px;`).
    - Footer Builder: Fila media con elemento `footer_navigation` centrado (menú `Footer`) y fila inferior con `copyright` centrado.

- **Procedimiento de Maquetación Paso a Paso (`browser_subagent`):**
  1. Acceder a `/wp-admin/customize.php`.
  2. **Identidad del Sitio:**
     - Asignar el logotipo horizontal oficial generado en el Paso 3, omitiendo el recorte.
     - **Regla Estricta de Dimensión:** Establecer la anchura máxima del logotipo en **80 px** (`logo_width: 80`). Esto evita desbordamientos y garantiza que la cabecera sea ligera y compacta en móvil y escritorio.
  3. **Fila Principal de Cabecera:**
     - Añadir el bloque **HTML 1** junto al logotipo.
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

- **3. Adquisición y Curación Semántica de Imágenes (Wikimedia Commons API):**
  - **Cantidad por Artículo:** Exactamente 3 imágenes reales, profesionales y libres de derechos comerciales:
    1. **Imagen Destacada (`featured_media`):** Cabecera del artículo y miniatura en portada y categorías.
    2. **Imagen Intermedia 1:** Inyectada en el HTML a ~1/3 del cuerpo del texto.
    3. **Imagen Intermedia 2:** Inyectada en el HTML a ~2/3 del cuerpo del texto.
  - **Regla de Oro:** **PROHIBIDO buscar con títulos completos en español.** Toda consulta debe traducirse a 2-3 palabras técnicas en inglés.
  - **Tabla de Mapeo de Enrutamiento Semántico (Query Routing):**
    ```javascript
    function getSearchQueries(title, categoryName) {
      const t = title.toLowerCase();
      const queries = [];
      // Enrutamiento por palabras clave técnicas
      if (/var|árbitro|tarjeta|regla|fuera de juego|penalti|mano/i.test(t)) {
        queries.push('association football referee', 'football referee penalty', 'assistant referee football');
      } else if (/táctica|sistema|4-3-3|3-5-2|presión|defensa|bloque|transición/i.test(t)) {
        queries.push('soccer tactical formation', 'association football match pitch', 'football players tactical action');
      } else if (/entrenamiento|físico|resistencia|velocidad|nutrición|lesión/i.test(t)) {
        queries.push('soccer player training pitch', 'football training drills', 'association football workout');
      } else if (/champions|mundial|eurocopa|torneo|copa|estadio/i.test(t)) {
        queries.push('UEFA Champions League match', 'FIFA World Cup match', 'association football stadium match');
      }
      // Fallbacks temáticos generales del nicho
      queries.push('association football match pitch', 'soccer player match ball', 'association football match');
      return queries;
    }
    ```
  - **Filtro Antislop Visual (`BANNED_PATTERNS`):**
    ```javascript
    const BANNED_PATTERNS = [
      /sign\b/i, /prohibido/i, /traffic/i, /car\b/i, /vehicle/i, /road\b/i, /street\b/i,
      /cemetery/i, /gravestone/i, /grave\b/i, /police/i, /cop\b/i, /tarot/i, /scrabble/i,
      /wooden block/i, /brick wall/i, /graffiti/i, /cat\b/i, /dog\b/i, /umbrella/i,
      /american football/i, /nfl/i, /rugby/i, /cricket/i, /baseball/i, /basketball/i,
      /military/i, /soldier/i, /army/i, /weapon/i
    ];
    ```
  - **Descarga de Miniaturas Optimizadas (`iiurlwidth=1280`):**
    ```javascript
    const endpoint = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=10&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1280&format=json`;
    const res = await fetch(endpoint, {
      headers: { 'User-Agent': 'MediaWikiBot/1.0 (contact@dominio.com) NodeFetch' },
      signal: AbortSignal.timeout(15000)
    });
    const data = await res.json();
    // Extraer thumburl de 1280px (150-350 KB), nunca el archivo original de 25 MB
    ```
  - **Inyección de Metadatos SEO y Marcado Gutenberg:**
    ```html
    <figure class="wp-block-image size-large">
      <img src="[URL_EN_WORDPRESS]" alt="[TÍTULO]: [DESCRIPCIÓN]" />
      <figcaption>[TÍTULO]: [DESCRIPCIÓN]</figcaption>
    </figure>
    ```

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

- **5. Publicación en WordPress REST API y Persistencia:**
  - **Llamada de Publicación:**
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
    ```
  - **Seguimiento en Blueprint (`data/articles_blueprint.json`):**
    Actualizar el artículo con `{ status: "published", wp_post_id: newPost.id, words: totalWords }` para permitir pausar y reanudar el proceso en cualquier momento con garantía de cero duplicados.

---

*(Aquí se irán añadiendo en orden todas las siguientes instrucciones que indiques...)*

