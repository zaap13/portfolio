"use client";

import { useState, useEffect, forwardRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const FramerDiv = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return <div ref={ref} {...props} />;
});

const MotionDiv = motion(FramerDiv);


type ImageSliderProps = {
  images: StaticImageData[];
  alt: string;
  interval?: number;
};

const variants = {
  enter: { opacity: 0 },
  center: { zIndex: 1, opacity: 1 },
  exit: { zIndex: 0, opacity: 0 },
};


const ImageSlider = ({ images, alt, interval = 4000 }: ImageSliderProps) => {
  const [page, setPage] = useState(0);
  const imageIndex = page % images.length;

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
        <MotionDiv
          key={page}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.8, ease: "easeInOut" },
          }}
          className="absolute w-full h-full"
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