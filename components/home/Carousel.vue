<template>
  <div v-touch="touchListeners" class="carousel slide" id="mainCarousel" data-ride="carousel" :data-interval="interval">
    <ol class="carousel-indicators">
      <li data-target="#mainCarousel" v-for="(slide, index) in banners" :key="index" :data-slide-to="index" :class="{ active: index === 0}"></li>
    </ol>
    <div class="carousel-inner">
      <nuxt-link :to="slide.link" class="item" v-for="(slide, index) in banners" :key="index" :class="{ active: index === 0}" :style="{ backgroundImage: `url(${slide.img})`, backgroundPosition: 'top center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }">
      </nuxt-link>
    </div>
    <a class="left carousel-control" href="#mainCarousel" data-slide="prev">
      <span class="fa fa-angle-left fa-3x"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#mainCarousel" data-slide="next">
      <span class="fa fa-angle-right fa-3x"></span>
      <span class="sr-only">Next</span>
    </a>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["banners", "notices"]),
    touchListeners() {
      return {
        left: () => $("#mainCarousel").carousel("next"),
        right: () => $("#mainCarousel").carousel("prev")
      };
    }
  },
  async mounted() {
    await this.$store.dispatch("getBanners"),
      (this.dataList = this.notices.slice());
    this.dataList.sort(function(a, b) {
      return new Date(b.intime).getTime() - new Date(a.intime).getTime();
    });

    // if (process.browser) {
    //   var interval = setInterval(() => {
    //     if (this.checkMarqueeDetailsLength()) {
    //       this.runCarouselAnimation()
    //       clearInterval(interval)
    //     }
    //   }, 1200)
    // }
  },
  data() {
    return {
      modal: {
        notice: false
      },
      interval: 5000
    };
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  @keyframes marqueeAnimation
    0%
      transform: translateX(100px)

    100%
      transform: translateX(-100%)

  #mainCarousel
    height: 400px
    position: relative
    // margin-top: 45px

    ol.carousel-indicators
      bottom: 30px

      li
        margin: 0 2px
        background: white
        width: 10px
        height: 10px
        transition: all 0.3s linear

      .active
        width: 20px
        height: 10px
        background-color: #206b99
        border: transparent

    .carousel-control
      width: 100px

      span
        line-height: 400px !important

    .carousel-inner, .carousel-inner .item
      height: 100%

    .carousel-inner
      position: relative

      .item
        &.active
          .carousel-caption
            *
              opacity: 1

            h1, p
              transform: translateY(0)

        .carousel-caption
          position: absolute
          top: 0
          left: calc(calc(100% - 1140px) / 2)
          width: 500px
          height: 300px
          padding: 100px 0 0

          *
            text-align: left
            transition: all 0.2s linear
            opacity: 0


    .marquee
      position: absolute
      bottom: 0
      left: 0
      right: 0
      background: rgba(0,0,0,0.6)
      height: 35px
      color: white

      .container
        padding: 0
        i, .marqueeDetails
          float: left

        i
          width: 15px

        .marqueeDetails
          width: 1175px
          overflow: hidden

          &:hover
            ul
              animation-play-state: paused !important

          ul
            display: table
            margin: 0
            // +animation(marqueeAnimation 180s linear infinite)

            li
              float: left
              margin-right: 1170px

              &:first-child
                margin-left: 1170px

              a
                color: white
                font-weight: 100
                text-decoration: none

        i, ul li
          line-height: 35px
          margin-left: 7px

  @media (min-width: 600px)
    #mainCarousel
      margin-top: 0

  @media (max-width: 768px)
    #mainCarousel .marquee .container .marqueeDetails
      margin:
        top: -35px
        left: 15px
    #mainCarousel
      height: 400px
      .carousel-indicators,.carousel-control
        display: none
      .marquee
        bottom: -34px

  @media (max-width: 414px)
    #mainCarousel
      height: 140px

  @media (min-width: 1280px)
    #mainCarousel
      margin-top: 45px
</style>
