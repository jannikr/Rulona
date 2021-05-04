module.exports = {
  root: true,
  env: {
    es2017: true,
    node: true,
  },
  extends: ["eslint:recommended", "react-app", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", ignoreRestSiblings: true },
    ],
    eqeqeq: "error",
    curly: ["error", "multi-line"],
    "no-duplicate-imports": "error",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
      ],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", ignoreRestSiblings: true },
        ],
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "variable",
            format: ["strictCamelCase", "UPPER_CASE", "StrictPascalCase"],
            leadingUnderscore: "allow",
          },
          {
            selector: "function",
            format: ["strictCamelCase"],
          },
          {
            selector: "enumMember",
            format: ["StrictPascalCase"],
          },
          {
            selector: "typeLike",
            format: ["StrictPascalCase"],
          },
        ],
        "@typescript-eslint/array-type": ["error", { default: "array" }],
        "@typescript-eslint/explicit-function-return-type": "error",
      },
    },
  ],
};
