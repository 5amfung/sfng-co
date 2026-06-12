import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root = resolve(import.meta.dirname, '..');

const dailyHtmlPath = resolve(root, 'daily/index.html');
if (!existsSync(dailyHtmlPath)) {
  throw new Error('Expected daily/index.html to exist as a dedicated Vite page entry.');
}

const dailyHtml = readFileSync(dailyHtmlPath, 'utf8');
if (!dailyHtml.includes('src="/src/main.tsx"')) {
  throw new Error('Expected daily/index.html to load the shared React entrypoint.');
}

const viteConfigPath = resolve(root, 'vite.config.ts');
const viteConfig = readFileSync(viteConfigPath, 'utf8');
if (!viteConfig.includes("daily: path.resolve(__dirname, 'daily/index.html')")) {
  throw new Error('Expected vite.config.ts to include Daily as a Rollup HTML input.');
}

const vercelConfigPath = resolve(root, 'vercel.json');
if (!existsSync(vercelConfigPath)) {
  throw new Error('Expected vercel.json to define direct /daily routing.');
}

const vercelConfig = JSON.parse(readFileSync(vercelConfigPath, 'utf8'));
const rewrites = vercelConfig.rewrites ?? [];
const hasDailyRewrite = rewrites.some(
  (rewrite) => rewrite.source === '/daily' && rewrite.destination === '/daily/index.html',
);

if (!hasDailyRewrite) {
  throw new Error('Expected vercel.json to rewrite /daily to /daily/index.html.');
}
