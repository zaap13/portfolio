// src/data/techStackData.ts

import { IconType } from "react-icons";
// Aqui importamos os logos das tecnologias da biblioteca react-icons
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaAws,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiStyledcomponents,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiJest,
  SiExpress,
} from "react-icons/si";

// Este é o "molde" para cada uma das suas skills
export type Skill = {
  name: string;
  Icon: IconType;
  x: string; // Posição horizontal na "constelação"
  y: string; // Posição vertical na "constelação"
};

// E aqui está a sua lista completa de skills!
export const allSkills: Skill[] = [
  { name: "HTML", Icon: FaHtml5, x: "-22vw", y: "0vw" },
  { name: "CSS", Icon: FaCss3Alt, x: "-10vw", y: "13vw" },
  { name: "Javascript", Icon: SiJavascript, x: "20vw", y: "6vw" },
  { name: "Typescript", Icon: SiTypescript, x: "0vw", y: "20vw" },
  { name: "ReactJS", Icon: FaReact, x: "-20vw", y: "-15vw" },
  { name: "NodeJS", Icon: FaNodeJs, x: "15vw", y: "-12vw" },
  { name: "NextJS", Icon: SiNextdotjs, x: "0vw", y: "-10vw" },
  { name: "Styled Components", Icon: SiStyledcomponents, x: "20vw", y: "16vw" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, x: "0vw", y: "-20vw" },
  { name: "MongoDB", Icon: SiMongodb, x: "-25vw", y: "18vw" },
  { name: "PostgreSQL", Icon: SiPostgresql, x: "-28vw", y: "8vw" },
  { name: "Express", Icon: SiExpress, x: "32vw", y: "0vw" },
  { name: "Prisma ORM", Icon: SiPrisma, x: "5vw", y: "10vw" },
  { name: "Jest", Icon: SiJest, x: "25vw", y: "-10vw" },
  { name: "Git", Icon: FaGitAlt, x: "20vw", y: "-22vw" },
  { name: "Docker", Icon: FaDocker, x: "-15vw", y: "-5vw" },
  { name: "AWS", Icon: FaAws, x: "-34vw", y: "-10vw" },
];
