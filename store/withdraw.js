export const state = () => ({
  meta: null
});

export const getters = {
  withdrawal: state => state.meta
};

export const mutations = {
  SET_WITHDRAWAL_META: (state, payload) => {
    state.meta = payload;
  }
};

export const actions = {
  async withdraw({ commit, getters, rootGetters }, payload) {
    const currentAccount = rootGetters["bank/currentAccount"];
    if (!currentAccount) throw new Error("请选择银行卡后，重新提交");
    const { bankid, id: usercardid } = currentAccount;
    //if (!rootGetters.auth.userlevel) throw new Error("等级过低，无法提款");
    const { amount: money } = payload;
    const body = {
      money,
      usercardid,
      bankid
    };
    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/api/m/withdraw",
      data: body,
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);
    return data;
  },
  async getWithdrawalLimit({ commit, getters }) {
    try {
      const { data } = await this.$axios({
        method: "post",
        url: "/withdraw/getWithdrawalLimit",
        withToken: true
      }).then(res => res.data);
      commit("SET_WITHDRAWAL_META", data);
    } catch (error) {}
  }
};
