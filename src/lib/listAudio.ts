import fs from "node:fs/promises";
import path from "node:path";

export type Track = {
  id: string;
  title: string;
  url: string;     // começa com "/" e já vem encodeURI
  folder: string[]; // caminho em partes: ["rap","Djonga","Album X"]
};

const AUDIO_EXTS = new Set([".mp3", ".m4a", ".aac", ".ogg", ".wav", ".flac"]);

async function walk(
  dirAbs: string,
  baseAbs: string,
  acc: Track[],
  folderParts: string[] = []
) {
  const items = await fs.readdir(dirAbs, { withFileTypes: true });

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

export async function listAudioFromPublicMedia() {
  const publicAbs = path.join(process.cwd(), "public");
  const mediaAbs = path.join(publicAbs, "media");
  try {
    await fs.access(mediaAbs);
  } catch {
    return [];
  }
  const tracks: Track[] = [];
  await walk(mediaAbs, publicAbs, tracks, []);
  // Ordena por caminho e título
  tracks.sort((a, b) => {
    const af = a.folder.join("/"),
      bf = b.folder.join("/");
    if (af === bf) return a.title.localeCompare(b.title, undefined, { numeric: true });
    return af.localeCompare(bf);
  });
  return tracks;
}
