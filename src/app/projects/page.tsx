import type { Metadata } from "next";
import ProjectsClient from "@/components/sections/ProjectsClient";

export const metadata: Metadata = {
  title: "Projetos | Felipe Bueno",
  description: "Explore minha coleção de projetos, demonstrando minhas habilidades em desenvolvimento de software e soluções criativas.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}