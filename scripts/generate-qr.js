// Generate print-ready QR codes for any VDD link.
// Usage: node scripts/generate-qr.js [url] [name]
// Output: ../../qr-codes/<name>.png (1200px) and <name>.svg (vector, any size)

import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.argv[2] || 'https://narprafoods.com/vdd-elite';
const name = process.argv[3] || 'vdd-elite-qr';

const outDir = path.join(__dirname, '..', '..', 'qr-codes');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const opts = {
  errorCorrectionLevel: 'H', // highest — survives logos, print wear, glare
  margin: 2,
  color: {
    dark: '#060B1D',  // brand ink
    light: '#FFFFFF',
  },
};

await QRCode.toFile(path.join(outDir, `${name}.png`), url, { ...opts, width: 1200 });
await QRCode.toFile(path.join(outDir, `${name}.svg`), url, { ...opts, type: 'svg' });
console.log(`URL:  ${url}`);
console.log(`PNG:  ${path.join(outDir, `${name}.png`)} (1200px)`);
console.log(`SVG:  ${path.join(outDir, `${name}.svg`)} (vector)`);
