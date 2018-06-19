<template>
  <div class="promo-info-top">
    <div>
      <div class="promo-info-img img-left hidden-xs"><img :src="`${MEDIA_SERVER}/web/promo/tc-boy-left.png`" alt="" /></div>
      <div class="promo-info"><img :src="`${MEDIA_SERVER}/web/promo/tc-title.png`" alt="" />
        <div class="promo-user-info">
          <div class="promo-user-info-left">
            <h4>您的账号当前活跃度：</h4>
            <h3> {{ treasureTotalConsume }} </h3>
          </div>
          <div class="promo-user-info-right">
            <span id="treasureChestForm:claimAllTreasuerChest" @click="pickAll">
              <a class="claim-all-btn" :class="[`${status ? 'on' : 'off'}`]" href="javascript:void(0);"></a>
            </span>
          </div>
          <div class="promo-user-info-bottom">
            <p class="pull-left"> 当日活跃度在凌晨
              <span> 3:00</span>后面每半小时刷新。</p>
            <p class="pull-right info-hover">如何增加活跃度
              <i class="fa fa-question-circle"></i>
            </p>
            <span class="info-hover-desc">每日完成指定额度的流水任务，即可获得等值的活跃度，获得的活跃度越高，可领取的宝箱等级越高。</span>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
      <div class="promo-info-img img-right hidden-xs"><img :src="`${MEDIA_SERVER}/web/promo/tc-boy-right.png`" alt="" /></div>
    </div>

    <div class="promo-shortcup">
      <ul class="shortcup-box box-left">
        <li class="coin-icon gold-coin"><img src="//cdn.mr007.co/images/web/promo/tc-gold-coin.png"></li>
        <li class="box-desc">
          <h1>活跃度低，想开宝箱？</h1>
          <p>充值即可获得更多活跃度！</p>
        </li>
        <li>
          <a href="javascript:void(0)" to="" class="shortcut-button gold-button" @click="gotoLink('/uc/deposit')">立即充值</a>
        </li>
      </ul>
      <ul class="shortcup-box box-right">
        <li class="coin-icon sliver-coin"><img src="//cdn.mr007.co/images/web/promo/tc-sliver-coin.png"></li>
        <li class="box-desc">
          <h1>流水不足，想开宝箱？</h1>
          <p>投注即可获得更多活跃度！</p>
        </li>
        <li>
          <a href="javscript:void(0)" class="shortcut-button sliver-button" @click="gotoLink('/game?platform=PT&type=1')">立即游戏</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TreasureUserInfo",
  inject: ["MEDIA_SERVER"],
  props: {
    treasure_user_info: {
      type: Object
    }
  },
  data() {
    return {
      isClick: false
    };
  },
  computed: {
    ...mapGetters(["treasures", "treasureTotalConsume"]),
    status() {
      if (this.treasures && this.treasures.length > 0) {
        let isOn = false;
        this.treasures.forEach(value => {
          isOn = isOn || value.can_get === 1;
        });
        return isOn;
      } else {
        return false;
      }
      return this.treasures && this.treasures.length > 0 ? "on" : "off";
    }
  },
  methods: {
    gotoLink(link) {
      this.$router.push(link);
      this.$emit("close");
    },
    async pickAll() {
      if (!this.treasures) {
        return;
      }
      if (this.status) {
        if (this.isClick) return;
        this.isClick = true;
        let { success, data, message } = await this.$axios({
          method: "post",
          url: "activity/treasure/getTreasure",
          withToken: true
        }).then(response => response.data);
        let amount = 0;
        this.treasures.forEach(v => {
          if (v.can_get === 1) amount += v.bonusamount;
        });
        let type = "success";
        if (success) {
          await this.$store.dispatch("getTreasures");
        } else {
          type = "error";
        }
        this.isClick = false;

        this.$store.commit("modal/OPEN_MODAL", {
          type,
          content: message ? message : `恭喜您已领取${amount}元奖金！`
        });
      }
    }
  }
};
</script>

<style lang="sass">
  .promo-info-top
    .promo-info-img
    .img-left img
      width: 150px !important
    .img-right img
      width: 180px
    .promo-info
      width: 500px !important
    .promo-shortcup
      width: 100%
      padding: 10px
      .shortcup-box
        background: #002c50
        padding: 10px 5px
        border-radius: 4px
        display: inline-block
        &:first-child
          margin-right: 10px
        li
          display: inline-block
          float: left
        .coin-icon
          padding: 3px
          img
            width: 100%
        .box-desc
          text-align: left
          padding: 10px 0
          margin: 0 10px
          h1
            font-size: 14px
            color: #fff
            margin: 0 0 10px 0
          p
            font-size: 12px
            color: #9B9B9B
            margin: 0
        .shortcut-button
          padding: 7px 19px
          border-radius: 4px
          box-shadow: #1B1B1B
          font-weight: bold
          margin: 12px 5px
          white-space: nowrap
          display: block
        .gold-button
          background: linear-gradient(to bottom, #ffe206, #ff9704)
          color: #a73102
          text-shadow: #F5A623
        .sliver-button
          background: linear-gradient(to bottom, #b2daeb, #87adbd)
          color: #4b6e7d
          text-shadow: #F5A623

   
    
    @media only screen and (min-width : 320px) 
      .promo-shortcup
        padding: 10px 7px
        padding-bottom: 0
      .shortcup-box
        width: 100%
      .promo-user-info-left
        padding: 0
        h3
          margin: 0
      .promo-user-info-right
        padding: 0
      span a.claim-all-btn
        width: 120px
    @media only screen and (min-width : 480px) 
      .box-desc 
        margin: 0 6px
      .promo-shortcup
        padding: 10px 7px
      .promo-user-info-left
        padding: 10px
      .shortcup-box
        width: 100%
      span a.claim-all-btn
        width: 120px
    @media only screen and (min-width : 768px) 
      .promo-shortcup
        padding: 10px
      .promo-user-info-left
        padding: 10px
      .promo-user-info-right
        padding: 10px
      .shortcup-box
        width: 48%
      span a.claim-all-btn
        width: 180px

  @media (max-width: 414px) and (min-width: 376px)
    .promo-info-top .promo-shortcup .shortcup-box
      padding: 10px 23px

  @media (max-width: 360px)
    .promo-info-top
      .promo-shortcup 
        .shortcup-box
          .gold-button, .sliver-button
            font-size: 11px
          // .coin-icon
          //   padding: 9px 3px 0
          //   width: 50px
          .box-desc 
            margin: 0 0px 0 5px
            h1
              font-size: 11px
            p
              font-size: 10px
  @media (max-width: 320px)
    .promo-info-top
      .promo-shortcup 
        .shortcup-box
          .gold-button, .sliver-button
            font-size: 10px
          .coin-icon
            padding: 9px 3px 0
            width: 45px
          .box-desc 
            margin: 0 0px 0 5px
            h1
              font-size: 10px
            p
              font-size: 10px
</style>
