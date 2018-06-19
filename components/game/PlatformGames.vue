<template>
  <div class="platform-games">
    <div class="container mobile-container">
      <div class="row">
        <div v-for="(game,index) of games" :key="index" class="col-md-2 col-sm-3 col-xs-3 platform-game-container"  @click="onGameSelect(game)">
          <platform-game :game="game"></platform-game>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlatformGame from "@/components/game/PlatformGame";

export default {
  name: "PlatformGames",
  components: {
    PlatformGame
  },
  props: {
    games: {
      type: Array
    }
  },
  methods: {
    onGameSelect(game) {
      this.$emit("selected", game);
    }
  }
};
</script>

<style lang="sass" scoped>
.platform-games
  margin-top: 20px
  padding-bottom: 20px
  .container
    padding: 0
  .platform-game-container
    margin-bottom: 20px

@media (max-width: 1024px)
  .platform-games
    .container
      .row
        .col-xs-6
          padding-left: 6px

@media (max-width: 758px)
  .platform-games
    .container
      .row
        .col-xs-6
          padding-left: 10px
          padding-right: 10px

@media (max-width: 414px)
  .platform-games
    .container
      .row
        .platform-game-container
          padding: 0
          margin: 0
          .col-xs-6
            padding-right: 10px
            padding-left: 10px
</style>
