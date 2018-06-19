<template>
    <section class="how-to-install custom-padding-none">
      <div class="banner" :style="{ backgroundImage: `url(${banner})`}">
        <div class="container">
          <div class="how-to-cta">
            <img src="https://cdn.mr007.co/images/web/download/platforms-how-to.png">
            <h1>如何安装？</h1>
            <h3>亿万先生带你开车</h3>
          </div>
        </div>
      </div>
      <div class="center-note container custom-padding mobile-container">
        <h3 class="title">
          <a href="/download">
            <i class="fa fa-arrow-circle-left"></i> 返回下载中心
          </a>
        </h3>
        <how-to-tab-menu/>
        <nuxt-child :key="$route.fullPath"/>
      </div>
    </section>
  
</template>

<script>
import HowToTabMenu from "~/components/shared/HowToTabMenu";
import { mapActions } from "vuex";

export default {
  inject: ["MEDIA_SERVER"],
  data() {
    return {
      banner: `${this.MEDIA_SERVER}/web/download/how-to-banner.png`
    };
  },
  components: {
    HowToTabMenu
  }
};
</script>

<style lang="sass">
  @import './assets/sass/_variables'
  .how-to-install
    margin-top: 46px
    .banner
      height: 375px
      background:
        position: bottom center
        size: cover
      position: relative
      padding-top: 140px

      .container
        position: relative
        height: 100%

        .how-to-cta
          h1
            color: #006C9D
            font-size: 43px
            margin-bottom: 10px
          h3
            color: #AAAAAA
            font-size: 24px
            font-weight: normal
    .center-note
      padding:
        top: 50px
        bottom: 50px
  
  @media (max-width: 414px)
    .how-to-install
      margin-top: 0
      .banner
        padding-top: 9px
        .container
          .how-to-cta
            h1
              font-size: 33px
            h3
              font-size: 19px
      .center-note
        padding-top: 0
        padding-bottom: 0
        
</style>
