<template>
  <div class="nav-mobile">
    <div class="download-box" v-if="flg">
      <ul class="App">
        <li class="down-icon">
          <img :src="`${MEDIA_SERVER}/ico/logo.png`">
        </li>
        <li class="AppDesc">
          <p>亿万手游</p>
          <span>在这里每一天都会发生奇迹!</span>
        </li>
        <li class="down-close">
          <div class="download-button">
            <a href="http://cdn.mr007.co/downloads/todownload.html">下载APP</a>
          </div>
          <div class="close-btn" @click="closeDown">
            <span></span>
            <span></span>
          </div>
        </li>
      </ul>
    </div>
    <login-modal-mobile :auth="auth" :loading="loadingLogin" @login="onLogin" v-if="modalLogin" @close="modalLogin = false"></login-modal-mobile>
    <!-- TOOLBAR -->
    <div class="top-area">
      <div class="container">
        <a class="nav-trigger pull-left" href="javascript:void(0)" @click="toggleDrawer('navigation')">
          <div class="lines"></div>
        </a>
        <nuxt-link class="logo pull-left" to="/">
          <img src="~/assets/images/mrlogo-w.svg">
        </nuxt-link>
        <div class="right-side pull-right">
          <template v-if="!auth">
            <div class="not-login-icon" @click="toggleDrawer('auth')">
              <img src="~/assets/images/lvlico/default-avatar.png" alt="" class="user-level-image">
            </div>
          </template>

          <template v-else>
            <div class="not-login-icon" @click="toggleDrawer('auth')">
              <div class="img-vip-holder" :class="`vip-level-${ auth.userlevel }`"></div>

            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- END TOOLBAR -->

    <!-- NAV MENU -->
    <div class="menu" :class="{ 'is-visible': drawer.navigation }">
      <a class="nav-close" href="javascript:void(0)" @click="toggleDrawer('navigation')"></a>
      <div class="menu-container">
        <ul class="links">
          <template v-for="(link,index) of links">
            <li :key="index">
              <a v-if="link.links" href="javascript:void(0)" class="link has-sub-link" :class="[isActiveRoute(link)]" @click="setDropdown(link.id, link.links)">
                {{ link.name }}
                <span class="icon">
                  <i class="fa" :class="[currentDropdown === link.id ? 'fa-angle-up' : 'fa-angle-down']"></i>
                </span>
                <span class="label label-danger" v-if="link.badge">{{ link.badge }}</span>
              </a>
              <a v-else class="link" :class="[isActiveRoute(link)]" @click="linkAction(link)">
                {{link.name}}
                <span class="label label-danger" v-if="link.badge">
                  {{ link.badge }}
                </span>
              </a>
            </li>
            <ul class="sub-links" v-if="currentDropdown === link.id" :key="`dropdown-${link.id}`">
              <li v-for="(subLink,index) of link.links" :key="index" class="dropdown-link" :class="[isActiveRoute(subLink)]" @click="linkAction(subLink)">
                <img v-if="subLink.logo" :src="subLink.logo" alt="" class="sub-link-logo">
                <a href="javascript:void(0)" exact> {{ subLink.name }} </a>
              </li>
            </ul>
          </template>
        </ul>
      </div>
    </div>
    <!-- END NAV MENU -->
    <div class="menu-overlay" :class="{ 'is-overlay-visible': drawer.navigation }" @click.self="toggleDrawer('navigation')"></div>
    <auth-drawer v-model="drawer.auth" v-on="mobileListeners" />
    <div class="menu-overlay" :class="{ 'is-overlay-visible': drawer.auth }" @click.self="toggleDrawer('auth')"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import navigation from "~/mixins/navigation";
import LoginModalMobile from "~/components/shared/LoginModalMobile";
import AuthDrawer from "~/components/shared/AuthDrawer";

