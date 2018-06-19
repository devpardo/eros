<template>
  <div class="tab-menu col-md-3 col-sm-3 col-xs-12">
    <no-ssr>
      <div class="container">
        <vue-select class="visible-xs" :value="defaultLink" :options="selectedMenus" @input="selectedRouter" />
      </div>
    </no-ssr>
    <ul class="nav nav-pills nav-stacked hidden-xs">
      <template v-for="item in menu">
        <li :class="{ active: ($route.path).includes(item.link) }" :key="item.index">
          <nuxt-link :to="item.link">{{ item.cname }}</nuxt-link>
          <!-- <nuxt-link v-else to="/new-cooperation">{{ item.cname }}</nuxt-link> -->
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
        name: "FAQ",
        label: "常见问题",
        value: "/cooperation/faq"
      },
      menu: [
        { name: "FAQ", cname: "常见问题", link: "/cooperation/faq" },
        {
          name: "Financial",
          cname: "存提向导",
          link: "/cooperation/financial"
        },
        {
          name: "Disclaimer",
          cname: "免责声明",
          link: "/cooperation/disclaimer"
        },
        { name: "Terms", cname: "服务条款", link: "/cooperation/terms" },
        { name: "Privacy", cname: "隐私政策", link: "/cooperation/privacy" },
        {
          name: "Responsible Gaming",
          cname: "责任博彩",
          link: "/cooperation/responsible-gaming"
        },
        { name: "Affiliate", cname: "加盟合作", link: "/new-cooperation" }
      ]
    };
  },
  computed: {
    ...mapGetters(["cooperations"]),
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
            size: 14px
          color: #999
          border-radius: 0

          i
            float: right

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
</style>
