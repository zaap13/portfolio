// app/page.tsx (Versão CORRIGIDA e Reativa ao Tema)

import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import HireMe from "@/components/ui/HireMe";
import { LinkArrow } from "@/components/ui/Icons";

export default function Home() {
  return (
    // ALTERAÇÃO 1: A cor do texto da seção agora reage ao tema
    <section className="flex flex-col items-center text-light dark:text-dark w-full min-h-screen">
      <div className="flex items-center justify-between w-full">
        <div className="w-1/2">
          <Image
            src="/images/profile/developer-pic-1.png"
            alt="Felipe Bueno, Desenvolvedor"
            width={500}
            height={500}
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="w-1/2 flex flex-col items-center self-center">
          <AnimatedText
            text="Construindo soluções web de ponta a ponta."
            className="!text-6xl !text-left"
          />
          <p className="my-4 text-base font-medium">
            Olá, meu nome é Felipe Bueno, como desenvolvedor FullStack minha
            paixão é transformar ideias em soluções web performáticas e
            escaláveis. Estou sempre procurando maneiras de desenvolver
            soluções inovadoras e eficientes. Convido você a explorar meus{" "}
            <Link href="/projects" className="underline font-bold">
              últimos projetos
            </Link>
            , onde demonstro minha capacidade em desenvolvimento web e
            apresento soluções que desenvolvi.
          </p>
          <div className="flex items-center self-start mt-2">
            <a
              href="/Felipe Bueno - CV.pdf"
              target="_blank"
              // ALTERAÇÃO 2: O botão de CV agora reage ao tema e ao hover em ambos os temas
              className="flex items-center
                        bg-light text-dark p-2.5 px-6 rounded-lg text-xl font-bold
                        border-2 border-solid border-transparent 
                        hover:bg-dark hover:text-light 
                        dark:bg-dark dark:text-light
                        dark:hover:bg-light dark:hover:text-dark
                        dark:hover:border-dark"
              download={true}
              rel="noopener noreferrer"
            >
              CV <LinkArrow className="w-6 ml-1" />
            </a>
            {/* ALTERAÇÃO 3: O link de Contato agora reage ao tema */}
            <Link
              href="mailto:felipebueno2201@gmail.com"
              target="_blank"
              className="ml-4 text-lg font-medium capitalize text-light dark:text-dark underline"
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
      <HireMe />
    </section>
  );
}