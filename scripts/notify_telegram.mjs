import './loadEnv.mjs';

async function sendTelegram() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.log('No Telegram credentials');
    return;
  }
  const text = `🚀 *Nuevo Proyecto Web AdSense Iniciado*\n\n` +
               `• *Dominio:* \`golazos.co\`\n` +
               `• *Descripción corta:* Fútbol y Actualidad\n` +
               `• *Nicho:* Fútbol y Análisis Deportivo\n` +
               `• *Mercado:* España y Latinoamérica\n` +
               `• *Idioma:* Español\n\n` +
               `⚙️ *Iniciando montaje técnico autónomo según el Protocolo Maestro...*`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' })
  });

  const data = await res.json();
  console.log('Telegram sent:', data.ok ? 'SUCCESS' : data.description);
}

sendTelegram();
