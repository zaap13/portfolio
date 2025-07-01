"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { motion } from "framer-motion";
import Logo from "../ui/Logo";

// 1. ADICIONADO: Tipagem para as props do seu CustomLink, uma boa prática de TypeScript.
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
        className={`h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          pathName === href ? "w-full" : "w-0"
        }`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

// 2. A SOLUÇÃO PRINCIPAL: Criamos um componente que combina 'motion' e 'Link'.
//    Isso resolve o problema de tipagem do 'href' de forma definitiva.
const MotionLink = motion(Link);

const NavBar = () => {
  return (
    <header className="w-full px-32 py-8 font-medium flex items-center justify-between text-dark relative z-10">
      <nav>
        {/* Não há erros aqui, seu CustomLink já usa o Link do Next.js corretamente. */}
        <CustomLink href="/" title="Home" className="mr-4" />
        <CustomLink href="/about" title="Sobre" className="mx-4" />
        <CustomLink href="/projects" title="Projetos" className="ml-4" />
      </nav>
      
      <div className="absolute left-[50%] top-2 translate-x-[-50%]">
        <Logo />
      </div>

      <nav className="flex items-center justify-center flex-wrap">
        {/* 3. SUBSTITUÍDO: Trocamos 'motion.a' pelo nosso novo 'MotionLink'.
            Ele aceita tanto as props do Link (href, target) quanto as de animação.
        */}
        <MotionLink
          href="https://github.com/zaap13"
          target={"_blank"}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 mr-3"
          aria-label="Confira meu perfil no GitHub" // Boa prática de acessibilidade
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
        
        {/* 4. CORRIGIDO: O último ícone parecia um placeholder. 
             Removi pois ele linkava para a home em uma nova aba, o que não é ideal.
             Se for um botão de tema (light/dark) ou outro link, podemos adicioná-lo depois.
        */}
      </nav>
    </header>
  );
};

export default NavBar;