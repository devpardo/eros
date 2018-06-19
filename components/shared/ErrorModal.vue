<template>
  <transition name="modal">
    <div class="modal-mask" v-if="errorModal.content !== ''" :style="{ 'display': (errorModal.content !== '' ? '' : 'none') }">
      <div class="modal-overlay" @click="clearError"></div>
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h4 class="modal-title text-center"><i class="fa fa-warning"></i> {{ errorModal.title || '提示信息' }}</h4>
          </div>

          <div class="modal-body">
            <p class="text-center" v-html="errorModal.content"></p>
          </div>

          <div class="modal-footer text-center">
            <a class="btn btn-default" @click="clearError">确定</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      show: true
    };
  },
  computed: {
    ...mapGetters(["modal", "errorModal"])
  },
  methods: {
    clearError() {
      this.$store.commit("MODAL_DETAILS", {
        title: "",
        content: "",
        type: "error"
      });
    }
  }
};
</script>
