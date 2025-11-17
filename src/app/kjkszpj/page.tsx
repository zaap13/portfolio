import { cookies } from "next/headers";
import PasswordGate from "@/components/PasswordGate";
import { listAudioFromPublicMedia } from "@/lib/listAudio";
import AudioPlayer from "@/components/AudioPlayer";

export const runtime = "nodejs";

export default async function PlayerPage() {
  const cookieStore = await cookies(); // ✅ em Next 15, cookies() pode ser assíncrono
  const authed = cookieStore.get("player_auth")?.value === "1";

  if (!authed) {
    return <PasswordGate />;
  }

  const tracks = await listAudioFromPublicMedia();

  return (
    <main className="min-h-svh py-8">
      <AudioPlayer tracks={tracks} />
      {tracks.length === 0 && (
        <p className="mt-6 text-center opacity-70">
          Nenhuma música encontrada. Coloque os arquivos em <code>/public/media</code>.
        </p>
      )}
    </main>
  );
}
