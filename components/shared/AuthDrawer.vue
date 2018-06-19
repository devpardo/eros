<template>
  <transition v-bind="transitionClasses">
    <div v-if="value" :class="[$style.container]" key="test">
      <div class="AccountPanelUser">
        <h5 class="AccountPanelUser_header">Mr007 Account</h5>
        <div class="close-btn" :class="[$style.close]" @click="close">
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="menu-container">
        <div class="container sidebar custom-padding">
          <div v-if="auth" class="account-details row">
            <div class="col-xs-4">
              <div class="user-level" :class="`vip-level-${ auth.userlevel }`">
              </div>
            </div>
            <div class="col-xs-8">
              <div class="user-info">
                <ul class="details-list">
                  <li class="details-item username">
                    {{auth.loginname}}
                  </li>
                  <li class="details-item balance">
                    <animated-number :value="auth.balance">
                      <template slot-scope="{ number }">¥{{ number }}</template>
                    </animated-number>
                    <!--<span class="refresh-btn">-->
                      <!--<i class="fa fa-refresh" :class="[classRefreshing, $style.refreshButton]" @click="refreshBalance"></i>-->
                    <!--</span>-->
                  </li>
                  <li class="details-item mail">
                    <a href="#" @click="$emit('mail')">
                      <i class="fa fa-envelope-o fa-icon"></i> 站内信
                      <span class="label label-danger mobile-notification-message">{{ unreadCount }}</span>
                    </a>
                  </li>
                </ul>

              </div>
            </div>
          </div>
          <div v-if="auth" class="buttons-container row mt clearfix">
            <div class="col-xs-6">
              <button class="btn btn-block btn-sm" @click="onGotoUserAccount">
                <i class="fa fa-gear"></i> 账户中心
              </button>
            </div>
            <div class="col-xs-6">
              <button class="btn btn-block btn-sm" @click="onLogout">
                <i class="fa fa-sign-out"></i> 退出登录
              </button>
            </div>
          </div>
          <div v-else class="buttons-container inline row mt clearfix">
            <div class="col-xs-12 mt">
              <button class="btn btn-sm btn-login" @click="onLogin">
                登录
              </button>
              <button class="btn btn-sm btn-signup" @click="onRegister">
                注册
              </button>
            </div>
            <div class="col-xs-12 mt">

            </div>
          </div>
          <div class="list-menu mt5">
            <ul class="list-group">
              <li class="list-item">
                <a class="item" @click="onShowPromo(3)">
                  <img class="img-icon" src="http://cdn.mr007.co/images/web/top.chestbox.png" /> 每日宝箱
                  <i class="fa fa-angle-right pull-right arrow-right" aria-hidden="true"></i>
                </a>
              </li>
              <li class="list-item">
                <a class="item" @click="onShowPromo(4)">
                  <img class="img-icon" src="http://cdn.mr007.co/images/web/top.roulette.png" /> 幸运转盘
                  <i class="fa fa-angle-right pull-right arrow-right" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="customer-service-container">
          <div class="container ">
            <div class="contact-support row mt">
              <div class="col-xs-6 custom-padding">
                <h4>联系我们</h4>
                <ul v-for="(detail,index) of details" :key="index">
                  <li :class="[$style.authLink]">
                    <a class="links" :href="detail.link" target="_blank">
                      <i :class="detail.icon"></i> {{ detail.name }}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-xs-6">
                <div class="cs-image">
                  <img class="img-responsive customer-support-agent" src="~/assets/images/customer-service.png" />
                </div>
              </div>
            </div>
            <div class="qr-area row mt">
              <div class="col-xs-6">
                <a href="https://u.wechat.com/IBclA9c6qZ5XYSlD3gVkqeE" target="_blank">
                  <img class="customer-support-agent" src="https://cdn.mr007.co/images/web/aside-qr-code2.jpg" />
                </a>
              </div>
              <div class="col-xs-6">
                <a href="http://weixin.qq.com/r/jVCAmC3EZHAbrWn79wWf" target="_blank">
                  <img class="customer-support-agent" src="https://cdn.mr007.co/images/web/aside-qr-code.jpg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import AnimatedNumber from "~/components/shared/AnimatedNumber";
