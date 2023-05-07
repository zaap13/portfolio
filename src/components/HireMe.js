'use client'
import { CircularText, Wpp } from "./Icons";
import Link from "next/link";

const HireMe = () => {
  return (
    <div className="fixed left-4 bottom-4 flex items-center justify-center overflow-hidden">
      <div className="w-48 h-auto flex items-center justify-center relative">
        <CircularText className="fill-dark animate-spin-slow" />
        <Link
          href="https://wa.me/5543984930900"
          target="_blank"
          className="flex items-center justify-center absolute left-1/2 top-1/4 -translate-x-1/2"
        >
          <Wpp />
        </Link>
      </div>
    </div>
  );
};

export default HireMe;
