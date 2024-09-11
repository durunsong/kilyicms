// scss 无法找到模块问题
declare module "*.scss" {
  const scss: Record<string, string>;
  export default scss;
}

// TypeScript 无法找到模块问题
declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
