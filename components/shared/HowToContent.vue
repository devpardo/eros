<template>
  <div class="center-note container">
    <h3 class="title">
      <a href="">
        <i class="fa fa-arrow-circle-left"></i> 返回下载中心
      </a>
    </h3>
    <how-to-tab-menu/>
  </div>
</template>

<script>
import HowToTabMenu from "~/components/shared/HowToTabMenu";
export default {
  components: {
    HowToTabMenu
  },
  created () {
    this.$router.push('/how-to-install/desktop-app')
  }
}
</script>

<style lang="sass" scoped>
  .center-note
    padding:
      top: 50px
      bottom: 50px
</style>
