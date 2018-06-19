<template>

  <div class="fishing-platform" :class="[classPlatform]">
    <a href="javascript:void(0)" @click="launch">
      <img class="img-responsive center-block" :src="platformBackground" :class="platformAnimation" />
    </a>
    <div class="buttons">
      <template>
        <a :href="button.link" :style="styleButtonImage(button)" v-for="(button,index) of platform.buttons" :key="index"></a>
      </template>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "PlatformFishing",
    inject: ["MEDIA_SERVER"],
    props: {
      platform: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    computed: {
      ...mapGetters(["auth"]),
      platformBackground() {
        return `${this.MEDIA_SERVER}${this.platform.background}`;
      },
      classPlatform() {
        return { "item-push": this.index % 2 === 0 || this.index === 0 };
      },
      platformAnimation() {
        return `${this.platform.animation}`;
      }
    },
    methods: {
      async launch(game) {
        if (!process.browser) return;
        try {
          if (this.platform.platform === "AG") throw new Error("场馆维护中。");
          if (!this.auth) throw new Error("请登录后再操作。");
          if (!this.platform.gamecode || !this.platform.platform)
            throw new Error("Game under maintenance");
          window.game = window.open("", "_blank");
          window.game.document.title = `Launching Game: ${game.id}`;

          await this.$store.dispatch("game/launchGame", {
            game: this.platform,
            platform: {
              platform: this.platform.platform
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
      styleButtonImage(button) {
        return { backgroundImage: `url(${this.MEDIA_SERVER}${button.image})` };
      }
    }
  };
</script>

<style lang="sass">
  @import './assets/css/animate'
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

  .platform-GG-img:hover
    -webkit-animation: rubberBand 1s
    animation: rubberBand 1s

  .platform-SWPT-img:hover
    -webkit-animation: shake 1s
    animation: jello 1s

  .platform-AG-img:hover
    -webkit-animation: tada 1s
     animation: tada 1s

  .platform-PT-img:hover
    -webkit-animation: jello 1s
    animation: jello 1s
</style>
