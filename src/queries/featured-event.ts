import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const LUMA_EVENT_ID_PATTERN = /^evt-[A-Za-z0-9]+$/;

interface FeaturedEventRow {
  luma_event_id: string;
  end_at: string;
}

export type { FeaturedEventRow };

function isValidLumaEventId(value: unknown): value is string {
  return typeof value === "string" && LUMA_EVENT_ID_PATTERN.test(value.trim());
}

export function isLiveNow(row: FeaturedEventRow, now: number): boolean {
  return now <= Date.parse(row.end_at);
}

export async function getActiveLumaEventId(now: number = Date.now()): Promise<string | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("featured_events")
    .select("luma_event_id, end_at")
    .eq("is_active", true)
    .order("updated_at", { ascending: false })
    .limit(5);

  if (error || !data) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[supabase] featured_events read failed:", error?.message ?? "no data");
    }
    return null;
  }

  const live = (data as FeaturedEventRow[]).find(
    (row) => isValidLumaEventId(row.luma_event_id) && isLiveNow(row, now)
  );

  return live ? live.luma_event_id.trim() : null;
}
