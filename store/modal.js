import Vue from "vue";

export const state = () => ({
  modal: {
    title: "",
    content: "",
    type: "",
    show: false
  }
});

export const getters = {
  modal: state => state.modal
};

export const mutations = {
  OPEN_MODAL: (state, payload) => (state.modal = { ...payload, show: true }),
  CLOSE_MODAL: (state, payload) =>
    (state.modal = {
      title: "",
      content: "",
      type: "",
      show: false
    })
};

export const actions = {};
