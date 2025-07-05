import { StaticImageData } from 'next/image';

import project1Img1 from "@/assets/images/projects/project-1.png"; 
import project1Img2 from "@/assets/images/projects/project-1-b.png";
import project2Img from "@/assets/images/projects/project-2.png";
import project3Img from "@/assets/images/projects/project-3.png";

export type Project = {
  isFeatured: boolean;
  type: string;
  title: string;
  summary?: string;
  images: StaticImageData[];
  link: string;
  github: string;
};

export const allProjects: Project[] = [
  {
    isFeatured: true,
    type: "Projeto em Destaque",
    title: "Plataforma de Cursos de Xadrez",
    summary: "Uma plataforma completa de aprendizado de xadrez, construída com as mais recentes tecnologias web. Oferece cursos interativos, análise de partidas com Stockfish e uma comunidade engajada para entusiastas de todos os níveis.",
    images: [project1Img1, project1Img2],
    link: "/",
    github: "/",
  },
  {
    isFeatured: false,
    type: "Template de Website",
    title: "Site de Coleção de NFT",
    images: [project2Img],
    link: "/",
    github: "/",
  },
  {
    isFeatured: false,
    type: "Website",
    title: "Fashion Studio Website",
    images: [project3Img],
    link: "/",
    github: "/",
  },
];