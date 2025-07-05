import { StaticImageData } from "next/image";
import Link from "next/link";
import { GithubIcon } from "../ui/Icons";
import ImageSlider from "../ui/ImageSlider";
import ProjectFrame from "../ui/ProjectFrame";

type ProjectProps = {
  type: string;
  title: string;
  images: StaticImageData[];
  link: string;
  github: string;
};

const ProjectCard = ({ type, title, images, link, github }: ProjectProps) => {
  return (
    <ProjectFrame>
      <div className="w-full flex flex-col items-center justify-center">
        <Link href={link} target="_blank" className="w-full cursor-pointer overflow-hidden rounded-lg">
          <div className="aspect-[4/3] w-full h-full">
            <ImageSlider images={images} alt={title} />
          </div>
        </Link>

        <div className="w-full flex flex-col items-start justify-between mt-4">
          <span className="text-primary dark:text-primaryDark font-medium text-xl lg:text-lg md:text-base">{type}</span>
          <Link href={link} target="_blank" className="hover:underline underline-offset-2">
            <h2 className="my-2 w-full text-left text-3xl font-bold text-light dark:text-dark lg:text-2xl">{title}</h2>
          </Link>
          <div className="w-full mt-2 flex items-center justify-between">
            <Link href={link} target="_blank" className="text-lg font-semibold underline text-light dark:text-dark md:text-base">
              Visitar
            </Link>
            <Link href={github} target="_blank" className="w-8 md:w-6 text-light dark:text-dark">
              <GithubIcon />
            </Link>
          </div>
        </div>
      </div>
    </ProjectFrame>
  );
};

export default ProjectCard;