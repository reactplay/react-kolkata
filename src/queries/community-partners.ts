import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const COMMUNITY_PARTNERS_BUCKET = "community_partners";

interface CommunityPartnerRow {
  name: string;
  logo_path: string | null;
}

export type CommunityPartner = {
  name: string;
  imageSrc?: string | null;
};

function resolveLogoUrl(
  supabase: NonNullable<ReturnType<typeof getSupabaseBrowserClient>>,
  logoPath: string | null
): string | null {
  if (!logoPath) return null;

  const trimmed = logoPath.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const { data } = supabase.storage.from(COMMUNITY_PARTNERS_BUCKET).getPublicUrl(trimmed);

  return data?.publicUrl ?? null;
}

export async function getActiveCommunityPartners(): Promise<CommunityPartner[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("community_partners")
    .select("name, logo_path")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error || !data) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[supabase] community_partners read failed:", error?.message ?? "no data");
    }
    return [];
  }

  return (data as CommunityPartnerRow[]).map((row) => ({
    name: row.name,
    imageSrc: resolveLogoUrl(supabase, row.logo_path),
  }));
}

export const getCommunityPartners = getActiveCommunityPartners;
