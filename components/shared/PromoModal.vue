<template>
  <div id="new-promo-modal">
    <transition name="modal">
      <div v-if="isVisible" class="modal-mask" @click.self="close">
        <div class="modal-wrapper">
          <div class="modal-content custom-modal-content">
            <div class="modal-body">
              <div class="top-menu">
                <div @click="close" class="close-button">
                  <span></span>
                  <span></span>
                </div>
                <ul class="list-unstyled list-inline">
                  <li v-for="(link, index) in links" :key="index" :class="{ active: promoId === link.id }">
                    <a :class="link.class" @click="checkUser(link,index)" :id="link.id">{{ link.cntitle }}</a>
                    <!-- <a v-else href="javascript:void(0)" @click="showErrorModal" :class="link.class" :id="link.id">{{ link.cntitle }}</a> -->
                  </li>
                </ul>
              </div>

              <div class="tab-content new-promo-tab-content">
                <transition name="fade" mode="out-in">
                  <div v-if="promoId === 0" id="promo-0" key="promo-0" class="tab-pane active">
                    <div class="promo-tab-container">
                      <div class="promo-tab-image">

                        <div>
                          <img class="img-responsive" src="//cdn.mr007.co/images/web/promo/promotion.01.jpg" />
                        </div>
                        <div v-if="!auth" class="bottom-buttons" @click="close">
                          <nuxt-link to="/register" class="register">注册</nuxt-link>
                          <a class="login">登录</a>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div v-else-if="promoId === 1" id="promo-1" key="promo-1" class="tab-pane active">
                    <div class="promo-tab-container">
                      <div class="promo-tab-image">
                        <div>
                          <img class="img-responsive" src="//cdn.mr007.co/images/web/promo/promotion.02.jpg" />
                        </div>
                        <div v-if="!auth" class="bottom-buttons" @click="close">
                          <nuxt-link to="/register" class="register">注册</nuxt-link>
                          <a class="login">登录</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="promoId === 2" id="promo-2" key="promo-2" class="tab-pane active">
                    <div class="promo-tab-container">
                      <div class="promo-tab-image">
                        <div>
                          <img class="img-responsive" src="//cdn.mr007.co/images/web/promo/promotion.03.jpg" />
                        </div>
                        <div v-if="!auth" class="bottom-buttons" @click="close">
                          <nuxt-link to="/register" class="register">注册</nuxt-link>
                          <a class="login">登录</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="promoId === 3" id="promo-3" key="promo-3" class="tab-pane active">
                    <promo-treasures @close="close" />
                  </div>

                  <div v-else-if="promoId === 4" id="promo-4" key="promo-4" class="tab-pane active">
                    <promo-spinner />
                  </div>

                </transition>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PromoTreasures from "~/components/shared/PromoTreasures";
