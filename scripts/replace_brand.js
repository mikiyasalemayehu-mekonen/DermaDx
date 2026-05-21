#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IGNORE_DIRS = new Set(['node_modules', '.git', '.next', 'dist']);
const TEXT_EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.html', '.css', '.scss', '.svg']);

const REPLACEMENTS = [
  { from: /DermaCare/g, to: 'DermaCare' },
  { from: /dermacare/g, to: 'dermacare' },
  { from: /DERMACARE/g, to: 'DERMACARE' },
  { from: /DermaCare/g, to: 'DermaCare' },
];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    if (IGNORE_DIRS.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) await walk(full);
    else if (ent.isFile()) await processFile(full);
  }
}

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!TEXT_EXT.has(ext) && ext !== '') return;
  try {
    let txt = await fs.readFile(file, 'utf8');
    let out = txt;
    for (const r of REPLACEMENTS) out = out.replace(r.from, r.to);
    if (out !== txt) {
      await fs.writeFile(file, out, 'utf8');
      console.log('Updated', path.relative(ROOT, file));
    }
  } catch (err) {
    // ignore binary files or read errors
  }
}

(async () => {
  try {
    await walk(ROOT);
    console.log('Replacement complete.');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
