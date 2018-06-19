<template>
  <div>
    <div class="platform-game cursor-pointer"> <img :src="game.img_url" @error="imageError" class="img-responsive" />
      <div class="platform-game-title hidden-xs">
        <p>{{ name }}</p>
      </div>
    </div>
    <div class="platform-game-title visible-xs">
      <p class="platform-game-name">{{ name }}</p>
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
      return (
        this.game.gamenamecn ||
        this.game.chinesename ||
        this.game.cnname ||
        this.game.GameName
      );
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

  .platform-game
    position: relative
    width: 180px
    height: 135px
    margin: 0 auto
    overflow: hidden
    .platform-game-title
      padding: 10px
      position: absolute
      width: 100%
      background: #000
      background-color: rgba(0,0,0,0.5)
      bottom: 0
      z-index: 2
      color: #fff
      p
        font-size: 12px
        margin: 0

  @media (max-width: 1024px)
    .platform-game
      width: 150px
      height: 150px
      border-radius: 23px
    .platform-games .platform-game-container
      margin-bottom: 10px
  @media (max-width: 768px)
    .platform-game
      // width: 100%
      width: 110px
      height: 110px
      border-radius: 8px
  @media (max-width: 480px)
    .platform-game
      border-radius: 8px
    .platform-game-name
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
      width: 100%
    .platform-game-title
      color: white
      text-align: center
      padding: 5px 0
      font-size: 10px
  @media (max-width: 425px)
    .platform-game
      width: 75px
      height: 75px
      border-radius: 8px
  @media (max-width: 375px)
    .platform-game-container
      .platform-game
        width: 75px
        height: 75px
        border-radius: 8px
        // width: 100%
        // height: 100%
        .platform-game-title
          padding: 5px 0 !important
  // @media (max-width: 320px)
  //   .platform-game
  //     width: 75px
  //     height: 75px
</style>
