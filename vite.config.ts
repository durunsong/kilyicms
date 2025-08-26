import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite";
import path, { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import svgLoader from "vite-svg-loader";
import UnoCSS from "unocss/vite";
import { webUpdateNotice } from "@plugin-web-update-notification/vite";

/** 配置项文档：https://cn.vitejs.dev/config */
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(mode, process.cwd()) as ImportMetaEnv;
  const { VITE_PUBLIC_PATH } = viteEnv;
  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH || "/",
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve(__dirname, "./src")
      }
    },
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 7000,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      // 热模块替换
      hmr: true,
      /** 接口代理 */
      proxy: {
        "/api/v1": {
          target: "localhost",
          ws: true,
          /** 是否允许跨域 */
          changeOrigin: true
        }
      },
      /** 预热常用文件，提高初始页面加载速度 */
      warmup: {
        clientFiles: ["./src/layouts/**/*.vue"]
      }
    },
    build: {
      /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
      chunkSizeWarningLimit: 2048,
      /** 禁用 gzip 压缩大小报告 */
      reportCompressedSize: false,
      /** 打包后静态资源目录 */
      assetsDir: "static",
      rollupOptions: {
        output: {
          /**
           * 分块策略
           * 1. 注意这些包名必须存在，否则打包会报错
           * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
            element: ["element-plus", "@element-plus/icons-vue"]
          }
        }
      }
    },
    /** 混淆器 */
    esbuild:
      mode === "development"
        ? undefined
        : {
            /** 打包时移除 console.log */
            pure: ["console.log"],
            /** 打包时移除 debugger */
            drop: ["debugger"],
            /** 打包时移除所有注释 */
            legalComments: "none"
          },
    /** Vite 插件 */
    plugins: [
      vue(),
      vueJsx(),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: "url" }),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      /** UnoCSS */
      UnoCSS(),
      /** 版本更新通知插件 - 仅在非开发环境启用 */
      mode !== "development" &&
        webUpdateNotice({
          // 版本类型：使用 package.json 版本号
          versionType: "pkg_version",
          // 检查间隔：5分钟
          checkInterval: 5 * 60 * 1000,
          // 窗口获得焦点时检查更新
          checkOnWindowFocus: true,
          // 页面加载完成后立即检查
          checkImmediately: true,
          // 加载文件错误时检查更新
          checkOnLoadFileError: true,
          // 控制台输出版本信息
          logVersion: true,
          // 本地化语言
          locale: "zh_CN",
          // 通知配置
          notificationConfig: {
            // 刷新按钮颜色
            primaryColor: "#1677ff",
            // 关闭按钮颜色
            secondaryColor: "rgba(0,0,0,.25)",
            // 通知位置
            placement: "bottomRight"
          },
          // 通知文案
          notificationProps: {
            title: "📢 版本更新提醒",
            description: "检测到版本有更新，为了更好的体验，请刷新页面获取最新内容",
            buttonText: "立即刷新",
            dismissButtonText: "稍后提醒"
          }
        })
    ].filter(Boolean)
  };
};
