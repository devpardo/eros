<template>
  <div class="spinner" :class="classSpin">
    <div class="spinner-icon" style="height: 35px; width: 35px;" @click="spin"></div>
  </div>
</template>
<script>
  export default {
    name: "Spinner",
    data() {
      return {
        spin: false
      };
    },
    computed: {
      classSpin() {
        return this.spin ? "fa-spin" : "";
      }
    },
    methods: {
      async spin() {
        this.spin = true;
        await this.$sleep(2000);
        this.spin = false;
      }
    }
  };
</script>

<style lang="sass" scoped>

@import './assets/sass/_variables'

.spinner
  position: absolute
  left: 50%
  top: 40px
  margin-left: -20px
  z-index: 19
  animation: loading-bar-spinner .8s linear infinite

  .spinner-icon
    border:  solid 3px transparent
    border:
      top-color:  $blue-19
      left-color: $blue-19
    border-radius: 50%
</style>