import PromoSpinner from "~/components/shared/PromoSpinner";
export default {
  components: {
    PromoTreasures,
    PromoSpinner
  },
  props: {
    promoId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      spin: false,
      spinSeconds: 2,
      links: [
        {
          name: "feature",
          class: "open-feat imgp",
          id: 0,
          cntitle: "最新资讯"
        },
        { name: "treasure", class: "open-tc tc", id: 1, cntitle: "最新游戏" },
        { name: "spinner", class: "open-spin spin", id: 2, cntitle: "APP" },
        {
          name: "spinner",
          class: "open-spin spin",
          id: 3,
          cntitle: "每日宝箱",
          auth: true
        },
        {
          name: "spinner",
          class: "open-spin spin",
          id: 4,
          cntitle: "幸运转盘",
          auth: true
        }
      ],
      chests: [
        {
          claimed: false,
          available: false,
          amount: 1000
        },
        {
          claimed: false,
          available: false,
          amount: 5000
        },
        {
          claimed: false,
          available: false,
          amount: 10000
        },
        {
          claimed: false,
          available: false,
          amount: 20000
        },
        {
          claimed: false,
          available: false,
          amount: 50000
        },
        {
          claimed: false,
          available: false,
          amount: 100000
        }
      ],
      claims: [
        {
          img: "http://cdn.mr007.co/images/web/promo/tc-img-1.png",
          title: "前往账户中心进行存款",
          desc: "账户余额不足？前往账户中心进行存款，即可活动更多活跃度！",
          claimGoto: "/uc/deposit"
        },
        {
          img: "http://cdn.mr007.co/images/web/promo/tc-img-2.png",
          title: "前往游戏页面进行娱乐",
          desc: "还未玩尽兴？更多老虎机游戏等您来娱乐，让您一嗨再嗨！",
          claimGoto: "/game?platform=PT&type=1"
        },
        {
          img: "http://cdn.mr007.co/images/web/promo/tc-img-3.png",
          title: "前往全新PT场馆",
          desc: "期待更多惊喜？全新游戏精美刺激画面，亿万给您第一时间体验！",
          claimGoto: "/game?platform=SWPT&type=1"
        }
      ],
      interval: 0,
      marqueeDetails: [
        {
          name: "da***88",
          bonus: "5元"
        },
        {
          name: "gg**37",
          bonus: "5元"
        },
        {
          name: "zq***81",
          bonus: "5元"
        },
        {
          name: "mr*********ui",
          bonus: "18元"
        },
        {
          name: "GG*****69",
          bonus: "28元"
        },
        {
          name: "kf**86",
          bonus: "88元"
        },
        {
          name: "52**QQ",
          bonus: "5元"
        },
        {
          name: "a8***11",
          bonus: "5元"
        },
        {
          name: "lz***89",
          bonus: "5元"
        },
        {
          name: "LF***66",
          bonus: "5元"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["auth"]),
    ...mapGetters("treasure", ["treasures"]),
    isVisible() {
      return this.promoId !== -1;
    },
    classAnimationSpin() {
      return this.spin
        ? {
            animation: `spinnerRotate ${this.spinSeconds}s infinite linear`
          }
        : "";
    }
  },
  watch: {
    promoId(val) {
      this.$scrollable(val === -1);
    }
  },
  methods: {
    async spinSpinner() {
      const random = this.$random(5000, 10000);

      this.spin = true;
      await this.$sleep(random);
      this.spinSeconds *= 2;
      await this.$sleep(random / 4);
      this.spinSeconds *= 4;
      this.spin = false;
      this.spinSeconds = 2;
    },
    // classActiveTab(id) {
    //   return this.promoId === id ? "in active" : "";
    // },
    close() {
      this.$emit("update:promoId", -1);
    },
    async checkUser(link, index) {
      if (!this.auth && !link.auth) {
        this.$emit("update:promoId", index);
      } else if (this.auth) {
        await this.$store.dispatch("treasure/getTreasures");
        this.$emit("update:promoId", index);
      } else {
        this.showErrorModal();
      }
    },
    showErrorModal() {
      this.$store.commit("modal/OPEN_MODAL", {
        content: "请先前往登录。",
        type: "error"
      });
    },
    runMarqueeAnimation() {
      let w = setInterval(() => {
        if (this.$refs.marqueeItems) {
          clearInterval(w);
          let _marqueeWidth = 0;
          for (let i = 0, e = this.$refs.marqueeItems; i < e.length; i++) {
            let _style = e[i].currentStyle || window.getComputedStyle(e[i]);
            let _width = e[i].offsetWidth;
            let _margin =
              parseFloat(_style.marginLeft) + parseFloat(_style.marginRight);
            let _padding =
              parseFloat(_style.paddingLeft) + parseFloat(_style.paddingRight);
            let _border =
              parseFloat(_style.borderLeftWidth) +
              parseFloat(_style.borderRightWidth);

            _marqueeWidth += _width + _margin - _padding + _border;
          }

          let x = setInterval(() => {
            if (this.$refs.marqueeContainer !== undefined) {
              this.$refs.marqueeContainer.style.width = `${_marqueeWidth +
                0}px`;
              clearInterval(x);
            }
          }, 500);
        }
      }, 500);
    }
  }
};
</script>

<style lang="sass">
  @import './assets/sass/_variables'

  @keyframes spinnerRotate
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)
  .spinner
    &.spin
      animation: spinnerRotate 190s infinite linear


    100%
      transform: translateX(-100%)
  .promo-tab-tc
    background: #1c70b5
    height: 600px
    overflow-y: auto
    overflow-x: hidden
  #new-promo-modal
    .modal-mask
      position: fixed
      z-index: 2000
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: rgba(0, 0, 0, 0.7)
      display: table
      transition: opacity .3s ease
    .modal-wrapper
      .modal-content
        border: 1px solid transparent
        background: #000
        box-shadow: none
      .custom-modal-content
        width: 800px
        .modal-body
          color: $default
          background-color: transparent
          padding: 0
          border-radius: 4px;
          overflow: hidden;

          .side-menu
            position: absolute
            float: left
            width: 87px
            margin-top: 80px
            z-index: 9999
            li
              height: 140px
              width: 140px
              margin-bottom: 10px

            .side-menu-images
              height: 100%

      .tab-content
        width: 100%;
        height: 100%
        background-repeat: no-repeat
        background-position: top center

      .custom-modal-content
        .modal-body .side-menu .side-menu-images li
          a
            display: block
            width: 100%
            height: 100%
            &.spin
              background-image: url("http://cdn.mr007.co/images/web/promo/new/tab-3.png")
              background-repeat: no-repeat
              background-position: top center
          &.active
            a.spin
              background-image: url("http://cdn.mr007.co/images/web/promo/new/tab-3-on.png")
            a.tc
              background-image: url("http://cdn.mr007.co/images/web/promo/new/tab-2-on.png")
            a.imgp
              background-image: url("http://cdn.mr007.co/images/web/promo/new/tab-1-on.png")
          a.tc
            background-image: url("http://cdn.mr007.co/images/web/promo/new/tab-2.png")
            background-repeat: no-repeat
            background-position: top center
          a.imgp
            background-image: url("http://cdn.mr007.co/images/web/promo/new/tab-1.png")
            background-repeat: no-repeat
            background-position: top center
            -webkit-box-shadow: none
            box-shadow: none

        .modal-header
          background-color: transparent
          button
            color: $light-blue-6
            opacity: 1
            text-shadow: none
            margin-right: -29px
            font-size: 40px
            margin-top: -13px

    .new-promo-tab-content .fade.in
      background-color: transparent

    .promo-tab-container
      height: 600px

    .promo-tab-container .bottom-buttons
      position: absolute
      bottom: 0px
      width: 100%
      height: 45px
      display: table
      z-index: 99999
      padding: 10px
      background: rgba(#000, .9)
      text-align: right
      .register
        background: #F5A623
        color: #0f304d
      .login
        background: #0d476b
        color: #fff
      a
        font-size: 12px
        line-height: 25px
        text-align: center
        color: $gray-base
        margin-right: 10px
        border: 0
        padding: 7px 40px
        border-radius: 20px
        &:hover
          text-decoration: none

    .close-button
      margin-bottom: 0
      margin-right: 0
      float: right
      width: 50px
      height: 50px
      padding: 10px
      cursor: pointer
      background: rgba(#000, .9)
      // position: absolute
      // top: 10px
      // right: 20px
      span
        position: absolute
        background: #FFFFFF
        width: 28px
        height: 1px
        margin: 15px -15px 0
        -webkit-transition: .2s ease
        transition: .2s ease
        z-index: 3
        &:first-child
          -webkit-transform: rotate(45deg)
          transform: rotate(45deg)
        &:nth-child(2)
          -webkit-transform: rotate(-45deg)
          transform: rotate(-45deg)
    .modal-body > .top-menu > .close-button:hover > span
      &:first-child
        -webkit-transform: rotate(405deg)
        transform: rotate(405deg)
      &:nth-child(2)
        -webkit-transform: rotate(315deg)
        transform: rotate(315deg)


    #promo-0 .promo-tab-container
      background-position: center center
      background-repeat: no-repeat

    #promo-1 .promo-tab-container
      background-position: center center
      background-repeat: no-repeat
      .promo-tab-tc
        position: relative
        height: 100%
        overflow: hidden
        .claims
          margin: 0 auto
          padding: 10px 30px
          .promo-claim
            background-color: $blue-16
            margin-top: 5px
            padding: 5px 15px
            border-radius: 5px
            border: 1px solid $blue-17

    .promo-tab-tc .promo-info-top
      height: 250px
      display: table
      padding-top: 70px
      margin: 0 auto
      .promo-info-img
        display: table-cell
        width: 200px
        vertical-align: middle
      .promo-info
        display: table-cell
        width: 400px
        height: 100%
        vertical-align: top
        .promo-user-info-bottom
          margin-top: 10px
          position: relative
          p
            width: 200px
            font-size: 11px
            text-align: left
            white-space: nowrap
            span
              color: $yellow-16
            &.info-hover
              color: $yellow-16
              width: 160px
              cursor: pointer
              text-align: center
              &:hover + span.info-hover-desc
                display: block

    span.info-hover-desc
      display: none
      background: $red-1
      font-size: 11px
      position: absolute
      left: 0
      padding: 10px
      top: 20px
      text-align: left
      &:after
        content: ''
        position: absolute
        border-style: solid
        border-width: 0 7px 6px
        border-color: $red-1 transparent
        display: block
        width: 0
        z-index: 1
        top: -6px
        right: 70px

    p.info-hover:hover span.info-hover-desc
      display: inline-block

    .promo-tab-tc .promo-info-top .promo-info
      img
        margin-bottom: 10px
      .promo-user-info
        background-color: #00315a
        margin-top: 5px
        margin-bottom: 5px
        padding: 5px 15px
        border-radius: 5px
        border: 1px solid $blue-17

    .promo-user-info
      .promo-user-info-left
        width: 160px
        display: inline-block
        vertical-align: middle
      .promo-user-info-right
        width: 200px
        display: inline-block
        vertical-align: middle
        span a.claim-all-btn
          display: block
          height: 42px
          background-image: url('http://cdn.mr007.co/images/web/promo/tc-btn.png')
          background-repeat: no-repeat
          background-position: center center
          background-size: contain
          margin: 0 auto
          &.off
            background-image: url('http://cdn.mr007.co/images/web/promo/tc-btn-off.png')
      .promo-user-info-left
        h4
          font-size: 1em
          margin-bottom: 10px
        h3
          color: $yellow-16

    #promo-1 .promo-tab-container .promo-tab-tc
      .claims .promo-claim
        ul.list-inline
          margin-bottom: 0
        .claim-text
          h3
            font-size: 1em
            color: $yellow-17
          p
            margin-top: 5px
            font-size: $font-size-small
        .claim-img
          width: 80px
          vertical-align: middle
        .claim-text
          vertical-align: middle
          text-align: left
          width: 380px
        .cl-btn
          vertical-align: middle
        .claim-btn
          background-image: url('http://cdn.mr007.co/images/web/promo/tc-claim-btn.png')
          background-repeat: no-repeat
          background-position: center center
          height: 34px
          width: 115px
          display: block
    span.tc-label
      position: relative
      top: 12px
    .treasure-chest
      &#tc-1000 a
        .tc-label
          background-image: url("http://cdn.mr007.co/images/web/promo/tc-box-label-01.png")
          background-position: center center
          background-repeat: no-repeat
          background-size: cover
          background-size: 100%
        &.claimed span.tc-icon
          background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/3/1-3.png")
          background-position: center center
          background-size: cover
          background-size: 100%
        &.unclaimed
          &.available span.tc-icon
            background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/2/1-2.png")
            background-position: center center
            background-size: cover
            background-size: 100%
          &.unavailable span.tc-icon
            background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/1/1.png")
            background-position: center center
            background-size: cover
            background-size: 100%
      &#tc-5000 a
        .tc-label
          background-image: url("http://cdn.mr007.co/images/web/promo/tc-box-label-02.png")
          background-position: center center
          background-repeat: no-repeat
          background-size: cover
          background-size: 100%
        &.claimed span.tc-icon
          background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/3/2-3.png")
          background-position: center center
          background-size: cover
          background-size: 100%
        &.unclaimed
          &.available span.tc-icon
            background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/2/2-2.png")
            background-position: center center
            background-size: cover
            background-size: 100%
          &.unavailable span.tc-icon
            background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/1/2.png")
            background-position: center center
            background-size: cover
            background-size: 100%
      &#tc-10000 a
        .tc-label
          background-image: url("http://cdn.mr007.co/images/web/promo/tc-box-label-03.png")
          background-position: center center
          background-repeat: no-repeat
          background-size: cover
          background-size: 100%
        &.claimed span.tc-icon
          background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/3/3-3.png")
          background-position: center center
          background-size: cover
          background-size: 100%
        &.unclaimed
          &.available span.tc-icon
            background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/2/3-2.png")
            background-position: center center
            background-size: cover
            background-size: 100%
          &.unavailable span.tc-icon
            background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/1/3.png")
            background-position: center center
            background-size: cover
            background-size: 100%
      &#tc-20000 a
        .tc-label
          background-image: url("http://cdn.mr007.co/images/web/promo/tc-box-label-04.png")
          background-position: center center
          background-repeat: no-repeat
          background-size: cover
          background-size: 100%
        &.claimed span.tc-icon
          background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/3/4-3.png")
          background-position: center center
          background-size: cover
          background-size: 100%
        &.unclaimed
          &.available span.tc-icon
            background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/2/4-2.png")
            background-position: center center
            background-size: cover
            background-size: 100%
          &.unavailable span.tc-icon
            background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/1/4.png")
            background-position: center center
            background-size: cover
            background-size: 100%
      &#tc-50000 a
        .tc-label
          background-image: url("http://cdn.mr007.co/images/web/promo/tc-box-label-05.png")
          background-position: center center
          background-repeat: no-repeat
          background-size: cover
          background-size: 100%
        &.claimed span.tc-icon
          background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/3/5-3.png")
          background-position: center center
          background-size: cover
          background-size: 100%
        &.unclaimed
          &.available span.tc-icon
            background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/2/5-2.png")
            background-position: center center
            background-size: cover
            background-size: 100%
          &.unavailable span.tc-icon
            background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/1/5.png")
            background-position: center center
            background-size: cover
            background-size: 100%
      &#tc-100000 a
        .tc-label
          background-image: url("http://cdn.mr007.co/images/web/promo/tc-box-label-06.png")
          background-position: center center
          background-repeat: no-repeat
          background-size: cover
          background-size: 100%
        &.claimed span.tc-icon
          background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/3/6-3.png")
          background-position: center center
          background-size: cover
          background-size: 100%
        &.unclaimed
          &.available span.tc-icon
            background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/2/6-2.png")
            background-position: center center
            background-size: cover
            background-size: 100%
          &.unavailable span.tc-icon
            background-image: url("http://cdn.mr007.co/images/web/promo/new/chests/1/6.png")
            background-position: center center
            background-size: cover
            background-size: 100%

  .new-promo-tab-content button.close
    background-color: red
    opacity: 1

  .promo-tab-image
    position: relative
    height: 100%
    width: 100%
    overflow: hidden

    .promo-tab-image-menu
      position: absolute
      width: 100%
      margin-left: 0
      height: 60px
      z-index: 9999
      background: rgba(#000, .5)
      padding-top: 10px
      li
        position: relative
        width: 120px
        &.active
          display: inline-block
          font-weight: normal
          a
            color: #fff
            line-height: 36px
            display: block
            position: relative
            border-bottom: #00aeff 2px solid

        a
          color: rgba(#fff, .5)
          line-height: 37px
          display: block
          position: relative
          letter-spacing: 1px
          &:hover, &:active, &:focus
            text-decoration: none
    .promo-tab-image .tab-pane
      height: 100%
      &.active a
        display: block

  .top-menu
    position: absolute
    width: 100%
    top: 0
    z-index: 2;
    font-size: 13px
    letter-spacing: 1px
    ul
      background: rgba(#000, .9)
      margin: 0
      padding: 0
      text-align: left
      overflow: hidden
      li
        padding: 5px 10px 0
        margin: 5px 20px
        // margin: 5px
        // padding: 0 10px
        // height: 50px
        line-height: 33px
        text-align: center
        &.active
          border-bottom: 2px solid #03A9F4
          a
            color: #fff
            font-weight: bolder
        a
          color: rgba(#fff, .7)
          display: block
          width: 100%
          height: 100%

  @media (min-width: 426px) and (max-width: 768px)
    #new-promo-modal
      .close-button
        top: 13px
        right: 25px
        span
      .modal-wrapper
        .custom-modal-content
          width: 745px
        .promo-tab-container
          .bottom-details
            .sp-announcement
              background-size: 554px
              .live-players-list
                ul
                  li
                    p
                      padding: 13px 0px
  @media (min-width: 415px) and (max-width: 425px)
    .promo-info
      width: 320px
    .promo-tab-tc
        height: 520px
    .modal-mask .modal-wrapper
      width: 95%
    #new-promo-modal
      .close
        top: 9px
        right: 9px
      .close-button
        top:
        right:
        span
          width:
      .modal-wrapper
        .custom-modal-content
          width: 402px
          .tab-content
            padding-top: 20px
            // height: 300px
          .promo-tab-container
            height: 300px

            .spinner-container
              margin-left: -98px
              top: 31px
              height: 220px
              width: 220px
              background-size: 220px 220px
              .spinner
                width: 167px
                height: 167px
                top: 27px
                left: 26px
                background-size: 167px 167px
              .spinner-button
                top: 61px
                left: 77px
                width: 65px
                height: 82px
          .top-menu
            ul
              li
                // width: 73px
                // height: 40px
                // line-height: 40px
                // position: relative
                // margin: 5px 5px
                a
                  font-size: 10px


  @media (min-width: 376px) and (max-width: 414px)
    .promo-user-info-left
      padding: 0
    #new-promo-modal
      .promo-tab-tc
        height: 520px
        .promo-info-top
          padding-top: 20px

    .modal-mask .modal-wrapper
      width: 95%
    #new-promo-modal
      .close
        top: 9px
        right: 9px
      .close-button
        width: 24px
        height: 39px
        padding: 4px
        span
          width: 21px
      .modal-wrapper
        .custom-modal-content
          width: 392px
          .tab-content
            padding-top: 39px
            // height: 285px
          .promo-tab-container
            height: 310px
            .bottom-buttons
              height: 35px
              padding: 5px
              a
                font-size: 9px
                line-height: 20px
                padding: 4px 20px
            .spinner-container
              margin-left: -135px
              top: 46px
              height: 275px
              width: 275px
              background-size: 275px 275px
              .spinner
                width: 208px
                height: 208px
                top: 34px
                left: 34px
                background-size: 208px 208px
              .spinner-button
                  top: 78px
                  left: 97px
                  width: 81px
                  height: 100px
          .top-menu
            ul
              li
                padding: 0px 6px 0
                margin: 5px 7px
                line-height: 28px
                &.active
                  border-bottom-width: 1px
                a
                  font-size: 10px

  @media (min-width: 321px) and (max-width: 375px)

    #new-promo-modal
      .promo-tab-tc
        height: 520px
        .promo-info-top
          padding-top: 30px
          .promo-info
            width: 320px
    .modal-mask .modal-wrapper
      width: 95%
    #new-promo-modal
      .close
        top: 9px
        right: 9px
      .close-button
        width: 24px
        height: 39px
        padding: 4px
        span
          width: 20px
      .modal-wrapper
        .custom-modal-content
          width: 355px
          .tab-content
            padding-top: 39px
            // height: 264px
          .promo-tab-container
            height: 282px
            .bottom-buttons
              height: 35px
              padding: 5px
              a
                font-size: 9px
                line-height: 20px
                padding: 4px 20px
            .spinner-container
              margin-left: -124px
              top: 46px
              height: 245px
              width: 245px
              background-size: 245px 245px
              .spinner
                width: 185px
                height: 185px
                top: 30px
                left: 30px
                background-size: 185px 185px
              .spinner-button
                top: 69px
                left: 87px
                width: 71px
                height: 89px
          .top-menu
            ul
              li
                padding: 0px 4px 0
                margin: 5px
                line-height: 28px
                &.active
                  border-bottom-width: 1px
                a
                  font-size: 9px

  @media (min-width : 320px) and (max-width: 360px)
    .promo-tab-tc
      height: 520px
    #new-promo-modal
      .close
        top: 6px
        right: 7px
      .close-button
        width: 24px
        height: 39px
        padding: 4px
        span
          width: 20px
      .modal-wrapper
        .custom-modal-content
          width: 100%
          margin: 0 auto
          .tab-content
            padding-top: 39px
            // height: 232px
          .promo-tab-container
            height: 232px
            .bottom-buttons
              height: 32px
              padding: 5px
              a
                font-size: 9px
                line-height: 20px
                padding: 4px 20px
            .spinner-container
              margin-left: -94px
              top: 46px
              height: 195px
              width: 195px
              background-size: 195px 195px
              .spinner
                width: 148px
                height: 148px
                top: 24px
                left: 24px
                background-size: 148px 148px
              .spinner-button
                top: 53px
                left: 68px
                width: 59px
                height: 74px
          .top-menu
            ul
              li
                padding: 0px 4px 0
                margin: 5px
                line-height: 28px
                &.active
                  border-bottom-width: 1px
                a
                  font-size: 8px

  @media (max-width: 414px)
    #new-promo-modal .promo-tab-tc .promo-info-top .promo-info
      width: 100% !important
      padding: 0px 7px 0 7px
    #new-promo-modal .promo-tab-tc .promo-info-top .promo-info img
      margin-bottom: 10px
      margin: 0 auto

  @media (max-width: 320px)
    #new-promo-modal .promo-tab-tc .promo-info-top .promo-info
      width: 100% !important
      padding: 0px 7px 0 7px
    #new-promo-modal .promo-tab-tc .promo-info-top
      padding-top: 20px
</style>
