"use client";

import { useState } from "react";

export default function PasswordGate() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const r = await fetch("/api/player-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "same-origin", // opcional, default já é same-origin
      body: JSON.stringify({ password }),
    });

    if (r.ok) {
      // o endpoint já faz redirect 303 para /player com cookie setado
      // mas alguns navegadores não seguem redirect de fetch
      // então forçamos a navegação:
      window.location.href = "/kjkszpj";
      return;
    }

    const j = await r.json().catch(() => ({}));
    setError(j?.error || "Erro de autenticação");
  }

  return (
    <main className="min-h-svh flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl border p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Área restrita</h1>
        <label className="text-sm block mb-2">Senha:</label>
        <div className="flex gap-2">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 rounded border px-3 py-2"
            placeholder="Digite a senha"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="rounded border px-3 py-2"
            title={show ? "Ocultar" : "Mostrar"}
          >
            {show ? "🙈" : "👁️"}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <button type="submit" className="mt-4 w-full rounded bg-black/80 text-white py-2 hover:bg-black">
          Entrar
        </button>
      </form>
    </main>
  );
}
