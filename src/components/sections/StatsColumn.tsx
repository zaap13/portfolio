"use client";

import { GithubIcon } from "../ui/Icons";
import { SiWakatime } from "react-icons/si";
import AnimatedNumbers from "../ui/AnimatedNumbers";
// 1. IMPORTAÇÕES NECESSÁRIAS: Adicionamos useState, useEffect e ReactNode
import { useState, useEffect, ReactNode } from "react";

type StatsColumnProps = {
  commitCount: number;
  codingHours: number;
};

const Stat = ({ icon, value, label, suffix }: { icon: React.ReactNode, value: number, label: string, suffix?: string }) => (
  <div className="text-right">
    <div className="flex items-center justify-end gap-2">
      <span className="text-3xl font-bold text-light dark:text-dark">
        <AnimatedNumbers value={value} />
        {suffix}
      </span>
      <span className="text-primary dark:text-primaryDark">{icon}</span>
    </div>
    <p className="text-sm font-medium uppercase text-light/75 dark:text-dark/75">{label}</p>
  </div>
);

export default function StatsColumn({ commitCount, codingHours }: StatsColumnProps) {
  // 2. ESTADO: Criamos um estado para guardar nossos bloquinhos.
  //    Ele começa como um array vazio.
  const [squares, setSquares] = useState<ReactNode[]>([]);

  // 3. O EFEITO: Esta lógica agora roda APENAS no navegador,
  //    depois que a página já carregou, evitando o erro de hidratação.
  useEffect(() => {
    // A sua função original de renderização foi movida para aqui dentro.
    const generateSquares = () => {
      return Array.from({ length: 15 * 18 }).map((_, i) => {
        const randomValue = Math.random();
        let opacity = 0.15;
        if (randomValue > 0.9) {
          opacity = 0.8;
        } else if (randomValue > 0.75) {
          opacity = 0.6;
        } else if (randomValue > 0.5) {
          opacity = 0.4;
        }

        return (
          <div
            key={i}
            className={`
              w-3 h-3 rounded-sm
              bg-slate-900 dark:bg-white
              transition-colors duration-500 ease-out
              group-hover:bg-primary dark:group-hover:bg-primaryDark
            `}
            style={{ opacity: opacity }}
          />
        );
      });
    };

    // Geramos os quadrados e os salvamos no estado.
    setSquares(generateSquares());
    
  }, []); // O array vazio [] garante que isso só aconteça uma vez.

  return (
    <div className="flex flex-col items-end gap-12 group">
      <div className="relative w-full [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
        {/* Adicionamos uma altura mínima para evitar que o layout "pule" */}
        <div className="w-full grid grid-cols-15 gap-1 min-h-[300px]">
          {/* 4. RENDERIZAÇÃO: Renderizamos os bloquinhos a partir do nosso estado. */}
          {squares}
        </div>
      </div>
      <div className="flex flex-col items-end gap-8">
        <Stat
          icon={<GithubIcon />}
          value={commitCount}
          label="Commits no GitHub"
          suffix="+"
        />
        <Stat
          icon={<SiWakatime />}
          value={codingHours}
          label="Horas no Wakatime"
          suffix="h"
        />
      </div>
    </div>
  );
}