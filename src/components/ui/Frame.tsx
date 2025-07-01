import React from "react";

// Tipagem para as props do nosso Frame.
// 'children' é o conteúdo que ficará dentro da moldura.
// 'className' permite adicionar classes extras de fora (para layout, etc.).
type FrameProps = {
  children: React.ReactNode;
  className?: string;
};

const Frame = ({ children, className = "" }: FrameProps) => {
  return (
    // O container principal que recebe as classes de layout (ex: col-span-4).
    // A classe 'relative' é essencial para o efeito funcionar.
    <div
      className={`relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 ${className}`}
    >
      {/* Esta é a div que cria o efeito de "sombra" ou "fundo" da moldura. */}
      <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark" />
      
      {/* Aqui renderizamos o conteúdo que for passado para o componente. */}
      {children}
    </div>
  );
};

export default Frame;