import Image from "next/image";
import Frame from "../ui/Frame"; // Importamos nosso novo componente!

const ProfileImage = () => {
  return (
    // Usamos o componente Frame e passamos as classes de layout para ele.
    <Frame>
      {/* O conteúdo dentro do Frame é simplesmente a imagem. */}
      <Image
        src="/images/profile/developer-pic-2.jpeg"
        alt="Felipe Bueno, Desenvolvedor"
        className="w-full h-auto rounded-2xl"
        priority
        width={750}
        height={750}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
      />
    </Frame>
  );
};

export default ProfileImage;