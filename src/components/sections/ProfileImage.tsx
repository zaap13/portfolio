import Image from "next/image";
import Frame from "../ui/Frame"; 

const ProfileImage = () => {
  return (
    <Frame>
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