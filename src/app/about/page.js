import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import profilePic from "../../../public/images/profile/developer-pic-2.jpeg";

const about = () => {
  return (
    <>
      <main className="flex w-full flex-col items-center justify-center">
        <Layout className="pt-16">
          <AnimatedText
            className="mb-16"
            text="Olá, eu sou o Felipe Bueno, um Desenvolvedor web FullStack"
          />
          <div className="grid w-full grid-cols-8 gap-16">
            <div className="col-span-4 flex flex-col items-start justify-start">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75">
                Biografia
              </h2>
              <p className="font-medium">
                Com uma paixão pela inovação e soluções criativas, comecei minha
                jornada no desenvolvimento de software ao estudar engenharia de
                software na Universidade Tecnológica Federal do Paraná. Lá,
                desenvolvi uma fortíssima base em programação e aprendi sobre
                teoria da computação, metodologias ágeis e diferentes paradigmas
                de programação, além de fazer parte do diretório acadêmico de
                computação como diretor de eventos externos, onde tive a
                oportunidade de organizar diversas visitas técnicas em empresas
                locais e liderar caravanas para os maiores eventos de tecnologia
                do país como Campus Party Brasil e Latinoware.
              </p>
              <p className="font-medium my-4">
                Posteriormente, decidi me dedicar ao desenvolvimento web
                fullstack na Driven Education, onde aprimorei minhas habilidades
                em JavaScript/TypeScript, React.js, Node.js e outras tecnologias
                relevantes. Durante o curso, desenvolvi um projeto que uniu
                minha paixão por programação com xadrez, o MoveMentor, uma
                plataforma de cursos de xadrez interativos. Fiquei honrado em
                receber feedbacks incríveis dos principais representantes do
                xadrez no Brasil.
              </p>
              <p className="font-medium">
                Estou ansioso para iniciar minha carreira como desenvolvedor e
                contribuir para projetos impactantes. Com minha paixão por
                tecnologia e soluções criativas, acredito que posso agregar
                muito valor a qualquer equipe que eu faça parte. Sou uma pessoa
                dedicada, sempre disposta a aprender e crescer
                profissionalmente. Convido você a visitar minha{" "}
                <Link className="underline" href="/projects">
                  página de projetos
                </Link>{" "}
                para saber mais sobre meu trabalho.
              </p>
            </div>
            <div className="col-span-4 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8">
              <Image
                src={profilePic}
                alt="Felipe Bueno"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default about;
