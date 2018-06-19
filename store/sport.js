import Vue from "vue";
import { getCache, setCache } from "@/utils";
import { sleep } from "~/utils";
import sports from "@/json/sports";
import { generateMutations, generateGetters, generateState } from "../utils";
export const state = () => ({
  ...generateState("sport")
});

export const getters = {
  ...generateGetters("sport")
};

export const mutations = {
  ...generateMutations("sport")
};

export const actions = {
  async getSports({ commit, state, rootGetters }) {
    const data = {
      data: sports
    };
    await sleep(2000);
    commit("SET_SPORTS", data.data);
  }
};
