<template>
  <div class="toolbar">
    <div class="hidden-xs">
      <div class="row">

        <div class="col-md-3 col-md-offset-2">
          <li>
            <nuxt-link to="/mobile">
              <i class="fa fa-mobile-phone"></i> 手机投注</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/download">
              <i class="fa fa-download"></i> 下载客户端</nuxt-link>
          </li>
        </div>

        <div class="col-sm-4 col-md-6 col-md-offset-1">
          <div v-if="auth">
            <li>

              <i class="fa fa-user-circle-o"></i>
              {{ auth.loginname }}

            </li>
            <li>

              <i class="fa fa-diamond"></i>
              VIP {{ auth.userlevel || 0 }}

            </li>
            <li>

              <animated-number :value="auth.balance">
                <template slot-scope="{ number }"> {{ number }} RMB </template>
              </animated-number>
              <i class="fa fa-money" style="margin-left: 5px"></i>
              <a href="javascript:void(0)" class="fa fa-refresh" style="margin-left: 5px" :class="[classRefreshing]" @click="refreshBalance">
              </a>

            </li>
            <li>
              <a href="javascript:void(0)" @click="$emit('mail')">
                <i class="fa fa-envelope-square"></i>
                站内信
                <span class="label label-danger">
                  <!-- {{ messages.unreadCount || 0 }} -->
                </span>
              </a>
            </li>
            <li>
              <button class="btn btn-primary" @click="$router.push({to: '/uc/account/'})">
                <i class="fa fa-user"></i>
                账户中心
              </button>
            </li>
            <li class="small-margin">
              <button class="btn btn-warning" href="javascript:void(0)" @click="logout">
                退出
              </button>
            </li>
          </div>

          <form class="form-inline" @submit.prevent="login" v-else>
            <div class="form-group">
              <input type="text" placeholder="用户名" v-model="credentials.username">
            </div>
            <div class="form-group">
              <input type="password" placeholder="密码" v-model="credentials.password">
              <nuxt-link class="icon-fp" to="/forgot-password">
                <i class="fa fa-unlock-alt"></i>
              </nuxt-link>
            </div>
            <div class="form-group">
              <input type="submit" value="登录">
            </div>
            <div class="form-group">
              <nuxt-link class="btn-sign-up" to="/register">注册</nuxt-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
export default {
  name: "NavigationToolbar",
  components: {
    AnimatedNumber
  },
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      drawer: false,
      refreshing: false
    };
  },
  computed: {
    ...mapGetters(["auth"]),
    balance() {
      const balance = this.auth ? this.auth.balance : 0;
      return parseFloat(balance).toFixed(2);
    },
    classRefreshing() {
      return this.refreshing ? "fa-spin" : "";
    }
  },
  methods: {
    toggle() {
      this.$emit("input", !this.value);
    },
    async refreshBalance() {
      this.refreshing = true;
      await this.$store.dispatch("refreshMainBalance");
      this.refreshing = false;
    },
    async login() {
      await this.$store.dispatch("login", this.credentials);
    },
    async logout() {
      this.credentials = {
        username: "",
        password: ""
      };
      await this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/bourbon/bourbon'
  $placeholder-color: #a7a7a7
  .toolbar
    min-height: 45px
    background: #085984
  li
    display: inline-block
    line-height: 45px
    margin: 0 10px
    color: white
  a
    text-decoration: none
    color: white

  form
    float: right
    padding: 6px 0

    div
      position: relative

      &:not(:first-child)
        margin-left: 5px

      a, input
        height: 32px
        font-size: 13px
        line-height: 32px

      a
        text:
          align: center
          decoration: none

        &.btn-sign-up
          display: inline-block
          width: 100px
          background: #E39700
          color: white
          letter-spacing: 0.5px
          text-transform: uppercase
          border: none
            radius: 2px

        &.icon-fp
          position: absolute
          width: 30px
          right: 0
          color: #b6b6b6
          font-size: 14px

          &:hover
            color: #23527c

</style>
