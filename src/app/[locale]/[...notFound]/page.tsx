import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const NotFound = () => {
  const t = useTranslations("NotFound");

  return (
    <div className="text-foreground relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
      <Image
        src="/images/404.jpg"
        alt="404 background"
        fill
        className="absolute inset-0 object-cover"
        priority
      />
      <div className="relative z-10 mt-2 mr-10 font-sans">
        <h1 className="mr-25 text-4xl font-extralight sm:mr-40">Oops!</h1>
        <h1 className="flex justify-between px-20 text-7xl font-light tracking-tight sm:px-27 sm:text-9xl">
          <span className="ml-3 sm:ml-0">4</span>
          <span>4</span>
        </h1>
        <p className="mx-auto mb-4 max-w-md text-sm font-extralight sm:text-xl">
          Lost in space… but don't worry, we'll guide you home.
        </p>

        <Link
          href="/"
          className="text-accent-foreground hover:bg-primary/10 ml-6 inline-block rounded-full border border-white/60 bg-transparent px-6 py-3 font-sans font-light duration-100"
        >
          {t("go_to_home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
