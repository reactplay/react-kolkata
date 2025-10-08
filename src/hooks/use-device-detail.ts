import { useEffect, useState } from "react";

type DeviceType = "mobile" | "pad" | "desktop";

export const useDeviceDetail = () => {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);

  useEffect(() => {
    // Check if window is defined to avoid errors during server-side rendering
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

    // Set size on initial load
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile: deviceType === "mobile",
    isPad: deviceType === "pad",
    isDesktop: deviceType === "desktop",
  };
};
