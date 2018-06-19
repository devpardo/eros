<template>
  <modal v-model="logoutModal.show">
    <h4 class="modal-title text-center">温馨提示</h4>
    <div class="modal-body">
      <p class="text-center">确定要退出登录？</p>
    </div>
    <div class="col-xs-12 clearfix"></div>
    <a class="btn btn-default" @click="close">取消</a>
    <a class="btn btn-default btn-sumbit" @click="logout">确认注销 */</a>
  </modal>
</template>

<script>
  import Modal from "~/components/shared/Modal";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "LogoutModal",
    components: {
      Modal
    },
    computed: {
      ...mapGetters("logoutModal")
      // ...mapGetters("modal", {
      //   getModal: "modal"
      // }),
      // modal() {
      //   return this.getModal("logout");
      // }
    },
    data() {
      return {
        isVisible: false
      };
    },
    methods: {
      // ...mapActions(["logout"])
      close() {
        this.$store.commit("CLOSE_MODAL", { key: "logout" });
      },
      logout() {
        this.$store.dispatch("logout");
        this.close();
      }
    }
  };
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .modal-mask
    .modal-wrapper
      .modal-container
        max-width: 400px

        .modal-footer
          border: none
          padding-top: 8px

          a
            font:
              size: $font-size-small
              weight: 100
            padding: 0 15px
            line-height: 30px

          .btn-sumbit
            background: $blue-13
            border: 1px solid $blue-13
            color: $default
</style>
