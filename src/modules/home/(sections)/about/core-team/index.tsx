import React from "react";
import { Linkedin } from "lucide-react";

const members = [
  {
    name: "Arkajit Roy",
    linkedin: "https://www.linkedin.com/in/arkajitroy/",
    photo:
      "https://media.licdn.com/dms/image/v2/D5603AQF9I3abVywIIA/profile-displayphoto-scale_400_400/B56Zn9TWjDI8Ak-/0/1760891333998?e=1762992000&v=beta&t=D42gckg1POIk7yGCVHCETMABwNhxfgsXdH3t33aGPg0",
  },
  {
    name: "Tapas Adhikary",
    linkedin: "https://www.linkedin.com/in/tapasadhikary/",
    photo:
      "https://media.licdn.com/dms/image/v2/D5603AQFJaklkV5Q8fg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1723084600181?e=1762992000&v=beta&t=N_1PwpjEGdOYiW5VEEcg-u00k1z0SVq-qGRrmkifS2k",
  },
  {
    name: "Arindam Majumder",
    linkedin: "https://www.linkedin.com/in/arindam2004/",
    photo:
      "https://media.licdn.com/dms/image/v2/D4D03AQHdiWc3N_8NwQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1672588040569?e=1762992000&v=beta&t=DoFgqqU8WrTuIGsR5MeNc60Zp4OMReDpryimB_WNzzU",
  },
  {
    name: "Sulagna Ghosh",
    linkedin: "https://www.linkedin.com/in/sulagna-ghosh-7955361a7/",
    photo:
      "https://media.licdn.com/dms/image/v2/D4E03AQEd3fPzKnALwA/profile-displayphoto-shrink_400_400/B4EZY9W.UcG0Ak-/0/1744786156105?e=1762992000&v=beta&t=mOM4D_4Uju4lCkyr_HwmciM0Umc6G-o7eYizbIAujM0",
  },
  {
    name: "Priyankar Pal",
    linkedin: "https://www.linkedin.com/in/priyankarpal/",
    photo:
      "https://media.licdn.com/dms/image/v2/D5603AQH_Ws_vDJhGqQ/profile-displayphoto-shrink_400_400/B56ZXrJBzBHoAk-/0/1743406768671?e=1762992000&v=beta&t=y3KRNF18OtRwOY5GfgJtnjVYtzicSOMgiQxcMlTsdd4",
  },
];

const CoreTeam = () => (
  <section className="py-10 text-center">
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
          className="block transition-transform hover:-translate-y-1"
        >
          <div className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-3 shadow-lg backdrop-blur-sm hover:shadow-sky-500/10 md:p-4">
            <div className="relative">
              <img
                src={member.photo}
                alt={member.name}
                className="mb-2 h-20 w-20 rounded-full border-4 border-sky-400/80 object-cover shadow-lg md:mb-3 md:h-28 md:w-28"
                style={{ background: "#fff" }}
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
