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
        setError(null);
        const response = await fetch(
          "https://api.github.com/repos/reactplay/react-kolkata/contributors"
        );

        if (!response.ok) {
          // Handle specific HTTP error codes with meaningful messages
          if (response.status === 403) {
            // Check if it's a rate limit error
            const rateLimitRemaining = response.headers.get("X-RateLimit-Remaining");
            const rateLimitReset = response.headers.get("X-RateLimit-Reset");
            
            if (rateLimitRemaining === "0" && rateLimitReset) {
              const resetTime = new Date(parseInt(rateLimitReset) * 1000);
              const resetTimeFormatted = resetTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              });
              throw new Error(
                `GitHub API rate limit exceeded. Please try again after ${resetTimeFormatted}.`
              );
            }
            throw new Error(
              "Access forbidden. This might be due to API rate limiting or access restrictions."
            );
          } else if (response.status === 404) {
            throw new Error(
              "Repository not found. Please check if the repository exists and is public."
            );
          } else if (response.status >= 500) {
            throw new Error(
              "GitHub servers are experiencing issues. Please try again later."
            );
          } else {
            throw new Error(
              `Unable to fetch contributors (Error ${response.status}). Please try again.`
            );
          }
        }

        const data = await response.json();

        // Validate response data
        if (!Array.isArray(data)) {
          throw new Error("Invalid response format from GitHub API");
        }

        // filter the bot contributors
        const userContributors = data.filter(
          (contributor: Contributor) =>
            contributor &&
            contributor.type === "User" &&
            contributor.login &&
            contributor.avatar_url
        );

        setContributors(userContributors);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch contributors";
        setError(errorMessage);
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
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
            <p className="mt-4 text-slate-300">{t("loading")}</p>
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
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
            <p className="mt-4 text-slate-300">{t("loading")}</p>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  if (error) {
    return (
      <AnimatedSection className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-8 text-center">
            <div className="mb-4 text-4xl">⚠️</div>
            <h3 className="mb-2 text-lg font-semibold text-red-400">
              {t("error")}
            </h3>
            <p className="text-sm text-slate-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600"
            >
              Try Again
            </button>
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
            className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
            {t("description")}
          </p>
          <p className="mt-4 text-sm text-slate-400">
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
          <p className="text-sm text-slate-400">{t("footer_note")}</p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ContributorsSection;
