"use client";

import { useState, useEffect, forwardRef } from "react"; // 1. Garanta que 'forwardRef' está importado.
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// 2. REINTRODUZINDO A NOSSA SOLUÇÃO PARA O PROBLEMA DE TIPAGEM
// Criamos um componente React padrão que encaminha a 'ref', resolvendo o problema de tipos.
const FramerDiv = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return <div ref={ref} {...props} />;
});

// Criamos a versão animável e corretamente tipada do nosso componente.
const MotionDiv = motion(FramerDiv);


// As props do componente continuam as mesmas.
type ImageSliderProps = {
  images: StaticImageData[];
  alt: string;
  interval?: number;
};

// As variantes para o efeito 'fade' continuam as mesmas.
const variants = {
  enter: { opacity: 0 },
  center: { zIndex: 1, opacity: 1 },
  exit: { zIndex: 0, opacity: 0 },
};


const ImageSlider = ({ images, alt, interval = 4000 }: ImageSliderProps) => {
  const [page, setPage] = useState(0);
  const imageIndex = page % images.length;

  // A lógica do carrossel automático continua a mesma.
  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prevPage) => prevPage + 1);
    }, interval);
    return () => {
      clearInterval(timer);
    };
  }, [interval]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <AnimatePresence initial={false}>
        {/* 3. USANDO O NOSSO COMPONENTE CORRIGIDO 'MotionDiv' */}
        {/* Em vez de 'motion.div', usamos nosso componente que o TypeScript entende. */}
        <MotionDiv
          key={page}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.8, ease: "easeInOut" },
          }}
          className="absolute w-full h-full" // Esta linha agora funciona sem erros.
        >
          <Image 
            src={images[imageIndex]} 
            alt={alt} 
            fill
            className="object-cover"
            priority={page === 0}
          />
        </MotionDiv>
      </AnimatePresence>
    </div>
  );
};

export default ImageSlider;