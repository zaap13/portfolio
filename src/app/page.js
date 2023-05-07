import Image from "next/image";
import profilePic from "../../public/images/profile/developer-pic-1.png";
import Link from "next/link";
import AnimatedText from "../components/AnimatedText";
import HireMe from "../components/HireMe";
import { LinkArrow } from "../components/Icons";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <main className="flex items-center text-dark w-full min-h-screen">
      <Layout className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="w-1/2">
            <Image src={profilePic} alt="zaap" className="w-full h-auto" />
          </div>
          <div className="w-1/2 flex flex-col items-center self-center">
            <AnimatedText
              text="Construindo soluções web de ponta a ponta."
              className="!text-left"
            />
            <p className="my-4 text-base font-medium">
              Olá, meu nome é Felipe Bueno, como desenvolvedor FullStack minha
              paixão é transformar ideias em soluções web performáticas e
              escaláveis. Estou sempre procurando maneiras de desenvolver
              soluções inovadoras e eficientes. Convido você a explorar meus
              últimos projetos, onde demonstro minha capacidade em
              desenvolvimento web e apresento soluções que desenvolvi.
            </p>
            <div className="flex items-center self-start mt-2">
              <Link
                href="/dummy.pdf"
                target="_blank"
                className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-xl font-bold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark"
                download={true}
              >
                CV <LinkArrow className="w-6 ml-1" />
              </Link>
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
      </Layout>
      <HireMe />
    </main>
  );
}
