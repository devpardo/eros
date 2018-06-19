<template>
  <div class="nav-desktop">
    <toolbar v-on="$listeners" />
    <div class="navigation" :class="classScrolled">
      <div class="container">
        <nuxt-link class="logo ie-logo" to="/">
          <img src="~/assets/images/mrlogo-w.svg">
        </nuxt-link>
        <ul class="links">
          <li v-for="(link,index) of links" :key="index">
            <a v-if="link.links" href="javascript:void(0)" @click="setDropdown(link.id, link.links)">
              {{ link.name }}
              <i class="fa" :class="[currentDropdown === link.id ? 'fa-angle-up' : 'fa-angle-down']"></i>
              <span class="label label-danger" v-if="link.badge">{{ link.badge }}</span>
            </a>
            <a v-else class="link" @click="linkAction(link)" :class="[$route && link.to && link.to.name === $route.name ? 'active' : '']">
              {{link.name}}
              <span class="label label-danger" v-if="link.badge">
                {{ link.badge }}
              </span>
            </a>
          </li>
        </ul>

      </div>
    </div>

    <navigation-dropdown v-model="dropdown" @input="setDropdown()" :key="currentDropdown" :links="currentDropdownLinks" @link="linkAction" v-on="$listeners" />

  </div>

</template>

