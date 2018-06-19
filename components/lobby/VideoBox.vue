<template>
  <div class="col-xs-12 lobby-left pull-left">
    <div class="vidbox-link" v-if="stream && options.sources.length" v-video-player:player="options.sources.length ? options : null">

      <a :href="href" class="show-btn" target="_blank">进入直播间</a>
    </div>
    <div class="error" v-else></div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import "videojs-flash";
  import "video.js/dist/video-js.css";
  export default {
    name: "VideoBox",
    inject: ["API_MR"],
    data() {
      return {
        playsinline: true,
        playerOptions: {
          autoplay: true,
          controls: false,
          techOrder: ["flash", "html5"],
          sourceOrder: true,
          flash: { hls: { withCredentials: false } },
          controlBar: {
            progressControl: false,
            fullscreenToggle: false
          },
          notSupportedMessage: null,
          sources: []
        }
      };
    },
    computed: {
      ...mapGetters("mrtv", ["stream", "streams"]),
      ...mapGetters(["token"]),
      href() {
        return this.stream
          ? `${this.API_MR}/api/mrtv/redirect?type=room&id=${
              this.stream.artistid
            }&token=${this.token}`
          : "javascript:void(0)";
      },
      onlineStreams() {
        const onlineStreams = this.streams
          .filter(stream => stream.caststatus == 1)
          .map(stream => ({
            type: "rtmp/mp4",
            src: this.stream.live_rtmp_url
          }));
        return onlineStreams.length ? onlineStreams : this.defaultStreams;
      },
      defaultStreams() {
        return this.streams.map(stream => ({
          type: "video/mp4",
          src: `https://cdn.mr007.co/vid/${stream.artistid}.mp4`
        }));
      },
      options() {
        this.playerOptions.sources = this.onlineStreams;
        return this.playerOptions;
      }
    }
  };
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'

  .lobby-left
    height: 100%
    width: 530px
    background: white
    position: relative
    overflow: hidden

    .error
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      background:
        image: url('https://cdn.mr007.co/images/web/load_failedtip.png')
        size: cover
        position: center center

    &:hover .vidbox-link
      opacity: 1

    .vidbox-link
      background-color: rgba(0,0,0,0.8)
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      z-index: 2
      cursor: pointer

      a.show-btn
        position: absolute
        top: 50%
        left: 50%
        margin:
          top: -32px
          left: -67px
        text-align: center
        color: #ffc317
        min:
          width: 134px
          height: 64px
        line-height: 64px
        border: 2px solid #ffc317
          radius: $radius-10x
        transition: all 0.15s linear

        &:hover
          background: #ffc317
          color: white
          text-shadow: 0 0 5px rgba(0,0,0,0.3)

  @media (max-width: 1199px)
    .lobby-left
      height: 100%
      width: 100%
</style>
