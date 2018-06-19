<template>
  <div class="center-note container custom-padding">
    <tab-menu :dataItems="dataItems"/>
    <tab-content :dataItems="dataItems"/>
  </div>
</template>

<script>
import TabMenu from "./layout/TabMenu";
import TabContent from "./layout/TabContent";
export default {
  props: ["dataItems"],
  components: {
    TabMenu,
    TabContent
  }
};
</script>

<style lang="sass" scoped>
  .center-note
    padding:
      top: 100px
      bottom: 30px
</style>
