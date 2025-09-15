/* eslint-disable */
// tools/make-review-bundle.js
// Usage: node tools/make-review-bundle.js [output=review-bundle.md] [maxFileKB=200]
import fs from 'fs/promises';
import path from 'path';

const OUTPUT = process.argv[2] || 'review-bundle.md';
const MAX_FILE_KB = Number(process.argv[3] || 200);
const MAX_FILE_BYTES = MAX_FILE_KB * 1024;

const includeRoots = [
  'package.json', 'README.md',
  'src', 'public', 'cypress',
  'jest.config.js', 'jest.config.cjs', 'jest.config.mjs', 'jest.config.ts',
  'cypress.config.js', 'cypress.config.cjs', 'cypress.config.mjs', 'cypress.config.ts',
  '.parcelrc', 'parcel.config.js', 'parcel.config.cjs', 'parcel.config.mjs',
  'tsconfig.json', 'jsconfig.json',/* eslint-disable */
  '.eslintrc', '.eslintrc.js', '.eslintrc.cjs', '.eslintrc.json',
  '.stylelintrc', '.stylelintrc.js', '.stylelintrc.cjs', '.stylelintrc.json',
  '.linthtmlrc', '.linthtmlrc.js', '.linthtmlrc.cjs', '.linthtmlrc.json',
  '.prettierrc', '.prettierrc.js', '.prettierrc.cjs', '.prettierrc.json',
  '.editorconfig'
];

const ignoreDirs = new Set([
  'node_modules', 'dist', 'build', 'coverage',
  '.parcel-cache', '.cache', '.git',
  'videos', 'screenshots', 'mochawesome-report'
]);

const allowedExt = new Set([
  '.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx',
  '.json', '.md', '.html', '.css', '.scss', '.yml', '.yaml'
]);

function fenceLang(file) {
  const ext = path.extname(file).toLowerCase();
  switch (ext) {
    case '.js': case '.jsx': case '.mjs': case '.cjs': return 'javascript';
    case '.ts': case '.tsx': return 'ts';
    case '.json': return 'json';
    case '.md': return 'md';
    case '.html': return 'html';
    case '.css': return 'css';
    case '.scss': return 'scss';
    case '.yml': case '.yaml': return 'yaml';
    default: return '';
  }
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function walk(dir, acc = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) {
      if (ignoreDirs.has(e.name)) continue;
      await walk(path.join(dir, e.name), acc);
    } else if (e.isFile()) {
      const full = path.join(dir, e.name);
      const ext = path.extname(e.name).toLowerCase();
      if (allowedExt.has(ext) || includeRoots.includes(e.name)) {
        acc.push(full);
      }
    }
  }
  return acc;
}

async function collectFiles() {
  const files = new Set();
  for (const item of includeRoots) {
    if (await exists(item)) {
      const stat = await fs.lstat(item);
      if (stat.isDirectory()) {
        const walked = await walk(item);
        walked.forEach(f => files.add(f));
      } else if (stat.isFile()) {
        files.add(item);
      }
    }
  }
  // Fallback: include src if nothing found but exists
  if (files.size === 0 && await exists('src')) {
    (await walk('src')).forEach(f => files.add(f));
  }
  return Array.from(files).sort();
}

function header(title, level = 2) {
  return `${'#'.repeat(level)} ${title}\n\n`;
}

async function main() {
  const files = await collectFiles();
  let out = '';
  out += header('Project Review Bundle');
  out += `Generated: ${new Date().toISOString()}\n`;
  out += `Node: ${process.version}\n`;
  out += `Files included: ${files.length}\n\n`;
  out += header('Notes', 3);
  out += `- Secrets redacted: PLEASE REMOVE tokens, passwords, keys from config and .env before sharing.\n`;
  out += `- Large files (> ${MAX_FILE_KB} KB) are truncated with a note.\n\n`;

  for (const file of files) {
    const rel = file;
    let data = await fs.readFile(file);
    const tooBig = data.byteLength > MAX_FILE_BYTES;
    if (tooBig) {
      data = data.subarray(0, MAX_FILE_BYTES);
    }
    const lang = fenceLang(file);
    out += header(rel, 3);
    if (tooBig) {
      out += `> File truncated for review (first ${MAX_FILE_KB} KB)\n\n`;
    }
    out += '```' + (lang ? lang : '') + '\n';
    out += data.toString('utf8').replace(/\r\n/g, '\n');
    out += '\n```\n\n';
  }

  await fs.writeFile(OUTPUT, out, 'utf8');
  console.log(`Wrote ${OUTPUT} with ${files.length} file(s).`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
