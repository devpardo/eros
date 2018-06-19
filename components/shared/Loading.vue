<template>
  <div class="mr-loading" v-if="loading">
    <div class="sp sp-circle"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'

  .mr-loading
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: rgba(0,0,0,0.6)
    z-index: 99998

  .sp.sp-circle 
    position: absolute
    top: 50%
    left: 50%
    margin:
      top: -16px
      left: -16px
    width: 32px
    height: 32px
    border: 4px rgba($default,0.25) solid
    border-top: 4px rgba($default,1) solid
    border-radius: 50%
    -webkit-animation: spCircRot .6s infinite linear
    animation: spCircRot .6s infinite linear

  @-webkit-keyframes spCircRot 
    from 
      -webkit-transform: rotate(0deg)
    to
      -webkit-transform: rotate(359deg)
  
  @keyframes spCircRot
    from
      transform: rotate(0deg)
    to
      transform: rotate(359deg)
</style>