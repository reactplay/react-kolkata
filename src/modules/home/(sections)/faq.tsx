"use client";

import React, { useState } from "react";

import { faqData } from "./faq-data";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-gradient-to-b from-slate-900 to-slate-800 py-20 text-white">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-10 text-center text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <div
              key={idx}
              className={
                "rounded-lg border border-slate-700 bg-slate-800/70 shadow-lg transition-all" +
                (openIndex === idx ? " ring-2 ring-sky-400/60" : "")
              }
            >
              <button
                className="group flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                onClick={() => toggleFAQ(idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <span className="text-lg font-semibold transition-colors group-hover:text-sky-400">
                  {faq.question}
                </span>
                <svg
                  className={
                    "ml-4 h-6 w-6 text-sky-400 transition-transform duration-300" +
                    (openIndex === idx ? " rotate-180" : "")
                  }
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id={`faq-panel-${idx}`}
                className={
                  "overflow-hidden px-6 transition-all duration-300" +
                  (openIndex === idx ? " max-h-40 py-2" : " max-h-0 py-0")
                }
                aria-hidden={openIndex !== idx}
              >
                <p className="text-base text-slate-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
