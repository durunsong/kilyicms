import vueParser from "vue-eslint-parser"; // 导入 vue-eslint-parser 作为对象
import typescriptParser from "@typescript-eslint/parser"; // 导入 TypeScript 解析器
import vue from "eslint-plugin-vue";
import typescript from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";

export default [
  // 忽略文件
  {
    ignores: [
      ".DS_Store",
      "node_modules",
      "dist",
      "dist-ssr",
      "*.local",
      ".npmrc",
    ], // 原 .eslintignore 文件的内容
  },
  {
    files: ["**/*.ts", "**/*.js", "**/*.jsx", "**/*.tsx", "**/*.vue"], // 作用范围
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: vueParser, // 直接使用 vue-eslint-parser 对象
      parserOptions: {
        parser: typescriptParser, // 使用 TypeScript 解析器对象
        ecmaVersion: 2020,
        sourceType: "module",
        jsxPragma: "React",
        ecmaFeatures: {
          jsx: true,
          tsx: true,
        },
      },
    },
    plugins: {
      vue, // 使用 vue 插件
      "@typescript-eslint": typescript, // 使用 TypeScript 插件
      prettier, // 使用 Prettier 插件
    },
    rules: {
      // TypeScript 规则
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-debugger": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // Vue 规则
      "vue/no-v-html": "off",
      "vue/require-default-prop": "off",
      "vue/require-explicit-emits": "off",
      "vue/multi-word-component-names": "off",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "never",
            normal: "never",
            component: "always",
          },
          svg: "always",
          math: "always",
        },
      ],
      // Prettier 规则
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
];
