// 从 docs/、.dumirc.ts 侧栏生成仓库根目录 llms.txt、可选 llms-full.txt；
// 并同步到 public/，供 dumi 在站点根路径提供 /llms.txt、/llms-full.txt（浏览器可访问）。
// 各包 index.ts 导出表仅写入 llms-full.txt 附录（非主索引）。
// 用法：node scripts/generate-llm-txt.mjs [--no-full]
// 环境变量：ORINUI_LLMS_DOCS_ORIGIN=https://你的文档站（无末尾斜杠）→ 链接为可抓取的绝对 URL。
// Node >=18；仅使用 fs、path，无额外依赖。
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function readFile(p) {
  return fs.readFileSync(p, 'utf8');
}

function writeFile(p, content) {
  fs.writeFileSync(p, content, 'utf8');
}

/**
 * 与仓库根目录内容一致；Umi 会将 `public/` 挂到站点根，便于 `/llms.txt` 在浏览器中打开。
 * @param {{ llmsContent: string, fullContent?: string, skipFull: boolean }} p
 */
function syncPublicArtifacts(p) {
  const pub = path.join(ROOT, 'public');
  fs.mkdirSync(pub, { recursive: true });
  writeFile(path.join(pub, 'llms.txt'), p.llmsContent);
  const pubFull = path.join(pub, 'llms-full.txt');
  if (!p.skipFull && p.fullContent !== undefined) {
    writeFile(pubFull, p.fullContent);
  } else if (fs.existsSync(pubFull)) {
    fs.unlinkSync(pubFull);
  }
  console.log(`Wrote ${path.relative(ROOT, 'public/llms.txt')}`);
  if (!p.skipFull && p.fullContent !== undefined) {
    console.log(`Wrote ${path.relative(ROOT, 'public/llms-full.txt')}`);
  }
}

/** @param {string} content @param {string} key e.g. '/components/' */
function findArrayBlockAfterKey(content, key) {
  const needle = `'${key}':`;
  const i = content.indexOf(needle);
  if (i === -1) return null;
  let pos = i + needle.length;
  while (pos < content.length && /\s/.test(content[pos])) pos++;
  if (content[pos] !== '[') return null;
  let depth = 0;
  const start = pos;
  for (; pos < content.length; pos++) {
    const c = content[pos];
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) return content.slice(start, pos + 1);
    }
  }
  return null;
}

/** @param {string} content */
function findNavArray(content) {
  const n = content.indexOf('nav: [');
  if (n === -1) return null;
  let pos = n + 'nav: '.length;
  while (content[pos] !== '[') pos++;
  let depth = 0;
  const start = pos;
  for (; pos < content.length; pos++) {
    const c = content[pos];
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) return content.slice(start, pos + 1);
    }
  }
  return null;
}

/**
 * @param {string} block
 * @returns {{ title: string, link: string }[]}
 */
function parseTitleLinkPairs(block) {
  // 兼容单行 `{ title, link }` 与多行、且 `link` 后带尾随逗号的 dumi 侧栏写法
  const re =
    /\{\s*title:\s*['"]([^'"]+)['"],\s*link:\s*['"]([^'"]+)['"]\s*,?\s*\}/g;
  const out = [];
  let m;
  while ((m = re.exec(block)) !== null) {
    out.push({ title: m[1], link: m[2] });
  }
  return out;
}

/**
 * @param {string} link dumi path e.g. /components/table
 * @returns {string | null} repo-relative docs path
 */
