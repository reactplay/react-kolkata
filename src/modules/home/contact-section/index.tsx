"use client";

import AnimatedSection from "@/components/custom/animated-section";

export default function ContactSection() {
  return (
    <AnimatedSection className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Get in touch
          </h2>
          <p className="mt-2 text-slate-300">
            Questions, suggestions, or collaboration ideas? We&apos;d love to hear from you.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
