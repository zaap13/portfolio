import { StaticImageData } from "next/image";
import Link from "next/link";
import { GithubIcon } from "../ui/Icons";
import ImageSlider from "../ui/ImageSlider";

type ProjectProps = {
  type: string;
  title: string;
  images: StaticImageData[];
  link: string;
  github: string;
};

const ProjectCard = ({ type, title, images, link, github }: ProjectProps) => {
  return (
    <article className="w-full flex flex-col items-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 relative">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]" />
      
      <Link
        href={link}
        target="_blank"
        className="w-full cursor-pointer overflow-hidden rounded-lg"
      >
        {/* A mesma proporção de vídeo para manter a consistência visual */}
        <div className="aspect-video w-full h-full">
            <ImageSlider images={images} alt={title} />
        </div>
      </Link>
      
      <div className="w-full flex flex-col items-start justify-between mt-4">
        <span className="text-primary font-medium text-xl lg:text-lg md:text-base">{type}</span>
        <Link href={link} target="_blank" className="hover:underline underline-offset-2">
          <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl">{title}</h2>
        </Link>
        <div className="w-full mt-2 flex items-center justify-between">
          <Link href={link} target="_blank" className="text-lg font-semibold underline md:text-base">
            Visitar
          </Link>
          <Link href={github} target="_blank" className="w-8 md:w-6">
            <GithubIcon />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;