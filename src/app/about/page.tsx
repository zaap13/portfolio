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
      
      
      <div className="grid w-full grid-cols-1 lg:grid-cols-8 gap-16">
        
        <div className="lg:col-span-3 flex flex-col items-start justify-start order-2 lg:order-1">
          <Biography />
        </div>

        <div className="lg:col-span-3 order-1 lg:order-2">
          <ProfileImage />
        </div>

        <div className="lg:col-span-2 flex flex-col items-end justify-between order-3">
          <ExperienceStats />
        </div>

      </div>

      <Skills />
    </>
  );
}