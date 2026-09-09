"use client";

import React from "react";
import { ThemeProvider } from "next-themes";

import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const origError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
      return;
    }
    origError.apply(console, args);
  };
}

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="relative min-h-screen">
        <div id="top_div" />
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-none bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.30),rgba(37,99,235,0)_60%)] blur-3xl" />
          <div className="absolute right-[-10%] bottom-[-10%] h-[30rem] w-[30rem] rounded-none bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),rgba(56,189,248,0)_60%)] blur-3xl" />
        </div>
        <Navbar />

        {children}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AppProvider;
