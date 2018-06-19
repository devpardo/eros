<template>
  <section class="navbar-page-margin mrtv">
    <div class="lobby-container" :style="{ backgroundImage: `url(${mediaServer + lobbyBackground})` }">
      <div class="container">
        <div class="row lobby">
          <video-box/>
          <div class="lobby-right pull-right clearfix">
            <streams/>
            <ranking :mediaServer="mediaServer"/>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-content">
      <div class="container">
        <div class="advertisement" v-if="advertisement != ''">
          <img :src="mediaServer + advertisement" alt="" class="img-responsive">
        </div>
        <games/>
      </div>
    </div>
  </section>
</template>

<script>
  import VideoBox from "~/components/lobby/VideoBox";
  import Streams from "~/components/lobby/Streams";
  import Ranking from "~/components/lobby/Ranking";
  import Games from "~/components/lobby/Games";

  export default {
    components: {
      VideoBox,
      Streams,
      Ranking,
      Games
    },
    inject: ["MEDIA_SERVER"],
    middleware: "notAuthorized",
    data() {
      return {
        mediaServer: `${this.MEDIA_SERVER}/web/mrtv/`,
        lobbyBackground: "banner-top.jpg",
        advertisement: "call-to-action.jpg"
      };
    }
  };
</script>

<style lang="sass" scoped>
  .mrtv
    .lobby-container
      background:
        color: #210049
        size: cover
        position: top center
        repeat: no-repeat
      padding: 65px 0 15px
      max-height: 710px

      .container
        padding:
          left: 0
          right: 0

        .lobby
          height: 640px

          .lobby-left, .lobby-right
            height: 100%
          
          .lobby-right
            width: 666px
            background: #000000
            padding: 9.7px 10px 0

    .bottom-content
      padding: 10px 0 30px
      background: #f0f0f0  

  @media (max-width: 1199px)
    .mrtv .lobby-container
      max-height: 100%
      height: auto
      .container .lobby .lobby-right
        width: 100%
        height: auto
  @media (max-width: 768px)
    .mrtv .lobby-container 
      padding: 8px 0 15px
      .container 
        .lobby
          width: 100%
          margin: 0 auto

    .lobby-left
      width: 100%
      padding: 9.7px 33px 0

    .mrtv .lobby-container .container .lobby .lobby-right
      width: 100%
      height: auto
      position: relative
      
</style>
