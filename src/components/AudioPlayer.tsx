"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Track } from "@/lib/listAudio";
import FolderTree from "./FolderTree";

type Props = { tracks: Track[] };

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ tracks }: Props) {
  // estado do player
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // estado da UI
  const [scope, setScope] = useState<string>(""); // "" = todas
  const [query, setQuery] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [treeOpen, setTreeOpen] = useState<boolean>(false); // mobile drawer

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Deriva: foldersOfTracks para árvore
  const foldersOfTracks = useMemo(() => tracks.map(t => t.folder), [tracks]);

  // filtra por escopo (pasta e subpastas)
  const filteredByScope = useMemo(() => {
    if (!scope) return tracks;
    const parts = scope.split("/");
    return tracks.filter((t) => {
      if (parts.length > t.folder.length) return false;
      for (let i = 0; i < parts.length; i++) {
        if (t.folder[i] !== parts[i]) return false;
      }
      return true;
    });
  }, [tracks, scope]);

  // busca textual (só na lista visível; não altera pool)
  const visibleTracks = useMemo(() => {
    if (!query.trim()) return filteredByScope;
    const q = query.trim().toLowerCase();
    return filteredByScope.filter((t) => {
      const pathStr = (t.folder.join(" / ") + " / " + t.title).toLowerCase();
      return pathStr.includes(q);
    });
  }, [filteredByScope, query]);

  // pool de reprodução: seleção manual > escopo
  const playPool = useMemo(() => {
    if (selectedIds.size > 0) return filteredByScope.filter((t) => selectedIds.has(t.id));
    return filteredByScope;
  }, [filteredByScope, selectedIds]);

  // manter index válido
  useEffect(() => {
    if (playPool.length === 0) {
      setCurrentIndex(0);
      setIsPlaying(false);
      return;
    }
    if (!playPool[currentIndex]) setCurrentIndex(0);
  }, [playPool, currentIndex]);

  const current = playPool[currentIndex];

  // eventos do <audio>
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    setErrorMsg("");
    el.volume = volume;

    const onLoaded = () => {
      setDuration(Number.isFinite(el.duration) ? el.duration : 0);
      if (isPlaying) {
        el.play().catch(() => {
          setIsPlaying(false);
          setErrorMsg("Clique em Reproduzir para iniciar o áudio.");
        });
      }
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
    const onError = () => {
      setIsPlaying(false);
      setErrorMsg("Falha ao carregar/tocar este arquivo.");
    };

    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnded);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("error", onError);
    };
  }, [current?.id, repeat, isPlaying, volume]);

  useEffect(() => {
    if (!current) return;
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.load();
      el.play().catch(() => {
        setIsPlaying(false);
        setErrorMsg("Clique em Reproduzir para iniciar o áudio.");
      });
    } else {
      setProgress(0);
    }
  }, [current?.id, isPlaying]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === "INPUT") return;
      if (e.code === "Space") { e.preventDefault(); handlePlayPause(); }
      else if (e.code === "ArrowRight") handleNext();
      else if (e.code === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPlaying, playPool, currentIndex]);

  // actions
  function handlePlayPause() {
    const el = audioRef.current;
    if (!el) return;
    setErrorMsg("");
    if (isPlaying) { el.pause(); setIsPlaying(false); }
    else {
      if (el.readyState < 2) el.load();
      el.play().then(() => setIsPlaying(true)).catch(() => {
        setIsPlaying(false); setErrorMsg("Não foi possível iniciar. Verifique o arquivo.");
      });
    }
  }
  function handleSeek(v: number) { const el = audioRef.current; if (!el) return; el.currentTime = v; setProgress(v); }
  function handleVolume(v: number) { const el = audioRef.current; const vol = Math.max(0, Math.min(1, v)); if (el) el.volume = vol; setVolume(vol); }
  function pickNextIndex() {
    if (playPool.length === 0) return 0;
    if (!shuffle) return (currentIndex + 1) % playPool.length;
    let next = currentIndex; if (playPool.length === 1) return currentIndex;
    while (next === currentIndex) next = Math.floor(Math.random() * playPool.length);
    return next;
  }
  function handleNext() { if (playPool.length === 0) return; setCurrentIndex(pickNextIndex()); setIsPlaying(true); }
  function handlePrev() {
    if (playPool.length === 0) return;
    const el = audioRef.current;
    if (el && el.currentTime > 3) { handleSeek(0); return; }
    const prev = (currentIndex - 1 + playPool.length) % playPool.length;
    setCurrentIndex(prev); setIsPlaying(true);
  }

  // seleção
  function toggleSelect(id: string) {
    setSelectedIds((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }
  function clearSelection() { setSelectedIds(new Set()); }
  function selectAllScope() { setSelectedIds(new Set(filteredByScope.map((t) => t.id))); }
  function selectVisible() { setSelectedIds(new Set(visibleTracks.map((t) => t.id))); }
  function invertVisible() {
    setSelectedIds((prev) => {
      const n = new Set(prev);
      for (const t of visibleTracks) n.has(t.id) ? n.delete(t.id) : n.add(t.id);
      return n;
    });
  }
  function startShuffleScope() {
    setShuffle(true);
    const pool = playPool;
    if (pool.length > 0) {
      setCurrentIndex(Math.floor(Math.random() * pool.length));
      setIsPlaying(true);
    }
  }

  return (
    <div className="mx-auto max-w-7xl p-4">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold">Player de Músicas</h1>
        <div className="text-sm opacity-70 md:ml-auto">
          Escopo: <strong>{scope || "Todas as pastas"}</strong> · Faixas no escopo: <strong>{filteredByScope.length}</strong> · Selecionadas: <strong>{selectedIds.size}</strong>
        </div>
      </div>

      {/* Layout responsivo: sidebar (árvore) + conteúdo */}
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4">
        {/* Sidebar / Drawer */}
        <aside className="md:sticky md:top-4 md:h-[calc(100vh-6rem)]">
          {/* Mobile toggle */}
          <div className="md:hidden mb-2 flex items-center gap-2">
            <button className="rounded px-3 py-2 border hover:bg-black/5 dark:hover:bg-white/5" onClick={() => setTreeOpen((o) => !o)}>
              {treeOpen ? "Fechar pastas" : "Abrir pastas"}
            </button>
          </div>

          <div className={`rounded-xl border bg-white/70 dark:bg-neutral-900/70 backdrop-blur p-3 ${treeOpen ? "block" : "hidden md:block"}`}>
            <h2 className="font-semibold mb-2">Pastas</h2>
            <FolderTree
              foldersOfTracks={foldersOfTracks}
              scope={scope}
              onChange={(p) => { setScope(p); setSelectedIds(new Set()); }}
            />
          </div>
        </aside>

        {/* Conteúdo principal */}
        <section>
          {/* Busca + ações principais */}
          <div className="mb-4 grid gap-3 md:grid-cols-3">
            <div className="flex items-center gap-2 md:col-span-2">
              <label className="text-sm opacity-80 min-w-[60px]">Buscar:</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Título, pasta, artista..."
                className="w-full rounded border px-3 py-2 bg-white text-black dark:bg-neutral-900 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button className={`rounded px-3 py-2 border hover:bg-black/5 dark:hover:bg-white/5 ${shuffle ? "bg-primary/20" : ""}`} onClick={() => setShuffle((s) => !s)} title="Aleatório">🔀 Aleatório</button>
              <button className={`rounded px-3 py-2 border hover:bg-black/5 dark:hover:bg-white/5 ${repeat ? "bg-primary/20" : ""}`} onClick={() => setRepeat((r) => !r)} title="Repetir faixa">🔁 Repetir</button>
              <button className="rounded px-3 py-2 border hover:bg-black/5 dark:hover:bg-white/5" onClick={startShuffleScope} title="Tocar aleatório do escopo/seleção">▶︎ Shuffle</button>
            </div>
          </div>

          {/* Ações de seleção */}
          <div className="mb-3 flex flex-wrap gap-2">
            <button className="rounded px-3 py-2 border hover:bg-black/5 dark:hover:bg-white/5" onClick={selectAllScope}>Selecionar tudo (escopo)</button>
            <button className="rounded px-3 py-2 border hover:bg-black/5 dark:hover:bg-white/5" onClick={selectVisible}>Selecionar visíveis</button>
            <button className="rounded px-3 py-2 border hover:bg-black/5 dark:hover:bg-white/5" onClick={invertVisible}>Inverter seleção (visíveis)</button>
            {selectedIds.size > 0 && (
              <button className="rounded px-3 py-2 border hover:bg-black/5 dark:hover:bg-white/5" onClick={clearSelection}>Limpar seleção ({selectedIds.size})</button>
            )}
          </div>

          {/* Lista rolável */}
          <div className="rounded-xl border">
            <div className="flex items-center justify-between px-4 py-3 text-sm opacity-80 sticky top-0 bg-white/70 dark:bg-neutral-900/70 backdrop-blur z-10 rounded-t-xl">
              <div>
                Mostrando <strong>{visibleTracks.length}</strong> {visibleTracks.length === 1 ? "faixa" : "faixas"}
                {query && <> · filtro: <em className="opacity-90">&ldquo;{query}&rdquo;</em></>}
              </div>
              <div className="hidden sm:block">Clique no card para tocar · Checkbox para seleção</div>
            </div>

            <div className="max-h-[65vh] md:max-h-[70vh] overflow-y-auto divide-y">
              {visibleTracks.map((t) => {
                const active = current?.id === t.id;
                const checked = selectedIds.has(t.id);
                const idxInPool = playPool.findIndex((p) => p.id === t.id);
                const canPlayDirect = idxInPool >= 0;

                return (
                  <div key={t.id} className={`flex items-center gap-3 px-4 py-3 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] ${active ? "bg-primary/10" : ""}`}>
                    <input type="checkbox" checked={checked} onChange={() => toggleSelect(t.id)} className="size-4" />
                    <button
                      onClick={() => {
                        if (canPlayDirect) {
                          setCurrentIndex(idxInPool);
                          setIsPlaying(true);
                        } else {
                          setSelectedIds((prev) => {
                            const n = new Set(prev);
                            n.add(t.id);
                            return n;
                          });
                          const newPool = filteredByScope.filter((x) => selectedIds.has(x.id) || x.id === t.id);
                          const newIndex = newPool.findIndex((x) => x.id === t.id);
                          setCurrentIndex(newIndex >= 0 ? newIndex : 0);
                          setIsPlaying(true);
                        }
                      }}
                      className="group flex-1 text-left"
                      title={t.url}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex size-6 items-center justify-center rounded-full border text-xs ${active ? "border-primary" : "border-white/30 dark:border-white/10"}`}>
                          {active ? "♪" : "▶"}
                        </span>
                        <span className={`truncate font-medium ${active ? "text-primary" : ""}`}>{t.title}</span>
                      </div>
                      <div className="text-xs opacity-70 ml-8">{t.folder.join(" / ") || "(Raiz)"}</div>
                    </button>
                  </div>
                );
              })}

              {visibleTracks.length === 0 && <div className="px-4 py-8 text-center opacity-70">Nenhuma faixa encontrada.</div>}
            </div>
          </div>

          {/* Controles do player */}
          <div className="mt-6 rounded-xl border p-4">
            <div className="mb-3 grid gap-2 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <div className="text-sm opacity-70">Reproduzindo</div>
                <div className="text-lg font-semibold truncate">{current ? current.title : "—"}</div>
                <div className="text-xs opacity-60">{current?.folder.join(" / ") || "(Raiz)"}</div>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <button className="rounded px-3 py-2 border hover:bg-black/5 dark:hover:bg-white/5" onClick={handlePrev}>◀︎ Anterior</button>
                <button className="rounded px-3 py-2 border hover:bg-black/5 dark:hover:bg-white/5" onClick={handlePlayPause}>{isPlaying ? "⏸︎ Pausar" : "▶︎ Reproduzir"}</button>
                <button className="rounded px-3 py-2 border hover:bg-black/5 dark:hover:bg-white/5" onClick={handleNext}>Próxima ▶︎</button>
              </div>
            </div>

            <audio ref={audioRef} src={current?.url} preload="metadata" />

            <div className="flex items-center gap-2">
              <span className="text-xs tabular-nums">{formatTime(progress)}</span>
              <input type="range" min={0} max={Math.max(0, duration)} value={Math.min(progress, duration)} onChange={(e) => handleSeek(Number(e.target.value))} className="w-full" />
              <span className="text-xs tabular-nums">{formatTime(duration)}</span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-70">🔊</span>
                <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => handleVolume(Number(e.target.value))} />
              </div>
              <div className="ml-auto text-xs opacity-70">
                {shuffle && <span className="mr-3">🔀 Aleatório</span>}
                {repeat && <span className="mr-3">🔁 Repetindo</span>}
                {selectedIds.size > 0 && <span>Playlist com {selectedIds.size} selecionadas</span>}
              </div>
            </div>

            {errorMsg && <p className="mt-3 text-sm text-red-500">{errorMsg}</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
