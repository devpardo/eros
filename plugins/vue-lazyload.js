import Vue from "vue";
import VueLazyLoad from "vue-lazyload";

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: "dist/error.png",
  loading: "dist/loading.gif",
  attempt: 1
});
