<template>
  <transition name="fade">
    <div v-if="value" @click="close">
      <div class="navbar-game-mask">
        <div class="navbar-game-wrapper">
          <div class="navbar-game-container">
            <div class="container navbar-game-body">
              <div class="container bottom-line">
                <div v-if="!link.mobile" class="col-xs-2 slideInDown" v-for="(link,index) in links" :key="index" :style="{ animationDuration: `${(index + 1 ) * 100 }ms` }" @click="gotoLink(link)">
                  <a href="javascript:void(0)" class="navbar-poster animation-delay-1" @click="close">
                    <img :src="link.image" class="navbar-poster-img" style="object-fit: contain">
                  </a>
                  <p v-if="link.platform === 'PG' || link.platform === 'MG'" class="newlabel"><img src="~assets/images/new.png"></p>
                </div>
              </div>
              <div class="container">
                <div class="navbar-game-buttons col-xs-12 slideInDown animation-delay">
                  <ul>
                    <li>
                      <nuxt-link to="/promo">
                        <i class="fa fa-th"></i> 优惠活动介绍</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/download">
                        <i class="fa fa-download"></i> 下载中心</nuxt-link>
                    </li>
                    <li v-if="auth">
                      <nuxt-link to="/uc/account">
                        <i class="fa fa-universal-access"></i> 查看我的钱包</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavigationDropdown",
  props: {
    value: {
      type: null
    },
    links: {
      type: Array
    }
  },
  methods: {
    showErrorModal() {
      this.$store.commit("modal/OPEN_MODAL", {
        content: "请先登录!。",
        type: "error"
      });
    },
    async gotoLink(link) {
      this.$emit("link", link);
      this.close();
    },
    close() {
      this.$emit("input", false);
    }
  },
  computed: {
    ...mapGetters(["auth"])
  }
};
</script>

<style lang="sass" scoped>
  @-webkit-keyframes slideInDown
    from
      -webkit-transform: translate3d(0, -100%, 0)
      transform: translate3d(0, -100%, 0)
      visibility: visible

    to
      -webkit-transform: translate3d(0, 0, 0)
      transform: translate3d(0, 0, 0)


  @keyframes slideInDown
    from
      -webkit-transform: translate3d(0, -100%, 0)
      transform: translate3d(0, -100%, 0)
      visibility: visible

    to
      -webkit-transform: translate3d(0, 0, 0)
      transform: translate3d(0, 0, 0)

  .slideInDown
    -webkit-animation-name: slideInDown
    animation-name: slideInDown
    .newlabel img
      width: 30%
      position: absolute
      top: 0
      right: 15px

  .fade-enter-active, .fade-leave-active
    transition: opacity .3s

  .fade-enter, .fade-leave-to
    opacity: 0

  .animation-delay
    animation-duration: 500ms
  nav.row
    .nav-desktop
      position: fixed
      top: 0
      left: 0
      width: 100%
      margin: 0
      z-index: 100

      ul
        list-style: none
        display: table
        margin: 0 auto

        li
          float: left

          &:not(:first-child)
            margin-left: 20px

          &.small-margin
            margin-left: 5px

          a
            color: rgba(255,255,255,0.7)
            text-decoration: none
            transition: color 200ms, background-color 200ms, border-color 200ms
            transition-property: color, background-color, border-color
            transition-duration: 200ms, 200ms, 200ms
            transition-timing-function: initial, initial, initial
            transition-delay: initial, initial, initial
            &:hover
              color: #ffffff
  .navbar-game-buttons
    ul
      text-align: center
      margin: 0 auto
      li
        .fa
          color: #00aeff
        img.nav-menu-ico
          width: 16px
          margin: 0 3px
  .navbar-game-mask
    position: fixed
    z-index: 9998
    top: 95px
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, .7)
    display: table
    transition: opacity .3s ease
    .navbar-game-wrapper
      display: table-cell
      vertical-align: top
      .navbar-game-container
        width: 100%
        margin: 0px auto
        padding: 15px 20px
        transition: all .3s ease
        border-top: 1px solid rgba(255,255,255,.15)
        border-bottom: 1px solid rgba(255,255,255,.15)
        box-shadow: 0 8px 17px 0 rgba(0,0,0,.2)
        background: radial-gradient(ellipse farthest-side at center top,#283244 0,rgba(21,26,35,.95) 100%)
        .navbar-game-body
          margin: 0 auto
          .bottom-line
            border-bottom: 1px solid rgba(#fff, .1)
            margin-bottom: 15px

        .navbar-poster
          position: relative
          display: inline-block
          height: 180px
          width: 100%
          overflow: hidden
          box-shadow: 0 8px 17px rgba(0,0,0,.1)
          margin: 0 20px 15px 0
          font-size: 0
          transition: border-color .2s
          -webkit-transform: translateZ(0)
          transform: translateZ(0)

          &:hover
            box-shadow: 0 8px 17px rgba(0,0,0,.1)
          &:after
            content: ''
            position: absolute
            top: 0
            bottom: 0
            left: 0
            right: 0
            border: 1px solid rgba(255,255,255,.15)
            pointer-events: none
            &:hover
              border: 1px solid rgba(255,255,255,.3)

          .navbar-poster-img
            position: absolute
            left: 50%
            -webkit-transform: translateX(-50%)
            -ms-transform: translateX(-50%)
            transform: translateX(-50%)
            height: 180px
            width: 336px
            -webkit-filter: brightness(100%) contrast(100%)
            filter: brightness(100%) contrast(100%)
            transition: -webkit-filter .2s
            transition: filter .2s
            transition: filter .2s,-webkit-filter .2s

            &:hover
              filter: brightness(115%) contrast(90%)

  @media (max-width: 768px)

    .slideInDown
      padding-left: 0
    .navbar-game-mask
      .navbar-game-wrapper
        .navbar-game-container
          padding: 15px 0!important
          .navbar-game-body
            .bottom-line
              padding-left: 0

</style>
