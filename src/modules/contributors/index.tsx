"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/custom/animated-section";

import ContributorCard from "./contributor-card";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
  site_admin: boolean;
}

const ContributorsSection = () => {
  const t = useTranslations("Contributors");
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const fetchContributors = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.github.com/repos/reactplay/react-kolkata/contributors"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch contributors: ${response.status}`);
        }

        const data = await response.json();

        // filter the bot contributors
        const userContributors =
          data?.filter((contributor: Contributor) => contributor.type === "User") || [];

        setContributors(userContributors);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch contributors");
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <AnimatedSection className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="text-muted-foreground mt-4">{t("loading")}</p>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  if (loading) {
    return (
      <AnimatedSection className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="text-muted-foreground mt-4">{t("loading")}</p>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  if (error) {
    return (
      <AnimatedSection className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-destructive">
              {t("error")}: {error}
            </p>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("title")}
          </h1>
          <p className="text-muted-foreground mt-6 text-lg leading-relaxed sm:text-xl">
            {t("description")}
          </p>
          <p className="text-muted-foreground mt-4 text-sm">
            {t("total_contributors", { count: contributors.length })}
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="mt-16">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {contributors.map((contributor) => (
              <ContributorCard key={contributor.id} contributor={contributor} />
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm">{t("footer_note")}</p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ContributorsSection;
