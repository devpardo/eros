import Vue from "vue";
import {
  getCache,
  setCache,
  sleep,
  generateGetters,
  generateMutations,
  generateState
} from "@/utils";
import depositMethods from "~/json/depositMethods";

export const state = () => ({
  logos: {
    QRpay: {
      active: "scanpay-ico-1.png",
      default: "scanpay-ico-0.png"
    },
    QRtransfer: {
      active: "scantransfer-ico-1.png",
      default: "scanpay-ico-0.png"
    },
    bank: {
      active: "alipay-ico-1.png",
      default: "alipay-ico-0.png"
    },
    offline: {
      active: "offlinepay-ico-1.png",
      default: "offlinepay-ico-0.png"
    }
  },
  ...generateState("method"),
  methodsChannels: []
});

export const getters = {
  ...generateGetters("method"),
  methodsChannels: state => state.methodsChannels,
  currentMethodChannel: (state, getters, rootState, rootGetters) => {
    const channels = getters.methodsChannels;
    return channels.find(
      channel => channel.id === rootGetters["channel/channelId"]
    );
  },
  currentChannelMethod: (state, getters) => {
    if (!getters.currentMethodChannel) return;
    return getters.method(getters.currentMethodChannel.method);
  }
};

export const mutations = {
  ...generateMutations("method"),
  SET_METHODS_CHANNELS: (state, payload) => {
    state.methodsChannels = payload;
  }
};

export const actions = {
  async getMethods({ state, commit, dispatch }) {
    const { data: methods } = await this.$axios({
      method: "post",
      url: "/api/m/deposit/category",
      withToken: true
    }).then(res => res.data);
    const openMethods = methods
      .map(method => {
        method.logo = state.logos[method.category];
        return method;
      })
      .filter(method => method.open);
    commit("SET_METHODS", openMethods);
    const [method] = openMethods;
    await dispatch("setMethod", method);
  },
  async setMethod({ commit, dispatch }, payload) {
    if (!payload) return;
    commit("SET_METHOD", payload.id);
    await dispatch("channel/getChannels", payload.id, { root: true });
  },
  async getAllChannels({ getters, commit, dispatch }) {
    const { methods } = getters;
    const channels = await Promise.all(
      methods.map(method =>
        dispatch("channel/getChannels", method.id, { root: true })
      )
    );

    const flatArray = [];
    channels.forEach(channelArray => {
      flatArray.push(...channelArray);
    });
    const [channel] = flatArray;

    commit("SET_METHODS_CHANNELS", flatArray);

    if (channel) {
      commit("channel/SET_CHANNEL", channel.id, { root: true });
    }
  }
};
