import { generateState, generateGetters, generateMutations } from "../utils";

export const state = () => ({
  ...generateState("treasure")
});

export const getters = {
  ...generateGetters("treasure")
};

export const mutations = {
  ...generateMutations("treasure")
};

export const actions = {
  async getTreasures({ commit }) {
    try {
      const { data } = await this.$axios({
        method: "post",
        url: "/activity/treasure/getStatus",
        withToken: true
      }).then(res => res.data);
      if (!data) return;
      commit("SET_TREASURES", data.treasure_list);
    } catch (error) {
      console.log(error)
    }
  },
};
