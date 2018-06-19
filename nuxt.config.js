const webpack = require("webpack");
const bodyParser = require("body-parser");
const session = require("express-session");

const API_HOST =
  process.env.NODE_ENV === "DEVELOPMENT" && !process.env.TESTING
    ? "http://35.201.183.109:1341"
    : "https://api1341.mr009.com";

module.exports = {
  env: {
    MEDIA_SERVER: "//cdn.mr007.co/images",
    API_MR: API_HOST,
    API_MRTV: "https://www.mr007.tv",
    API_MR_JAVA: "http://service.mr007.com:8081/mr/api/z/games/account"
  },
  axios: {
    baseURL: API_HOST
  },
  router: {
    linkActiveClass: "active"
  },
  css: ["~assets/css/style.css", "bootstrap/dist/css/bootstrap.min.css"],
  head: {
    title: "==亿万先生==",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "亿万先生成立于2014年并持有菲律宾政府PAGCOR博彩牌照认证，是亚洲最大最专业的电子，体育，真人综合品牌，实力雄厚，信誉至上，欢迎您的体验。" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      }
    ]
  },
  // loading: "~/components/shared/loading.vue",
  modules: ["@nuxtjs/axios"],
  plugins: [
    "~plugins/hideCharacters",
    "~plugins/eventBus",
    "~plugins/axios",
    "~plugins/filters",
    "~plugins/utils",
    "~plugins/vee-validate",
    { src: "~plugins/directives", ssr: false },
    { src: "~plugins/nuxt-video-player-plugin", ssr: false },
    { src: "~plugins/vue-select", ssr: false },
    { src: "~plugins/affiliate", ssr: false }
  ],
  build: {
    extend(config, ctx) {},
    vendor: [
      "babel-polyfill",
      "jquery/dist/jquery.min.js",
      "bootstrap/dist/js/bootstrap.min.js"
    ],
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    ]
  }
};
