// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    "plugin:@docusaurus/recommended",
    "plugin:mdx/recommended",
    "plugin:import/recommended",
  ],
  plugins: ["@docusaurus", "mdx", "import"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      version: "detect",
    },
    // Fix for import resolution if you keep getting import errors
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "@docusaurus/no-untranslated-text": "off",
    "@docusaurus/string-literal-i18n-messages": "error",

    // Suggest using Docusaurus headings, but don't error out
    "@docusaurus/prefer-docusaurus-heading": "warn",

    // Import rules
    "import/no-unresolved": [
      "error",
      { ignore: ["^@theme", "^@docusaurus", "^@site"] },
    ],
    "import/no-named-as-default": "off",
  },
};
