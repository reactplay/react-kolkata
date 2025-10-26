import { Event, EVENT_STATUS, EVENT_TYPES, EventStatus } from "@/types/event";
import { Globe, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface EventBadgesProps {
  type: Event["type"];
  status: EventStatus;
}

export default function EventBadges({ type, status }: EventBadgesProps) {
  const getEventTypeIcon = (eventType: Event["type"]) => {
    switch (eventType) {
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

  const getEventTypeBadge = (eventType: Event["type"]) => {
    const colors: Record<string, string> = {
      [EVENT_TYPES.ONLINE]: "bg-green-500/60 text-white",
      [EVENT_TYPES.OFFLINE]: "bg-blue-500/60 text-white",
      [EVENT_TYPES.HYBRID]: "bg-purple-500/60 text-white",
    };

    return (
      <Badge className={`${colors[eventType]} px-2 py-1 text-xs`}>
        <div className="flex items-center gap-1">
          {getEventTypeIcon(eventType)}
          {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
        </div>
      </Badge>
    );
  };

  const getStatusBadge = (eventStatus: EventStatus) => {
    const statusColors: Record<string, string> = {
      [EVENT_STATUS.UPCOMING]: "bg-green-500/60 text-white",
      [EVENT_STATUS.ONGOING]: "bg-orange-500/60 text-white",
      [EVENT_STATUS.PAST]: "bg-gray-500/60 text-white",
    };

    return (
      <Badge className={`px-2 py-1 text-xs ${statusColors[eventStatus]}`}>
        {eventStatus.charAt(0).toUpperCase() + eventStatus.slice(1)}
      </Badge>
    );
  };

  return (
    <>
      {/* Event Type Badge */}
      <div className="absolute top-3 right-3">{getEventTypeBadge(type)}</div>

      {/* Event Status Badge */}
      <div className="absolute top-3 left-3">{getStatusBadge(status)}</div>
    </>
  );
}
