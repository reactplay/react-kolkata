"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Heart } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import bgImage from "../../../../../../public/images/kolkata_image_1.png";

export default function ChampionCard() {
  const t = useTranslations("Events");

  return (
    <article className="group relative flex flex-1 flex-col overflow-hidden rounded-xl border border-white/5 bg-white/5 transition hover:translate-y-[-4px] hover:bg-white/10">
      <div className="relative h-20 w-full flex-shrink-0 overflow-hidden">
        <Image
          src={bgImage}
          alt="Call for Champions"
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] to-transparent opacity-60" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <h3 className="text-sm font-semibold text-sky-200">{t("call_for_champions")}</h3>

          <div className="mt-2 space-y-1 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Heart className="h-3 w-3 text-sky-300" aria-hidden />
              <span>Make a difference</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-sky-300" aria-hidden />
              <span>Help organize events</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-3">
          <Button
            asChild
            size="sm"
            className="w-full bg-linear-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400"
          >
            <Link href="#" target="_blank" rel="noreferrer">
              {t("call_for_champions")}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
