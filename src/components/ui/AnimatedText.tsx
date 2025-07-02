'use client'
import { motion, Variants, MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";

type AnimatedTextProps = {
  text: string;
  className?: string;
};

// Tipos combinados para resolver os problemas de tipagem
type CombinedH1Props = MotionProps & HTMLAttributes<HTMLHeadingElement>;
// 1. CORREÇÃO: Removemos a necessidade da 'key' deste tipo, pois ela será passada diretamente.
type CombinedSpanProps = MotionProps & HTMLAttributes<HTMLSpanElement>;


// Variantes de animação
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
          // 2. CORREÇÃO: A 'key' não está mais dentro deste objeto.
          const spanProps: CombinedSpanProps = {
            className: "inline-block",
            variants: singleWord,
          };

          return (
            // 3. CORREÇÃO: A 'key' é passada diretamente para o componente, antes do spread.
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