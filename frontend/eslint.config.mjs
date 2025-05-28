import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import next from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";

export default [
  js.configs.recommended,
  {
    ignores: ["**/node_modules/**", "**/.next/**"],
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "@next/next": next,
      "react": reactPlugin,
    },
    rules: {
      "react/no-unescaped-entities": "error",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@next/next/no-html-link-for-pages": "off"
    }
  }
];
