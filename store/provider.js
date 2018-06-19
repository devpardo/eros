// import providers from "~/json/providers";
import Vue from "vue";
import { sleep, random } from "~/utils";
import { generateMutations, generateGetters, generateState } from "../utils";

export const state = () => ({
  ...generateState("provider")
});

export const getters = {
  ...generateGetters("provider")
};

export const mutations = {
  ...generateMutations("provider"),
  SET_PROVIDER_DISCOUNTS: (state, { id, data }) => {
    const providerIndex = state.providers.findIndex(
      provider => provider.id === id
    );
    Vue.set(state.providers[providerIndex], "discounts", data || []);
  },
  SET_PROVIDER_BALANCE: (state, { id, data }) => {
    const providerIndex = state.providers.findIndex(
      provider => provider.id === id
    );
    Vue.set(state.providers[providerIndex], "balance", data || 0);
  },
  SET_PROVIDER_REBATES: (state, { id, data }) => {
    const providerIndex = state.providers.findIndex(
      provider => provider.id === id
    );
    const rebates = data || [];
    const rebatesTotal = rebates.reduce(
      (sum, rebate) => (sum += rebate.amount),
      0
    );
    Vue.set(state.providers[providerIndex], "rebates", rebates);
    Vue.set(state.providers[providerIndex], "rebatesTotal", rebatesTotal);
  }
};

export const actions = {
  async getProviders({ commit, dispatch, getters }) {
    const { data: providers, success, message } = await this.$axios({
      method: "post",
      url: "/api/lobby",
      withToken: true
    }).then(res => res.data);
    // let providers = await dispatch("getAuth", null, { root: true });
    providers.forEach(provider => {
      provider.logo = `${provider.enname}.png`;
      provider.image = `//cdn.mr007.co/images/web/providers/${provider.logo}`;
    });

    commit("SET_PROVIDERS", providers);
  },
  async getProvider({ commit, getters }, payload) {
    if (!payload) return;
    try {
      const { platform } = payload;
      const { data, success, message } = await this.$axios({
        method: "post",
        url: "/user/gameAccount",
        data: {
          platform
        },
        withToken: true
      }).then(res => res.data);
      if (!success) throw new Error(message);
      const { providers = [] } = getters;
      const index = providers.findIndex(
        provider => provider.enname === platform
      );
      const providersCopy = [...providers];
      if (index !== -1) {
        providersCopy.splice(index, 1, data);
      } else {
        providersCopy.push(data);
      }
      commit("SET_PROVIDERS", providersCopy);
    } catch (error) {}
  },
  async getProviderBalance({ commit, rootGetters }, payload) {
    if (!rootGetters.auth) return 0;
    if (!payload) return;

    const { enname: platform, wallet } = payload;
    if (wallet === 0) {
      commit("SET_PROVIDER_BALANCE", {
        id: payload.id,
        data: rootGetters.auth.balance
      });
      return rootGetters.auth.balance;
    }
    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/api/m/lobby/balance",
      data: {
        platform
      },
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);
    if (!data) return;
    if (payload.id) {
      commit("SET_PROVIDER_BALANCE", {
        id: payload.id,
        data: data.balance
      });
    }

    return data.balance;
  },
  async setProvider({ commit, dispatch }, payload) {
    commit("SET_PROVIDER", payload.id);
  },
  async getDiscounts({ commit, getters }, payload) {
    try {
      const { data } = await this.$axios({
        method: "post",
        url: "/api/m/bonus",
        data: {
          platform: payload.enname
        },
        withToken: true
      }).then(res => res.data);
      commit("SET_PROVIDER_DISCOUNTS", { id: payload.id, data });
    } catch (error) {}
  },
  async getRebates({ commit }, payload) {
    try {
      const { platform } = payload;
      const { data } = await this.$axios({
        provider: "post",
        url: "/rebate/getRebatesByPlatform",
        params: {
          gameid: payload.id
        },
        withToken: true
      }).then(res => res.data);
      commit("SET_PROVIDER_REBATES", { id: payload.id, data });
      return data;
    } catch (error) {}
  },
  async useRebates({ commit, dispatch }, payload) {
    try {
      const { platform } = payload;
      const { data } = await this.$axios({
        provider: "post",
        url: "/rebate/getRebatesByPlatform",
        params: {
          gameid: payload.id,
          handle: 1
        },
        withToken: true
      }).then(res => res.data);
      await Promise.all([
        dispatch("getProviderBalance", payload),
        dispatch("getRebates", payload)
      ]);
      return data;
    } catch (error) {}
  },
  async transfer({ commit, rootGetters, getters, dispatch }, payload) {
    let { amount, discount, type } = payload;
    amount = parseFloat(amount);

    // const mainBalance =
    //   type === "TRANSFER_IN"
    //     ? rootGetters.auth.balance - amount
    //     : rootGetters.auth.balance + amount;
    // const providerBalance =
    //   type === "TRANSFER_OUT"
    //     ? getters.currentProvider.balance + amount
    //     : getters.currentProvider.balance - amount;

    // if (mainBalance < 0 || providerBalance < 0) throw new Error("无效金额");
    const data = {
      money: amount,
      platform: getters.currentProvider.enname,
      discount
    };
    await (type === "TRANSFER_IN"
      ? dispatch("transferIn", data)
      : dispatch("transferOut", data));

    await Promise.all([
      dispatch("getProviderBalance", getters.currentProvider),
      dispatch("getAuth", null, { root: true })
    ]);
  },

  async transferIn({ commit }, payload) {
    const { platform, discount, money } = payload;

    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/api/m/transfer/in",
      data: payload,
      withToken: true
    }).then(res => res.data);
    console.log(message);
    if (!success) throw new Error(message);
    return { data, success, message };
  },
  async transferOut({ commit, dispatch }, payload) {
    const { platform_code, amount } = payload;

    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/api/m/transfer/out",
      data: payload,
      withToken: true
    }).then(res => res.data);
    console.log(message);
    if (!success) throw new Error(message);
    return { data, success, message };
  }
};
