"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NewsletterFormData,
  NEWSLETTER_INTERESTS,
  NewsletterInterest,
} from "@/types/newsletter";

export default function NewsletterSubscription() {
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<NewsletterInterest[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const interests = [
    { value: NEWSLETTER_INTERESTS.EVENTS, label: t("interests.events") },
    { value: NEWSLETTER_INTERESTS.TECH_TALKS, label: t("interests.techTalks") },
    { value: NEWSLETTER_INTERESTS.WORKSHOPS, label: t("interests.workshops") },
    { value: NEWSLETTER_INTERESTS.COMMUNITY_NEWS, label: t("interests.communityNews") },
  ];

  const toggleInterest = (interest: NewsletterInterest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage(t("errors.invalidEmail"));
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, interests: selectedInterests }),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus("success");
      setEmail("");
      setSelectedInterests([]);

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(t("errors.generic"));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{t("title")}</h3>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      {status === "success" ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
          <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
            {t("success.title")}
          </h4>
          <p className="text-green-700 dark:text-green-300">{t("success.message")}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t("emailLabel")}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              required
              disabled={status === "loading"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              {t("interestsLabel")}
            </label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge
                  key={interest.value}
                  variant={
                    selectedInterests.includes(interest.value)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer hover:bg-primary/90 transition-colors px-4 py-2"
                  onClick={() => toggleInterest(interest.value)}
                >
                  {interest.label}
                </Badge>
              ))}
            </div>
          </div>

          {status === "error" && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? t("button.loading") : t("button.subscribe")}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            {t("privacyNote")}
          </p>
        </form>
      )}
    </div>
  );
}
