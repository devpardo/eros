<template>
  <div class="call-to-action">
    <div class="container bottomArea">
      <div class="col-md-4 col-xs-12 bottomBox">
        <div class="jackpot">
          <div class="odometer">
            <div class="jackpot-pot clearfix">
              <div class="odometer-digits">
                <div class="digit" v-for="x of 9" :key="x" :style="{ 'top': '0px'}" ref="odometer">
                  <p v-for="(i, index) of 10" :key="index">{{ index }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-xs-12 bottomBox">
        <div id="bannervideo">
          <a class="video">
            <video id="smallvideo" autoplay="autoplay" loop="loop" playsinline muted="muted">
              <source src="//cdn.mr007.co/images/uploads/games/video/fa8f11d7-ce27-4bd6-be3f-f3cd14d21eda.mp4" type="video/mp4">
            </video>
            <div class="icon" @click="show=true">
              <img src="~/assets/images/show.svg">
            </div>
          </a>
        </div>
      </div>
      <!--<div class="col-md-4 col-xs-12 bottomBox">-->
        <!--<div class="support">-->
          <!--<img src="/images/support.png">-->
        <!--</div>-->
        <!--<div class="col-xs-12 border-right bottomBox">-->
          <!--<ul class="payment-method">-->
            <!--<li>-->
              <!--<a href="javascript:void(0)" @click="goToAccount">-->
                <!--<img src="//cdn.mr007.co/images/web/payment.method/alipay.png">-->
                <!--<p class="">支付宝</p>-->
              <!--</a>-->
            <!--</li>-->
            <!--<li>-->
              <!--<a href="javascript:void(0)" @click="goToAccount">-->
                <!--<img src="//cdn.mr007.co/images/web/payment.method/qqpay.png">-->
                <!--<p class="">QQ钱包</p>-->
              <!--</a>-->
            <!--</li>-->
            <!--<li>-->
              <!--<a href="javascript:void(0)" @click="goToAccount">-->
                <!--<img src="//cdn.mr007.co/images/web/payment.method/wepay.png">-->
                <!--<p class="">微信支付</p>-->
              <!--</a>-->
            <!--</li>-->
            <!--<li>-->
              <!--<a href="javascript:void(0)" @click="goToAccount">-->
                <!--<img src="//cdn.mr007.co/images/web/payment.method/jdpay.png">-->
                <!--<p class="">京东支付</p>-->
              <!--</a>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
        <!--<div class="col-xs-12 deposit-speed">-->
          <!--<ul>-->
            <!--<li>-->
              <!--存款速度-->
              <!--<i class="fa fa-bolt"></i>-->
              <!--<i class="fa fa-bolt"></i>-->
              <!--<i class="fa fa-bolt"></i>-->
              <!--<i class="fa fa-bolt"></i>-->
              <!--(低于5分钟)-->
            <!--</li>-->
            <!--<li>-->
              <!--提款速度-->
              <!--<i class="fa fa-bolt"></i>-->
              <!--<i class="fa fa-bolt"></i>-->
              <!--<i class="fa fa-bolt"></i>-->
              <!--<i class="fa fa-bolt"></i>-->
              <!--<i class="fa fa-bolt"></i>-->
              <!--(低于2分钟)-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
      <!--</div>-->
      <div class="col-md-4 col-xs-12 bottomBox">
        <div class="bottom_banner">
          <div>
            <a @click="goToLobby">
              <img class="img-responsive img-tab-width" src="//cdn.mr007.co/images/web/mrtv.banner.new.jpg">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="show">
      <div id="video-blind">
        <div class="player">
          <a class="close-video-button" @click="show=false">
            <span></span>
            <span></span>
          </a>
          <video controls="controls" autoplay="autoplay" controlslist="nodownload" class="full-screen-video">
            <source src="//cdn.mr007.co/images/uploads/games/video/fa8f11d7-ce27-4bd6-be3f-f3cd14d21eda.mp4" type="video/mp4">
          </video>
        </div>
        <div class="bg"></div>
      </div>
    </div>
  </div>
</template>
<script>
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AnimatedNumber
  },
  computed: {
    ...mapGetters(["auth"])
  },
  mounted() {
    this.cur = Math.floor(
      Math.random() * (550000000 - 500000000 + 1) + 500000000
    );
    this.value = String(this.cur).split("");

    for (let i = 0, o = this.$refs.odometer; i < o.length; i++) {
      this.runOdometer(o[i], i);
    }

    setInterval(() => {
      this.cur += Math.floor(Math.random() * (20000 - 5000 + 1) + 5000);
      let _new = String(this.cur).split("");

      for (let i = 0, o = this.$refs.odometer; i < o.length; i++) {
        this.runOdometer(o[i], i, _new[i]);
      }

      this.value = String(this.cur).split("");
    }, 4000);
  },
  data() {
    return {
      cur: 0,
      value: [],
      show: false
    };
  },
  methods: {
    goToLobby() {
      if (!this.auth) {
        this.$notify("请先登录再操作！", "error");
        return;
      }

      this.$router.push({
        name: "lobby"
      });
    },
    runOdometer(element, index, cur) {
      if (process.browser) {
        if (this.value[index] !== cur || cur === undefined) {
          let _toBeAnimate = (cur === undefined ? this.value[index] : cur) * 42;
          element.style.top = `-${_toBeAnimate}px`;
        }
      }
    },
    goToAccount() {
      if (!this.auth) {
        this.$notify("请先登录再操作！", "error");
      } else {
        this.$router.push({
          name: "uc-deposit"
        });
      }
    }
  }
};
</script>

