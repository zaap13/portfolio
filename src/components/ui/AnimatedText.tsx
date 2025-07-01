'use client'
// 1. IMPORTAÇÃO ATUALIZADA: Trazemos o tipo 'Key' do React
import { motion, Variants, MotionProps } from "framer-motion";
import { HTMLAttributes, Key } from "react";

type AnimatedTextProps = {
  text: string;
  className?: string;
};

// Tipos combinados para resolver os problemas de tipagem
type CombinedH1Props = MotionProps & HTMLAttributes<HTMLHeadingElement>;
// 2. A CORREÇÃO FINAL: Adicionamos o tipo da 'key' à nossa união
type CombinedSpanProps = MotionProps & HTMLAttributes<HTMLSpanElement> & { key: Key };


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
          // Agora o objeto spanProps corresponde 100% ao nosso tipo
          const spanProps: CombinedSpanProps = {
            key: word + "-" + index,
            className: "inline-block",
            variants: singleWord,
          };

          return (
            <motion.span {...spanProps}>
              {word}&nbsp;
            </motion.span>
          );
        })}
      </motion.h1>
    </div>
  );
};

export default AnimatedText;