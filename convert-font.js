const fs = require('fs');
const path = require('path');
const otf2ttf = require('otf2ttf');
const ttf2woff2 = require('ttf2woff2');

const inPath = path.join(__dirname, '..', 'fonts', 'Blackheat.otf');
const outPath = path.join(__dirname, '..', 'fonts', 'Blackheat.woff2');

if (!fs.existsSync(inPath)) {
  console.error('Input OTF not found at', inPath);
  process.exit(1);
}

const otf = fs.readFileSync(inPath);
const ttf = Buffer.from(otf2ttf(otf));
const woff2 = ttf2woff2(ttf);
fs.writeFileSync(outPath, woff2);
console.log('Wrote', outPath);
