<template>
  <div class="game animated-background">
    <img class="img-responsive" :src="game.img_url" @error="imageError" />
    <div class="game-title">
      <p>{{ name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlatformGame",
  props: {
    game: {
      type: Object
    }
  },
  computed: {
    name() {
      return this.game.gamenamecn || this.game.chinesename || this.game.cnname;
    }
  },
  methods: {
    imageError(event) {
      event.target.src =
        "https://www.oatey.com/ASSETS/WEB_THEMES//OATEY/images/NoImage.png";
    }
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'

  .game
    border-radius: 5px
    height: 131px
    overflow: hidden
    position: relative
    margin-bottom: 18px
    box-shadow: $game-box-shadow

    .game-title
      position: absolute
      bottom: 0
      left: 0
      right: 0
      background: $game-title-background
      padding: 10px 5px

      p
        margin: 0
        color: $game-title-text-color

  @media (max-width: 1280px)
    .new-game .container .game-container .game
      border-radius: 5px
      height: auto
      
    .game .img-responsive
        width: 100%
</style>
