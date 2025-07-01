// SEU ARQUIVO NavBar.tsx ATUALIZADO

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { motion } from "framer-motion";
import Logo from "../ui/Logo";
import { ThemeToggleButton } from "../theme-toggle-button";

// ===== ALTERAÇÃO 1: Importamos o nosso novo botão de tema =====


type CustomLinkProps = {
  href: string;
  title: string;
  className?: string;
};

const CustomLink = ({ href, title, className = "" }: CustomLinkProps) => {
  const pathName = usePathname();

  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`
          h-[1px] inline-block absolute left-0 -bottom-0.5 
          group-hover:w-full transition-[width] ease duration-300
          ${pathName === href ? "w-full" : "w-0"}
          
          // ===== ALTERAÇÃO 2: A cor da linha agora reage ao tema =====
          // No tema claro, o fundo é 'light' (#1b1b1b). No escuro, é 'dark' (#f5f5f5).
          bg-light dark:bg-dark
        `}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const MotionLink = motion(Link);

const NavBar = () => {
  return (
    // ===== ALTERAÇÃO 3: O texto do header agora reage ao tema =====
    // No tema claro, o texto é 'light' (#1b1b1b). No escuro, é 'dark' (#f5f5f5).
    <header className="w-full px-32 py-8 font-medium flex items-center justify-between text-light dark:text-dark relative z-10">

      {/* Seus links de navegação à esquerda */}
      <nav>
        <CustomLink href="/" title="Home" className="mr-4" />
        <CustomLink href="/about" title="Sobre" className="mx-4" />
        <CustomLink href="/projects" title="Projetos" className="ml-4" />
      </nav>

      {/* Seu logo no centro */}
      <div className="absolute left-[50%] top-2 translate-x-[-50%]">
        <Logo />
      </div>

      {/* Seus ícones de ação à direita */}
      <nav className="flex items-center justify-center flex-wrap">
        <MotionLink
          href="https://github.com/zaap13"
          target={"_blank"}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 mr-3"
          aria-label="Confira meu perfil no GitHub"
        >
          <GithubIcon />
        </MotionLink>
        <MotionLink
          href="https://www.linkedin.com/in/felipe-bueno-ferreira/"
          target={"_blank"}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 mx-3"
          aria-label="Confira meu perfil no LinkedIn"
        >
          <LinkedInIcon />
        </MotionLink>

        {/* ===== ALTERAÇÃO 4: Adicionamos o botão de tema aqui! ===== */}
        <div className="ml-3">
          <ThemeToggleButton />
        </div>

      </nav>
    </header>
  );
};

export default NavBar;