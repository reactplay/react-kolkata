import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const SPONSORS_BUCKET = "sponsors";

export type SponsorCategory = "current" | "previous";

interface SponsorRow {
  name: string;
  website_url: string | null;
  logo_path: string;
  category: string | null;
}

export type Sponsor = {
  name: string;
  websiteUrl?: string | null;
  imageSrc: string;
  category: SponsorCategory;
};

export type GroupedSponsors = {
  current: Sponsor[];
  previous: Sponsor[];
};

const EMPTY: GroupedSponsors = { current: [], previous: [] };

function resolveLogoUrl(
  supabase: NonNullable<ReturnType<typeof getSupabaseBrowserClient>>,
  logoPath: string
): string {
  const trimmed = logoPath.trim();

  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const { data } = supabase.storage.from(SPONSORS_BUCKET).getPublicUrl(trimmed);

  return data?.publicUrl ?? trimmed;
}

function normalizeCategory(value: string | null): SponsorCategory {
  return value === "previous" ? "previous" : "current";
}

export async function getActiveSponsors(): Promise<GroupedSponsors> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return EMPTY;

  const { data, error } = await supabase
    .from("sponsors")
    .select("name, website_url, logo_path, category")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error || !data) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[supabase] sponsors read failed:", error?.message ?? "no data");
    }
    return EMPTY;
  }

  const sponsors = (data as SponsorRow[]).map((row) => ({
    name: row.name,
    websiteUrl: row.website_url,
    imageSrc: resolveLogoUrl(supabase, row.logo_path),
    category: normalizeCategory(row.category),
  }));

  return {
    current: sponsors.filter((s) => s.category === "current"),
    previous: sponsors.filter((s) => s.category === "previous"),
  };
}

export const getSponsors = getActiveSponsors;
