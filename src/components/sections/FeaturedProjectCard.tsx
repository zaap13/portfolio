import Link from "next/link";
import { StaticImageData } from "next/image";
import { GithubIcon } from "../ui/Icons";
import ImageSlider from "../ui/ImageSlider";

type FeaturedProjectProps = {
  type: string;
  title: string;
  summary: string;
  images: StaticImageData[];
  link: string;
  github: string;
};

const FeaturedProjectCard = ({ type, title, summary, images, link, github }: FeaturedProjectProps) => {
  return (
    // 1. CORREÇÃO NO CARD: Fundo, borda e cor de texto padrão agora reagem ao tema.
    <article className="w-full flex flex-col lg:flex-row items-center justify-between relative rounded-3xl
                       border border-solid border-light dark:border-dark 
                       bg-dark dark:bg-light 
                       text-light dark:text-dark
                       shadow-2xl p-12 lg:p-8 xs:p-4"
    >
      {/* 2. CORREÇÃO NA SOMBRA: A cor da sombra se inverte com o tema para manter o contraste. */}
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] rounded-br-3xl 
                     bg-light dark:bg-dark 
                     xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" 
      />
      
      <Link href={link} target="_blank" className="w-full lg:w-1/2 cursor-pointer overflow-hidden rounded-lg">
        <div className="aspect-video w-full h-full">
          <ImageSlider images={images} alt={title} />
        </div>
      </Link>

      <div className="w-full lg:w-1/2 flex flex-col items-start justify-between pl-0 lg:pl-6 pt-6 lg:pt-0">
        {/* 3. CORREÇÃO NO TIPO: Usa a cor primária correta para cada tema. */}
        <span className="text-primary dark:text-primaryDark font-medium text-xl xs:text-base">{type}</span>
        
        <Link href={link} target="_blank" className="hover:underline underline-offset-2">
          {/* Este título herda a cor do <article> principal, então não precisa de alteração. */}
          <h2 className="my-2 w-full text-left text-4xl font-bold sm:text-3xl">{title}</h2>
        </Link>
        
        {/* O resumo também herda a cor do <article>, então a classe de cor foi removida. */}
        <p className="my-2 font-medium">{summary}</p>
        
        <div className="mt-2 flex items-center">
          <Link href={github} target="_blank" className="w-10"> <GithubIcon /> </Link>
          
          {/* 4. CORREÇÃO NO BOTÃO: O botão agora é reativo ao tema. */}
          <Link 
            href={link} 
            target="_blank" 
            className="ml-4 rounded-lg p-2 px-6 text-lg font-semibold sm:px-4 sm:text-base
                      bg-light text-dark
                      dark:bg-dark dark:text-light"
          >
            Visitar Projeto
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FeaturedProjectCard;