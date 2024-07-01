import { defineNuxtConfig } from "nuxt/config"
import { loadEnv } from "vite"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "url"
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite"
interface VITE_ENV_CONFIG {
  VITE_API_HOST: string
}

const envScript = process.env.npm_lifecycle_script?.split(" ")
const envName = envScript?.[envScript.length - 1]
const envData = loadEnv(envName!, "env") as unknown as VITE_ENV_CONFIG
console.log("当前环境：", envData)

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: envData,
  },
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/images/favicon.ico" },
      ],
      htmlAttrs: {
        lang: "en",
        dir: "ltr",
      },
      script: [
        {
          src: "/js/flexible.js",
          type: "text/javascript",
        },
      ],
      meta: [
        { name: "keywords", content: "coreshop,快樂搬馬" },
        { name: "description", content: "快樂搬馬系统" },
        {
          name: "viewport",
          content:
            "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0",
        },
      ],
    },
  },
  build: {
    transpile:
      process.env.NODE_ENV === "production"
        ? [
            "naive-ui",
            "vueuc",
            "@css-render/vue3-ssr",
            "@juggle/resize-observer",
          ]
        : ["@juggle/resize-observer"],
  },
  css: [
    "@/assets/css/coreCommon.scss",
    "@/assets/css/style-common.scss",
    "@/assets/css/core-theme.scss",
    "@/assets/css/reset.css",
  ],
  plugins: [{ src: "~/plugins/facebook-sdk.ts", mode: "client" }],

  router: {},

  modules: ["@pinia/nuxt"],

  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === "development"
          ? ["naive-ui", "vueuc", "date-fns-tz"]
          : [],
    },
    server: {},
    envDir: "~/env",
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.json"),
        ],
      }),
    ],
  },
})
