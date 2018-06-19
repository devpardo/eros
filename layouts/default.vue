<template>
  <div class="div-box">
    <navigation></navigation>
    <nuxt></nuxt>
    <mraside></mraside>
    <foot></foot>
    <context-modal></context-modal>
  </div>
</template>

<script>
import Navigation from "~/components/shared/Navigation";
import Foot from "~/components/shared/Footer";
import Mraside from "~/components/shared/Aside";
import ContextModal from "~/components/shared/ContextModal";

export default {
  name: "Default",
  provide() {
    return {
      MEDIA_SERVER: process.env.MEDIA_SERVER,
      API_MR: process.env.API_MR,
      API_MRTV: process.env.API_MRTV
    };
  },
  components: {
    Navigation,
    Mraside,
    Foot,
    ContextModal
  },
  async beforeMount() {
    await this.$store.dispatch("getLinks");
  }
};
</script>
<style lang="sass">
  .div-box
    width: 100%
    min-height: 100%
    position: relative
    overflow: hidden
  @media (min-width: 1200px)
    .container
      width: 1200px
</style>
