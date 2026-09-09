import { Instrument_Serif, Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

export const InstrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const InterSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-body",
});

export { GeistSans, GeistMono };
