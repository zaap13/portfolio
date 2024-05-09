import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import profilePic from "../../../public/images/profile/developer-pic-2.jpeg";
import Skills from "@/components/Skills";

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
            <div className="col-span-4 flex flex-col items-start justify-start text-dark">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75">
                Biografia
              </h2>
              <p className="font-medium">
                Com uma paixão pela inovação e soluções criativas, iniciei minha
                jornada no desenvolvimento de software enquanto cursava
                Engenharia de Software na Universidade Tecnológica Federal do
                Paraná. Durante esse período, desenvolvi uma sólida base em
                programação, explorei a teoria da computação e adquiri
                conhecimento em metodologias ágeis e diversos paradigmas de
                programação. Também exerci a função de diretor de eventos
                externos no diretório acadêmico de computação, liderando a
                organização de visitas técnicas em empresas locais e conduzindo
                caravanas para os principais eventos de tecnologia do país, como
                a Campus Party Brasil e a Latinoware.
              </p>
              <p className="font-medium my-4">
                Posteriormente, concentrei meus esforços no aprimoramento das
                minhas habilidades em desenvolvimento web fullstack na Driven
                Education. Durante este período intensivo, adquiri proficiência
                em JavaScript/TypeScript, React.js, Node.js e outras tecnologias
                relevantes para o mercado atual. Foi durante este período que
                tive a oportunidade de fundir minha paixão pela programação com
                o xadrez, resultando no desenvolvimento do MoveMentor, uma
                plataforma de cursos de xadrez interativos.
              </p>
              <p className="font-medium my-4">
                Essa experiência abriu portas para minha colaboração no projeto
                do aplicativo de ensino de xadrez XB PRO, em parceria com o
                renomado canal de xadrez brasileiro Xadrez Brasil. Sob a
                orientação de Rafael Leite, idealizador do projeto, assumi a
                responsabilidade integral pelo desenvolvimento da plataforma,
                desde a fase de implementação até a entrega final. Minha
                dedicação resultou em um aplicativo funcional e de sucesso, que
                continua a receber feedbacks extremamente positivos e se mantém
                ativo até hoje.
              </p>
              <p className="font-medium">
                Estou ansioso para avançar em minha carreira como desenvolvedor,
                aplicando minha paixão pela tecnologia e habilidades criativas
                para contribuir com projetos de impacto. Sou um profissional
                dedicado, sempre em busca de aprendizado e crescimento. Convido
                você a explorar minha{" "}
                <Link className="underline" href="/projects">
                  página de projetos
                </Link>{" "}
                para conhecer mais sobre meu trabalho e experiências recentes.
              </p>
            </div>
            <div className="col-span-4 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8">
              <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark" />
              <Image
                src={profilePic}
                alt="Felipe Bueno"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
          <Skills />
        </Layout>
      </main>
    </>
  );
};

export default about;
