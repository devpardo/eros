<template>
  <div class="promo-tab-tc">
    <treasure-user-info v-on="$listeners" />
    <div class="bonus-prizes">
      <ul class="list-inline treasure-chests">
        <!-- <div class="tc-box-title"><img src="//cdn.mr007.co/images/web/promo/tc-box-title.png" /></div> -->
        <treasure-chest v-for="(treasure,index) of treasures" :key="index" :treasure="treasure" @click="showModal" />
        <!-- <treasure-chest v-for="(treasure,index) of treasures" :key="index" :treasure="treasure" @click.native="onGetTreasure(treasure)" /> -->
      </ul>
    </div>
    <treasure-modal v-show="isModalVisible" @close="closeModal"></treasure-modal>
  </div>
</template>

<script>
import TreasureChest from "~/components/shared/PromoTreasureChest";
import TreasureClaims from "~/components/shared/PromoTreasureClaims";
import TreasureUserInfo from "~/components/shared/PromoTreasureUserInfo";
import TreasureModal from "~/components/shared/PromoModalClaim";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PromoTreasures",
  components: {
    TreasureChest,
    TreasureClaims,
    TreasureUserInfo,
    TreasureModal
  },
  data() {
    return {
      isModalVisible: false,
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
      ]
    };
  },
  computed: {
    ...mapGetters(["auth"]),
    ...mapGetters(["treasures", "treasureTotalConsume"])
  },
  methods: {
    ...mapActions(["getTreasures", "getTreasure"]),
    async onGetTreasure(treasure) {
      try {
        this.loading = true;
        await this.getTreasure(treasure);
        await this.getTreasures();
        this.$notify(
          `恭喜您，获得“亿万大宝箱”奖金${treasure.bonusamount} 元！`,
          "success"
        );
      } catch (error) {
        this.$notify(error.message, "error");
      } finally {
        this.loading = false;
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
  async mounted() {
    if (this.auth) await this.getTreasures();
  }
};
</script>


<style lang="sass" scoped>
  @import './assets/sass/_variables'

  .bonus-prizes
    margin: 0 auto
    position: relative
    background: #004680
    border-radius: 5px
    overflow: auto
    display: table
    margin-bottom: 10px

    .list-inline.treasure-chests
      margin: 0
      display: table-cell
      vertical-align: top
      .tc-box-title
        margin: 0 auto
        padding: 10px 18px
        position: absolute
        z-index: 9999
        img
          width: 100%

</style>
