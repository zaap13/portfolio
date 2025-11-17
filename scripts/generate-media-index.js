// Gera public/media-index.json com a lista de faixas
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");

const AUDIO_EXTS = new Set([".mp3", ".m4a", ".aac", ".ogg", ".wav", ".flac"]);

async function walk(dirAbs, baseAbs, acc, folderParts = []) {
  const items = await fsp.readdir(dirAbs, { withFileTypes: true });
  for (const it of items) {
    const abs = path.join(dirAbs, it.name);
    if (it.isDirectory()) {
      await walk(abs, baseAbs, acc, [...folderParts, it.name]);
      continue;
    }
    const ext = path.extname(it.name).toLowerCase();
    if (!AUDIO_EXTS.has(ext)) continue;

    const relFromPublic = path.relative(baseAbs, abs).split(path.sep).join("/");
    const url = encodeURI("/" + relFromPublic.replace(/^\/+/, ""));
    const title = path.basename(it.name, ext);
    acc.push({ id: url, title, url, folder: folderParts });
  }
}

async function main() {
  const publicAbs = path.join(process.cwd(), "public");
  const mediaAbs = path.join(publicAbs, "media");

  if (!fs.existsSync(publicAbs)) fs.mkdirSync(publicAbs, { recursive: true });

  const tracks = [];
  if (fs.existsSync(mediaAbs)) {
    await walk(mediaAbs, publicAbs, tracks, []);
    tracks.sort((a, b) => {
      const af = a.folder.join("/"), bf = b.folder.join("/");
      if (af === bf) return a.title.localeCompare(b.title, undefined, { numeric: true });
      return af.localeCompare(bf);
    });
  }

  const out = path.join(publicAbs, "media-index.json");
  await fsp.writeFile(out, JSON.stringify(tracks), "utf8");
  console.log(`Wrote ${tracks.length} tracks to ${out}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
