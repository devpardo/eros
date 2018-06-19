<template>
  <div class="account-center-layout">
    <account-center-menu></account-center-menu>
    <nuxt-child :key="$route.fullPath"></nuxt-child>
  </div>
</template>

<script>
import AccountCenterMenu from "~/components/account_center/AccountCenterMenu";
export default {
  name: "PageUserControl",
  components: {
    AccountCenterMenu
  }
};
</script>


<style lang="sass" scoped>
  @media only screen and (min-width: 768px)
    .account-center-layout
      margin-top: 93px
</style>
