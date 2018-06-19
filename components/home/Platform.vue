<template>
  <div class="platform">
    <div class="container">
      <div v-for="(platform, index) of platforms" :key="index" class="col-xs-6 gameBox" @click="goToGame(platform)">
        <platform-banner :platform="platform"></platform-banner>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PlatformBanner from "~/components/home/PlatformBanner";
export default {
  name: "Platform",
  components: {
    PlatformBanner
  },
  computed: {
    ...mapGetters(["auth", "banners"])
  },
  methods: {
    async goToGame(link) {
      if (link.game && link.platform) {
        if (link.platform === "BB") {
          await this.launchLotto(link);
        } else {
          await this.launchSport(link);
        }
      } else {
        this.$router.push(link.link);
      }
    },
    async launchLotto(link) {
      if (!process.browser) return;
      try {
        if (!this.auth) throw new Error("请登录后再操作。");
        window.game = window.open("", "_blank");
        window.game.document.title = `Launching Game: BB Lottery`;
        const { game, platform } = link;
        await this.$store.dispatch("game/launchGame", {
          game,
          platform: {
            platform
          }
        });
      } catch (error) {
        this.$notify(error.message, "error");
        if (!window.game) return;
        window.game.close();
      } finally {
        window.game = null;
      }
    },

    async launchSport(link) {
      const { platform, game } = link;
      const key = link.platform;
      let screenWidth = window.screen.width;
      let screenHeight = window.screen.height;

      let left = (screenWidth - 1020) / 2;
      let top = (screenHeight - 680) / 2;
      let strWindowFeatures = `menubar=no,toolbar=no,location=no,resizable=no,scrollbars=no,status=no,innerHeight=680, innerWidth=1020,left=${left},top=${top}`;
      window.game = window.open("", "", strWindowFeatures);
      window.game.document.title = `Launching Game: ${game.gamename}`;

      try {
        if (!this.auth && platform === "SBK")
          throw new Error("请登录后再操作。");
        await this.$store.dispatch("game/launchGame", {
          game,
          platform: {
            platform
          }
        });
      } catch (error) {
        if (!window.game) return;
        if (platform === "SB") {
          window.game.location.href = "http://sb.mr2009.com/zh-cn/Sport/Index";
        } else {
          this.$notify(error.message, "error");
          window.game.close();
        }
      }
    }
  },
  data() {
    return {
      platforms: [
        {
          name: "PT老虎机",
          platform_icon: "//cdn.mr007.co/images/web/providers/game.pt.png",
          imgUrl: "game-pt.jpg",
          link: "/game?platform=PT&type=1",
          background: "#13426D"
        },
        {
          name: "TTG老虎机",
          platform_icon: "//cdn.mr007.co/images/web/providers/game.ttg.png",
          imgUrl: "game-ttg.jpg",
          link: "/game?platform=TTG&type=1",
          background: "#DF384C"
        },
        {
          name: "全民捕鱼",
          platform_icon: "//cdn.mr007.co/images/web/providers/game.gg.png",
          imgUrl: "game-gg.jpg",
          link: "/fishing",
          background: "#0D628F"
        },
        {
          name: "AG真人",
          platform_icon: "//cdn.mr007.co/images/web/providers/game.ag.png",
          imgUrl: "game-ag.jpg",
          link: "/casino",
          background: "#F24200"
        },
        {
          name: "亿万体育-经典版",
          platform_icon: "//cdn.mr007.co/images/web/providers/game.sb.png",
          imgUrl: "game-sb.jpg",
          game: {
            gamename: "MR Sports"
          },
          platform: "SB",
          background: "#006934"
        },
        {
          name: "新PT老虎机",
          platform_icon: "//cdn.mr007.co/images/web/providers/game.pt.png",
          imgUrl: "game-swpt.jpg",
          link: "/game?platform=SWPT&type=1",
          background: "#E7AC25"
        },
        {
          name: "PG老虎机",
          platform_icon: "//cdn.mr007.co/images/web/providers/game.pg.png",
          imgUrl: "game-pg.jpg",
          link: "/game?platform=PG&type=1",
          background: "#000"
        },
        // {
        //   name: "MG老虎机",
        //   platform_icon: "//cdn.mr007.co/images/web/providers/game.mg.png",
        //   imgUrl: "game-mg.jpg",
        //   link: "/game?platform=MG&type=1",
        //   background: "#f08704"
        // },
        // {
        //   name: "亿万体育-世界杯",
        //   platform_icon: "//cdn.mr007.co/images/web/providers/game.sbk.png",
        //   imgUrl: "game-sbk.jpg",
        //   game: {
        //     gamename: "USports"
        //   },
        //   platform: "SBK",
        //   background: "#006934"
        // },
        {
          name: "亿万彩票",
          platform_icon: "//cdn.mr007.co/images/web/providers/game.bb.png",
          imgUrl: "game-bb.jpg",
          background: "#006934",
          game: {
            gamename: "BB Lottery"
          },
          platform: "BB"
        }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>

  .platform
    .container
      padding: 0
      //margin-top: 35px
      .gameBox
        padding-left: 0 !important
        border: 0
        padding-right: 10px
        width: 25%
    margin-top: 20px
    margin-bottom: 20px

  #app-content
    width: 300px
    height: 200px
    background-color: #ddd

  .content
    width: 100px
    height: 200px
    background-color: red

  // @media (min-width:600px)
  //   .platform
  //     .container
  //       margin-top: 35px

  @media (min-width: 1024px)
    .platform
      margin-top: -15px
      margin-bottom: 10px
  @media (max-width: 768px)
    .platform
      margin-top: 0
      .container
        margin-top: 0
        .gameBox
          padding-left: 20px !important
          border: 0
          padding-right: 20px
          width: 50%
  @media (max-width: 600px)
    .platform
      .container
        margin-top: 35px
        .gameBox
          width: 50%
          padding-left: 7px !important
          border: 0
          padding-right: 7px

  @media (max-width: 414px)
    .platform
      margin-top: 10px
      margin-bottom: 10px
      .container
        margin-top: 0

  @media (max-width: 375px)
    .platform
      margin-top: 10px
      margin-bottom: 10px
      .container
        margin-top: 0
</style>
