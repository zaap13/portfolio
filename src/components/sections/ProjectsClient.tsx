'use client'

import AnimatedText from "@/components/ui/AnimatedText";
import FeaturedProjectCard from "@/components/sections/FeaturedProjectCard";
import ProjectCard from "@/components/sections/ProjectCard";
import { motion, MotionProps, Variants } from "framer-motion";
import { HTMLAttributes } from 'react';
import { allProjects } from "@/data/projectsData";

type CombinedDivProps = MotionProps & HTMLAttributes<HTMLDivElement>;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export default function ProjectsClient() {
  const featuredProjects = allProjects.filter(project => project.isFeatured);
  const regularProjects = allProjects.filter(project => !project.isFeatured);

  const gridContainerProps: CombinedDivProps = {
    className: "grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0 mb-16",
    variants: containerVariants,
    initial: "hidden",
    animate: "visible",
  };

  return (
    <>
      <AnimatedText
        text="Imaginação Supera o Conhecimento!"
        className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
      />

      <motion.div {...gridContainerProps}>
        
        {featuredProjects.map(project => {
          const featuredCardContainerProps: CombinedDivProps = {
            className: "col-span-12",
            variants: cardVariants,
          };
          return (
            <motion.div key={project.title} {...featuredCardContainerProps}>
              <FeaturedProjectCard {...project} />
            </motion.div>
          );
        })}
        
        {regularProjects.map(project => {
          const projectCardContainerProps: CombinedDivProps = {
            className: "col-span-12 lg:col-span-6",
            variants: cardVariants,
          };
          return (
            <motion.div key={project.title} {...projectCardContainerProps}>
              <ProjectCard {...project} />
            </motion.div>
          );
        })}

      </motion.div>
    </>
  );
}