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
    <article className="w-full flex flex-col lg:flex-row items-center justify-between relative rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 lg:p-8 xs:p-4">
      {/* Moldura */}
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" />
      
      {/* Container da Imagem (Esquerda no Desktop) */}
      <Link
        href={link}
        target="_blank"
        className="w-full lg:w-1/2 cursor-pointer overflow-hidden rounded-lg"
      >
        {/* Forçamos uma proporção de vídeo para a imagem, que é ótima para previews */}
        <div className="aspect-video w-full h-full">
            <ImageSlider images={images} alt={title} />
        </div>
      </Link>

      {/* Container do Texto (Direita no Desktop) */}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-between pl-0 lg:pl-6 pt-6 lg:pt-0">
        <span className="text-primary font-medium text-xl xs:text-base">{type}</span>
        <Link href={link} target="_blank" className="hover:underline underline-offset-2">
          <h2 className="my-2 w-full text-left text-4xl font-bold sm:text-3xl">{title}</h2>
        </Link>
        <p className="my-2 font-medium text-dark">{summary}</p>
        <div className="mt-2 flex items-center">
          <Link href={github} target="_blank" className="w-10"> <GithubIcon /> </Link>
          <Link href={link} target="_blank" className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold sm:px-4 sm:text-base">
            Visitar Projeto
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FeaturedProjectCard;