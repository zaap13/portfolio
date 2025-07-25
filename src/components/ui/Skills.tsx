"use client";
import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";

type SkillProps = {
  name: string;
  x: string;
  y: string;
};

type CombinedDivProps = MotionProps & HTMLAttributes<HTMLDivElement>;

const Skill = ({ name, x, y }: SkillProps) => {

  const skillDivProps: CombinedDivProps = {
    className: `
      flex items-center justify-center rounded-full font-semibold cursor-pointer absolute
      py-3 px-6 shadow-dark
      bg-light text-dark
      dark:bg-dark dark:text-light
      hover:bg-dark hover:text-light
      dark:hover:bg-light dark:hover:text-dark
    `,
    whileHover: { scale: 1.05 },
    initial: { x: 0, y: 0 },
    whileInView: { x: x, y: y },
    transition: { duration: 1.5 },
    viewport: { once: true },
  };

  return <motion.div {...skillDivProps}>{name}</motion.div>;
};

const Skills = () => {
  const webSkillProps: CombinedDivProps = {
    className: `
      flex items-center justify-center rounded-full font-semibold p-8 shadow-dark cursor-pointer
      bg-light text-dark
      dark:bg-dark dark:text-light
      hover:bg-dark hover:text-light
      dark:hover:bg-light dark:hover:text-dark
    `,
    whileHover: { scale: 1.05 },
  };

  return (
    <>
      <h2 className="font-bold text-8xl mt-32 w-full text-center text-light dark:text-dark">
        Skills
      </h2>

      <div className="w-full h-screen relative flex items-center justify-center rounded-full dark:bg-circularLight">

        <motion.div {...webSkillProps}>web</motion.div>

        <Skill name="HTML" x="-22vw" y="0vw" />
        <Skill name="CSS" x="-10vw" y="13vw" />
        <Skill name="Javascript" x="20vw" y="6vw" />
        <Skill name="Typescript" x="-0vw" y="20vw" />
        <Skill name="ReactJS" x="-20vw" y="-15vw" />
        <Skill name="NodeJS" x="15vw" y="-12vw" />
        <Skill name="NextJS" x="0vw" y="-10vw" />
        <Skill name="Styled Components" x="20vw" y="16vw" />
        <Skill name="Tailwind CSS" x="0vw" y="-20vw" />
        <Skill name="MongoDB" x="-25vw" y="18vw" />
        <Skill name="PostgreSQL" x="-28vw" y="8vw" />
        <Skill name="Express" x="32vw" y="0vw" />
        <Skill name="Prisma ORM" x="5vw" y="10vw" />
        <Skill name="Jest" x="25vw" y="-10vw" />
        <Skill name="Git" x="20vw" y="-22vw" />
        <Skill name="Docker" x="-15vw" y="-5vw" />
        <Skill name="AWS" x="-34vw" y="-10vw" />
      </div>
    </>
  );
};

export default Skills;