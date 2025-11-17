import path from "node:path";
import fs from "node:fs/promises";

export type Track = {
  id: string;
  title: string;
  url: string;
  folder: string[];
};

export async function listAudioFromPublicMedia(): Promise<Track[]> {
  const mediaIndexPath = path.join(process.cwd(), "public", "media-index.json");
  try {
    const data = await fs.readFile(mediaIndexPath, "utf8");
    const tracks = JSON.parse(data) as Track[];
    return Array.isArray(tracks) ? tracks : [];
  } catch {
    return [];
  }
}
