"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { motion, useScroll, useMotionValueEvent, MotionProps, Variants } from "framer-motion";
import { HTMLAttributes, useState, AnchorHTMLAttributes } from "react";
import Logo from "../ui/Logo";
import { ThemeToggleButton } from "../theme-toggle-button";

type CombinedHeaderProps = MotionProps & HTMLAttributes<HTMLElement>;
type CombinedLinkProps = MotionProps & LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const CustomLink = ({ href, title, className = "" }: { href: string, title: string, className?: string }) => {
  const pathName = usePathname();
  return (
    <Link href={href} className={`${className} relative group text-light dark:text-dark px-2 py-1`}>
      {title}
      <span
        className={`h-full inline-block bg-primary dark:bg-primaryDark rounded-md
                    absolute left-0 top-0 -z-10
                    group-hover:w-full transition-[width] ease duration-300
                    ${pathName === href ? "w-full" : "w-0"}`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const MotionLink = motion(Link);

const NavBar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const headerVariants: Variants = {
    visible: { y: 0 },
    hidden: { y: "-100%" },
  };
  const headerProps: CombinedHeaderProps = {
    variants: headerVariants,
    animate: hidden ? "hidden" : "visible",
    transition: { duration: 0.35, ease: "easeInOut" },
    className: "w-full px-8 py-4 font-medium fixed top-0 left-0 z-50 bg-dark/80 dark:bg-light/80 backdrop-blur-sm",
  };

  const githubLinkProps: CombinedLinkProps = {
    href: "https://github.com/zaap13",
    target: "_blank",
    whileHover: { scale: 1.2, rotate: 10 },
    whileTap: { scale: 0.9 },
    className: "w-7 h-7 mr-3 text-light dark:text-dark",
    "aria-label": "Confira meu perfil no GitHub"
  };

  const linkedinLinkProps: CombinedLinkProps = {
    href: "https://www.linkedin.com/in/felipe-bueno-ferreira/",
    target: "_blank",
    whileHover: { scale: 1.2, rotate: -10 },
    whileTap: { scale: 0.9 },
    className: "w-7 h-7 mx-3 text-light dark:text-dark",
    "aria-label": "Confira meu perfil no LinkedIn"
  };

  return (
    <motion.header {...headerProps}>
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-1/3 flex justify-start">
          <nav className="flex items-center">
            <span className="text-primary dark:text-primaryDark font-mono text-lg">&lt;</span>
            <CustomLink href="/" title="Home" className="mx-2" />
            <CustomLink href="/about" title="Sobre" className="mx-2" />
            <CustomLink href="/projects" title="Projetos" className="mx-2" />
            <span className="text-primary dark:text-primaryDark font-mono text-lg">/&gt;</span>
          </nav>
        </div>
        <div className="w-1/3 flex justify-center">
          <Logo />
        </div>
        <div className="w-1/3 flex justify-end">
          <nav className="flex items-center">
            <span className="text-primary dark:text-primaryDark font-mono text-lg">[</span>
            <MotionLink {...githubLinkProps}>
              <GithubIcon />
            </MotionLink>
            <MotionLink {...linkedinLinkProps}>
              <LinkedInIcon />
            </MotionLink>
            <div className="mx-3">
              <ThemeToggleButton />
            </div>
            <span className="text-primary dark:text-primaryDark font-mono text-lg">]</span>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default NavBar;