<script>
import { mapGetters } from "vuex";
import navigation from "~/mixins/navigation";
import NavigationDropdown from "~/components/shared/NavigationDropdown";
import Toolbar from "~/components/shared/Toolbar";
export default {
  name: "NavigationDesktop",
  mixins: [navigation],
  components: {
    NavigationDropdown,
    Toolbar
  },
  data() {
    return {
      scrolled: false,
      routes: ["index", "game", "newGame", "casino", "fishing"],
      currentDropdown: "",
      currentDropdownLinks: [],
      dropdown: false
    };
  },
  computed: {
    ...mapGetters("platform", ["platforms"]),
    ...mapGetters("sport", ["sports"]),

    classScrolled() {
      return this.scrolled || !this.isTransparent ? "scrolled" : "static";
    },
    isTransparent() {
      return this.routes.includes(this.$route.name);
    }
  },
  methods: {
    linkAction(link) {
      if (link.auth && !this.auth) {
        return this.$notify("请先前往登录。", "error");
      }
      this.setDropdown();
      if (link.event) {
        this.$emit(link.event, link);
      }
      if (link.to) {
        this.$router.push(link.to);
      }
    },
    gotoPlatform(platform) {
      this.$router.push({
        name: "game",
        query: { platform: platform.platform, type: 1 }
      });
      this.closeGamesDropDown();
    },
    closeBoth() {
      this.closeGamesDropDown();
      this.closeSportsDropDown();
    },
    gotoSport(sport) {
      this.$router.push({
        name: "sport",
        query: { sport: sport.sport, type: 1 }
      });
      this.closeSportsDropDown();
    },
    setDropdown(name = "", links = []) {
      this.currentDropdownLinks = links;
      this.currentDropdown = name === this.currentDropdown ? "" : name;
      this.dropdown = !!this.currentDropdown;
    },
    scroll() {
      let supportPageOffset = window.pageYOffset !== undefined;
      let isCSS1Compat = (document.compatMode || "") === "CSS1Compat";
      let scrY = supportPageOffset
        ? window.pageYOffset
        : isCSS1Compat
          ? document.documentElement.scrollTop
          : document.body.scrollTop;
      this.scrolled = scrY > 50;
    }
  },
  async mounted() {
    if (!process.browser) return;
    this.$addListenersToEvent("scroll", this.scroll);
  },
  destroyed() {
    if (!process.browser) return;
    this.$removeListenersToEvent("scroll", this.scroll);
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'

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

  .fade-enter-active, .fade-leave-active
    transition: opacity .3s

  .fade-enter, .fade-leave-to
    opacity: 0

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
            border-bottom: solid 1px rgba(#fff, .1)
            margin-bottom: 15px
          .navbar-game-buttons
            ul
              text-align: center
              margin: 0 auto
              li
                img.nav-menu-ico
                  width: 16px
                  margin: 0 3px
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


  $placeholder-color: #a7a7a7
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
        margin: 0

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

      .top-area, .navigation
        width: 100%

      .top-area
        min-height: 45px
        background: $blue-19

        .container
          padding: 0
          ul
            float: left

            li
              .blue
                color: #00aeff !important
              a
              color: white
              line-height: 45px
              font:
                size: 12px
              text-decoration: none

              img
                width: 20px
                margin-right: 2px
                margin-bottom: 2px

              i
                font-size: 18px
                margin-right: 2px

          form
            float: right
            padding: 6px 0

            div
              position: relative
              background: rgba(#000, .3)
              border-radius: 4px
              border: 1px solid rgba(#00aeff, .5)

              &:not(:first-child)
                margin-left: 5px

              a, input
                height: 32px
                font-size: 12px
                line-height: 32px
                background: none
                color: #fff
                font-weight: bold
                &::placeholder
                  color: rgba(#00aeff, .5) !important

              a
                text:
                  align: center
                  decoration: none

                &.btn-sign-up
                  display: inline-block
                  width: 100px
                  background: $secondary
                  color: white
                  letter-spacing: 0.5px
                  text-transform: uppercase
                  border: none
                    radius: 2px

                &.icon-fp
                  position: absolute
                  width: 30px
                  right: 0
                  color: #00aeff
                  font-size: 14px

                  &:hover
                    color: $blue-11

              input
                font-size: 12px
                padding: 0 10px
                border: none
                  radius: 2px

                &::-webkit-input-placeholder
                  color: $placeholder-color

                &:-moz-placeholder
                  color: $placeholder-color

                &::-moz-input-placeholder
                  color: $placeholder-color

                &::-ms-input-placeholder
                  color: $placeholder-color

                &[type="text"]
                  width: 170px

                &[type="submit"]
                  width: 100px
                  background: $light-blue-2
                  border: none
                  text-transform: uppercase
                  color: white
                  letter-spacing: 0.5px

          .user-details
            float: right
            margin-bottom: 0

            li
              p
                color: white
                line-height: 45px
                margin-bottom: 0

                i
                  margin-right: 5px

              span.label
                position: relative
                top: -2px
                margin-left: 2px
                border-radius: 50% !important
                font-size: 50%
                font-weight: 500


              a.button-call
                min-width: 100px
                background: $default
                color: $gray-16
                font-weight: 500
                display: inline-block
                line-height: 32px
                margin-top: 7px
                text-align: center
                letter-spacing: .5px
                border-radius: 2px

                &.btn-account
                  background: $info
                  color: $default


      .navigation
        min-height: 50px
        transition: background 0.4s linear

        &.scrolled
          background: $blue-13

        &.static
          background: rgba(7, 34, 64, 0.7)

        .container
          padding: 0

          a.logo
            margin-right: 50px
            display: inline-block
            margin-top: 8px
            float: left


            img
              width: 120px
              height: 32px

          ul.links
            float: right
            display: flex

            li
              position: relative
              &:not(:first-child)
                margin-left: 10px

              &:after
                content: '\00a0'
                background: rgba(#fff, .5)
                height: 2px
                width: 2px
                position: absolute
                border-radius: 100%
                top: 24px

              &:last-child:after
                content: ''
                display: none

              &:nth-child(10)
                width: 80px


              a
                font-size: 15px
                text-align: center
                width: 85px
                display: inline-block
                line-height: 50px
                height: 50px
                font-weight: 700

                span
                  right: 0
                  margin:
                    top: 0
                    left: 0
                  float: right
                  padding: 2px 4px
                  position: absolute
                  border-radius: 0
                  font-weight: 100
                  font-size: 12px
                  transform: scale(.7)


                &.active
                  color: rgba(#fff, 1)
                  border-bottom: 2px solid $secondary

  @media (min-width: 1200px)
    .container
      width: 1200px

  @media (max-width: 1199px)
    nav.row .nav-desktop
      .navigation .container ul.links li a
        font-size: 0.9em
        width: 52px
      .top-area .container ul li a
        font-size: 12px

  @media (max-width: 768px)
    .toplinks
      display: none

    ul.user-details
      font-size: 12px

    nav.row .nav-desktop .navigation .container ul.links
      display: inline
</style>
