import { Metadata } from "next";
import ContributorsSection from "@/modules/contributors";
import { getTranslations } from "next-intl/server";

import { getLocalizedPath } from "@/config/i18n/navigation";
import ErrorBoundary from "@/components/common/error-boundary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contributors" });

  const pageTitle = t("title");
  const pageDescription = t("description");

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: getLocalizedPath("/contributors", locale),
      siteName: "React Kolkata",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

export default function ContributorsPage() {
  return (
    <ErrorBoundary>
      <ContributorsSection />
    </ErrorBoundary>
  );
}