<style lang="sass" scoped>
  .image-banner
    cursor: pointer

  .call-to-action
    margin-top: 20px
    margin-bottom: 20px
    .bottomArea
      padding: 0
      .bottomBox
        padding: 0
        padding-right: 10px

        .bottom_banner
          margin-left: 10px;

        #bannervideo
          width: auto
          height: auto
          position: relative
          padding-left: 10px
          .video
            height: 100%
            max-height: 210px
            overflow: hidden
            margin: 0 auto
            transition: all .2s
            transform: translateY(0)
            display: flex
            align-items: flex-end
            background: #000
            video
              width: 100%
              height: auto
              transition: all .2s
            .icon
              position: absolute
              width: 36px
              height: 36px
              bottom: 1px
              left: 2px
              padding: 10px
              opacity: 1
              transition: .2s
    .jackpot
      background: url("/images/jackpot.background.png") no-repeat
      background-size: 100%
      width: 100%
      height: 210px
      .arrowhead
        height: 40px
        width: 130px
        position: relative
        border-radius: 20px 0px 0px 20px
        left: -30px
        p
          position: relative
          z-index: 2
          font-size: 22px
          line-height: 40px
          &.arrow-text
            color: white
            left: 63px
          &.sub-text
            color: #2576BC
            top: -50px
            left: 190px
        &:before
          background: #2576BC
          content: ""
          position: absolute
          top: 0px
          left: 42px
          height: 52%
          width: 100%
          border-radius: 5px 2px 5px 0px
          -webkit-transform: skew(45deg)
          -moz-transform: skew(45deg)
          transform: skew(45deg)
        &:after
          background: #2576BC
          content: ""
          position: absolute
          bottom: 0px
          left: 42px
          height: 52%
          width: 100%
          border-radius: 0px 5px 2px 5px
          -webkit-transform: skew(-45deg)
          -moz-transform: skew(-45deg)
          transform: skew(-45deg)
      .odometer
        height: 65px
        .jackpot-pot
          height: 100%
          border-radius: 5px
          padding: 10px 0
          &:after
            font-family: FontAwesome
            content: "\f111"
            color: #4a4a4a
            position: relative
            left: 300px
            top: 67px
            transform: scale(.5)
          .yuan
            height: 100%
            font-size: 44px
            color: #2576BC
            padding: 2px 0
            width: 34px
            text-align: center
            position: relative
            top: -10px

          .odometer-digits
            width: calc(100% - 150px)
            height: 100%
            overflow: hidden
            top: 90px
            left: 148px
            position: relative

            .digit
              float: left
              position: relative
              transition: top 1s ease-in-out

              &:nth-child(7)
                width: 30px
              &:nth-child(8)
                p
                  font:
                    size: 38px
              &:nth-child(9)
                p
                  font:
                    size: 38px
              p
                margin-bottom: 0
                line-height: 42px
                color: #4a4a4a
                font:
                  size: 36px
                  weight: 900
    .jackpot-prize
      h1
        color: #2576BC
        font-size: 44px
        margin: 0
        line-height: 70px
        font-weight: 550

    .support
      margin-bottom: 10px
      .arrowhead
        height: 40px
        width: 130px
        position: relative
        border-radius: 20px 0px 0px 20px
        left: -30px
        p
          position: relative
          z-index: 2
          font-size: 22px
          line-height: 40px
          &.arrow-text
            color: white
            left: 63px
          &.sub-text
            color: #FF9F00
            top: -50px
            left: 190px
        &:before
          background: #FF9F00
          content: ""
          position: absolute
          top: 0px
          left: 42px
          height: 52%
          width: 100%
          border-radius: 5px 2px 5px 0px
          -webkit-transform: skew(45deg)
          -moz-transform: skew(45deg)
          transform: skew(45deg)
        &:after
          background: #FF9F00
          content: ""
          position: absolute
          bottom: 0px
          left: 42px
          height: 52%
          width: 100%
          border-radius: 0px 5px 2px 5px
          -webkit-transform: skew(-45deg)
          -moz-transform: skew(-45deg)
          transform: skew(-45deg)
    .col-xs-6
      padding-right: 0
      padding-left: 0
    .border-right
      border-right: 1px solid #9B9B9B
    .payment
      padding:
        left: 0
        right: 0
      ul.payment-method
        padding: 5px 0
        margin-bottom: 0
        li
          width: 25%
          display: inline-block
          a
            img
              float: left
              width: 17px
              margin-right: 5px
            p
              font-size: 12px
              color: #9B9B9B
              margin: 0 0 5px
              &:hover
                color: #00aeff
                text-decoration: underline
    .deposit-speed
      font-size: 12px
      padding-left: 0
      ul
        li
          .fa
            padding: 0 2px
          float: left
          color: #9b9b9b
          width: 50%
          padding: 0

  @media only screen and (min-width: 321px) and (max-width: 1024px)
    .call-to-action
      .bottomArea
        .bottomBox
          padding: 10px 7px
      .payment
        ul.payment-method
          li
            width: 33.3333%
            padding-bottom: 5px
      .deposit-speed
        ul
          li
            width: 100%
            padding-bottom: 5px


  #video-blind
    position: fixed
    width: 100%
    height: 100%
    z-index: 110
    top: 0
    display: flex
    justify-content: center
    align-items: center
    .player
      display: block
      width: 100%
      height: 80%
      max-width: 1280px
      max-height: 720px
      margin-top: -80px
      .close-video-button
        margin-bottom: 0
        margin-right: 0
        float: right
        width: 29px
        height: 29px
        margin: 10px
        cursor: pointer
        span
          position: absolute
          background: #FFFFFF
          width: 28px
          height: 1px
          margin: 15px 0 0
          transition: .2s ease
          &:first-child
            transform: rotate(45deg)
          &:nth-child(2)
            transform: rotate(-45deg)
      video
        width: 100%
        height: 100%
        background: #000000
    .bg
      position: absolute
      display: block
      width: 100%
      height: 100%
      background: #333333
      opacity: .9
      top: 0
      z-index: -1
  #video-blind > .player > .close-video-button:hover > span
    transform: rotate(-180deg)

  @media (max-width: 1024px) and (min-width: 1024px)
    .call-to-action
      .jackpot
        .odometer
          .jackpot-pot
            &:after
              left: 229px
              top: 39px
              font-size: 11px
            .odometer-digits
              top: 62px
              left: 125px
              .digit p
                &:nth-child(8) p, &:nth-child(9) p, &:nth-child(7)
                  width: 19px
  @media (max-width: 768px) and (min-width: 768px)
    .call-to-action
      .jackpot
        height: 410px
      .bottomArea
        .bottomBox
          #bannervideo
            padding-left: 0px
          .bottom_banner
            margin-left: 0px
        .odometer
          .jackpot-pot
            &:after
              left: 519px
              top: 179px
            .odometer-digits
              top: 200px
              left: 372px
              position: relative
      .bottomArea
        .bottomBox
          #bannervideo
            .video
              max-height: 480px
    .img-tab-width
      width: 100%

  @media (max-width: 414px)
    .call-to-action
      margin-top: 10px
      .jackpot
        height: 221px
      .bottomArea
        .bottomBox
          #bannervideo
            padding-left: 0px
          .bottom_banner
            margin-left: 0px
        .odometer
          .jackpot-pot
            &:after
              left: 305px
              top: 77px
            .odometer-digits
              top: 100px
              left: 158px
    .bottom_banner
      img
        width: 100%

  @media (max-width: 375px)
    .call-to-action
      .jackpot
        height: 199px
      .bottomArea
        .bottomBox
          #bannervideo
            padding-left: 0px
          .bottom_banner
            margin-left: 0px
        .odometer
          .jackpot-pot
            &:after
              left: 283px
              top: 66px
            .odometer-digits
              top: 90px
              left: 148px
              .digit p
                font:
                  size: 33px
                  family: Avenir
            .odometer-digits
              .digit
                &:nth-child(8) p,&:nth-child(9) p
                  font-size: 28px


  @media only screen and (max-width: 320px)
    .call-to-action
      .jackpot
        height: 169px
      .bottomArea
        .bottomBox
          padding: 5px 7px
          #bannervideo
            padding-left: 0px
          .bottom_banner
            margin-left: 0px
      .payment
        ul.payment-method
          li
            width: 33.3333%
            padding-bottom: 5px
      .deposit-speed
        ul
          li
            width: 100%
            padding-bottom: 5px
      .odometer
        .jackpot-pot
          &:after
            left: 235px !important
            top: 42px !important
          .odometer-digits
            top: 70px !important
            left: 138px !important
            .digit
              p
                font-size: 23px !important

</style>
