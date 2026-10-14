import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface CfpLinkRow {
  google_form_link: string;
}

export async function getActiveCfpLink(): Promise<string | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("cfp_links")
    .select("google_form_link")
    .eq("is_active", true)
    .order("updated_at", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[supabase] cfp_links read failed:", error?.message ?? "no data");
    }
    return null;
  }

  const link = (data[0] as CfpLinkRow).google_form_link;
  if (typeof link !== "string") return null;

  const trimmed = link.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  } catch {
    return null;
  }

  return trimmed;
}

export const getCfpLink = getActiveCfpLink;
