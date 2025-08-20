import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["__tests__/setup.ts"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**", 
      "**/.next/**",
      "**/__tests__/e2e/**", // Exclude Playwright E2E tests
      "**/playwright.config.ts"
    ],
    include: [
      "**/__tests__/**/*.{test,spec}.{js,ts,tsx}",
      "**/src/**/*.{test,spec}.{js,ts,tsx}"
    ]
  },
});
