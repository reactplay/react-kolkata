import { Metadata } from "next";
import ContributorsSection from "@/modules/contributors";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Contributors" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ContributorsPage() {
  return <ContributorsSection />;
}