export default {
  inject: ["MEDIA_SERVER"],
  name: "NavigationMobile",
  components: {
    LoginModalMobile,
    AuthDrawer
  },
  mixins: [navigation],
  data() {
    return {
      drawer: {
        auth: false,
        navigation: false
      },
      modalLogin: false,
      showSublinks: false,
      currentDropdownLinks: [],
      currentDropdown: "",
      dropdown: false,
      loadingLogin: false,
      flg: true
    };
  },
  computed: {
    mobileListeners() {
      return {
        ...this.$listeners,
        login: this.modalLoginOpen
      };
    },
    userLevelImage() {
      if (!this.auth) return "";
      return require(`~/assets/images/lvlico/lv${
        this.auth.userlevel < 13 ? this.auth.userlevel : this.auth.userlevel - 1
      }.png`);
    }
  },
  watch: {
    auth: {
      handler(val) {
        if (this.drawer.auth) {
          this.drawer.auth = !!val;
        }
      }
    },
    "drawer.navigation"(val) {
      this.$scrollable(!val);
    }
  },
  methods: {
    ...mapActions(["login"]),
    async onLogin(credentials) {
      this.loadingLogin = true;
      await this.login(credentials);
      this.loadingLogin = false;
    },
    toggleDrawer(key) {
      this.drawer[key] = !this.drawer[key];
      Object.keys(this.drawer)
        .filter(keyDrawer => keyDrawer !== key)
        .forEach(keyDrawer => (this.drawer[keyDrawer] = false));
    },
    isActiveRoute(link) {
      if (this.$isServer || !link || !link.to) return "";
      const { name } = this.$route;
      let { name: linkName, query: linkQuery } = link.to;
      const isSameRoute = name === linkName;

      if (linkQuery) {
        const isSameQuery = this.isActiveRouteQuery(linkQuery);
        return isSameRoute && isSameQuery ? "active" : "";
      }

      return isSameRoute ? "active" : "";
    },
    isActiveRouteQuery(query) {
      return Object.entries(this.$clone(query)).every(([key, value]) => {
        return this.$route.query[key] === value;
      });
    },
    async linkAction(link) {
      if (link.auth && !this.auth) {
        return this.$notify("请先前往登录。", "error");
      }
      if (
        !(link.to && link.to.query && !this.isActiveRouteQuery(link.to.query))
      ) {
        this.setDropdown();
      }
      if (link.event) {
        this.$emit(link.event, link);
      }
      if (link.to) {
        this.$router.push(link.to);
      }

      this.toggleDrawer("navigation");
    },
    setDropdown(name = "", links = []) {
      this.currentDropdownLinks = links;
      this.currentDropdown = name === this.currentDropdown ? "" : name;
      this.dropdown = !!this.currentDropdown;
    },
    closeNavbar() {
      this.drawer = false;
    },
    modalLoginOpen() {
      this.modalLogin = true;
    },
    toggleNav() {
      this.showSublinks = !this.showSublinks;
    },
    showErrorModal() {
      this.$store.commit("modal/OPEN_MODAL", {
        content: "请先前往登录。",
        type: "error"
      });
    },
    closeDown() {
      this.flg = !this.flg;
    }
  }
};
</script>


