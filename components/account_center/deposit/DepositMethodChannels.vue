<template>
  <div class="channels">
    <p class="title">请选择支付通道</p>
    <div class="item-container clearfix channel-container-wrapper" ref="channelCont">

      <div v-if="showArrowLeft" class="scroll-prev scroll-control" @click="prev">
        <span class="left-scroll">
          <i class="fa fa-angle-left fa-lg"></i>
        </span>
      </div>

      <div class="channel-container" ref="channelContent">
        <!-- <div class="slider">
          <div :style="slider" ref="channels" class="channel-containers"> -->
        <div class="card" v-for="(channel,index) of channels" :key="index" @click="setChannel(channel)">
          <deposit-method-channel :channel="channel" :current-channel="currentChannel" />
        </div>
        <!-- </div>
        </div> -->
      </div>

      <div v-if="showArrowRight" class="scroll-next scroll-control" @click="next">
        <span class="right-scroll">
          <i class="fa fa-angle-right fa-lg"></i>
        </span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { chunk } from "~/utils";

import DepositMethodChannel from "@/components/account_center/deposit/DepositMethodChannel";
export default {
  name: "DepositMethodChannels",
  data() {
    return {
      channelOffsetWidth: "",
      channelScrollWidth: "",
      showArrowLeft: false,
      showArrowRight: false,
      page: 0
    };
  },
  props: {
    channels: {
      type: Array
    },
    currentChannel: {
      type: Object
    }
  },
  components: {
    DepositMethodChannel
  },
  computed: {
    slider() {
      return {
        transform: `translateX(${100 * this.page}%)`
      };
    },
    slides() {
      return chunk(this.channels, 8);
    }
  },
  methods: {
    ...mapActions("channel", ["setChannel"]),
    isOverFlowing() {
      const element = this.$refs.channels;
      const { scrollWidth, clientWidth, offsetWidth } = element;
      console.log(scrollWidth, clientWidth, offsetWidth);
      return element.scrollWidth > element.offsetWidth;
    },
    next() {
      this.$refs.channelContent.scrollLeft += 100;
      console.log(this.$refs.channelContent.scrollLeft);
      this.showArrowLeft = true;
      if (
        this.$refs.channelContent.offsetWidth +
          this.$refs.channelContent.scrollLeft ==
        this.$refs.channelContent.scrollWidth
      ) {
        this.showArrowRight = false;
      }
    },
    prev() {
      this.$refs.channelContent.scrollLeft -= 100;
      console.log(this.$refs.channelContent.scrollLeft);
      this.showArrowRight = true;
      if (this.$refs.channelContent.scrollLeft === 0) {
        this.showArrowLeft = false;
      }
    }
  },
  async mounted() {
    await this.$nextTick();
    this.channelOffsetWidth = this.$refs.channelCont.offsetWidth;
    this.channelScrollWidth = this.$refs.channelContent.scrollWidth;

    console.log("fadsfads", this.$refs.channelContent.offsetWidth);

    // console.log("channelOffsetWidth", this.channelOffsetWidth);
    // console.log("channelScrollWidth", this.channelScrollWidth);

    await this.$nextTick();
    this.showArrowRight = this.channelScrollWidth > this.channelOffsetWidth;

    await this.$nextTick();
    console.log(this.showArrowRight);
  }
};
</script>

<style lang="sass" scoped>
  .scroll-prev, .scroll-next
    position: absolute
    width: 30px
    height: 100%
    background: #fff
    color: #0b5883
    top: -10px
    z-index: 2
    text-align: center
    cursor: pointer
  .scroll-control

  .scroll-prev
    left: 0
    -webkit-box-shadow: 13px 0px 23px -13px rgba(0,0,0,1)
    -moz-box-shadow: 13px 0px 23px -13px rgba(0,0,0,1)
    box-shadow: 13px 0px 23px -13px rgba(0,0,0,1)

  .scroll-next
    right: 0
    -webkit-box-shadow: -13px 0px 23px -13px rgba(0,0,0,1)
    -moz-box-shadow: -13px 0px 23px -13px rgba(0,0,0,1)
    box-shadow: -13px 0px 23px -13px rgba(0,0,0,1)


  .left-scroll, .right-scroll
    line-height: 60px
    text
  .slider
    overflow: hidden
    width: 100%
  .channel-containers
    transition: transform .3s ease-in-out
    padding: 0 30px
  .channel-container
    position: relative
    width: auto
    white-space: nowrap
    height: 61px
    overflow-x: hidden
  .channel-container-wrapper
    width: 100%
    position: relative
  .channels
  .card
    display: inline-block
    width: 120px
    margin: 0 10px
    position: relative

    .item-container.clearfix

      a
        position: relative
        float: left
        width: 100%
        height: 40px
        margin:
          right: 10px
        border: 1px solid #D7D7D7

        &.active
          background: #F5F5F5
          border: 1px solid #4A90E2

          &:before
            content: ''
            position: absolute
            border:
              width: 4px
              style: solid
              color: #4a90e2 #4a90e2 transparent transparent
              top: 4px solid #4a90e2
            top: 0
            right: 0

  @media (max-width: 414px)
    .card
      &:first-child
        margin-left: 0
</style>
