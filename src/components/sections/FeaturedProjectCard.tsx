import Link from "next/link";
import { StaticImageData } from "next/image";
import { GithubIcon } from "../ui/Icons";
import ImageSlider from "../ui/ImageSlider";
import Frame from "../ui/ProjectFrame";

type FeaturedProjectProps = {
  type: string;
  title: string;
  summary?: string;
  images: StaticImageData[];
  link: string;
  github: string;
};

const FeaturedProjectCard = ({ type, title, summary, images, link, github }: FeaturedProjectProps) => {
  return (
    <Frame variant="featured">
      
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8">
        <Link href={link} target="_blank" className="w-full lg:w-1/2 cursor-pointer overflow-hidden rounded-lg">
          <div className="aspect-video w-full h-full">
            <ImageSlider images={images} alt={title} />
          </div>
        </Link>

        <div className="w-full lg:w-1/2 flex flex-col items-start justify-between pl-0 lg:pl-6">
          <span className="text-primary dark:text-primaryDark font-medium text-xl xs:text-base">{type}</span>
          <Link href={link} target="_blank" className="hover:underline underline-offset-2">
            <h2 className="my-2 w-full text-left text-4xl font-bold text-light dark:text-dark sm:text-3xl">{title}</h2>
          </Link>
          {summary && <p className="my-2 font-medium text-light dark:text-dark">{summary}</p>}
          <div className="mt-2 flex items-center">
            <Link href={github} target="_blank" className="w-10 text-light dark:text-dark"> <GithubIcon /> </Link>
            <Link
              href={link}
              target="_blank"
              className="ml-4 rounded-lg p-2 px-6 text-lg font-semibold sm:px-4 sm:text-base
                        bg-light text-dark dark:bg-dark dark:text-light"
            >
              Visitar Projeto
            </Link>
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default FeaturedProjectCard;