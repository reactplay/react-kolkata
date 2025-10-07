import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const quickLinks = [
  { href: "https://lu.ma/reactkolkata", label: "Events" },
  { href: "/contributors", label: "Contributors" },
  { href: "https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs", label: "Join Us" },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#0B1220]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-1" aria-label="React Kolkata Home">
            <div className="relative h-25 w-25">
              <Image
                alt="react kolkata brand logo"
                src="/logo.svg"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <p className="text-sm text-slate-400">
            A community for React developers in Kolkata. Meet, learn, and build together.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h3 className="text-sm font-semibold text-slate-200">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  target="_blank"
                  className="text-sm text-slate-400 hover:text-slate-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold text-slate-200">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" aria-hidden />{" "}
              <a href="mailto:reactkolkata@gmail.com" className="hover:text-slate-200">
                reactkolkata@gmail.com
              </a>
            </li>
            <li className="mt-4 flex items-center gap-4">
              <a
                className="hover:text-white"
                aria-label="Twitter"
                href="https://x.com/reactkolkata"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                className="hover:text-white"
                aria-label="GitHub"
                href="https://github.com/reactplay/react-kolkata"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                className="hover:text-white"
                aria-label="LinkedIn"
                href="https://www.linkedin.com/showcase/react-kolkata"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-6 text-xs text-slate-500 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} React Kolkata. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
