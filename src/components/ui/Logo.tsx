'use client'
import Link from "next/link";
import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes, useState } from "react";

type CombinedDivProps = MotionProps & HTMLAttributes<HTMLDivElement>;

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  const flipperProps: CombinedDivProps = {
    className: "relative w-full h-full transform-style-preserve-3d",
    animate: {
      rotateY: isHovered ? 900 : 0,
    },
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  };

  const frontSideProps: HTMLAttributes<HTMLDivElement> = {
    className: `absolute w-full h-full flex items-center justify-center rounded-full font-mont text-2xl font-bold bg-light text-dark dark:bg-dark dark:text-light backface-hidden`
  };
  const backSideProps: HTMLAttributes<HTMLDivElement> = {
    className: `absolute w-full h-full flex items-center justify-center rounded-full font-mont text-2xl font-bold bg-primary text-dark dark:bg-primaryDark dark:text-light backface-hidden rotate-y-180`
  };
  
  return (
    <div className="flex items-center justify-center mt-2">
      <Link
        href="/"
        className="w-16 h-16 block"
        aria-label="Ir para a página inicial"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div {...flipperProps}>
          <div {...frontSideProps}>FB</div>
          <div {...backSideProps}>&lt;/&gt;</div>
        </motion.div>
      </Link>
    </div>
  );
};

export default Logo;