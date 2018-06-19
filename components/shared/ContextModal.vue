<template>
  <modal :value="modal.show" @input="close" @submit="close" no-close>
    <template slot="header">
      <h4 class="modal-title text-center" :style="context">
        <i class="fa" :class="icon"></i>
        <span>{{ title }}</span>
      </h4>
    </template>
    <p class="text-center" v-html="content"></p>
    <template slot="footer">
      <a class="btn btn-default btn-confirm" @click="close">确定</a>
    </template>
  </modal>
</template>

<script>
import Modal from "~/components/shared/Modal";
import { mapGetters } from "vuex";
export default {
  name: "ContextModal",
  components: {
    Modal
  },
  data() {
    return {
      modals: {
        success: {
          title: " 成功",
          icon: "fa-check",
          context: "green"
        },
        info: {
          title: " 成功",
          icon: "fa-check",
          context: "blue"
        },
        error: {
          title: " 温馨提示",
          icon: "fa-exclamation-triangle",
          context: "red"
        }
      }
    };
  },
  computed: {
    ...mapGetters("modal", ["modal"]),
    currentModal() {
      return this.modals[this.modal.type || "success"];
    },
    title() {
      return this.modal.title || this.currentModal.title;
    },
    content() {
      return this.modal.content;
    },
    icon() {
      return this.currentModal.icon;
    },
    context() {
      return {
        color: this.currentModal.context
      };
    }
  },
  methods: {
    close() {
      this.$store.commit("modal/CLOSE_MODAL");
      this.$emit("input", false);
    }
  }
};
</script>
