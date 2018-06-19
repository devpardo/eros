<template>
  <div class="promo-tab-container">
    <div class="spinner-container">
      <div class="spinner" :style="turnStyles"></div>
      <button class="spinner-button" @click="onGetLotteryReward"></button>
    </div>
    <div class="bottom-details hidden-xs">
      <div class="sp-announcement">
        <div class="live-players-list">
          <ul class="list-inline" id="lucky_players" ref="marqueeContainer" :style="marqueeStyles">
            <li v-for="(detail, index) of marqueeDetails" :key="index" ref="marqueeItems">
              <p>恭喜
                <span>{{ detail.name }}</span>抽中了
                <span>{{ detail.bonus }}</span>现金红包
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PromoSpinner",
  data() {
    return {
      loading: false,
      turn: {
        start: 0,
        target: 0,
        count: 6
      },
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
    ...mapGetters(["lottery"]),
    lotteryLength() {
      return this.lottery ? this.lottery.length : 8;
    },
    startTurn() {
      return this.turn.start * 360 * this.turn.count;
    },
    endTurn() {
      return this.targetTurn * 360;
    },
    targetTurn() {
      return this.turn.target / this.lotteryLength;
    },
    turnStyles() {
      return {
        transform: `rotate(${this.startTurn - this.endTurn}deg)`,
        transition: `transform ${this.turn.count}s ease-in-out`
      };
      lotteryLength;
    },
    marqueeStyles() {
      return [
        {
          animation:
            this.marqueeDetails.length > 0
              ? "marqueeAnimation-data-v-55c21aa9 35s linear infinite"
              : ""
        },
        {
          width: this.marqueeDetails.length > 0 ? this.runMarqueeAnimation() : 0
        }
      ];
    }
  },
  methods: {
    ...mapActions(["getLottery", "getLotteryReward"]),
    async onGetLotteryReward() {
      if (this.loading || !this.lottery) return;
      try {
        this.loading = true;
        const amounts = [5, 8, 28, 88, 58, 288, 158, 18];
        const amount = await this.getLotteryReward();
        const index = amounts.indexOf(amount);
        //console.log(index);
        //console.log(this.lottery);

        this.turn.start += 1;
        this.turn.target = index;

        await this.$sleep(6000);

        //open modal using amount
        this.$notify(
          `恭喜您，获得“亿万幸运大转盘” ${amount} 元现金红包`,
          "error"
        );

        console.log(amount);
      } catch (error) {
        console.log(error);
        this.$notify(error.message, "error");
      } finally {
        this.loading = false;
      }
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
                3700}px`;
              clearInterval(x);
            }
          }, 500);
        }
      }, 500);
    }
  },
  async mounted() {
    await this.getLottery();
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'

  @keyframes marqueeAnimation
    0%
      transform: translateX(100px)

    100%
      transform: translateX(-100%)

  .spinner-container
    position: absolute
    margin-left: -226px
    left: 50%
    top: 70px
    height: 450px
    width: 450px
    background-size: 450px 450px
    background-image: url("https://cdn.mr007.co/images/web/promo/spinner-back.png")
    .spinner
      position: absolute
      width: 340px
      height: 340px
      top: 55px
      left: 55px
      transform-origin: center center
      background-repeat: no-repeat
      background-size: 340px 340px
      background-image: url("https://cdn.mr007.co/images/web/promo/spinner.png")

    .spinner-button
      cursor: pointer
      position: absolute
      top: 119px
      left: 155px
      z-index: 1000
      width: 139px
      height: 175px
      background: transparent
      background-image: url("https://cdn.mr007.co/images/web/promo/spinner-pointer.png")
      background-repeat: no-repeat
      background-position: center center
      background-size: cover
      border: 0
  .bottom-details
    position: absolute
    bottom: 25px
    width: 100%
    padding: 0 95px
    .sp-announcement
      background-image: url("http://cdn.mr007.co/images/web/promo/spinner-announcement.png")
      background-repeat: no-repeat
      width: 100%
      height: 50px
      overflow: hidden

      &:hover
        ul
          animation-play-state: paused !important

      ul
        display: table
        margin: 0

      .live-players-list
        height: 40px
        overflow: hidden
        margin-left: 55px
        margin-right: 12px
      ul li
        float: left
        margin-left: 10px
        p
          padding: 15px 0px
          span
            color: $yellow-18
            margin-right: 5px

</style>