import { mapGetters, mapActions } from "vuex";
import scrollable from "~/mixins/scrollable";
export default {
  name: "AuthDrawer",
  mixins: [scrollable(["value"])],
  components: {
    AnimatedNumber
  },
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      details: [
        {
          icon: "fa fa-comments",
          name: "24x7在线客服",
          link:
            "https://chat7.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=378548&configID=52507&jid=5460920356&s=1"
        },
        {
          icon: "fa fa-qq",
          link: "http://wpa.qq.com/msgrd?v=3&uin=122487848&site=qq&menu=yes",
          name: "800063619"
        },
        { icon: "fa fa-phone-square", name: "131-4521-0773" }
      ],
      refreshing: false
    };
  },
  computed: {
    ...mapGetters(["auth"]),
    ...mapGetters("message", ["unreadCount"]),
    classRefreshing() {
      return this.refreshing ? "fa-spin" : "";
    },
    transitionClasses() {
      const {
        enterActiveClass,
        leaveActiveClass,
        enterClass,
        leaveToClass
      } = this.$style;
      return {
        enterActiveClass,
        leaveActiveClass,
        enterClass,
        leaveToClass
      };
    }
  },
  methods: {
    ...mapActions(["getAuth"]),
    async refreshBalance() {
      if (this.refreshing) return;
      this.refreshing = true;
      await this.getAuth();
      this.refreshing = false;
    },
    close() {
      this.$emit("input", false);
    },
    onLogin() {
      this.$emit("login");
      this.close();
    },
    onLogout() {
      this.$emit("logout");
      this.close();
    },
    onRegister() {
      this.$router.push({ name: "register" });
      this.close();
    },
    onGotoUserAccount() {
      this.$router.push({ name: "uc-account" });
      this.close();
    },
    onShowPromo(id) {
      this.$emit("promo", id);
      this.close();
    }
  }
};
</script>
<style lang="sass" scoped>
  .AccountPanelUser
    h5
      display: inline-block
      margin: 0 10px
      padding-top: 10px
      font-size: 10px
      border-top: 4px solid #b4b4b4
      color: #b4b4b4
      line-height: 1
      transform: scale(.8)
    .close-btn
      margin-bottom: 0
      margin-right: 0
      float: right
      width: 29px
      height: 29px
      margin: 0
      cursor: pointer
      span
        position: absolute
        background: #FFFFFF
        width: 28px
        height: 1px
        margin: 15px 0 0
        transition: .2s ease
        &:first-child
          transform: rotate(45deg)
        &:nth-child(2)
          transform: rotate(-45deg)


  .buttons-container
    .btn-sm
      background: none
      font-size: smaller
      border: 1px solid rgba(#fff, .3)
      color: rgba(#fff, .3)
      border-radius: 8px
      padding: 7px 20px
  .inline
    display: inline
    .btn-login
      border-radius: 3px
      width: 9em
      float: left
      margin-right: 5px
      background: #00aeff
      color: #000000
    .btn-signup
      border-radius: 3px
      width: 15em
      float: left
      background: #F5A623
      color: #000
  .links
    text-decoration: none
    color: white
  .arrow-right
    color: #7b7474
    font-size: 16px
    line-height: 26px
  .customer-service-container
    position: relative
    bottom: 0
    padding: 10px 0
  .sidebar
    overflow-y: scroll
  .img-icon
    width: 25px
    margin-right: 2px
    margin-bottom: 2px
  ul.details-list
    li.details-item
      padding: 5px 10px
    .usename
      width: 100%
    .balance
      font-size: smaller
      color: rgba(#fff, .5)
      width: 48%
    .mail a
      font-size: smaller
      color: rgba(#fff, .5)
      width: 48%
  ul.list-group
    li.list-item
      padding:
        top: 10px
        right: 0
        bottom: 10px
        left: 0
      border-bottom: 1px solid #7b7474
      a.item
        display: block
        width: 100%
        height: 100%
        text-decoration: none
        color: white
  .mail
    a
      display: block
      text-decoration: none
      color: white
  .user-info
    padding: 6px 10px
    font-size: 16px
  .mt
    margin-top: 5px
  .mt5
    margin-top: 25px
  .mt10
    margin-top: 80px
  .debug
    background: red
    border: 1px solid green
  .menu-container
    margin-top: 10px
  .user-level
    width: 78px
    height: 118px
    background-position: center center !important
    background-size: contain !important
    background-repeat: no-repeat !important
    margin-right: 5px
    margin-left: 20px
    background: blue
  .refresh-btn
    border: 1px solid white
    font-size: 14px
    border-radius: 4px
    padding: 1px 4px
    margin: 0 8px

  .vip-level-0
    background: url("~/assets/images/lvlico/lv0.png")

  .vip-level-1
    background: url("~/assets/images/lvlico/lv1.png")

  .vip-level-2
    background: url("~/assets/images/lvlico/lv2.png")

  .vip-level-3
    background: url("~/assets/images/lvlico/lv3.png")

  .vip-level-4
    background: url("~/assets/images/lvlico/lv4.png")

  .vip-level-5
    background: url("~/assets/images/lvlico/lv5.png")

  .vip-level-6
    background: url("~/assets/images/lvlico/lv6.png")

  .vip-level-7
    background: url("~/assets/images/lvlico/lv7.png")

  .vip-level-8
    background: url("~/assets/images/lvlico/lv8.png")

  .vip-level-9
    background: url("~/assets/images/lvlico/lv9.png")

  .vip-level-10
    background: url("~/assets/images/lvlico/lv10.png")

  .vip-level-11
    background: url("~/assets/images/lvlico/lv11.png")

  .vip-level-12
    background: url("~/assets/images/lvlico/lv12.png")

  .vip-level-13
    background: url("~/assets/images/lvlico/lv12.png")
</style>

<style lang="sass" module>
  .enterActiveClass, .leaveActiveClass
    transition: all .3s

  .enterClass, .leaveToClass
    transform: translateX(100%)
  .close
    z-index: 3
    font:
      weight: bold
      size: 20px
    position: absolute
    right: 10px
    top: 15px

  .container
    position: fixed
    top: 0
    right: 0
    width: 90%
    height: 100%
    background: rgba(44,44,55,.85)
    z-index: 9
    overflow: auto


</style>
