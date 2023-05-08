import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Link from "next/link";

const about = () => {
  return (
    <>
      <main className="flex w-full flex-col items-center justify-center">
        <Layout className="pt-16">
          <AnimatedText className="mb-16" text="Olá, eu sou o Felipe Bueno, um Desenvolvedor web FullStack" />
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
                de programação, além de ter a oportunidade de fazer parte o
                diretório acadêmico de computação como diretor de eventos
                externos, onde tive a oportunidade de organizar diversas visitas
                técnicas em empresas locais e liderar caravanas para os maiores
                eventos de tecnologia do país como Campus Party Brasil e
                Latinoware.
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
                <Link className="underline" href="/projects">página de projetos</Link> para saber mais
                sobre mim e meu trabalho.
              </p>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default about;
