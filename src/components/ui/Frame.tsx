import React from "react";

type FrameProps = {
  children: React.ReactNode;
  className?: string;
};

const Frame = ({ children, className = "" }: FrameProps) => {
  return (

    <div
      className={`
        relative h-max rounded-2xl border-2 border-solid 
        border-light dark:border-dark 
        bg-dark dark:bg-light 
        p-8 ${className}
      `}
    >

      <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-light dark:bg-dark" />

      {children}
    </div>
  );
};

export default Frame;