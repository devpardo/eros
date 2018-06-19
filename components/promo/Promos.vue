<template>
  <div class="tab-content main-tab-content">
    <div class="tab-pane disp-b">
      <p v-if="loading" class="col-xs-12 load"><img src="~assets/images/loading.bubbles.blue.svg" ></p>
      <template v-else-if="promos.length">
        <div v-for="(promo, index) of promos" :key="index" class="col-md-3 col-sm-4 col-xs-12 item-holder promoBox" @click="selectPromo(promo)">
          <promo :promo="promo"></promo>
        </div>
      </template>
      <template v-else>
        暂无相关优惠信息
      </template>
    </div>
  </div>
</template>

<script>
import Promo from "~/components/promo/Promo";
export default {
  name: "Promos",
  components: {
    Promo
  },
  props: {
    promos: {
      type: Array
    },
    loading: {
      type: Boolean
    },
    category: {
      type: Object
    },
    targetPromo: {
      type: Object
    }
  },
  methods: {
    selectPromo(promo) {
      this.$emit("update:targetPromo", promo);
    }
  }
};
</script>

<style lang="sass">

  @import './assets/sass/_variables'
  span.game-provider
    position: relative
    top: 90px
    left: 10px
    background: rgba(#3076A3, .8)
    text-align: center
    border-radius: $radius-min-4
    font-size: 12px
    color: white
    margin-right: 5px
    padding: 5px 9px

  .main-tab-content
    margin-top: 20px
    .disp-b
      display: block
    .tab-pane
      overflow: auto

      .promoBox
        padding: 0 20px 0 0

      .load
        text-align: center
        img
          width: 64px

      .item-holder
        margin-bottom: 20px

      .card
        box-shadow: 0 2px 5px 0 rgba(199, 199, 199, 0.4)
        background: white
        cursor: pointer

        .card-img-top
          position: relative
          height: 121px
          background:
            size: cover
            repeat: no-repeat
            position: center center
            color: #f6f7f8

          .floating-btn
            position: absolute
            top: 12px
            right: 10px
            display: inline-block
            font:
              size: 11px
              weight: 100
            color: white
            background: #E59700
            height: 24px
            line-height: 25px
            padding: 0 15px
            border-radius: $radius-4xl

        .card-block
          padding: 10px 15px

          .card-block-header
            overflow: auto
            position: relative
            margin-bottom: 3px

            p.title, span.game-provider
              float: left

            p.title
              width: calc(100% - 0px)
              font-size: 16px
              text-overflow: ellipsis
              white-space: nowrap
              overflow: hidden
              margin-bottom: 0

          .card-block-body
            margin-bottom: 6px

            span
              font:
                size: 12px
                weight: 100

              &.activity-label
                color: #E59700

              &.activity-date
                color: #888888

          .card-block-footer
            height: 14px
            overflow: hidden

            *
              padding: 0
              margin: 0
              width: 100%
              text-overflow: ellipsis
              white-space: nowrap
              overflow: hidden
              color: #888888
              font:
                size: 12px
                weight: 100

  @media only screen and (max-width: 768px)
    .promoBox
      padding: 0 10px 0 10px !important
  @media only screen and (max-width: 768px)
    .promoBox
      padding: 0 7px!important
</style>
