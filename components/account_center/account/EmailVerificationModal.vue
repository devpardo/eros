<template>
  <transition name="modal">
    <div class="modal-mask" v-if="isVisible">
      <div class="modal-overlay" @click="isVisible = false"></div>
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h4 class="modal-title text-center">确认：是否进行邮箱号码验证</h4>
          </div>

          <div class="modal-footer text-center">
            <div class="col-xs-12 clearfix">
              <a class="btn btn-default" @click="isVisible = false">取消</a>
              <a class="btn btn-default btn-sumbit" @click="sendVerification">发送验证</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    created() {
      this.$bus.$on("emailVerificationModal", () => {
        this.isVisible = true;
      });
    },
    data() {
      return {
        isVisible: false
      };
    },
    methods: {
      sendVerification() {
        alert("Send email verification!");
        this.isVisible = false;
      }
    }
  };
</script>

<style lang="sass" scoped>
  .modal-mask .modal-wrapper .modal-container
    width: 400px

    .modal-footer
      border: none
      padding-top: 8px

      a
        font:
          size: 12px
          weight: 100
        padding: 0 15px
        line-height: 30px
        box-sizing: border-box

      .btn-sumbit
        background: #206b99
        border: 1px solid #206b99
        color: #fff
</style>
