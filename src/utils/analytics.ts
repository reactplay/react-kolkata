"use client";

declare global {
  interface Window {
    gtag: (command: "event", action: string, params?: { [key: string]: any }) => void;
  }
}

export const trackGAEvent = (action: string, params?: { [key: string]: any }) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
};
