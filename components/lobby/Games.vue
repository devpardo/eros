<template>
  <div class="games-container">
    <div class="game">

      <p class="game-details">热门游戏
        <span>高赔率游戏，自己上庄，赢钱我说了算!</span>
      </p>

      <div class="game-items clearfix" v-if="openGames && openGames.length">

        <div v-for="(game,index) of openGames" :key="index" class="col-md-2 col-sm-3 col-xs-6">
          <div class="game-item" :style="{ 'background-image': `url(${game.img_url})` }" @click="openGameRooms(game)">
            <div class="game-name">{{ game.category }}</div>
          </div>
        </div>

      </div>

      <div class="game-items clearfix" v-else>

        <div v-for="i of 6" :key="i" class="col-md-2 col-sm-3 col-xs-6">
          <div class="game-item animated-background"></div>
        </div>

      </div>
    </div>

    <div v-for="(game,index) of games" :key="index" class="game">
      <p class="game-details"> {{ game.gameName }}
        <span>{{ game.sub }}</span>
      </p>
      <div class="game-items clearfix">
        <div v-for="(item,index) of game.gameItems" :key="index" class="col-md-2 col-sm-3 col-xs-6">
          <div class="game-item">
            <img :src="game.gameLink + item.img" alt="" class="img-responsive">
            <div class="game-name">{{ item.name }}</div>
          </div>
          <!-- <platform-game :game="game" /> -->
        </div>
      </div>
    </div>
    <game-modal v-if="game" v-model="modal.game" :game="game" />

  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  import GameModal from "~/components/lobby/GameModal";
  import PlatformGame from "~/components/game/PlatformGameOld";

  export default {
    inject: ["MEDIA_SERVER"],
    components: {
      GameModal,
      PlatformGame
    },
    data() {
      return {
        modal: {
          game: false
        },
        game: null,
        games: [
          {
            gameName: "更多推荐",
            sub: "靠近她，看看主播近期在玩的爆分游戏！",
            gameLink: this.MEDIA_SERVER + "/games_pt/",
            badgeLink: "",
            gameItems: [
              { name: "疯狂7", img: "c7_image.jpg", link: "" },
              { name: "龙龙龙", img: "longlong_image.jpg", link: "" },
              { name: "深蓝冒险", img: "bib_image.jpg", link: "" },
              { name: "神的时代", img: "aogs_image.jpg", link: "" },
              { name: "小猪与狼", img: "paw_image.jpg", link: "" },
              { name: "海豚礁", img: "dnr_image.jpg", link: "" },
              { name: "勇者戴夫", img: "gtsdrdv_image.jpg", link: "" },
              { name: "赌城扑克", img: "cheaa_image.jpg", link: "" },
              { name: "PT捕鱼", img: "cashfi_image.jpg", link: "" }
            ]
          }
        ]
      };
    },
    computed: {
      ...mapGetters("mrtv", {
        mrtvGames: "games",
        loading: "gamesLoading"
      }),
      mrtvOpenGames() {
        return this.mrtvGames.filter(game => game.is_open === 1);
      },
      openGames() {
        return this.mrtvOpenGames.map(game => {
          const [room] = game.rooms;
          game.img_url = room.pic;
          return game;
        });
      }
    },
    methods: {
      openGameRooms(game) {
        this.modal.game = true;
        this.game = game;
      }
    },
    async mounted() {
      await this.$store.dispatch("mrtv/getGames");
    }
  };
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'

  .games-container
    background: white
    padding: 20px 0 0

    .game
      &:not(:first-of-type)
        margin-top: 20px

      .game-details
        padding: 0 14px
        font-size: 1.3em
        margin-bottom: 15px

        span
          font-size: 0.7em
          margin-left: 5px
          color: #9B9B9B

      .game-items
        padding: 0 8px

        div[class*="col-"]
          padding: 0 6px

          .game-item
            border-radius: 5px
            overflow: hidden
            position: relative
            margin-bottom: 20px
            box-shadow: 0 1px 5px rgba(0,0,0,0.3)
            position: relative
            height: 130px
            background-size: cover
            background-position: center
            cursor: pointer

            .game-name
              position: absolute
              bottom: 0
              left: 0
              right: 0
              height: 35px
              line-height: 35px
              padding-left: 10px
              background: rgba(0,0,0,0.5)
              color: white
              font-weight: 100

  @media (max-width: 768px)
    .carousel-inner > .item >
      a > img, img
        width: 100%

    .img-responsive
      width: 100%

    .thumbnail
      > img, a > img
        width: 100%
</style>
