import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    // Custom rules for your project
    rules: {
      // Disable img element warning (if you really need to use <img>)
      "@next/next/no-img-element": "off",
      // Configure unescaped entities rule to allow apostrophes in text
      "react/no-unescaped-entities": ["error", {
        "forbid": [">", "}", "\""]
      }]
    }
  },
  {
    // Apply these rules only to specific files if needed
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // TypeScript specific rules can go here
    }
  }
];

export default eslintConfig;