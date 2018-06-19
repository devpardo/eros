<template>
  <section class="index nav-page-margin">
    <carousel />
    <notices />
    <platform />
    <div class="line-break container notices-container"></div>
    <call-to-actions />
    <!-- <promo-aside /> -->
  </section>
</template>

<script>
import CallToActions from "~/components/home/CallToActions";
import Carousel from "~/components/home/Carousel";
import Platform from "~/components/home/Platform";
import PromoModal from "~/components/shared/PromoModal";
import Notices from "~/components/shared/Notices";
// import PromoAside from "~/components/shared/PromoAside";

export default {
  components: {
    Carousel,
    Platform,
    CallToActions,
    PromoModal,
    Notices
    // PromoAside
  }
};
</script>

<style lang="sass">
  @import './assets/sass/_variables'
  .index
    overflow: hidden

    .line-break
      border-bottom: 1px solid $gray-lighter
      /* Extra Small Devices, Phones */

  .notices-container-background
    position: relative
    top: -35px

  @media only screen and (max-width: 480px) 
    .notices-container-background
      position: relative
      top: 0

</style>