<style lang="sass" scoped>
  .download-box
    height: 50px
    width: 100%
    background: rgba(#042a40, .9)
    position: fixed
    padding: 5px 7px
    left: 0
    bottom: 0
    z-index: 9999
    .App
      width: 100%
      margin: 0
      li
        display: inline-block
      .down-icon
        width: 38px
        float: left
        margin-right: .8rem
        img
          width: 38px
      .AppDesc
        p
          font-size: 1.4rem
          font-weight: bold
          margin: 0
        span
          font-size: 1rem
          color: rgba(#fff, .5)
    .down-close
      display: inline-block
      float: right
      padding: 5px 0
      .download-button
        float: left
        a
          padding: 5px 14px
          font-size: 1rem
          width: 6rem
          height: 2.5rem
          text-align: center
          line-height: 2.5rem
          color: #fff
          border: 1px solid #29a2ce
          border-radius: 4px
          margin-right: .8rem
      .close-btn
        margin-bottom: 0
        margin-right: 0
        float: right
        width: 29px
        height: 29px
        cursor: pointer
        position: relative
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

  .sub-link-logo
    width: 30px
    height: 30px
    transition: all .3s

  .not-login-icon
    font-size: 1em
    margin: 5px
  $placeholder-color: #a7a7a7
  .user-level-image
    height: 32px
    width: 32px
    margin-top: 3px
    cursor: pointer
  .dropdown-link
    padding-left: 35px
    a
      color: #9B9B9B
    &.active
      border-left: 4px solid #2576BC
      & > .sub-link-logo
        width: 35px
        height: 35px
    &:first-child
      border-top: 1px solid #d8d8d8

  .menu-container
    margin-top: 6em
    padding-right: 15px
    ul
      li
        a
          .label
            font-weight: normal
            font-size: 12px
            transform: scale(.7)

  .img-vip-holder
    padding: 0
    height: 32px
    width: 32px
    background-position: center center !important
    background-size: contain !important
    background-repeat: no-repeat !important
    cursor: pointer !important
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
  nav.row
    .nav-mobile
      height: 45px
      color: #fff
      border: none

      .top-area
        background: #085984
        height: 100%

        .right-side
          height: 100%
          display: flex

          a
            display: flex
            align-items: center
            color: white
            height: 100%
            font:
                size: 16px
                weight: 100

            &.login
              background: #206b99
              padding: 15px
              margin-left: 10px
            &.register
              background: #e39700
              padding: 15px

        a.nav-item
          display: flex
          align-items: center
          justify-content: center
          height: 100%
          color: white

          i
            width: 40px
            text-align: center
            font-size: 18px

        a.nav-trigger
          color: white
          display: inline-block
          height: 100%
          padding:
            top: 18px
            right: 15px
            left: 15px

          .lines
            background: #FFFFFF
            height: 2px
            width: 15px
            border-radius: 4px
            position: relative

            &:before, &:after
              content: ''
              position: absolute
              top: 5px
              left: 0
              background: #FFFFFF
              height: 2px
              width: 15px
              border-radius: 4px

            &:before
              top: 10px

        a.logo
          position: absolute
          left: 50%
          margin-top: 10px
          margin-left: -50px !important
          display: block
          width: 100px
          height: 30px

          img
            width: 100%

      .menu
        position: fixed
        top: 0
        right: 0
        bottom: 0
        left: -100%
        background: rgb(255, 255, 255)
        width: 90%
        transition: all 0.3s ease-in-out
        z-index: 999
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)
        overflow: auto

        &.is-visible
          left: 0

        .logo
          width: 100px

        a.nav-close
          display: inline-block
          position: absolute
          z-index: 10
          top: 20px
          right: 20px
          width: 15px
          height: 15px

          &:before, &:after
            content: ''
            position: absolute
            top: 0
            left: 0
            background: #1E1E1E
            height: 1px
            width: 20px
            border-radius: 4px
            transform: rotate(45deg)

          &:before
            transform: rotate(135deg)

        div.logo, .userDetails
          margin:
            left: 20px
            top: 30px
            bottom: 25px

        .userDetails
          .details
            margin-left: 20px

            p
              color: white
              margin-bottom: 3px
              font:
                size: 12px
                weight: 100

              a
                color: white
                margin-left: 10px

              i
                width: 20px

        ul.links
          li
            display: block
            line-height: 50px

            a.link
              color: #9B9B9B
              font:
                size: 1em
                weight: 200
              display: inline-block
              width: 100%
              padding: 0 20px
              position: relative
              span.icon
                position: absolute
                top: 0
                right: 10px

              &.has-sub-link

                ul.sub-links
                  margin-left: 15px
                  li
                    border: 0
                    &:before
                      content: '*'
                      position: absolute
                      left: 20px
                    a
                      color: #9B9B9B
                      width: 100%
                      display: block

              &.active
                border-left: 4px solid #2576BC

            &:not(:first-child)
              border-top: 1px solid #d8d8d8

      .menu-overlay
        position: fixed
        top: 0
        right: 0
        bottom: 0
        left: 0
        background: rgba(0,0,0,0.7)
        opacity: 0
        display: none
        transition: all 0.3s linear
        z-index: 3

        &.is-overlay-visible
          opacity: 1
          display: block

</style>
