import Vue from "vue";
import { generateGetters, generateState, generateMutations } from "../utils";

export const state = () => ({
  ...generateState("message"),
  count: 0
});

export const getters = {
  ...generateGetters("message"),
  unreadCount: state => state.count
};

export const mutations = {
  ...generateMutations("message"),
  SET_COUNT: (state, payload) => (state.count = payload)
};

export const actions = {
  async getMessages({ commit, rootGetters }) {
    try {
      if (!rootGetters.auth) return;
      const { data } = await this.$axios({
        method: "post",
        url: "/api/m/message",
        withToken: true
      }).then(res => res.data);
      commit("SET_MESSAGES", data.messages);
      commit("SET_COUNT", data.unreadCount);
    } catch (error) {}
  },

  async readMessage({ commit, getters }, payload) {
    try {
      const { data } = await this.$axios({
        method: "post",
        url: "/api/m/message",
        params: {
          receiveId: payload
        },
        withToken: true
      });
      const messageIndex = getters.messages.findIndex(
        message => message.id === payload
      );
      const messages = [...getters.messages];
      const message = messages[messageIndex];
      message.isread = 1;
      messages.splice(messageIndex, 1, message);
      commit("SET_MESSAGES", messages);
    } catch (error) {
      console.log(error);
    }
  },

  async removeMessage({ commit, getters }, payload) {
    try {
      const { data } = await this.$axios({
        method: "delete",
        url: "/api/m/message",
        params: {
          receiveId: payload
        },
        withToken: true
      });
      const messages = getters.messages.filter(
        message => message.id !== payload
      );
      commit("SET_MESSAGES", messages);
    } catch (error) {
      console.log(error);
    }
  }
};
