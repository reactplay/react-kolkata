import { useEffect, useState } from "react";
import { Laptop, Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("system");

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  // Apply theme + persist
  useEffect(() => {
    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const apply = () => document.documentElement.classList.toggle("dark", media.matches);
      apply();
      media.addEventListener("change", apply);
      return () => media.removeEventListener("change", apply);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="bg-primary text-foreground hover:bg-muted flex cursor-pointer items-center gap-2 rounded-full border px-3 py-3 text-lg transition"
    >
      {theme === "light" && <Moon className="h-4 w-4 text-sky-500" />}

      {theme === "dark" && <Sun className="h-4 w-4 text-yellow-400" />}
      {theme === "system" && <Laptop className="h-4 w-4 text-sky-500" />}
    </button>
  );
}
