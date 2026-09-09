import { useEffect, useState } from "react";

type DeviceType = "mobile" | "pad" | "desktop";

export const useDeviceDetail = () => {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width < 1280) {
        setDeviceType("pad");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile: deviceType === "mobile",
    isPad: deviceType === "pad",
    isDesktop: deviceType === "desktop",
  };
};
