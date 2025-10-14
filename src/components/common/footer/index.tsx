import Image from "next/image";
import NextLink from "next/link";
import { Github, Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import { SiDiscord } from "react-icons/si";

import { Link } from "@/config/i18n/navigation";

const quickLinks = [
  { href: "https://lu.ma/reactkolkata", label: "Events", external: true },
  { href: "/contributors", label: "Contributors", external: false },
  { href: "https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs", label: "Join Us", external: true },
];

const Footer = () => {
  return (
    <footer className="border-border bg-background border-t">
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
          <p className="text-muted-foreground text-sm">
            A community for React developers in Kolkata. Meet, learn, and build together.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h3 className="text-foreground text-sm font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            {quickLinks.map((l) => (
              <li key={l.href}>
                {l.external ? (
                  <NextLink
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {l.label}
                  </NextLink>
                ) : (
                  <Link
                    href={l.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-foreground text-sm font-semibold">Contact</h3>
          <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" aria-hidden />{" "}
              <a
                href="mailto:reactkolkata@gmail.com"
                className="hover:text-foreground transition-colors"
              >
                reactkolkata@gmail.com
              </a>
            </li>
            <li className="mt-4 flex items-center gap-4">
              <a
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
                href="https://x.com/reactkolkata"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
                href="https://github.com/reactplay/react-kolkata"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
                href="https://www.linkedin.com/showcase/react-kolkata"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="youtube"
                href="https://www.youtube.com/@ReactPlayIO"
                target="_blank"
                rel="noreferrer"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Discord"
                href="https://discord.gg/VRVfn2Vss"
                target="_blank"
                rel="noreferrer"
              >
                <SiDiscord className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex max-w-7xl items-center justify-center px-4 py-6 text-xs sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} React Kolkata. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
