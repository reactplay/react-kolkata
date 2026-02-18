import createMiddleware from "next-intl/middleware";

import { routing } from "@/config/i18n/navigation";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
