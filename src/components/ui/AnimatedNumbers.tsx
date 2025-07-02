"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

type AnimatedNumbersProps = {
  value: number;
};

const AnimatedNumbers = ({ value }: AnimatedNumbersProps) => {
  // Mantemos o tipo HTMLElement, que é o correto para o nosso uso.
  const ref = useRef<HTMLElement>(null);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  
  // A SOLUÇÃO FINAL: Usamos 'as any' para forçar o TypeScript a aceitar a ref.
  // É a nossa "marretada" para resolver a teimosia do compilador.
  const isInView = useInView(ref as any, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    });
  }, [springValue, value]);

  return <span ref={ref}></span>;
};

export default AnimatedNumbers;