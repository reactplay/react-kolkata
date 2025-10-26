"use client";

import React from "react";
import { HandshakeIcon } from "lucide-react";

interface PartnerButtonProps {
  link: string;
}

const PartnerButton: React.FC<PartnerButtonProps> = ({ link }) => {
  return (
    <button
      onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
      className="group relative flex items-center justify-center gap-2 rounded-lg border border-transparent bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-5 py-2.5 font-medium text-white transition-all duration-300 hover:border-indigo-500/60 hover:shadow-[0_0_10px_rgba(99,102,241,0.4)]"
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      <span>Become a partner</span>
      <HandshakeIcon />
    </button>
  );
};

export default PartnerButton;
