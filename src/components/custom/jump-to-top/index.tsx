"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuArrowUp } from "react-icons/lu";

import { cn } from "@/lib/utils";

export const JumpToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const getScrollY = () =>
    window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

  const toggleVisibility = () => {
    setIsVisible(getScrollY() > 300);
  };

  const scrollToTop = () => {
    const el = document.getElementById("top_div");
    console.log(el);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    toggleVisibility();
    document.addEventListener("scroll", toggleVisibility, { passive: true, capture: true });
    return () => {
      document.removeEventListener("scroll", toggleVisibility, { capture: true });
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className={cn(
            "fixed right-8 bottom-8 z-50 cursor-pointer",
            "flex h-12 w-12 items-center justify-center rounded-full shadow-lg",
            "bg-primary text-primary-foreground",
            "hover:bg-primary/90 transition-colors duration-200",
            "focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none"
          )}
          aria-label="Scroll to top"
        >
          <LuArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
