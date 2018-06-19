<template>
  <div class="tab-menu col-md-3 col-sm-3 col-xs-12">
    <no-ssr>
      <div class="mobile-container">
        <vue-select class="visible-xs" :value="defaultLink" :options="selectedMenus" @input="selectedRouter" />
      </div>
    </no-ssr>
    <ul class="nav nav-pills nav-stacked hidden-xs">
      <template v-for="item in menu">
        <li :class="{ active: ($route.path).includes(item.link) }" :key="item.link">
          <nuxt-link :to="item.link">{{ item.cname }}</nuxt-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultLink: {
        name: "Desktop App",
        label: "亿万客户端 — 桌面版",
        value: "/how-to-install/desktop-app"
      },
      menu: [
        {
          name: "Desktop App",
          cname: "亿万客户端 — 桌面版",
          link: "/how-to-install/desktop-app"
        },
        {
          name: "Desktop PT",
          cname: "PT 客户端 — 桌面版",
          link: "/how-to-install/desktop-pt"
        },
        {
          name: "Android PT",
          cname: "PT 手机端 — Android 版",
          link: "/how-to-install/android-pt"
        },
        {
          name: "IOS AG",
          cname: "AG 手机端 — IOS 版",
          link: "/how-to-install/ios-ag"
        },
        {
          name: "Android AG",
          cname: "AG 手机端 — Android 版",
          link: "/how-to-install/android-ag"
        },
        {
          name: "IOS GG",
          cname: "GG 手机端 — IOS 版",
          link: "/how-to-install/ios-gg"
        },
        {
          name: "Android GG",
          cname: "GG 手机端 — Android 版",
          link: "/how-to-install/android-gg"
        },
        {
          name: "IOS MRFUN",
          cname: "亿万手机端 — iOS 版",
          link: "/how-to-install/ios-mrfun"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["how-to-install"]),
    selectedMenus() {
      return this.menu.map(menu => ({
        label: menu.cname,
        value: menu.link
      }));
    }
  },
  methods: {
    selectedRouter(link) {
      link = link || this.defaultLink;
      this.$router.push(link.value);
    }
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .v-select, .v-select *
    & /deep/ button.clear
      display: none !important

  .tab-menu
    padding-left: 0
    float: left

    .v-select
      margin-bottom: 20px

    &.fixed
      position: fixed

    &.absolute
      position: absolute

    ul
      // border: 1px solid $cooperation-tm-base-color
      radius: $radius-min-4
      overflow: hidden

      li
        margin-top: 0

        &:not(:first-child)
          border-top: 1px solid $cooperation-tm-base-color

        a
          font:
            size: 16px
            weight: 300
          color: $cooperation-tm-text-color
          border-radius: 0

          &:hover:not(.active)
            background: $cooperation-tm-hover-background-color

        &.active
          a, a:focus
            background: hsl(0, 0%, 100%)
            font-weight: 700
            // background: $cooperation-tm-base-color !important
            color: $cooperation-tm-text-color !important


  .nav>li>a
    position: relative
    display: block
    padding: 15px
    
  @media (max-width: 414px)
    .tab-menu
      padding-left: 0
      float: left
      padding-right: 0
    
    .how-to-install .center-note
      padding-top: 0
      padding-bottom: 0

</style>
