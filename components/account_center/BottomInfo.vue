<template>
  <p class="bottom-info">
    <i :class="info.icon"></i>
    <span v-html="info.message"></span>
  </p>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  }
};
</script>

<style lang="sass" scoped>
  .bottom-info
    position: absolute
    // bottom: 5px
    bottom: 25px
    left: 30px
    font-size: 12px
    color: #D9534F

    i
      margin-right: 5px
  
  p
    margin-right: 15px
  
  .col-xs-12
    padding:
      left: 0
      right: 0
  .col-sm-12
    padding:
      left: 0
      right: 0
  @media screen and (max-width: 480px)
    .bottom-info
      padding: 0 15px
      left: 0

</style>
