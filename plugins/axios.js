import { generateJavaSignature } from "~/utils";
export default context => {
  const { $axios, store, req } = context;

  $axios.onRequest(config => {
    const userAgent = process.server
      ? req.headers["user-agent"]
      : window.navigator.userAgent;
    const isMobile = /Mobi/i.test(userAgent);

    if (isMobile) {
      config.headers["X-AGENT-PARAM"] = "wap";
    }

    config.rejectUnauthorized = false;
    if (config.nuxt) {
      config.baseURL = "";
    }

    if (config.withToken) {
      config.headers["X-AUTH-TOKEN"] =
        config.headers["X-AUTH-TOKEN"] || store.getters.token;
      config.withCredentials = true;
    }
  });
};
