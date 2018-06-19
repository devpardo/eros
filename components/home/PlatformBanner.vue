<template>
  <div>
    <div class="card">
      <div class="card-hover animated" :style="{background: platform.background}">
        <div>
          <img :src="platform.platform_icon" alt="" class="platform-icon">
          <span>{{ platform.name }}</span>
        </div>
      </div>
      <div class="card-img">
        <img :src="image" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlatformBanner",
  inject: ["MEDIA_SERVER"],
  props: {
    platform: {
      type: Object
    }
  },
  computed: {
    image(image) {
      return `${this.MEDIA_SERVER}/web/${this.platform.imgUrl}`;
    }
  }
};
</script>
<style lang="sass" scoped>
  @import './assets/sass/_variables'

  .card
    height: 130px
    position: relative
    margin-bottom: 10px
    cursor: pointer
    overflow: hidden

    &:hover
      .card-hover
        display: table

    .card-hover
      background: $blue-7
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      display: none
      z-index: 2
      animation-name: bounceInDown
      webkit-animation-name: bounceInDown
      color: #fff

      div
        display: table-cell
        vertical-align: middle
        text-align: center

        .platform-icon
          width: 75%
          height: auto
          display: block
          margin: 0 auto
          margin-bottom: 10px
        span
          color: #fff


    .card-img
      display: block
      width: 100%
      height: 100%
      overflow: hidden
      position: relative

      img
        position: absolute
        top: -9999px
        bottom: -9999px
        left: -9999px
        right: -9999px
        margin: auto
        z-index: 1
        width: 100%
        height: auto

  @-webkit-keyframes bounceInDown
  from,
  60%,
  75%,
  90%,
  to
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1)
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1)

  0%
    opacity: 0
    -webkit-transform: translate3d(0, -3000px, 0)
    transform: translate3d(0, -3000px, 0)

  60%
    opacity: 1
    -webkit-transform: translate3d(0, 25px, 0)
    transform: translate3d(0, 25px, 0)

  75%
    -webkit-transform: translate3d(0, -10px, 0)
    transform: translate3d(0, -10px, 0)

  90%
    -webkit-transform: translate3d(0, 5px, 0)
    transform: translate3d(0, 5px, 0)

  to
    -webkit-transform: translate3d(0, 0, 0)
    transform: translate3d(0, 0, 0)


  @keyframes bounceInDown
    from,
    60%,
    75%,
    90%,
    to
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1)
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1)

    0%
      opacity: 0
      -webkit-transform: translate3d(0, -3000px, 0)
      transform: translate3d(0, -3000px, 0)

    60%
      opacity: 1
      -webkit-transform: translate3d(0, 25px, 0)
      transform: translate3d(0, 25px, 0)

    75%
      -webkit-transform: translate3d(0, -10px, 0)
      transform: translate3d(0, -10px, 0)

    90%
      -webkit-transform: translate3d(0, 5px, 0)
      transform: translate3d(0, 5px, 0)

    to
      -webkit-transform: translate3d(0, 0, 0)
      transform: translate3d(0, 0, 0)

  .animated
    -webkit-animation-duration: .8s;
    animation-duration: .8s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;


  .bounceInDown
    -webkit-animation-name: bounceInDown
    animation-name: bounceInDown

  @media (max-width: 480px)
    .card
      height: 100px
      margin-bottom: 10px

      &:hover
        .card-hover
          display: none

  @media (max-width: 375px)
    .card
      margin-bottom: 0

      &:hover
        .card-hover
          display: none

  @media (max-width: 320px)
    .card
      height: 90px

      &:hover
        .card-hover
          display: none

</style>
