"use client";
import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";
import { allSkills, Skill as SkillType } from "@/data/techStackData";

type CombinedDivProps = MotionProps & HTMLAttributes<HTMLDivElement>;

const Skill = ({ name, x, y, Icon }: SkillType) => {

  const wrapperProps: CombinedDivProps = {
    className: "absolute",
    initial: { x: 0, y: 0 },
    whileInView: { x: x, y: y, transition: { duration: 1.5 } },
    viewport: { once: true },
  };

  const bubbleProps: CombinedDivProps = {
    className: `
      flex items-center justify-center rounded-full font-semibold cursor-pointer
      py-2 px-4 shadow-dark
      bg-light text-dark dark:bg-dark dark:text-light
      border border-solid border-dark/20 dark:border-light/20
    `,
    whileHover: { scale: 1.15, zIndex: 50 },
    animate: {
      y: [0, -8, 0],
    },
    transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: Math.random() * 2,
    }
  };

  return (
    <motion.div {...wrapperProps}>
      <motion.div {...bubbleProps}>
        <Icon className="text-2xl mr-2" /> 
        {name}
      </motion.div>
    </motion.div>
  );
};


const Skills = () => {
  const webSkillProps: CombinedDivProps = {
    className: `
      flex items-center justify-center rounded-full font-semibold p-8 shadow-dark cursor-pointer
      bg-light text-dark dark:bg-dark dark:text-light
      border border-solid border-dark/20 dark:border-light/20
    `,
    whileHover: { scale: 1.05 },
  };

  return (
    <>
      <h2 className="font-bold text-8xl mt-64 w-full text-center text-light dark:text-dark">
        Skills
      </h2>
      <div className="w-full h-screen relative flex items-center justify-center 
                      rounded-full bg-circularLight dark:bg-circularDark">
        <motion.div {...webSkillProps}>web</motion.div>
        {allSkills.map((skill: SkillType) => (
          <Skill key={skill.name} {...skill} />
        ))}
      </div>
    </>
  );
};

export default Skills;