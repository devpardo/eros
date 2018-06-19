import Vue from "vue";
import { getCache, setCache } from "@/utils";
import { sleep } from "~/utils";
import { generateMutations, generateState } from "../utils";
import { generateGetters } from "../utils/index";

export const state = () => ({
  ...generateState("account"),
  ...generateState("bank")
});

export const getters = {
  ...generateGetters("account"),
  ...generateGetters("bank")
};

export const mutations = {
  ...generateMutations("account"),
  ...generateMutations("bank")
  // REMOVE_ACCOUNT: (state, payload) => {
  //   const index = state.accounts.findIndex(account => account.id === payload);
  //   if (!index === -1) return;
  //   state.accounts.splice(index, 1);
  // },
  // ADD_ACCOUNT: (state, payload) => {
  //   state.accounts.push(payload);
  // }
};

export const actions = {
  async getAccounts({ commit, state, rootGetters }) {
    const { data, success, message } = await this.$axios({
      method: "get",
      url: "/api/m/withdraw/bank",
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);
    commit("SET_ACCOUNTS", data);
  },
  async createBankAccount({ commit, getters, rootGetters, dispatch }, payload) {
    if(!rootGetters.auth) throw new Error("您必须先登录")
    const {
      bank: { id: bankCode },
      address: bankBranch,
      account: bankAccount
    } = payload;
    const body = {
      bankCode,
      bankAccount,
      bankBranch,
      accountName: rootGetters.auth.username
    };
    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/api/m/withdraw/bank",
      data: body,
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);
    await dispatch("getAccounts");
    commit(
      "modal/OPEN_MODAL",
      {
        content: message,
        type: "success"
      },
      { root: true }
    );
  },

  async removeBankAccount({ commit, dispatch }, payload) {
    try {
      const { id } = payload;
      const body = {
        id
      };
      const { data, success, message } = await this.$axios({
        method: "delete",
        url: "/api/m/withdraw/bank",
        data: body,
        withToken: true
      }).then(res => res.data);
      if (!success) throw new Error(message);
      await dispatch("getAccounts");
      commit(
        "modal/OPEN_MODAL",
        {
          content: "删除成功",
          type: "success"
        },
        { root: true }
      );
    } catch (error) {
      commit(
        "modal/OPEN_MODAL",
        {
          content: error.message,
          type: "error"
        },
        { root: true }
      );
    }
  },
  async getBanks({ commit, state, rootGetters }) {
    const { data } = await this.$axios({
      method: "get",
      url: "/api/withdraw/bankList",
      withCredentials: true
    }).then(res => res.data);
    commit("SET_BANKS", data);
  }
};
