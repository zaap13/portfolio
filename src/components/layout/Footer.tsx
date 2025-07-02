import Link from "next/link";

const Footer = () => {
  return (
    // A tag <footer> tem a borda superior e ocupa 100% da largura
    <footer className="w-full border-t-2 border-solid border-light dark:border-dark font-medium text-lg text-light dark:text-dark sm:text-base">
      
      {/*
        A "CAIXA" CENTRALIZADORA:
        Usamos as mesmas classes para garantir o alinhamento com o NavBar e o conteúdo.
      */}
      <div className="w-full max-w-7xl mx-auto px-8 py-8 flex items-center justify-between lg:flex-col lg:py-6">
        <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
        
        <div className="flex items-center lg:py-2">
          Feito com <span className="text-primary dark:text-primaryDark text-2xl px-1">&#9825;</span> {/* Coração */}
          por&nbsp;
          <Link href="https://github.com/zaap13" target="_blank" className="underline underline-offset-2">
             Felipe Bueno
          </Link>
        </div>

        <Link href="https://www.linkedin.com/in/felipe-bueno-ferreira/" target="_blank" className="underline underline-offset-2">
          Diga Olá
        </Link>
      </div>
    </footer>
  );
};

export default Footer;