import React from "react";

type ProjectFrameProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'featured' | 'default';
};

const ProjectFrame = ({ children, className = "", variant = 'default' }: ProjectFrameProps) => {

  
  const shadowPositionClasses = variant === 'featured'
    ? "top-0 -right-[14px] w-[101%] h-[103%] rounded-[2.1rem]" 
    : "top-0 -right-[9px] w-[101%] h-[102%] rounded-[2rem]"; 

  return (
    <div className={`relative w-full h-full group transition-transform duration-300 ease-in-out group-hover:-translate-y-2 ${className}`}>
      
      <div
        className={`absolute ${shadowPositionClasses}
                   bg-gradient-to-r from-primary via-primaryDark to-primary
                   bg-[length:200%_200%] animate-gradient-animation
                   -z-10`}
      />
      
      <div
        className="relative h-full rounded-2xl border border-solid border-light/10 dark:border-dark/10
                   bg-dark dark:bg-light p-6"
      >
        {children}
      </div>
    </div>
  );
};

export default ProjectFrame;