function linkToDocsPath(link) {
  if (!link || link === '/') return 'docs/index.md';
  const clean = link.replace(/^\//, '').replace(/\/$/, '');
  if (clean === 'guide') return 'docs/guide.md';
  if (clean === 'components') return 'docs/components/index.md';
  if (clean === 'hooks') return 'docs/hooks/index.md';
  if (clean === 'utils') return 'docs/utils/index.md';
  if (clean === 'ai-skills') return 'docs/ai-skills/index.md';
  if (clean === 'changelog') return 'docs/changelog/index.md';
  if (clean === 'doc') return 'docs/doc.md';

  const parts = clean.split('/');
  const head = parts[0];
  if (head === 'components' && parts.length >= 2) {
    return `docs/components/${parts.slice(1).join('/')}.md`;
  }
  if (head === 'hooks' && parts.length >= 2) {
    return `docs/hooks/${parts.slice(1).join('/')}.md`;
  }
  if (head === 'utils' && parts.length >= 2) {
    return `docs/utils/${parts.slice(1).join('/')}.md`;
  }
  if (head === 'ai-skills' && parts.length >= 2) {
    return `docs/ai-skills/${parts.slice(1).join('/')}.md`;
  }
  return null;
}

/**
 * @param {string} docsPath
 * @param {string} link
 * @param {string} label
 */
function formatMarkdownLink(docsPath, link, label) {
  const origin = process.env.ORINUI_LLMS_DOCS_ORIGIN?.replace(/\/$/, '');
  if (origin) {
    return `[${label}](${origin}${link})`;
  }
  const rel = docsPath.replace(/^\/+/, '');
  return `[${label}](${rel})`;
}

/**
 * @param {string} mdPath absolute or relative to ROOT
 */
function readFrontmatterTitle(mdPath) {
  const full = path.isAbsolute(mdPath) ? mdPath : path.join(ROOT, mdPath);
  if (!fs.existsSync(full)) return '';
  const raw = readFile(full);
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return '';
  const t = fm[1].match(/^\s*title:\s*(.+)$/m);
  return t ? t[1].trim().replace(/^["']|["']$/g, '') : '';
}

/** stripCommentsForParse and barrel parsing (appendix only) */

function stripCommentsForParse(s) {
  return s
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
}

function resolveImportToSrcRelative(pkgSrc, fromLiteral) {
  const rel = fromLiteral.replace(/^\.\//, '').replace(/\.tsx?$/, '');
  const candidates = [
    `${rel}.ts`,
    `${rel}.tsx`,
    path.join(rel, 'index.ts').replace(/\\/g, '/'),
    path.join(rel, 'index.tsx').replace(/\\/g, '/'),
  ];
  for (const c of candidates) {
    const full = path.join(pkgSrc, c);
    if (fs.existsSync(full) && fs.statSync(full).isFile()) {
      return c.replace(/\\/g, '/');
    }
  }
  return `${rel}.ts?`;
}

function parseNamedImports(content) {
  const map = new Map();
  const importBlock = /import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/gs;
  let m;
  while ((m = importBlock.exec(content)) !== null) {
    const from = m[2];
    const parts = m[1].split(',');
    for (const part of parts) {
      const t = part.trim();
      if (!t) continue;
      const asMatch = t.match(/^(\w+)\s+as\s+(\w+)$/);
      if (asMatch) {
        map.set(asMatch[2], from);
      } else if (/^\w+$/.test(t)) {
        map.set(t, from);
      }
    }
  }
  return map;
}

function parseBarrelExports(indexPath, pkgSrc) {
  const content = stripCommentsForParse(readFile(indexPath));
  const results = [];

  const reDefaultAs = /export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*['"]([^'"]+)['"]\s*;/g;
  let m;
  while ((m = reDefaultAs.exec(content)) !== null) {
    results.push({ kind: 'default', name: m[1], from: m[2] });
  }

  const reFrom = /export\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]\s*;/g;
  while ((m = reFrom.exec(content)) !== null) {
    const from = m[2];
    const names = m[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    for (const n of names) {
      const parts = n.split(/\s+as\s+/);
      const exportName = parts.length > 1 ? parts[1].trim() : parts[0].trim();
      if (exportName === 'default') continue;
      results.push({ kind: 'named', name: exportName, from });
    }
  }

  const exportOnly = /export\s*\{([^}]+)\}\s*;/g;
  while ((m = exportOnly.exec(content)) !== null) {
    const inner = m[1];
    if (inner.includes('from')) continue;
    const importMap = parseNamedImports(content);
    const names = inner
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    for (const n of names) {
      const parts = n.split(/\s+as\s+/);
      const exportName = parts.length > 1 ? parts[1].trim() : parts[0].trim();
      const from = importMap.get(exportName);
      if (from) {
        results.push({ kind: 'named', name: exportName, from });
      }
    }
  }

  if (/export\s+default\s*\{/.test(content)) {
    results.push({
      kind: 'named',
      name: 'default',
      from: '(aggregate object — 兼容旧版，成员见上表具名导出)',
    });
  }

  if (/export\s*\{\s*\}\s*;/.test(content) && results.length === 0) {
    results.push({
      kind: 'named',
      name: '（无）',
      from: '占位 export {}，待补充技能模块导出',
    });
  }

  const seen = new Set();
  const deduped = [];
  for (const r of results) {
    const key = `${r.name}:${r.from || ''}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(r);
  }

  deduped.sort((a, b) => {
    if (a.name === 'default') return 1;
    if (b.name === 'default') return -1;
    return a.name.localeCompare(b.name);
  });

  return deduped.map((r) => {
    let srcRel = '';
    if (r.from) {
      if (r.from.startsWith('(')) {
        srcRel = r.from;
      } else if (r.from.startsWith('.')) {
        srcRel = resolveImportToSrcRelative(pkgSrc, r.from);
      } else {
        srcRel = r.from;
      }
    }
    return { name: r.name, srcRel };
  });
}

function formatTable(rows) {
  const lines = [
    '| 符号 | 源码路径（相对包 `src`） |',
    '| --- | --- |',
    ...rows.map((r) => `| ${r.name} | ${r.srcRel} |`),
  ];
  return lines.join('\n');
}

function sectionForPackage(title, pkgRel, rows) {
  const header = `### ${title}\n\n包目录：\`${pkgRel}/\`\n\n`;
  if (rows.length === 0) {
    return `${header}（无解析到的导出）\n\n`;
  }
  return `${header}${formatTable(rows)}\n\n`;
}

function stripYamlFrontmatter(md) {
  return md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
}

/**
 * @param {{ title: string, link: string }[]} items
 * @param {string} sectionTitle
 */
function buildLinkTable(items, sectionTitle) {
  const lines = [`### ${sectionTitle}\n`, '| 页面 | 文档 |', '| --- | --- |'];
  for (const { title, link } of items) {
    const docsPath = linkToDocsPath(link);
    const exists = docsPath && fs.existsSync(path.join(ROOT, docsPath));
    const label = title;
    if (!docsPath) {
      lines.push(`| ${title} | \`${link}\` |`);
      continue;
    }
    const fmTitle = exists ? readFrontmatterTitle(docsPath) : '';
    const cell =
      exists && fmTitle && fmTitle !== title
        ? `${formatMarkdownLink(docsPath, link, docsPath)}（${fmTitle}）`
        : formatMarkdownLink(docsPath, link, exists ? docsPath : `${docsPath}（待补充）`);
    lines.push(`| ${label} | ${cell} |`);
  }
  return lines.join('\n');
}

function loadDumirc() {
  return readFile(path.join(ROOT, '.dumirc.ts'));
}

function getSidebarEntries(dumirc) {
  const navBlock = findNavArray(dumirc);
  const navItems = navBlock ? parseTitleLinkPairs(navBlock) : [];

  const componentsBlock = findArrayBlockAfterKey(dumirc, '/components/');
  const hooksBlock = findArrayBlockAfterKey(dumirc, '/hooks/');
  const utilsBlock = findArrayBlockAfterKey(dumirc, '/utils/');
  const aiBlock = findArrayBlockAfterKey(dumirc, '/ai-skills/');

  const componentsItems = componentsBlock
    ? parseTitleLinkPairs(componentsBlock)
    : [];
  const hooksItems = hooksBlock ? parseTitleLinkPairs(hooksBlock) : [];
  const utilsItems = utilsBlock ? parseTitleLinkPairs(utilsBlock) : [];
  const aiItems = aiBlock ? parseTitleLinkPairs(aiBlock) : [];

  return {
    navItems,
    componentsItems,
    hooksItems,
    utilsItems,
    aiItems,
  };
}

function buildBarrelAppendix() {
  const components = parseBarrelExports(
    path.join(ROOT, 'packages/components/src/index.ts'),
    path.join(ROOT, 'packages/components/src'),
  );
  const hooks = parseBarrelExports(
    path.join(ROOT, 'packages/hooks/src/index.ts'),
    path.join(ROOT, 'packages/hooks/src'),
  );
  const utils = parseBarrelExports(
    path.join(ROOT, 'packages/utils/src/index.ts'),
    path.join(ROOT, 'packages/utils/src'),
  );
  const aiSkills = parseBarrelExports(
    path.join(ROOT, 'packages/ai-skills/src/index.ts'),
    path.join(ROOT, 'packages/ai-skills/src'),
  );

  return [
    '## 附录：包导出与源码路径（库维护者 / 校验用）',
    '',
    '> 以下内容**不是**业务集成所必需；由 `packages/*/src/index.ts` 自动解析，便于与 barrel 对照。主索引请使用上文文档链接。',
    '',
    sectionForPackage('@orinui/components', 'packages/components', components),
    sectionForPackage('@orinui/hooks', 'packages/hooks', hooks),
    sectionForPackage('@orinui/utils', 'packages/utils', utils),
    sectionForPackage('@orinui/ai-skills', 'packages/ai-skills', aiSkills),
  ].join('\n');
}

function concatDocsForFull(sidebarLists) {
  const chunks = [];
  const seen = new Set();

  function pushFile(relPath, heading) {
    if (!relPath || seen.has(relPath)) return;
    const full = path.join(ROOT, relPath);
    if (!fs.existsSync(full)) return;
    seen.add(relPath);
    const raw = readFile(full);
    const body = stripYamlFrontmatter(raw).trim();
    chunks.push(
      `## ${heading}\n\n来源：\`${relPath}\`\n\n${body}\n`,
    );
  }

  const order = [
    ...sidebarLists.navItems,
    ...sidebarLists.componentsItems,
    ...sidebarLists.hooksItems,
    ...sidebarLists.utilsItems,
    ...sidebarLists.aiItems,
  ];

  for (const { title, link } of order) {
    const docsPath = linkToDocsPath(link);
    if (docsPath) pushFile(docsPath, title);
  }

  pushFile('docs/index.md', '首页');
  return chunks.join('\n\n---\n\n');
}

function main() {
  const args = new Set(process.argv.slice(2));
  const skipFull = args.has('--no-full');

  const headerPath = path.join(__dirname, 'llm-header.txt');
  const header = readFile(headerPath);
  const dumirc = loadDumirc();
  const sidebarLists = getSidebarEntries(dumirc);

  const origin = process.env.ORINUI_LLMS_DOCS_ORIGIN?.replace(/\/$/, '');
  const navFullLink = origin
    ? `[llms-full.txt](${origin}/llms-full.txt)（若已部署）`
    : '[llms-full.txt](./llms-full.txt)（仓库根目录，由生成脚本产出）';

  const genMarker =
    '<!-- AUTO-GENERATED-BY: scripts/generate-llm-txt.mjs — 请勿手工编辑以下区块 -->';

  const navigationSection = [
    '## Navigation',
    '',
    '- **全文聚合**：' + navFullLink + '。',
    '- **站点路由**：本地开发使用 `pnpm dev`（或 `yarn start`）打开 dumi；部署后请将环境变量 `ORINUI_LLMS_DOCS_ORIGIN` 设为文档站 origin，重新运行本脚本以生成可 HTTP 抓取的绝对链接。',
    '',
    buildLinkTable(sidebarLists.navItems, '指南与全局'),
    '',
    buildLinkTable(sidebarLists.componentsItems, '组件'),
    '',
    buildLinkTable(sidebarLists.hooksItems, 'Hooks'),
    '',
    buildLinkTable(sidebarLists.utilsItems, '工具'),
    '',
    buildLinkTable(sidebarLists.aiItems, 'AI Skills'),
    '',
  ].join('\n');

  const llmsBody = [
    genMarker,
    '',
    navigationSection,
    '',
    '---',
    '',
    '*生成时间：生成时由脚本写入；以 `docs/` 与 `.dumirc.ts` 侧栏为准。*',
    '',
  ].join('\n');

  const llmsPath = path.join(ROOT, 'llms.txt');
  const llmsContent = `${header}\n\n${llmsBody}`;
  writeFile(llmsPath, llmsContent);
  console.log(`Wrote ${path.relative(ROOT, llmsPath)}`);

  let fullCombined;
  if (!skipFull) {
    const fullIntro = [
      '# orinui — 全文聚合（llms-full.txt）',
      '',
      '> 本文件由 `scripts/generate-llm-txt.mjs` 根据 `docs/` 与侧栏顺序拼接生成；请先读 [**llms.txt**](./llms.txt) 获取导航与链接索引。',
      '',
    ].join('\n');
    const fullMain = concatDocsForFull(sidebarLists);
    const appendix = buildBarrelAppendix();
    const fullPath = path.join(ROOT, 'llms-full.txt');
    fullCombined = `${fullIntro}\n\n${fullMain}\n\n---\n\n${appendix}\n`;
    writeFile(fullPath, fullCombined);
    console.log(`Wrote ${path.relative(ROOT, fullPath)}`);
  } else {
    console.log('Skipped llms-full.txt (--no-full)');
  }

  syncPublicArtifacts({
    llmsContent,
    fullContent: fullCombined,
    skipFull,
  });
}

main();
