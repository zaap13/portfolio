'use client';
import React, { useRef, useState, MouseEvent, HTMLAttributes, Ref } from "react";
import { motion, useSpring, useTransform, MotionProps } from "framer-motion";

type CombinedDivProps = MotionProps & HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> };

type FrameProps = {
  children: React.ReactNode;
  className?: string;
};

const Frame = ({ children, className = "" }: FrameProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / width;
    const y = (e.clientY - top - height / 2) / height;
    setMouseX(x);
    setMouseY(y);
  };

  const handleMouseLeave = () => {
    setMouseX(0);
    setMouseY(0);
  };

  const containerProps: CombinedDivProps = {
    ref: ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { transformStyle: "preserve-3d", perspective: "1000px" },
    className: `relative w-full rounded-2xl group ${className}`,
  };

  const auroraProps: CombinedDivProps = {
    className: "absolute -inset-4 rounded-3xl -z-10",
    style: {
      backgroundImage: `radial-gradient(circle at 20% 20%, #58E6D980, transparent 40%),
                      radial-gradient(circle at 80% 70%, #B63E9680, transparent 40%)`,
    },
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 10, 0],
      transition: { duration: 20, repeat: Infinity, repeatType: "mirror" },
    },
  };

  const glassProps: CombinedDivProps = {
    className: `h-full w-full rounded-2xl p-6 relative overflow-hidden
                bg-black/40 dark:bg-black/50 backdrop-blur-xl
                border border-white/10 shadow-inner shadow-black/20`,
    style: { rotateX, rotateY },
  };

  return (
    <motion.div {...containerProps}>
      <motion.div {...auroraProps} />
      <motion.div {...glassProps}>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Frame;