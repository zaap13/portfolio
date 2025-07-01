'use client'
import Link from "next/link";
import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";

type CombinedDivProps = MotionProps & HTMLAttributes<HTMLDivElement>;

const Logo = () => {
  const flipperProps: CombinedDivProps = {
    className: "relative w-full h-full transform-style-preserve-3d",
    whileHover: {
      rotateY: 900,
    },
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  };

  const frontSideProps: CombinedDivProps = {
    // 1. CORREÇÃO: Adicionamos de volta as classes de tamanho e peso da fonte.
    className: `
      absolute w-full h-full flex items-center justify-center rounded-full 
      font-mont text-2xl font-bold 
      bg-light text-dark 
      dark:bg-dark dark:text-light 
      backface-hidden
    `
  };

  const backSideProps: CombinedDivProps = {
    // E aqui também, para manter a consistência no verso.
    className: `
      absolute w-full h-full flex items-center justify-center rounded-full 
      font-mont text-2xl font-bold 
      bg-primary text-dark 
      dark:bg-primaryDark dark:text-light 
      backface-hidden rotate-y-180
    `
  };

  return (
    <div className="flex items-center justify-center mt-2">
      <Link href="/" className="w-16 h-16 block" aria-label="Ir para a página inicial">
        <motion.div {...flipperProps}>
          <motion.div {...frontSideProps}>
            FB
          </motion.div>
          <motion.div {...backSideProps}>
            &lt;/&gt;
          </motion.div>
        </motion.div>
      </Link>
    </div>
  );
};

export default Logo;