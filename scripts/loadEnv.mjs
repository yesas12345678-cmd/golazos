import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Look for .env in the root directory (parent of scripts/)
const envPath = path.resolve(__dirname, '../.env');

const env = {};

if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index !== -1) {
      const key = trimmed.slice(0, index).trim();
      let val = trimmed.slice(index + 1).trim();
      // Remove surrounding quotes if present
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
}

export const WP_USER = env.WP_USER || 'Manuel Lopez';
export const WP_APP_PASS = env.WP_APP_PASS || '';
export const DEEPSEEK_API_KEY = env.DEEPSEEK_API_KEY || '';
export const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'Manuel1214$';
export const WP_API_URL = env.WP_API_URL || 'https://golazos.co/wp-json/wp/v2';
export const authHeader = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64');
