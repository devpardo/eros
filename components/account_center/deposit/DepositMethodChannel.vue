<template>
  <a data-toggle="tab" :href="channel.href" :class="classes">
    <img :src="image" />
    <span class="name">{{channel.publicname}}</span>
    <span class="label label-danger payment-badge" v-if="channel.recommend">荐</span>
  </a>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "DepositMethodChannel",
    props: {
      channel: {
        type: Object
      },
      currentChannel: {
        type: Object
      }
    },
    computed: {
      active() {
        return this.currentChannel && this.currentChannel.id === this.channel.id;
      },
      classes() {
        return {
          active: this.active
        };
      },
      image() {
        //return this.channel.channeltype;
        const channelIcons = {
          onlinepay: [1, 15, 22],
          wepay: [2, 11, 18, 24],
          offlinepay: [4, 31],
          alipay: [12, 17, 3],
          qqpay: [14, 16],
          jdpay: [19, 29],
          unipay: [21, 30],
          snpay: [28]
        };
        const paymentName = Object.keys(channelIcons).find(key =>
          channelIcons[key].includes(this.channel.channeltype)
        );
        return `/images/payment_icons/${paymentName}-reg.png`;
      }
    }
  };
</script>


<style lang="sass" scoped>
  a
    padding: 7px
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

      &::after
        content: ""
        position: absolute
        left: 50%
        bottom: -22px
        margin-left: -6px
        border-left: 6px solid transparent
        border-right: 6px solid transparent
        border-bottom: 6px solid #A5C7F0

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

    &.active
      span.badge
        background: #4A90E2

    img
      margin:
        right: 5px
        bottom: 15px
      width: 24px
      height: 24px

    span
      display: inline-block
      text-align: left
      font:
        size: 12px
        weight: 100
      height: 24px
      line-height: 24px
      padding: 0
      text-overflow: ellipsis
      white-space: nowrap
      overflow: hidden

      &.badge
        border-radius: 0
        width: 60px
        background: #9B9B9B
        color: white

      &.name
        // width: 124px
        color: #4A4A4A

      &.payment-badge
        position: absolute
        left: 0
        height: 12px
        font:
          size: 9px
        padding: 0 2px
        line-height: 12px
        top: 13px
        border-radius: 0
</style>
