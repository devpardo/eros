<template>
  <div class="container game-container cursor-pointer" :class="classes">
    <div class="spinner" v-if="loading">
      <div class="spinner-icon" style="height: 35px; width: 35px;"></div>
    </div>
    <template v-else-if="hasGames &amp;&amp; !loading">
      <div class="col-md-2 col-sm-3 col-xs-6 x-game-container" v-for="(game,index) of games" :key="index" @click="launch(game)">
        <platform-game :game="game"></platform-game>
      </div>
    </template>
    <template v-else>
      <h1>No Games Yet</h1>
    </template>
  </div>
</template>

<script>
import PlatformGame from "@/components/game/PlatformGame.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PlatformGames",
  components: {
    PlatformGame
  },
  props: {
    games: {
      type: Array
    },
    loading: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters("platform", ["currentPlatform"]),
    ...mapGetters(["auth"]),
    classes() {
      return {
        "with-spinner": !(this.games && this.games.length)
      };
    },
    hasGames() {
      return !!(this.games && this.games.length);
    }
  },
  methods: {
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
  }
};
</script>

<style lang="sass" scoped>
  .cursor-pointer
    cursor: pointer

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
        top-color:  #085984
        left-color: #085984
      border-radius: 50%

  @keyframes loading-bar-spinner
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)

  .game-container
    padding: 30px 6px 20px
    position: relative

    &.with-spinner
      padding: 60px 6px

    .x-game-container
      padding:
        left: 9px
        right: 9px

      .game
        height: 131px
        border-radius: 5px
        overflow: hidden
        position: relative
        margin-bottom: 18px
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3)

        .game-title
          position: absolute
          bottom: 0
          left: 0
          right: 0
          background: rgba(0, 0, 0, 0.5)
          padding: 10px 5px

          p
            margin: 0
            color: white

  p.no-games
    margin-bottom: 0
    padding: 30px 15px
    text:
      align: center
      shadow: 1px 1px 1px rgba(189, 189, 189, 0.40)
    font:
      size: 18px
      weight: 100
    color: #cacaca

  @media (max-width: 1280px)
    .game .img-responsive
      width: 100%
</style>
