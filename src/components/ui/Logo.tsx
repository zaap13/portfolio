'use client'
import Link from "next/link";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const Logo = () => {
  return (
    <div className="flex items-center justify-center mt-2 text-dark text-xl">
      <MotionLink
        href="/"
        className="w-16 h-16 bg-dark text-light flex items-center justify-center rounded-full text-2x1 font-bold"
        whileHover={{
          scale: 1.03,
          backgroundColor: [
            "#cecece",
            "rgba(131,58,180,1)",
            "rgba(253,29,29,1)",
            "rgba(252,176,69,1)",
            "rgba(131,58,180,1)",
            "#121212",
          ],
          transition: { duration: 5, repeat: Infinity },
        }}
      >
        FB
      </MotionLink>
    </div>
  );
};

export default Logo;
