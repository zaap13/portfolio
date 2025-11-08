"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Track } from "@/lib/listAudio";

type Props = {
  tracks: Track[];
};

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ tracks }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [folderFilter, setFolderFilter] = useState<string>("");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // pasta → lista
  const folders = useMemo(() => {
    const set = new Set<string>();
    for (const t of tracks) {
      const f = t.folder.join("/") || "(Raiz)";
      set.add(f);
    }
    return Array.from(set).sort();
  }, [tracks]);

  const filteredTracks = useMemo(() => {
    if (!folderFilter || folderFilter === "(Raiz)") {
      return folderFilter === "(Raiz)"
        ? tracks.filter((t) => t.folder.length === 0)
        : tracks;
    }
    const parts = folderFilter.split("/");
    return tracks.filter((t) => t.folder.join("/") === parts.join("/"));
  }, [tracks, folderFilter]);

  // Garantir que currentIndex esteja dentro do filtro
  useEffect(() => {
    if (filteredTracks.length === 0) {
      setCurrentIndex(0);
      setIsPlaying(false);
      return;
    }
    // Tente manter música equivalente; se não, zera
    const cur = filteredTracks[currentIndex];
    if (!cur) setCurrentIndex(0);
  }, [filteredTracks, currentIndex]);

  const current = filteredTracks[currentIndex];

  // Reagir a mudanças de música
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.volume = volume;

    const onLoaded = () => {
      setDuration(el.duration || 0);
      if (isPlaying) el.play().catch(() => setIsPlaying(false));
    };
    const onTime = () => setProgress(el.currentTime || 0);
    const onEnded = () => {
      if (repeat) {
        el.currentTime = 0;
        el.play().catch(() => setIsPlaying(false));
        return;
      }
      handleNext();
    };

    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnded);

    return () => {
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.url, repeat, isPlaying]);

  function handlePlayPause() {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }

  function handleSeek(v: number) {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = v;
    setProgress(v);
  }

  function handleVolume(v: number) {
    const el = audioRef.current;
    const vol = Math.max(0, Math.min(1, v));
    if (el) el.volume = vol;
    setVolume(vol);
  }

  function pickNextIndex() {
    if (filteredTracks.length === 0) return 0;
    if (!shuffle) return (currentIndex + 1) % filteredTracks.length;
    let next = currentIndex;
    if (filteredTracks.length === 1) return currentIndex;
    while (next === currentIndex) {
      next = Math.floor(Math.random() * filteredTracks.length);
    }
    return next;
  }

  function handleNext() {
    if (filteredTracks.length === 0) return;
    const next = pickNextIndex();
    setCurrentIndex(next);
    setIsPlaying(true);
  }

  function handlePrev() {
    if (filteredTracks.length === 0) return;
    const el = audioRef.current;
    // Se passou de 3s, só volta ao início
    if (el && el.currentTime > 3) {
      handleSeek(0);
      return;
    }
    const prev = (currentIndex - 1 + filteredTracks.length) % filteredTracks.length;
    setCurrentIndex(prev);
    setIsPlaying(true);
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="text-3xl font-bold mb-4">Player de Músicas</h1>

      {/* Filtro por pasta */}
      <div className="mb-4 flex items-center gap-2">
        <label className="text-sm opacity-80">Pasta:</label>
        <select
          className="rounded border bg-transparent px-2 py-1"
          value={folderFilter}
          onChange={(e) => setFolderFilter(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="(Raiz)">(Raiz)</option>
          {folders.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de faixas */}
      <div className="grid md:grid-cols-2 gap-3 mb-6">
        {filteredTracks.map((t, i) => {
          const active = current?.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setCurrentIndex(i);
                setIsPlaying(true);
              }}
              className={`flex items-center justify-between rounded border px-3 py-2 text-left hover:bg-black/5 dark:hover:bg-white/5 ${
                active ? "border-primary" : "border-white/20 dark:border-white/10"
              }`}
              title={t.url}
            >
              <div className="min-w-0">
                <div className="truncate font-medium">{t.title}</div>
                <div className="text-xs opacity-70">{t.folder.join(" / ") || "(Raiz)"}</div>
              </div>
              {active && <span className="text-xs px-2 py-1 rounded bg-primary/20">tocando</span>}
            </button>
          );
        })}
        {filteredTracks.length === 0 && (
          <div className="opacity-70">Nenhuma faixa nesta pasta.</div>
        )}
      </div>

      {/* Controles */}
      <div className="rounded-xl border p-4">
        <div className="mb-3">
          <div className="text-sm opacity-70">Reproduzindo</div>
          <div className="text-lg font-semibold truncate">
            {current ? current.title : "—"}
          </div>
          <div className="text-xs opacity-60">{current?.folder.join(" / ") || "(Raiz)"}</div>
        </div>

        <audio ref={audioRef} src={current?.url} preload="metadata" />

        {/* Barra de progresso */}
        <div className="flex items-center gap-2">
          <span className="text-xs tabular-nums">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={Math.max(0, duration)}
            value={Math.min(progress, duration)}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-xs tabular-nums">{formatTime(duration)}</span>
        </div>

        {/* Botões */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            className="rounded px-3 py-1 border hover:bg-black/5 dark:hover:bg-white/5"
            onClick={handlePrev}
          >
            ◀︎ Anterior
          </button>
          <button
            className="rounded px-3 py-1 border hover:bg-black/5 dark:hover:bg-white/5"
            onClick={handlePlayPause}
          >
            {isPlaying ? "⏸︎ Pausar" : "▶︎ Reproduzir"}
          </button>
          <button
            className="rounded px-3 py-1 border hover:bg-black/5 dark:hover:bg-white/5"
            onClick={handleNext}
          >
            Próxima ▶︎
          </button>

          <button
            className={`rounded px-3 py-1 border hover:bg-black/5 dark:hover:bg-white/5 ${
              shuffle ? "bg-primary/20" : ""
            }`}
            onClick={() => setShuffle((s) => !s)}
            title="Aleatório"
          >
            🔀 Aleatório
          </button>
          <button
            className={`rounded px-3 py-1 border hover:bg-black/5 dark:hover:bg-white/5 ${
              repeat ? "bg-primary/20" : ""
            }`}
            onClick={() => setRepeat((r) => !r)}
            title="Repetir faixa"
          >
            🔁 Repetir
          </button>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs opacity-70">🔊</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => handleVolume(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
