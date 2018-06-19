<template>
  <footer>

    <footer-desktop class="hidden-xs">
    </footer-desktop>

    <footer-mobile class="visible-xs">
    </footer-mobile>

  </footer>

</template>

<script>
import FooterDesktop from "~/components/shared/FooterDesktop";
import FooterMobile from "~/components/shared/FooterMobile";

export default {
  name: "Footer",
  components: {
    FooterDesktop,
    FooterMobile
  }
};
</script>

<style lang="sass">
  footer
    width: 100%
    position: relative
    bottom: 0
</style>
