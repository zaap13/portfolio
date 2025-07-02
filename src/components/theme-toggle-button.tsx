'use client';
import { motion, Variants, MotionProps } from 'framer-motion';
import { HTMLAttributes } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from '@/components/ui/Icons';

type CombinedDivProps = MotionProps & HTMLAttributes<HTMLDivElement>;
const MotionButton = motion(Button);

const buttonVariants: Variants = {
  light: {
    backgroundColor: "#e0f2fe",
    borderColor: "#bae6fd",
    transition: { duration: 0.5 }
  },
  dark: {
    backgroundColor: "#312e81",
    borderColor: "#4338ca",
    transition: { duration: 0.5 }
  }
};

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  const sunDivProps: CombinedDivProps = {
    animate: { y: theme === 'light' ? 0 : 30, opacity: theme === 'light' ? 1 : 0 },
    transition: { duration: 0.3, ease: "easeOut" },
    className: "absolute text-orange-400"
  };

  const moonDivProps: CombinedDivProps = {
    animate: { y: theme === 'dark' ? 0 : 30, opacity: theme === 'dark' ? 1 : 0 },
    transition: { duration: 0.3, ease: "easeOut" },
    className: "absolute text-slate-200"
  };

  return (
    <MotionButton
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Alternar tema"
      variants={buttonVariants}
      animate={theme === 'dark' ? 'dark' : 'light'}
      className="relative overflow-hidden"
    >

      <motion.div {...sunDivProps}>
        <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>

      <motion.div {...moonDivProps}>
        <SunIcon className="h-[1.4rem] w-[1.4rem]" />
      </motion.div>

      <span className="sr-only">Alternar tema</span>
    </MotionButton>
  );
}