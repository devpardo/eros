<template>
  <transition name="modal" v-if="!auth">
    <div class="modal-mask">
      <div class="modal-overlay" @click.self="closeModal">
        <div class="modal-wrapper">
          <div class="modal-container modal-login">
            <div class="modal-header text-center">
              <a href="#" class="close-btn" @click="closeModal">
                <span></span>
                <span></span>
              </a>
              <img class="login-logo" src="~/assets/images/mrlogo.svg">
              <p class="login-welcome">欢迎来到亿万先生</p>
            </div>

            <div class="modal-body">
              <form @submit.prevent="$emit('login',credentials)" class="form-inline">
                <div class="form-group">
                  <!--<label class="pull-left" for="username">用户名</label>-->
                  <input type="text" class="form-control" name="username" placeholder="用户名" v-model="credentials.username">
                </div>
                <div class="form-group">
                  <!--<label class="pull-left" for="password">密码</label>-->
                  <input type="password" class="form-control" name="username" placeholder="密码" v-model="credentials.password">
                </div>
                <div class="form-group">
                  <button type="submit" class="form-control btn btn-primary" :disabled="loading">
                    <i v-if="loading" class="fa fa-refresh fa-spin"></i>
                    登录
                  </button>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <p> 忘记密码了？
                <span @click="closeModal">
                  <nuxt-link to="/forgot-password">立即找回</nuxt-link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import navigation from "~/mixins/navigation";

export default {
  name: "LoginModalMobile",
  mixins: [navigation],
  props: {
    loading: {
      type: Boolean
    }
  },
  methods: {
    closeModal() {
      this.$emit("close", false);
    }
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'

  .modal-mask .modal-wrapper

    .modal-container
      width: 100%
      border-radius: 3px
      &.modal-login
        background: #fff

      .modal-header
        padding:
          top: 5px
          right: 10px
          bottom: 0
          left: 10px
        position: relative

        .close-btn
          margin-bottom: 0
          margin-right: 0
          float: right
          width: 29px
          height: 29px
          margin: 10px
          cursor: pointer
          top: -2em
          span
            position: absolute
            background: #FFFFFF
            width: 28px
            height: 1px
            margin: 15px 0 0
            transition: .2s
            &:first-child
              transform: rotate(45deg)
            &:nth-child(2)
              transform: rotate(-45deg)

        img.login-logo
          width: 60px
          height: auto
          margin: 20px auto 5px
        .login-welcome
          color: #4A4A4A
          font-size: 20px
          font-weight: bold

        h4
          color: $light-blue-2

      .modal-body
        padding: 20px 40px

        .form-group
          width: 100%
          margin: 0 auto 10px

          input
            box-shadow: none
            font:
              size: 14px
              weight: 100
            width: 100%
            height: 40px
            line-height: 40px

            &.btn
              margin-top: 4px
          button
            height: 40px
            line-height: 40px
            padding: 0
            font-weight: normal
            letter-spacing: 1px

        p.line-behind-text
          position: relative
          width: 90%
          margin: 15px auto
          font-weight: 100
          text-align: center


          &:before, &:after
            content: ''
            position: absolute
            left: 0
            top: 10px
            height: 1px
            width: 46%
            width: calc(50% - 20px)
            background: $gray-15

          &:after
            left: auto
            right: 0
        .btn
          border-radius: 4px
          line-height: 22px
        a.btn-signup
          display: block
          width: 90%
          margin: 0 auto
          font:
            size: 13px
            weight: 100
          color: white
          background: $secondary
        .btn.active
          background-image: none
          outline: 0
          box-shadow: none!important


      .modal-footer
        background: #333333
        border: none

        p
          margin-bottom: 0
          font:
            size: 13px
            weight: 100
          color: white
</style>
