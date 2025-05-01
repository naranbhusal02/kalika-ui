import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable warnings for unused variables
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      
      // Disable warnings for any type
      "@typescript-eslint/no-explicit-any": "off",
      
      // Disable warnings for img elements
      "@next/next/no-img-element": "off",
      
      // Disable warnings for missing dependencies in useEffect
      "react-hooks/exhaustive-deps": "off",
      
      // You can also add this if you want to disable all accessible warnings for images
      "jsx-a11y/alt-text": "off"
    }
  }
];

export default eslintConfig;