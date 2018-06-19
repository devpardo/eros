<template>
  <section class="main-game-container navbar-page-margin">
    <div class="banner" :style="[styleBanner]"></div>
    <main class="game-background">
      <div class="platforms">
        <div class="container mobile-container">
          <div class="platform-label pull-left hidden-xs">游戏平台</div>
          <h3 class="text-info text-center" v-if="loading.platforms"></h3>
          <ul class="platform-list" v-else>
            <li v-for="(platform, index) of platforms" :key="index" :class="[currentPlatform &amp;&amp; currentPlatform.platform === platform.platform ? 'platform-active' : '']">
              <a>
                <img class="platform-logo" :src="`${MEDIA_SERVER}/web/family-icons/${platform.platform.toLowerCase()}.png`" :alt="platform.platform.toLowerCase()" @click="onPlatformSelect(platform)" />
                <p class="platform-name hidden-xs">{{platform.name}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <section v-if="currentPlatform" :key="currentPlatform ? currentPlatform.platform : 'platform'">
        <platform :platform="currentPlatform"></platform>
        <platform-categories :platform="currentPlatform" :search.sync="search"></platform-categories>
        <h3 class="text-info text-center" v-if="loading.games"></h3>
        <platform-games v-else-if="games" :games="searchedGames" @selected="launch"></platform-games>
      </section>
      <div class="text-warning text-center" v-else-if="platforms.length">
        <h3>加载失败，请刷新页面。</h3>
      </div>
      <div class="loading" v-if="$store.state.game.loading"><img src="~assets/images/loading.bubbles.svg" /></div>
    </main>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Platform from "@/components/game/Platform";
import PlatformGames from "@/components/game/PlatformGames";
import PlatformCategories from "@/components/game/PlatformCategories";

export default {
  name: "Game",
  inject: ["MEDIA_SERVER"],
  components: {
    Platform,
    PlatformGames,
    PlatformCategories
  },
  data() {
    return {
      loading: {
        games: false,
        platforms: false
      },
      search: ""
    };
  },
  computed: {
    ...mapGetters("platform", ["platforms", "currentPlatform"]),
    ...mapGetters("game", ["games"]),
    ...mapGetters(["auth"]),
    styleBanner() {
      return this.currentPlatform
        ? {
            backgroundImage: `url(${
              this.MEDIA_SERVER
            }/web/game.banner.${this.currentPlatform.platform.toLowerCase()}.jpg)`
          }
        : "";
    },
    searchedGames() {
      const isValid = !!(this.search && this.games && this.games.length);
      const regexSearch = new RegExp(this.search, "i");
      const searchFields = game =>
        Object.keys(game).some(
          field => game[field].toString().search(regexSearch) !== -1
        );

      return isValid ? this.games.filter(searchFields) : this.games;
    }
  },
  watch: {
    "$route.query": {
      handler: "setPlatform",
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapActions("platform", ["getPlatforms"]),
    ...mapActions("provider", ["getProviders"]),
    async setPlatform({ platform, type = 1 }) {
      try {
        this.$store.commit("platform/SET_PLATFORM", platform);
        this.loading.games = true;
        await this.$store.dispatch("game/getGames", {
          platform,
          type
        });
      } catch (error) {
        console.dir(error);
      } finally {
        this.loading.games = false;
      }
    },
    onPlatformSelect(platform) {
      this.search = "";
      this.$router.push({
        name: "game",
        query: { platform: platform.platform, type: 1 }
      });
    },
    async launch(game) {
      try {
        if (!this.auth) throw new Error("请登录");
        window.game = window.open("", "_blank");
        window.game.document.title = `Launching Game: ${game.id}`;
        await this.$store.dispatch("game/launchGame", {
          game,
          platform: this.currentPlatform || {
            platform: "SWPT"
          }
        });
      } catch (error) {
        this.$store.commit("modal/OPEN_MODAL", {
          content: error.message,
          type: "error"
        });
        window.game && window.game.close();
      } finally {
        window.game = null;
      }
    }
  },
  async mounted() {
    try {
      this.loading.platforms = true;
      await this.getPlatforms();
      if (this.auth) {
        await this.getProviders();
      }
    } finally {
      this.loading.platforms = false;
    }
  }
};
</script>

<style lang="sass" scoped>
  .game-background
    background: url('~/assets/images/bg.png') #000000 no-repeat top
  .platform-active
    opacity: 1 !important
    color: #00aeff
    text-shadow: 0 0 15px #00aeff, 0 0 30px rgba(#00aeff, .5)
    //border-radius: 50%
    //transform: scale(1.2)
  main
    min-height: 400px
    .loading
      text-align: center
      img
        text-align: center
        color: rgba(#00aeff, .5)
        display: inline
        font-weight: normal
        height: 64px
        line-height: 24px
        width: 64px

    .platforms
      padding: 10px 0
      border-top: 1px solid hsla(0,0%,100%,.15)
      border-bottom: 1px solid hsla(0,0%,100%,.15)
      .container
        padding: 0
      .platform-label
        color: #ffffff
        line-height: 68px
        opacity: .7
      ul.platform-list
        margin: 0 auto
        text-align: left
        padding-left: 80px
        white-space: nowrap
        li
          display: inline-block
          margin: 0 10px
          line-height: 48px
          text-align: center
          opacity: .7
          &:hover
            opacity: 1
            transform: scale(1.1)
          p
            font-size: smaller
            color: #fff
            line-height: 10px
          img.platform-logo
            width: 30px
            height: auto
            transition: all .1s ease-in-out

  @media (max-width: 375px and 414px)

    ul.platform-list
      li
        margin: 0 10px
        &:first-child
          margin-left: 0

    .platform-menu
      .platform-details
        div
          display: inline-block
          margin: 0 5px
    main .platforms ul.platform-list
      padding-left: 0

  @media (max-width: 320px)
    main .platforms ul.platform-list
      padding-left: 0


  @media (max-width: 600px)
    .banner
      min-height: 85px

  @media (min-width: 1280px)
    .banner
      margin-top: -47px

</style>
