"use client";

import React from "react";
import { ThemeProvider } from "next-themes";

import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="relative min-h-screen">
        {/* Decorative background gradients */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.30),rgba(37,99,235,0)_60%)] blur-3xl" />
          <div className="absolute right-[-10%] bottom-[-10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),rgba(56,189,248,0)_60%)] blur-3xl" />
        </div>
        <Navbar />
        {/* App content */}
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AppProvider;
