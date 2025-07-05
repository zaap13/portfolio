'use client'
import { motion, Variants, MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";

type AnimatedTextProps = {
  text: string;
  className?: string;
};

type CombinedH1Props = MotionProps & HTMLAttributes<HTMLHeadingElement>;
type CombinedSpanProps = MotionProps & HTMLAttributes<HTMLSpanElement>;


const quote: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: { delay: 0.5, staggerChildren: 0.08 },
  },
};

const singleWord: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

const AnimatedText = ({ text, className = "" }: AnimatedTextProps) => {

  const h1Props: CombinedH1Props = {
    className: `inline-block w-full text-light dark:text-dark font-bold capitalize text-6xl ${className}`,
    variants: quote,
    initial: "initial",
    animate: "animate",
  };

  return (
    <div className="w-full mx-auto py-2 flex items-center justify-center text-center overflow-hidden">
      <motion.h1 {...h1Props}>
        {text.split(" ").map((word, index) => {
          const spanProps: CombinedSpanProps = {
            className: "inline-block",
            variants: singleWord,
          };

          return (
            <motion.span key={word + "-" + index} {...spanProps}>
              {word}&nbsp;
            </motion.span>
          );
        })}
      </motion.h1>
    </div>
  );
};

export default AnimatedText;