import Image from "next/image";
import { LuLinkedin } from "react-icons/lu";

import { XLogo } from "@/components/common/icons/XLogo";
import AnimatedSection from "@/components/custom/animated-section";
import { ArchitecturalCorner } from "@/components/custom/architectural-corner";

const members = [
  {
    name: "Arkajit Roy",
    role: "Design Lead",
    linkedin: "https://www.linkedin.com/in/arkajitroy/",
    twitter: "https://x.com/arkajitroy",
    photo: "/images/arkajit.jpeg",
  },
  {
    name: "Tapas Adhikary",
    role: "Community Lead",
    linkedin: "https://www.linkedin.com/in/tapasadhikary/",
    twitter: "https://x.com/tapasadhikary",
    photo: "/images/tapas.jpeg",
  },
  {
    name: "Arindam Majumder",
    role: "Developer Relations",
    linkedin: "https://www.linkedin.com/in/arindam2004/",
    twitter: "https://x.com/arindam_majumder",
    photo: "/images/arindam.jpeg",
  },
  {
    name: "Sulagna Ghosh",
    role: "Community Lead",
    linkedin: "https://www.linkedin.com/in/sulagna-ghosh-7955361a7/",
    twitter: "https://x.com/sulagna_ghosh",
    photo: "/images/sulagna.jpeg",
  },
  {
    name: "Priyankar Pal",
    role: "Open Source Maintainer",
    linkedin: "https://www.linkedin.com/in/priyankarpal/",
    twitter: "https://x.com/priyankarpal",
    photo: "/images/priyankar.jpeg",
  },
  {
    name: "Sujal Maiti",
    role: "Social Media",
    linkedin: "https://www.linkedin.com/in/sujal-maiti-a4931a190/",
    twitter: "https://x.com/sujal_maiti",
    photo: "/images/sujal.jpeg",
  },
  {
    name: "Shyam Mahanta",
    role: "Open Source Contributor",
    linkedin: "https://www.linkedin.com/in/shyam-mahanta/",
    twitter: "https://x.com/0xShyam0x",
    photo: "/images/shyam.jpg",
  },
];

const CoreTeam = () => (
  <AnimatedSection id="core-team" className="bg-[#0B1220] py-20">
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-20 text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Meet the Core Team
        </h2>
        <p className="mx-auto max-w-3xl text-xl text-slate-400">
          The passionate individuals behind React Kolkata, working together to build the best
          developer community in the city.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((member) => (
          <div
            key={member.name}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            <ArchitecturalCorner />
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
            />

            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

            {/* Info at bottom left */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-left">
              <h3 className="mb-1 text-xl font-bold text-white">{member.name}</h3>
              <p className="mb-4 text-sm text-slate-300">{member.role}</p>

              <div className="flex items-center gap-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-white/10 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  <LuLinkedin className="h-4 w-4" />
                </a>
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-white/10 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  <XLogo className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default CoreTeam;
