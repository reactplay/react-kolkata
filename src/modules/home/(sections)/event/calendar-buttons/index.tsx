import { CalendarEvent } from "@/types/event";
import { Calendar, Download } from "lucide-react";

import {
  downloadICSFile,
  generateGoogleCalendarUrl,
  generateOutlookCalendarUrl,
} from "@/lib/calendar-utils";
import { Button } from "@/components/ui/button";

interface CalendarButtonsProps {
  event: CalendarEvent;
}

export default function CalendarButtons({ event }: CalendarButtonsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        className="border-border bg-background/5 text-foreground/70 hover:bg-primary/10 flex-1 text-xs"
        onClick={() => window.open(generateGoogleCalendarUrl(event), "_blank")}
      >
        <Calendar className="mr-1 h-3 w-3" />
        Google
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="border-border bg-background/5 text-foreground/70 hover:bg-primary/10 flex-1 text-xs"
        onClick={() => window.open(generateOutlookCalendarUrl(event), "_blank")}
      >
        <Calendar className="mr-1 h-3 w-3" />
        Outlook
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
        onClick={() => downloadICSFile(event)}
        title="Download ICS file"
      >
        <Download className="h-3 w-3" />
      </Button>
    </div>
  );
}
