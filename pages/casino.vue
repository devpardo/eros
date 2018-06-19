<template>
  <section class="casino text-center" :style="{ backgroundImage: `url(//cdn.mr007.co/images/web/casino-background.jpg)` }">
    <div class="holder">
      <div class="container text-center">
        <div class="casinobox">
          <div class="AGbox col-sm-6 col-xs-6" @click="launch">
            <img src="@/static/images/casino/logo_ag.png" alt="" class="box-icon">
            <img src="@/static/images/casino/text_livecasino.png" class="box-title">
            <ul class="box-Uls hidden-sm hidden-xs">
              <li v-for="(item, index) in Imgs" :key="index" @click="launch" :style="{background:`url(/images/casino/icon_${item.url}_hover.png)no-repeat 50% 30%`}">{{item.name}}</li>
            </ul>
            <aside class="box-dow hidden-sm hidden-xs">
              <a download :href="!item.link ? `javascript:void(0)` : item.link" target="_blank" v-for="(item, index) in download.items" :key="index" >
                {{item.name}}
              </a>
            </aside>
            <aside class="enter-box">
              <p class="play-btn">
                立即进入
                <i class="fa fa-arrow-circle-right"></i>
              </p>
            </aside>
          </div>
          <div class="MGbox col-sm-6 col-xs-6" @click="launchMG">
            <img src="@/static/images/casino/logo_mg.png" alt="" class="box-icon">
            <img src="@/static/images/casino/text_livecasino.png" class="box-title">
            <ul class="box-Uls hidden-sm hidden-xs">
              <li v-for="(item, index) in Imgs" :key="index" @click="launchMG" :style="{background:`url(/images/casino/icon_${item.url}_hover.png)no-repeat 50% 30%`}">{{item.name}}</li>
            </ul>
            <aside class="enter-box">
              <p class="play-btn">
                立即进入
                <i class="fa fa-arrow-circle-right"></i>
              </p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  inject: ["MEDIA_SERVER"],
  data() {
    return {
      bgImg: "casino.jpg",
      button: {
        name: "AG真人馆  点击进入"
      },
      download: {
        label: "手机端下载：",
        items: [
          {
            name: "IOS 下载",
            icon: "fa fa-apple",
            link: false
          },
          {
            name: "Android 下载",
            icon: "fa fa-android",
            link: "http://agmbet.com/universal/AG_setup.apk"
          }
        ]
      },
      Imgs: [
        {
          name: "百家乐",
          url: "puke"
        },
        {
          name: "骰宝",
          url: "sz"
        },
        {
          name: "龙虎",
          url: "lh"
        }
      ],
      promo: [
        { image: "promo1.jpg", link: "/promo" },
        { image: "promo2.jpg", link: "/promo" }
      ]
    };
  },
  computed: {
    ...mapGetters(["auth"])
  },
  methods: {
    async launch() {
      const game = {
        id: "AG",
        gamecode: "AG",
        gamename: "AG"
      };
      try {
        if (!this.auth) throw new Error("请登录后再操作。");

        window.game = window.open("", "_blank");
        window.game.document.title = `Launching Game: ${game.id}`;

        await this.$store.dispatch("game/launchGame", {
          game,
          platform: {
            platform: "AG"
          }
        });
      } catch (error) {
        this.$store.commit("modal/OPEN_MODAL", {
          content: error.message,
          type: "error"
        });
        window.game.close();
      } finally {
        window.game = null;
      }
    },
    async launchMG() {
      if (true) return this.$notify("即将上线", "error");
      const game = {
        id: "MG",
        gamecode: "MG",
        gamename: "MG",
        liveGame: true
      };
      try {
        if (!this.auth) throw new Error("请登录后再操作。");

        window.game = window.open("", "_blank");
        window.game.document.title = `Launching Game: ${game.id}`;

        await this.$store.dispatch("game/launchGame", {
          game,
          platform: {
            platform: "MG"
          }
        });
      } catch (error) {
        this.$store.commit("modal/OPEN_MODAL", {
          content: error.message,
          type: "error"
        });
        window.game.close();
      } finally {
        window.game = null;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'

  .casino
    margin-top: 43px;
    min-height: 769px;
    background-repeat: no-repeat;
    background-position: top;
    background-color: #015369;
    position: relative;
  .holder
    position: absolute
    right: 0
    left: 0
    top: 30em
    .casinobox
      justify-content: space-around
      div
        transition: transform 1s
        &:hover
          transform: translateY(-10px)
          box-shadow: 0px 10px 30px #000
      .AGbox
        position: relative
        height: 280px
        background: url("/static/images/casino/bg_ag.png") no-repeat
        background-size: 100%
      .MGbox
        position: relative
        height: 280px
        background: url("/static/images/casino/bg_mg.png") no-repeat
        background-size: 100%
      .box-icon
        position: absolute
        left: 4%
        top: 4%
      .box-title
        position: absolute
      .box-Uls
        position: absolute
        top: 50%
        right: 5%
        li
          float: left
          width: 70px
          height: 70px
          border: 1px solid #fff
          border-radius: 4px
          margin-right: 18px
          opacity: .5
          color: #fff
          line-height: 112px
          cursor: pointer
          &:hover
            opacity: 1
      .box-dow
        position: absolute
        left: 4%
        bottom: 3%
        a
          padding: 5px 10px
          margin-right: 8px
          float: left
          border: 1px solid #fff
          border-radius: 4px
          opacity: .5
          cursor: pointer
          color: #fff
          font-size: 12px
          text-align: right
          &:hover
            opacity: 1
      .enter-box
        position: absolute
        right: 6%
        bottom: 5%
        cursor: pointer
        p
          color: #FFFFFF
          letter-spacing: 1px
          font-size: 14px
          margin-bottom: 0

  @media only screen and (max-width: 768px)
    .col-sm-12
      padding:
        left: 0
        right: 0
    .casinobox
      display: inline-block
    .AGbox, .MGbox
      width: 320px
      margin: 10px
    .box-title
      top: 11%
      right: 1%
    .casinobox
      div
        &:hover
          -webkit-transform: inherit !important
          transform: none !important
          -webkit-box-shadow: 0 0 0 #000 !important
          box-shadow: 0 0 0 #000 !important

    .holder .casinobox .enter-box
      bottom: 28%
  @media (min-width: 992px)
    .col-md-6:nth-child(odd)
      padding:
        left: 0
        right: 10px
    .col-md-6:nth-child(even)
      padding:
        right: 0
        left: 10px
    .casinobox
      display: inline-block
    .AGbox, .MGbox
      width: 410px
      margin: 10px
    .box-title
      top: 8%
      right: 5%

  @media only screen and (max-width: 480px)
    .casino
      margin-top: 0
      min-height: 30em
      background-size: cover
    .casinobox
      display: block
      width: 100%
    .AGbox, .MGbox
      width: 47%
      height: 100px !important
      margin: 0px 5px
      margin-bottom: 10px
      .box-icon
        width: 5em
    .box-title
      top: 0
      margin-top: 1em
      right: 2%
      width: 48%
    .enter-box
      right: 0
    .holder
      position: absolute
      right: 0
      left: 0
      top: 20em
      .casinobox .enter-box
        bottom: 5%

  @media only screen and (max-width: 320px)
    .AGbox, .MGbox
      width: 46%
    .play-btn
      width: 60%
    .holder
      .casinobox .enter-box
        bottom: 13%
</style>
