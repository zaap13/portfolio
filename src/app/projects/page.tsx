import type { Metadata } from "next";
import AnimatedText from "@/components/ui/AnimatedText";
import FeaturedProjectCard from "@/components/sections/FeaturedProjectCard";
import ProjectCard from "@/components/sections/ProjectCard";

// Importe suas imagens...
import project1Img1 from "@/assets/images/projects/project-1.png"; 
import project1Img2 from "@/assets/images/projects/project-1-b.png";
import project2Img from "@/assets/images/projects/project-2.png";
import project3Img from "@/assets/images/projects/project-3.png";

export const metadata: Metadata = {
  title: "Projetos | Felipe Bueno",
  description: "Explore minha coleção de projetos, demonstrando minhas habilidades em desenvolvimento de software e soluções criativas.",
};

// Seus dados de projeto...
const featuredProject = { type: "Projeto em Destaque", title: "Plataforma de Cursos de Xadrez", summary: "Uma plataforma completa...", images: [project1Img1, project1Img2], link: "/", github: "/" };
const projects = [
  { type: "Template de Website", title: "Site de Coleção de NFT", images: [project2Img], link: "/", github: "/" },
  { type: "Website", title: "Fashion Studio Website", images: [project3Img], link: "/", github: "/" },
];

export default function ProjectsPage() {
  return (
    <>
      <AnimatedText
        text="Imaginação Supera o Conhecimento!"
        className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
      />

      {/* O grid pai continua com 12 colunas para máxima flexibilidade */}
      <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
        
        {/* --- PROJETO EM DESTAQUE ---
            - `col-span-12`: Ocupa a largura total em TODAS as telas.
        */}
        <div className="col-span-12">
          <FeaturedProjectCard {...featuredProject} />
        </div>

        {/* --- PROJETOS NORMAIS ---
            Mapeamos os projetos e cada um ganha um container que:
            - `col-span-12`: Ocupa a largura total por padrão (mobile).
            - `lg:col-span-6`: Ocupa METADE da largura em telas grandes, fazendo com que fiquem lado a lado.
        */}
        {projects.map((project, index) => (
          <div key={index} className="col-span-12 lg:col-span-6">
            <ProjectCard {...project} />
          </div>
        ))}

      </div>
    </>
  );
}