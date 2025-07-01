import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import HireMe from "@/components/ui/HireMe";
import { LinkArrow } from "@/components/ui/Icons";
// 1. REMOVIDO: A importação do 'Layout' não é mais necessária.
// import Layout from "@/components/Layout";

export default function Home() {
  return (
    // 2. CORRIGIDO: A tag <main> foi trocada por uma <section> ou <div>.
    //    Não devemos ter uma <main> dentro da outra (a principal já está no app/layout.tsx).
    //    Uma <section> é semanticamente perfeita para o bloco de "herói".
    <section className="flex flex-col items-center text-dark w-full min-h-screen">

      {/* O antigo <Layout> foi removido. O padding (p-32) já é aplicado pela <main> em app/layout.tsx */}
      <div className="flex items-center justify-between w-full">
        <div className="w-1/2">
          {/* 3. CORRIGIDO: Imagens na pasta 'public' são referenciadas com uma string
              iniciando com '/', como se fosse uma URL. Não se deve importar o arquivo.
          */}
          <Image
            src="/images/profile/developer-pic-1.png"
            alt="Felipe Bueno, Desenvolvedor"
            width={500}
            height={500}
            className="w-full h-auto"
            priority // Adicionado: Ajuda a carregar a imagem principal mais rápido
          />
        </div>
        <div className="w-1/2 flex flex-col items-center self-center">
          <AnimatedText
            text="Construindo soluções web de ponta a ponta."
            className="!text-6xl !text-left" // Aumentei um pouco o texto para mais impacto
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
            {/* 4. AJUSTE: Para downloads, usar uma tag <a> padrão é mais confiável. */}
            <a
              href="/Felipe Bueno - CV.pdf"
              target="_blank"
              className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-xl font-bold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark"
              download={true}
              rel="noopener noreferrer" // Boa prática de segurança para target="_blank"
            >
              CV <LinkArrow className="w-6 ml-1" />
            </a>
            <Link
              href="mailto:felipebueno2201@gmail.com"
              target="_blank"
              className="ml-4 text-lg font-medium capitalize text-dark underline"
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