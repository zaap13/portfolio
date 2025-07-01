import type { Metadata } from "next";
import AnimatedText from "@/components/ui/AnimatedText";
import Skills from "@/components/ui/Skills";
import Biography from "@/components/sections/Biography";
import ProfileImage from "@/components/sections/ProfileImage";
import ExperienceStats from "@/components/sections/ExperienceStats";

export const metadata: Metadata = {
  title: "Sobre | Felipe Bueno",
  description: "Conheça mais sobre a minha jornada, experiência e paixão por desenvolvimento de software.",
};

export default function AboutPage() {
  return (
    <>
      <AnimatedText
        text="Paixão, Código e Soluções Criativas"
        className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
      />
      
      {/* --- O NOVO GRID DE 3 COLUNAS PARA DESKTOP ---
        - `lg:grid-cols-8`: Em telas grandes (large), ativamos o grid de 8 colunas.
        - Por padrão (mobile), os itens vão empilhar naturalmente.
      */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-8 gap-16">
        
        {/* COLUNA 1: BIOGRAFIA (Ocupa 3/8 do espaço em telas grandes) */}
        <div className="lg:col-span-3 flex flex-col items-start justify-start order-2 lg:order-1">
          <Biography />
        </div>

        {/* COLUNA 2: IMAGEM (Ocupa 3/8 do espaço no centro em telas grandes) */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <ProfileImage />
        </div>

        {/* COLUNA 3: NÚMEROS (Ocupa 2/8 do espaço em telas grandes) */}
        <div className="lg:col-span-2 flex flex-col items-end justify-between order-3">
          <ExperienceStats />
        </div>

      </div>

      {/* A seção de Skills continua abaixo do grid principal */}
      <Skills />
    </>
  );
}