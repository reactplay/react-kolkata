"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/custom/animated-section";

export default function ContactSection() {
  const t = useTranslations("Contact");
  const [submitted, setSubmitted] = useState(false);

  return (
    <AnimatedSection className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("title")}
          </h2>
          <p className="mt-2 text-slate-300">{t("description")}</p>

          {/* Contact Form (client-side only, no backend) */}
          <div className="mt-8">
            {submitted ? (
              <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center text-slate-200">
                <p className="text-lg font-medium">Thanks for getting in touch!</p>
                <p className="mt-2 text-sm text-slate-400">We'll get back to you soon.</p>
              </div>
            ) : (
              <form
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-6"
              >
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm text-slate-300">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-slate-200 placeholder-slate-500 ring-0 outline-none focus:border-white/20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-slate-200 placeholder-slate-500 ring-0 outline-none focus:border-white/20"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1 block text-sm text-slate-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-slate-200 placeholder-slate-500 ring-0 outline-none focus:border-white/20"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none"
                  >
                    Send
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
