import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(["**/lib"]),
  {
    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:import/typescript",
        "plugin:react/recommended",
      ),
    ),

    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      "react-hooks": fixupPluginRules(reactHooks),
      import: fixupPluginRules(_import),
      react: fixupPluginRules(react),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "import/order": [
        "error",
        {
          groups: ["external", "parent", ["sibling", "index"]],
        },
      ],

      "eslint-plugin-import/no-unresolved": "off",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
      "react/prop-types": "off",

      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],

      "react/jsx-curly-brace-presence": [
        "error",
        {
          props: "never",
        },
      ],

      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "warn",

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: null,
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
        },
      ],

      "block-spacing": ["error", "always"],

      camelcase: [
        "warn",
        {
          properties: "never",
          ignoreDestructuring: true,
        },
      ],

      "comma-spacing": ["error"],
      "semi-spacing": "error",
      semi: ["error", "always"],

      "max-len": [
        "error",
        {
          code: 140,
          comments: 0,
          ignorePattern: '^import |//|"[^"]{100,}"',
        },
      ],

      eqeqeq: ["error", "smart"],

      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],

      "no-empty": [
        "error",
        {
          allowEmptyCatch: true,
        },
      ],

      "no-irregular-whitespace": [
        "error",
        {
          skipStrings: false,
        },
      ],

      "guard-for-in": "error",
      "keyword-spacing": "error",
      "key-spacing": ["error"],

      quotes: [
        "error",
        "double",
        {
          allowTemplateLiterals: true,
          avoidEscape: true,
        },
      ],

      "object-curly-spacing": ["error", "always"],
      "eol-last": "error",
      "no-trailing-spaces": "error",
      "no-var": "error",

      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxBOF: 0,
        },
      ],

      "no-multi-spaces": ["error"],
      "no-whitespace-before-property": ["error"],
      "space-before-blocks": ["error", "always"],
      "space-in-parens": ["error", "never"],
      "arrow-spacing": ["error"],

      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
      ],

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
]);
