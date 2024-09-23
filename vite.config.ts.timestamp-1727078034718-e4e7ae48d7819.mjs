// vite.config.ts
import { loadEnv } from "file:///E:/%E6%89%A7%E8%A1%8C%E6%A0%87%E5%87%86/github/%E9%83%A8%E7%BD%B2%E5%B7%A5%E7%A8%8B/kilyicms/node_modules/.pnpm/vite@5.4.3_@types+node@22.5.4_sass@1.78.0/node_modules/vite/dist/node/index.js";
import path, { resolve } from "path";
import vue from "file:///E:/%E6%89%A7%E8%A1%8C%E6%A0%87%E5%87%86/github/%E9%83%A8%E7%BD%B2%E5%B7%A5%E7%A8%8B/kilyicms/node_modules/.pnpm/@vitejs+plugin-vue@5.1.3_vite@5.4.3_@types+node@22.5.4_sass@1.78.0__vue@3.5.4_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///E:/%E6%89%A7%E8%A1%8C%E6%A0%87%E5%87%86/github/%E9%83%A8%E7%BD%B2%E5%B7%A5%E7%A8%8B/kilyicms/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.1_vite@5.4.3_@types+node@22.5.4_sass@1.78.0__vue@3.5.4_typescript@5.5.4_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///E:/%E6%89%A7%E8%A1%8C%E6%A0%87%E5%87%86/github/%E9%83%A8%E7%BD%B2%E5%B7%A5%E7%A8%8B/kilyicms/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.3_@types+node@22.5.4_sass@1.78.0_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import svgLoader from "file:///E:/%E6%89%A7%E8%A1%8C%E6%A0%87%E5%87%86/github/%E9%83%A8%E7%BD%B2%E5%B7%A5%E7%A8%8B/kilyicms/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.5.4_typescript@5.5.4_/node_modules/vite-svg-loader/index.js";
import UnoCSS from "file:///E:/%E6%89%A7%E8%A1%8C%E6%A0%87%E5%87%86/github/%E9%83%A8%E7%BD%B2%E5%B7%A5%E7%A8%8B/kilyicms/node_modules/.pnpm/unocss@0.62.3_postcss@5.2.18_rollup@4.22.4_vite@5.4.3_@types+node@22.5.4_sass@1.78.0_/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_dirname = "E:\\\u6267\u884C\u6807\u51C6\\github\\\u90E8\u7F72\u5DE5\u7A0B\\kilyicms";
var vite_config_default = ({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd());
  const { VITE_PUBLIC_PATH } = viteEnv;
  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve(__vite_injected_original_dirname, "./src")
      }
    },
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      // host: "0.0.0.0"
      /** 端口号 */
      port: 7e3,
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
    esbuild: mode === "development" ? void 0 : {
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
      UnoCSS()
    ]
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxcdTYyNjdcdTg4NENcdTY4MDdcdTUxQzZcXFxcZ2l0aHViXFxcXFx1OTBFOFx1N0Y3Mlx1NURFNVx1N0EwQlxcXFxraWx5aWNtc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcXHU2MjY3XHU4ODRDXHU2ODA3XHU1MUM2XFxcXGdpdGh1YlxcXFxcdTkwRThcdTdGNzJcdTVERTVcdTdBMEJcXFxca2lseWljbXNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6LyVFNiU4OSVBNyVFOCVBMSU4QyVFNiVBMCU4NyVFNSU4NyU4Ni9naXRodWIvJUU5JTgzJUE4JUU3JUJEJUIyJUU1JUI3JUE1JUU3JUE4JThCL2tpbHlpY21zL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgdHlwZSBDb25maWdFbnYsIHR5cGUgVXNlckNvbmZpZ0V4cG9ydCwgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCBwYXRoLCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcclxuaW1wb3J0IHN2Z0xvYWRlciBmcm9tIFwidml0ZS1zdmctbG9hZGVyXCI7XHJcbmltcG9ydCBVbm9DU1MgZnJvbSBcInVub2Nzcy92aXRlXCI7XHJcblxyXG4vKiogXHU5MTREXHU3RjZFXHU5ODc5XHU2NTg3XHU2ODYzXHVGRjFBaHR0cHM6Ly9jbi52aXRlanMuZGV2L2NvbmZpZyAqL1xyXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWdFeHBvcnQgPT4ge1xyXG4gIGNvbnN0IHZpdGVFbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpIGFzIEltcG9ydE1ldGFFbnY7XHJcbiAgY29uc3QgeyBWSVRFX1BVQkxJQ19QQVRIIH0gPSB2aXRlRW52O1xyXG4gIHJldHVybiB7XHJcbiAgICAvKiogXHU2MjUzXHU1MzA1XHU2NUY2XHU2ODM5XHU2MzZFXHU1QjlFXHU5NjQ1XHU2MEM1XHU1MUI1XHU0RkVFXHU2NTM5IGJhc2UgKi9cclxuICAgIGJhc2U6IFZJVEVfUFVCTElDX1BBVEgsXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgLyoqIEAgXHU3QjI2XHU1M0Y3XHU2MzA3XHU1NDExIHNyYyBcdTc2RUVcdTVGNTUgKi9cclxuICAgICAgICBcIkBcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIC8qKiBcdThCQkVcdTdGNkUgaG9zdDogdHJ1ZSBcdTYyNERcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjggTmV0d29yayBcdTc2ODRcdTVGNjJcdTVGMEZcdUZGMENcdTRFRTUgSVAgXHU4QkJGXHU5NUVFXHU5ODc5XHU3NkVFICovXHJcbiAgICAgIGhvc3Q6IHRydWUsIC8vIGhvc3Q6IFwiMC4wLjAuMFwiXHJcbiAgICAgIC8qKiBcdTdBRUZcdTUzRTNcdTUzRjcgKi9cclxuICAgICAgcG9ydDogNzAwMCxcclxuICAgICAgLyoqIFx1NjYyRlx1NTQyNlx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NkQ0Rlx1ODlDOFx1NTY2OCAqL1xyXG4gICAgICBvcGVuOiBmYWxzZSxcclxuICAgICAgLyoqIFx1OERFOFx1NTdERlx1OEJCRVx1N0Y2RVx1NTE0MVx1OEJCOCAqL1xyXG4gICAgICBjb3JzOiB0cnVlLFxyXG4gICAgICAvKiogXHU3QUVGXHU1M0UzXHU4OEFCXHU1MzYwXHU3NTI4XHU2NUY2XHVGRjBDXHU2NjJGXHU1NDI2XHU3NkY0XHU2M0E1XHU5MDAwXHU1MUZBICovXHJcbiAgICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxyXG4gICAgICAvLyBcdTcwRURcdTZBMjFcdTU3NTdcdTY2RkZcdTYzNjJcclxuICAgICAgaG1yOiB0cnVlLFxyXG4gICAgICAvKiogXHU2M0E1XHU1M0UzXHU0RUUzXHU3NDA2ICovXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgXCIvYXBpL3YxXCI6IHtcclxuICAgICAgICAgIHRhcmdldDogXCJsb2NhbGhvc3RcIixcclxuICAgICAgICAgIHdzOiB0cnVlLFxyXG4gICAgICAgICAgLyoqIFx1NjYyRlx1NTQyNlx1NTE0MVx1OEJCOFx1OERFOFx1NTdERiAqL1xyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIC8qKiBcdTk4ODRcdTcwRURcdTVFMzhcdTc1MjhcdTY1ODdcdTRFRjZcdUZGMENcdTYzRDBcdTlBRDhcdTUyMURcdTU5Q0JcdTk4NzVcdTk3NjJcdTUyQTBcdThGN0RcdTkwMUZcdTVFQTYgKi9cclxuICAgICAgd2FybXVwOiB7XHJcbiAgICAgICAgY2xpZW50RmlsZXM6IFtcIi4vc3JjL2xheW91dHMvKiovKi52dWVcIl0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgLyoqIFx1NTM1NVx1NEUyQSBjaHVuayBcdTY1ODdcdTRFRjZcdTc2ODRcdTU5MjdcdTVDMEZcdThEODVcdThGQzcgMjA0OEtCIFx1NjVGNlx1NTNEMVx1NTFGQVx1OEI2Nlx1NTQ0QSAqL1xyXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwNDgsXHJcbiAgICAgIC8qKiBcdTc5ODFcdTc1MjggZ3ppcCBcdTUzOEJcdTdGMjlcdTU5MjdcdTVDMEZcdTYyQTVcdTU0NEEgKi9cclxuICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLFxyXG4gICAgICAvKiogXHU2MjUzXHU1MzA1XHU1NDBFXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU3NkVFXHU1RjU1ICovXHJcbiAgICAgIGFzc2V0c0RpcjogXCJzdGF0aWNcIixcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBcdTUyMDZcdTU3NTdcdTdCNTZcdTc1NjVcclxuICAgICAgICAgICAqIDEuIFx1NkNFOFx1NjEwRlx1OEZEOVx1NEU5Qlx1NTMwNVx1NTQwRFx1NUZDNVx1OTg3Qlx1NUI1OFx1NTcyOFx1RkYwQ1x1NTQyNlx1NTIxOVx1NjI1M1x1NTMwNVx1NEYxQVx1NjJBNVx1OTUxOVxyXG4gICAgICAgICAgICogMi4gXHU1OTgyXHU2NzlDXHU0RjYwXHU0RTBEXHU2MEYzXHU4MUVBXHU1QjlBXHU0RTQ5IGNodW5rIFx1NTIwNlx1NTI3Mlx1N0I1Nlx1NzU2NVx1RkYwQ1x1NTNFRlx1NEVFNVx1NzZGNFx1NjNBNVx1NzlGQlx1OTY2NFx1OEZEOVx1NkJCNVx1OTE0RFx1N0Y2RVxyXG4gICAgICAgICAgICovXHJcbiAgICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgICAgdnVlOiBbXCJ2dWVcIiwgXCJ2dWUtcm91dGVyXCIsIFwicGluaWFcIl0sXHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IFtcImVsZW1lbnQtcGx1c1wiLCBcIkBlbGVtZW50LXBsdXMvaWNvbnMtdnVlXCJdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8qKiBcdTZERjdcdTZEQzZcdTU2NjggKi9cclxuICAgIGVzYnVpbGQ6XHJcbiAgICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIlxyXG4gICAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgICAgOiB7XHJcbiAgICAgICAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTc5RkJcdTk2NjQgY29uc29sZS5sb2cgKi9cclxuICAgICAgICAgICAgcHVyZTogW1wiY29uc29sZS5sb2dcIl0sXHJcbiAgICAgICAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTc5RkJcdTk2NjQgZGVidWdnZXIgKi9cclxuICAgICAgICAgICAgZHJvcDogW1wiZGVidWdnZXJcIl0sXHJcbiAgICAgICAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTc5RkJcdTk2NjRcdTYyNDBcdTY3MDlcdTZDRThcdTkxQ0EgKi9cclxuICAgICAgICAgICAgbGVnYWxDb21tZW50czogXCJub25lXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgLyoqIFZpdGUgXHU2M0QyXHU0RUY2ICovXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICB2dWVKc3goKSxcclxuICAgICAgLyoqIFx1NUMwNiBTVkcgXHU5NzU5XHU2MDAxXHU1NkZFXHU4RjZDXHU1MzE2XHU0RTNBIFZ1ZSBcdTdFQzRcdTRFRjYgKi9cclxuICAgICAgc3ZnTG9hZGVyKHsgZGVmYXVsdEltcG9ydDogXCJ1cmxcIiB9KSxcclxuICAgICAgLyoqIFNWRyAqL1xyXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmMvYXNzZXRzL2ljb25zXCIpXSxcclxuICAgICAgICBzeW1ib2xJZDogXCJpY29uLVtkaXJdLVtuYW1lXVwiLFxyXG4gICAgICB9KSxcclxuICAgICAgLyoqIFVub0NTUyAqL1xyXG4gICAgICBVbm9DU1MoKSxcclxuICAgIF0sXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVixTQUFnRCxlQUFlO0FBQy9ZLE9BQU8sUUFBUSxlQUFlO0FBQzlCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sWUFBWTtBQU5uQixJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLENBQUMsRUFBRSxLQUFLLE1BQW1DO0FBQ3hELFFBQU0sVUFBVSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDM0MsUUFBTSxFQUFFLGlCQUFpQixJQUFJO0FBQzdCLFNBQU87QUFBQTtBQUFBLElBRUwsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBO0FBQUEsUUFFTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ2pDO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBO0FBQUEsTUFFTixNQUFNO0FBQUE7QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBO0FBQUEsTUFFTixNQUFNO0FBQUE7QUFBQSxNQUVOLE1BQU07QUFBQTtBQUFBLE1BRU4sWUFBWTtBQUFBO0FBQUEsTUFFWixLQUFLO0FBQUE7QUFBQSxNQUVMLE9BQU87QUFBQSxRQUNMLFdBQVc7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLElBQUk7QUFBQTtBQUFBLFVBRUosY0FBYztBQUFBLFFBQ2hCO0FBQUEsTUFDRjtBQUFBO0FBQUEsTUFFQSxRQUFRO0FBQUEsUUFDTixhQUFhLENBQUMsd0JBQXdCO0FBQUEsTUFDeEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUE7QUFBQSxNQUVMLHVCQUF1QjtBQUFBO0FBQUEsTUFFdkIsc0JBQXNCO0FBQUE7QUFBQSxNQUV0QixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBTU4sY0FBYztBQUFBLFlBQ1osS0FBSyxDQUFDLE9BQU8sY0FBYyxPQUFPO0FBQUEsWUFDbEMsU0FBUyxDQUFDLGdCQUFnQix5QkFBeUI7QUFBQSxVQUNyRDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxTQUNFLFNBQVMsZ0JBQ0wsU0FDQTtBQUFBO0FBQUEsTUFFRSxNQUFNLENBQUMsYUFBYTtBQUFBO0FBQUEsTUFFcEIsTUFBTSxDQUFDLFVBQVU7QUFBQTtBQUFBLE1BRWpCLGVBQWU7QUFBQSxJQUNqQjtBQUFBO0FBQUEsSUFFTixTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUE7QUFBQSxNQUVQLFVBQVUsRUFBRSxlQUFlLE1BQU0sQ0FBQztBQUFBO0FBQUEsTUFFbEMscUJBQXFCO0FBQUEsUUFDbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBLFFBQzFELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQTtBQUFBLE1BRUQsT0FBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
