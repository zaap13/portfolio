"use client";

import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import { useRef, type RefObject } from "react";
import {
  type ExperienceDetails,
  professionalExperience,
  academicExperience,
} from "@/data/experienceData";

// --- Sub-componente para o "Nó" da Timeline ---
const TimelineNode = ({ reference }: { reference: RefObject<HTMLLIElement> }) => {
  const { scrollYProgress } = useScroll({
    target: reference as any,
    offset: ["center end", "center center"],
  });

  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 1]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.figure
      className="absolute left-0 stroke-dark dark:stroke-light"
      style={{ scale: scaleValue, opacity: opacityValue } as MotionStyle}
    >
      <svg
        className="-rotate-90 md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px]"
        width="75"
        height="75"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="20"
          className="stroke-primary dark:stroke-primaryDark stroke-2 fill-none"
        />
        <circle
          cx="50"
          cy="50"
          r="10"
          className="fill-primary dark:fill-primaryDark animate-pulse"
        />
      </svg>
    </motion.figure>
  );
};

// --- Sub-componente para os Detalhes de cada Experiência ---
const Details = ({
  position,
  company,
  companyLink,
  time,
  address,
  work,
}: ExperienceDetails) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <TimelineNode reference={ref} />

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        viewport={{ once: true }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}&nbsp;
          <a
            href={companyLink}
            target="_blank"
            rel="noreferrer"
            className="text-primary dark:text-primaryDark"
          >
            @{company}
          </a>
        </h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full md:text-sm">{work}</p>
      </motion.div>
    </li>
  );
};

// --- Componente Principal ---
const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref as any,
    offset: ["start end", "end end"],
  });

  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center text-light dark:text-dark md:text-6xl xs:text-4xl md:mb-16">
        Experiência
      </h2>

      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress } as MotionStyle}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark dark:bg-primaryDark origin-top md:w-[2px] md:left-[30px] xs:left-[20px]"
        />

        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          {professionalExperience.map((exp, index) => (
            <Details key={index} {...exp} />
          ))}

          <h2 className="font-bold text-6xl my-16 w-full text-center text-light dark:text-dark md:text-4xl xs:text-3xl">
            Formação
          </h2>

          {academicExperience.map((exp, index) => (
            <Details key={index} {...exp} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Experience;
