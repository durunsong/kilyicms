// scss 无法找到模块问题
declare module "*.scss" {
  const scss: Record<string, string>;
  export default scss;
}

// TypeScript 无法找到模块问题
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
