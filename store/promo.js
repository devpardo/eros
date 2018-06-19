import Vue from "vue";
import { getCache, setCache } from "@/utils";
import { sleep } from "~/utils";
import promos from "@/json/promos";
import { generateMutations, generateGetters, generateState } from "../utils";
export const state = () => ({
  ...generateState("promo")
});

export const getters = {
  ...generateGetters("promo")
};

export const mutations = {
  ...generateMutations("promo")
};

export const actions = {
  async getPromos({ commit, state, rootGetters }) {
    const { data,success } = await this.$axios({
      method: "post",
      url: "/bonus/mrPromotions"
    }).then(response => response.data)
    const promos = data.map(promo => {
      promo.image = `${process.env.MEDIA_SERVER}/promotion/${promo.img}`;
      return promo;
    });
    commit("SET_PROMOS", promos);
  }
};
