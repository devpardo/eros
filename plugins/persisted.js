import createPersistedState from "vuex-persistedstate";

// import { cookieStorage } from "@/utils";

export default ({ store, isHMR, isServer, isClient }) => {
  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration of
  // vuex-persistedstate plugin
  // if (isHMR) return;
  // if (isClient) {
  //   window.onNuxtReady(nuxt => {
  //     createPersistedState({
  //       storage: sessionStorage
  //     }); // vuex plugins can be connected to store, even after creation
  //   });
  // }
};
