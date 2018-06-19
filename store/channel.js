import Vue from "vue";
import {
  getCache,
  setCache,
  sleep,
  generateState,
  generateGetters,
  generateMutations
} from "../utils";
import depositMethods from "~/json/depositMethods";

export const state = () => ({
  bankId: -1,
  ...generateState("channel")
});

export const getters = {
  ...generateGetters("channel"),
  currentChannel: (state, getters, rootState, rootGetters) =>
    rootGetters["method/currentMethodChannel"],
  depositMin: (state, getters) => {
    if (!getters.currentChannel) return 0;
    return getters.currentChannel.single_dp_min;
  },
  depositMax: (state, getters) => {
    if (!getters.currentChannel) return 0;
    return getters.currentChannel.single_dp_max;
  },
  banks: (state, getters) => {
    if (!getters.currentChannel) return [];
    return getters.currentChannel.banks;
  },
  bank: (state, getters) => id => {
    if (!getters.banks) return;
    return getters.banks.find(bank => bank.id === (id || state.bankId));
  },
  currentBank: (state, getters) => getters.bank()
};

export const mutations = {
  ...generateMutations("channel"),
  SET_BANK: (state, payload) => (state.bankId = payload)
};

export const actions = {
  async getChannels({ commit, getters, dispatch, rootGetters }, payload) {
    const { data: channels } = await this.$axios({
      method: "post",
      url: "/api/m/deposit/method",
      data: {
        id: payload
      },
      withToken: true
    }).then(res => res.data);

    const channelsWithLogo = channels.map(channel => {
      channel.method = payload;
      if (channel.banks && channel.banks.length) {
        channel.banks = channel.banks.map(bank => {
          bank.logo = `ico-${bank.imgClass}.png`;
          return bank;
        });
      }
      return channel;
    });

    commit("SET_CHANNELS", channelsWithLogo);
    const [channel] = channelsWithLogo;
    if (!channel) {
      await dispatch("setChannel", channel);
    }
    return channelsWithLogo;
  },
  async setChannel({ commit, dispatch }, payload) {
    if (!payload) return;
    commit("SET_CHANNEL", payload.id);
    if (!payload.banks || !payload.banks.length) return;
    const [bank] = payload.banks;
    if (!bank) return;
    await dispatch("setBank", bank);
  },
  async setBank({ commit }, payload) {
    commit("SET_BANK", payload.id);
  },
  async deposit(
    { commit, dispatch, rootGetters, getters, rootState },
    payload
  ) {
    // try {
    const min = 10;
    const max = 10000;
    const { amount, name, account } = payload;
    const isAmountValid = amount && amount >= min && amount <= max;
    if (!isAmountValid)
      throw new Error(
        `Amount: ${amount} not in range between ${min} and ${max}`
      );
    const method = rootGetters["method/currentChannelMethod"];

    const types = {
      QRpay: "depositCodeTransfer",
      QRtransfer: "depositQRPay",
      bank: "depositBankTransfer",
      offline: "depositOffline"
    };

    const type = types[method.category];

    const body = { amount, name, account };
    const response = await dispatch(type, body);
    if (!response.success) throw new Error(response.message || `Deposit Error`);
    if (method.category === "QRtransfer" && !response.data.qrCode)
      throw new Error("QR Transfer Failed");
    return { ...response.data, method: method.category };
    // } catch (error) {
    //   commit(
    //     "modal/OPEN_MODAL",
    //     {
    //       title: "Deposit Failed",
    //       content: error.message,
    //       type: "error"
    //     },
    //     { root: true }
    //   );
    // } finally {
    //   window.deposit = null;
    // }
  },
  async depositQRPay({ getters, rootGetters }, payload) {
    const { currentChannel: channel } = getters;

    const { id: bank_id, bankcardid: bank_card_id, cardname } = channel;

    const { amount: money } = payload;

    const body = {
      bank_id,
      bank_card_id,
      money,
      cardname
    };

    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/deposit/qrpay",
      data: body,
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);
    return { data, success, message };
  },
  async depositCodeTransfer({ getters, rootGetters }, payload) {
    const { currentChannel: channel } = getters;
    const { id: bank_id, bankcardid: bank_card_id } = channel;

    const { amount: money } = payload;
    const body = {
      bank_id,
      bank_card_id,
      money
    };
    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/api/deposit/gateway/send",
      data: body,
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);
    return { data, success, message };
  },
  async depositBankTransfer({ getters, dispatch }, payload) {
    const { currentChannel: channel, currentBank: bank } = getters;
    if(!bank) throw new Error("请在下面选择一家银行。")
    const { id: bank_id, bankcode: bank_code } = bank;
    const { id: bank_card_id } = channel;
    const { amount: money } = payload;

    const body = {
      bank_id,
      bank_code,
      bank_card_id,
      money
    };

    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/api/deposit/gateway/send",
      data: body,
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);

    return { data, success, message };
  },
  async depositOffline({ getters, dispatch }, payload) {
    if (payload.gift) return dispatch("depositForFriend", payload);
    const { currentChannel: channel } = getters;
    const {
      // id: bank_id,
      bankcardid: bank_card_id,
      // merchantid: account
    } = channel;

    const { amount: money, name, bankId: bank_id, bankAccountNo: account } = payload;
    const body = {
      bank_id,
      bank_card_id,
      money,
      name,
      account
    };
    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/api/m/deposit/offline/send",
      data: body,
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);
    return { data, success, message };
  },
  async depositForFriend({ getters }, payload) {
    const { currentChannel: channel } = getters;

    const { bankcardid: bank_card_id } = channel;

    const {
      amount: money,
      username: friend_name,
      name,
      bankId: bank_id,
      bankAccountNo: account
    } = payload;

    const body = {
      bank_id,
      bank_card_id,
      account,
      money,
      friend_name,
      name
    };

    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/deposit/deposit4friend",
      data: body,
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);
    return { data, success, message };
  }
};
