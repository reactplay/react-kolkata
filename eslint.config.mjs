import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

export default [
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: ["node_modules", ".next", "out", "dist", "build", "*.log*", "*.tsbuildinfo"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@next/next": nextPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // TypeScript
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",

      // React / Next
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "off",

      // General
      semi: ["error", "always"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prettier/prettier": "error",
    },
  },
];
