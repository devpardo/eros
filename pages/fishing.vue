<template>
  <section class="fishing static-navbar-page-margin-not" :style="[stylePageBackground]">
    <div class="container">
      <div class="fishing-banner" :style="[styleFisherBanner]"></div>
      <div class="fishing-platforms row">
        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3" v-for="(platform, index) in platforms" :key="index">
          <platform-fishing-game :platform="platform" :index="index"></platform-fishing-game>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PlatformFishingGame from "@/components/game/PlatformFishingGame";
import { mapState } from "vuex";
export default {
  name: "Fishing",
  inject: ["MEDIA_SERVER"],
  components: {
    PlatformFishingGame
  },
  data() {
    return {
      pageBackground: "/web/fishing/fishing.jpg",
      fisherBanner: "/web/fishing/slogan.png",
      platforms: [
        {
          background: "/web/fishing/GG.png",
          animation: "platform-GG-img",
          buttons: [
            {
              link: "http://www.gg626.com/download.do",
              image: "/web/fishing_ios.png"
            },
            {
              link: "http://yw007.com/ggFishing.apk",
              image: "/web/fishing_android.png"
            }
          ],
          gamecode: "nemo",
          gamename: "Finding Nemo",
          platform: "GG"
        },
        {
          background: "/web/fishing/swpt.png",
          animation: "platform-SWPT-img",
          gamecode: "sw_fufish_intw",
          gamename: "Fu Fish",
          img_url: process.browser
            ? `${window.location.origin}/web/fishing/PT.png`
            : "",
          platform: "SWPT"
        },
        {
          background: "/web/fishing/AG.png",
          animation: "platform-AG-img",
          gamecode: "octopus",
          gamename: "Octopus",
          platform: "AG"
        },
        {
          background: "/web/fishing/PT.png",
          animation: "platform-PT-img",
          gamecode: "cashfi",
          gamename: "Cash Fish",
          img_url: process.browser
            ? `${window.location.origin}/web/fishing/PT.png`
            : "",
          platform: "PT"
        }
      ]
    };
  },
  computed: {
    stylePageBackground() {
      return {
        backgroundImage: `url(${this.MEDIA_SERVER}/web/fishing/fishing.jpg)`
      };
    },
    styleFisherBanner() {
      return {
        backgroundImage: `url(${this.MEDIA_SERVER}/web/fishing/slogan.png)`
      };
    }
  }
};
</script>

<style lang="sass" scoped>
  .fishing
    background:
      size: cover
      position: center center

    .container
      .fishing-banner
        height: 380px
        background:
          repeat: no-repeat
          position: center center
          size: contain
        margin: 120px auto 0

      .fishing-platforms
        width: 1170px
        margin-left: -30px

        .fishing-platform
          float: left
          height: 300px
          width: 300px
          position: relative

          &.item-push
            margin-top: 100px

          a
            display: inline-block

          .main
            height: 300px
            width: 300px
            background:
              size: 300px 300px
              repeat: no-repeat

        .fishing-platform:hover
          background-image: url(https://cdn.mr007.co/images/web/fishing/bubbles.gif)
          background-position: center center

  @media (min-width: 1024px)
    .fishing
      height: 990px
  @media (max-width: 1024px)
    .fishing .container .fishing-platforms
      width: 100%

    .col-md-3
      padding-left: 0

    .fishing .container .fishing-platforms .fishing-platform
      &.item-push
        margin-top: 100px
      float: left
      height: 300px
      width: 300px
      position: relative
      float: left
      height: 300px
      width: 300px
      position: relative
      margin-bottom: 100px

    .buttons
      position: absolute
      bottom: -37px
      left: 0
      width: 100%
      text-align: center
      a
        height: 45px
        width: 96px
        margin: 0 2px
        display: inline-block

  @media (max-width: 768px)
    .fishing .container .fishing-platforms
      width: 100%
      margin-left: 0

    .col-md-3
      padding-left: 15px
      margin: 20px 0
    .fishing .container .fishing-platforms .fishing-platform
      &.item-push
        margin-top: 0!important

    .fishing .container .fishing-platforms .fishing-platform
      margin-bottom: 20px

  @media (max-width: 414px)
    .fishing .container .fishing-platforms .fishing-platform
      margin-bottom: 0
      margin-top: 60px
    .col-md-3
      padding-left: 35px
      margin: 0

  @media (max-width: 375px)
    .col-md-3
      padding-left: 15px
  @media (max-width: 320px)
    .fishing .container .fishing-platforms .fishing-platform
      height: 100%
      width: 100%
</style>
