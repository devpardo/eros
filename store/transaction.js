export const state = () => ({
  data: null
});

export const getters = {
  transactions: state => (state.data ? state.data.transactions : []),
  filters: state => (state.data ? state.data.filters : []),
  pages: state => (state.data ? state.data.maxpage : 0),
  totalRecords: state => (state.data ? state.data.totalrecord : 0)
};

export const mutations = {
  SET_RECORDS: (state, payload) => (state.data = payload)
  // SET_FILTERS: (state, payload) => state.transactions = payload,
};
export const actions = {
  async getTransactions({ commit }, payload) {
    try {
      const { type, page, startDate, endDate } = payload;
      const { data } = await this.$axios({
        method: "post",
        url: "/api/m/transactions",
        data: { type, page, startDate, endDate },
        withToken: true
      }).then(res => res.data);
      commit("SET_RECORDS", data);
    } catch (error) {}
  }
};
