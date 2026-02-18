import Image from "next/image";
import { Linkedin } from "lucide-react";

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
  <section id="core-team" className="py-10 text-center">
    <h2
      className="mb-8 text-3xl font-bold text-slate-100"
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      Core Team
    </h2>
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-5">
      {members.map((member) => (
        <a
          key={member.name}
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-transform hover:-translate-y-1 hover:cursor-pointer"
        >
          <div className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-3 shadow-lg backdrop-blur-sm hover:shadow-sky-500/10 md:p-4">
            <div className="relative">
              <Image
                src={member?.photo}
                alt={member.name}
                width={112}
                height={112}
                className="mb-2 rounded-full border-4 border-sky-400/80 object-cover shadow-lg md:mb-3"
                style={{ background: "#fff" }}
                priority={false}
              />
              <div className="absolute right-0 bottom-1 rounded-full border-2 border-white/80 bg-gradient-to-br from-blue-500 to-sky-400 p-1.5 shadow-lg">
                <Linkedin className="h-3 w-3 text-white md:h-4 md:w-4" />
              </div>
            </div>
            <span
              className="mt-1 text-sm font-semibold text-slate-100 md:mt-2 md:text-lg"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {member.name}
            </span>
          </div>
        </a>
      ))}
    </div>
  </section>
);

export default CoreTeam;
