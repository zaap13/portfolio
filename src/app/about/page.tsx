import type { Metadata } from "next";
import AnimatedText from "@/components/ui/AnimatedText";
import Skills from "@/components/ui/Skills";
import Biography from "@/components/sections/Biography";
import ProfileImage from "@/components/sections/ProfileImage";
import StatsColumn from "@/components/sections/StatsColumn"; // Corrigi o .tsx aqui
import { getGitHubCommits } from "@/lib/github";
import { getWakatimeHours } from "@/lib/wakatime";
import Experience from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "Sobre | Felipe Bueno",
  description: "Conheça mais sobre a minha jornada, experiência e paixão por desenvolvimento de software.",
};

export default async function AboutPage() {
  const commitCount = await getGitHubCommits();
  const codingHours = await getWakatimeHours();

  return (
    <>
      <AnimatedText
        text="Paixão, Código e Soluções Criativas"
        className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
      />

      {/* A CORREÇÃO ESTÁ AQUI:
        1. Os 'divs' agora estão na ordem visual correta para desktop.
        2. Todas as classes 'order-*' foram removidas.
      */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-8 gap-16">

        {/* COLUNA 1: BIOGRAFIA */}
        <div className="lg:col-span-3 flex flex-col items-start justify-start">
          <Biography />
        </div>

        {/* COLUNA 2: IMAGEM DE PERFIL */}
        <div className="lg:col-span-3">
          <ProfileImage />
        </div>

        {/* COLUNA 3: STATS */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center">
          <StatsColumn commitCount={commitCount} codingHours={codingHours} />
        </div>

      </div>

      <Skills />
      <Experience />
    </>
  );
}