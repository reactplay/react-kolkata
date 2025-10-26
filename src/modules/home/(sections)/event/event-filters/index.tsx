import { Event, EVENT_STATUS, EVENT_TYPES, EventFilters } from "@/types/event";
import { Globe, Users, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventFiltersProps {
  filters: EventFilters;
  onUpdateFilter: (key: keyof EventFilters, value: string) => void;
  onClearFilters: () => void;
  totalEvents: number;
  filteredCount: number;
}

export default function EventFiltersComponent({
  filters,
  onUpdateFilter,
  onClearFilters,
  totalEvents,
  filteredCount,
}: EventFiltersProps) {
  const getEventTypeIcon = (type: Event["type"]) => {
    switch (type) {
      case EVENT_TYPES.ONLINE:
        return <Globe className="h-3 w-3" />;
      case EVENT_TYPES.OFFLINE:
        return <Users className="h-3 w-3" />;
      case EVENT_TYPES.HYBRID:
        return (
          <>
            <Globe className="h-3 w-3" />
            <Users className="h-3 w-3" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex h-6 items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-sm font-medium text-slate-300">Filter events</h3>
          {(filters.status !== EVENT_STATUS.ALL || filters.type !== EVENT_TYPES.ALL) && (
            <p className="text-sm text-slate-400">
              (Showing {filteredCount} of {totalEvents} events)
            </p>
          )}
        </div>

        {(filters.status !== EVENT_STATUS.ALL || filters.type !== EVENT_TYPES.ALL) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-slate-400 hover:text-slate-300"
          >
            <X className="h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Status Filter */}
        <div className="flex flex-col gap-2">
          <label className="block text-xs font-medium text-slate-400">Event Status</label>
          <div className="flex flex-wrap gap-2">
            {[EVENT_STATUS.ALL, EVENT_STATUS.UPCOMING, EVENT_STATUS.ONGOING, EVENT_STATUS.PAST].map(
              (status) => (
                <Badge
                  key={status}
                  variant={filters.status === status ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors ${
                    filters.status === status
                      ? "bg-sky-500 text-white hover:bg-sky-600"
                      : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                  onClick={() => onUpdateFilter("status", status)}
                >
                  {status === EVENT_STATUS.ALL
                    ? "All"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
              )
            )}
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex flex-col gap-2">
          <label className="block text-xs font-medium text-slate-400">Event Type</label>
          <div className="flex flex-wrap gap-2">
            {[EVENT_TYPES.ALL, EVENT_TYPES.ONLINE, EVENT_TYPES.OFFLINE, EVENT_TYPES.HYBRID].map(
              (type) => (
                <Badge
                  key={type}
                  variant={filters.type === type ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors ${
                    filters.type === type
                      ? "bg-sky-500 text-white hover:bg-sky-600"
                      : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                  onClick={() => onUpdateFilter("type", type)}
                >
                  <div className="flex items-center gap-1">
                    {type !== EVENT_TYPES.ALL && getEventTypeIcon(type as Event["type"])}
                    {type === EVENT_TYPES.ALL
                      ? "All"
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </div>
                </Badge>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
