"use client";

import { GithubIcon } from "../ui/Icons";
import { SiWakatime } from "react-icons/si";
import AnimatedNumbers from "../ui/AnimatedNumbers";
import { useMemo } from "react";

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
  const squares = useMemo(() => {
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
          className="w-3 h-3 rounded-sm bg-slate-900 dark:bg-white"
          style={{ opacity: opacity }}
        />
      );
    });
  }, []);

  return (
    <div className="flex flex-col items-end gap-12">
      <div className="relative w-full [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]">
        <div className="w-full grid grid-cols-15 gap-1">
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