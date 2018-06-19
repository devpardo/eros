import Vue from "vue";
import {
  getCache,
  setCache,
  generateState,
  generateGetters,
  generateMutations
} from "@/utils";

export const state = () => ({
  ...generateState("platform")
});

export const getters = {
  ...generateGetters("platform", "platform")
};
export const mutations = {
  ...generateMutations("platform")
};
export const actions = {
  async getPlatforms({ commit }) {
    const { data } = await this.$axios({
      method: "post",
      url: "/api/gameNav"
    });

    if (!data) return;
    const platforms = data.map((platform, index) => {
      const name = platform.platform.toLowerCase();
      platform.index = index;
      platform.image = `https://cdn.mr007.co/images/web/game-${name}.jpg`;
      platform.logo = `//cdn.mr007.co/images/web/family-icons/${name}.png`;
      platform.to = {
        name: "game",
        query: { platform: platform.platform, type: 1 }
      };
      return platform;
    });
    commit("SET_PLATFORMS", platforms);
  }
};
