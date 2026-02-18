import Image from "next/image";
import { Linkedin } from "lucide-react";

import AnimatedSection from "@/components/custom/animated-section";

const members = [
  {
    name: "Arkajit Roy",
    linkedin: "https://www.linkedin.com/in/arkajitroy/",
    photo: "/images/arkajit.jpeg",
  },
  {
    name: "Tapas Adhikary",
    linkedin: "https://www.linkedin.com/in/tapasadhikary/",
    photo: "/images/tapas.jpeg",
  },
  {
    name: "Arindam Majumder",
    linkedin: "https://www.linkedin.com/in/arindam2004/",
    photo: "/images/arindam.jpeg",
  },
  {
    name: "Sulagna Ghosh",
    linkedin: "https://www.linkedin.com/in/sulagna-ghosh-7955361a7/",
    photo: "/images/sulagna.jpeg",
  },
  {
    name: "Priyankar Pal",
    linkedin: "https://www.linkedin.com/in/priyankarpal/",
    photo: "/images/priyankar.jpeg",
  },
];

const CoreTeam = () => (
  <AnimatedSection id="core-team" className="py-24 text-center">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2
        className="mb-16 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Core Team
      </h2>
      <div className="mx-auto grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-5">
        {members.map((member) => (
          <a
            key={member.name}
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full w-full transition-transform hover:-translate-y-1"
          >
            <div className="flex h-full w-full flex-col items-center rounded-xl border border-white/5 bg-white/5 p-4 shadow-lg backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10 hover:shadow-sky-500/5 md:p-6">
              <div className="relative mb-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-sky-500/20 transition-all group-hover:ring-sky-500/40 md:h-28 md:w-28">
                  <Image
                    src={member?.photo}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                    style={{ background: "#1e293b" }}
                  />
                </div>
                <div className="absolute right-0 bottom-0 rounded-full border-2 border-slate-900 bg-gradient-to-br from-blue-500 to-sky-400 p-1.5 shadow-lg">
                  <Linkedin className="h-3 w-3 text-white md:h-4 md:w-4" />
                </div>
              </div>
              <span
                className="text-sm font-semibold text-slate-100 md:text-lg"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {member.name}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default CoreTeam;
