<template>
  <section class="account-center-holder">
    <div class="account-center container">
      <top-details :lastLogin="auth.lastlogintime" v-if="auth" />
      <account-details :userDetails="auth" />
      <providers />
    </div>
  </section>
</template>

<script>
import TopDetails from "~/components/account_center/account/TopDetails";
import AccountDetails from "~/components/account_center/account/AccountDetails";
import Providers from "~/components/account_center/account/Providers";

import { mapState, mapGetters } from "vuex";

export default {
  middleware: "notAuthorized",
  components: {
    TopDetails,
    AccountDetails,
    Providers
  },
  computed: {
    ...mapGetters(["auth"])
  }
};
</script>

<style lang="sass" scoped>
  // @import './assets/css/test.sass'
  .page-enter
    opacity: 1

  .page-enter-active, .page-leave-active
    transition-duration: 0s !important

  .account-center-holder
    .account-center.container
      padding: 0 0 20px
</style>
