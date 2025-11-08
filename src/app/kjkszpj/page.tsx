import { listAudioFromPublicMedia } from "@/lib/listAudio";
import AudioPlayer from "@/components/AudioPlayer";

export const runtime = "nodejs"; // precisamos de fs no servidor

export default async function PlayerPage() {
  const tracks = await listAudioFromPublicMedia();

  return (
    <main className="min-h-svh py-8">
      <AudioPlayer tracks={tracks} />
      {tracks.length === 0 && (
        <p className="mt-6 text-center opacity-70">
          Nenhuma música encontrada. Coloque seus arquivos em <code>/public/media</code>.
        </p>
      )}
    </main>
  );
}
