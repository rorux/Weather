import colors from "vuetify/es5/util/colors";

export default {
  ssr: false,

  head: {
    titleTemplate: "Погода | %s",
    title: "Погода",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Прогноз погоды на ближайшие 5 дней",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  loading: { color: "#409EFF" },

  css: [],

  plugins: [],

  components: true,

  buildModules: ["@nuxtjs/vuetify"],

  modules: ["@nuxtjs/axios"],

  axios: {
    proxy: true,
  },

  proxy: {
    "/api/": {
      target: "https://api.openweathermap.org",
      pathRewrite: { "^/api/": "" },
    },
  },

  env: {
    appId: process.env.APP_ID,
  },

  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {},
};
