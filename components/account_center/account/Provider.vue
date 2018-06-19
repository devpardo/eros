<template>
  <div class="provider" :style="[styles]" :class="refreshing ? 'grayscale' : ''">
    <div class="top-provider-detail clearfix">
      <div class="logo-container pull-left">
        <img :src="image" @error="error.image = true">
      </div>
      <div class="details pull-left">
        <div class="name">{{provider.cnname}}</div>
        <div class="balance">
          <i class="fa fa-cny"> </i>
          <animated-number class="balance" :value="balance">
            <template slot-scope="{ number }">{{ number }}</template>
          </animated-number>
        </div>
      </div>
      <a v-if="isOnline" class="btn-refresh fa fa-refresh" href="javascript:void(0)" :class="[classRefreshing]" @click="onGetBalance"></a>
    </div>
    <div v-if="isOnline" class="buttons-container">
      <button v-for="(button,index) of buttons" @click="!hasRebates && button.type === 'TRANSFER_BONUS' ? showErrorModal() : modalOpen(button)" :key="index" :disabled="refreshing">
        <i class="button-icon" :class="[button.icon, button.class]"></i>
        {{ button.label }}
      </button>
    </div>
    <div v-else-if="!provider.status" class="text-center provider-shared">
      系统维护中
    </div>
    <div v-else-if="!provider.wallet" class="text-center provider-shared">
      <button v-for="(button,index) of rebate" @click="!hasRebates && button.type === 'TRANSFER_BONUS' ? showErrorModal() : modalOpen(button)" :key="index" :disabled="refreshing">
        <i class="button-icon" :class="[button.icon, button.class]"></i>
        {{ button.label }}
      </button>
      <p>此平台共享主账户余额，无需转账。</p>
    </div>

  </div>
</template>

<script>
import AnimatedNumber from "@/components/shared/AnimatedNumber";

import { mapActions, mapGetters } from "vuex";
export default {
  name: "Provider",
  components: {
    AnimatedNumber
  },
  props: {
    provider: {
      type: Object
    },
    type: {
      type: String
    },
    modal: {
      type: Boolean
    }
  },
  data() {
    return {
      loading: 0,
      error: {
        image: false
      },
      maintenance: "",
      buttons: [
        {
          type: "TRANSFER_IN",
          class: "btn-transparent",
          icon: "fa fa-repeat",
          label: "转入"
        },
        {
          type: "TRANSFER_OUT",
          class: "btn-transparent",
          icon: "fa fa-repeat fa-flip-horizontal",
          label: "转出"
        },
        {
          type: "TRANSFER_BONUS",
          icon: "fa fa-cny",
          label: "返水"
        }
      ],
      rebate: [
        {
          type: "TRANSFER_BONUS",
          icon: "fa fa-cny",
          label: "返水"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["auth"]),
    isOnline() {
      return this.provider.wallet && this.provider.status;
    },
    isNewPT() {
      return this.provider.enname === "SWPT";
    },
    refreshing() {
      return !!this.loading;
    },
    classRefreshing() {
      return this.refreshing ? "fa-spin cursor-none" : "";
    },
    balance() {
      return this.auth && this.provider
        ? parseFloat(
            !this.provider.wallet ? this.auth.balance : this.provider.balance
          ) || 0
        : 0;
    },
    styles() {
      return {
        borderLeftColor: this.provider.borderColor
      };
    },
    hasRebates() {
      return !!(this.provider.rebates && this.provider.rebates.length);
    },
    image() {
      return this.error.image
        ? "/images/providers/record-ico.png"
        : this.provider.image;
    }
  },
  methods: {
    ...mapActions("provider", [
      "setProvider",
      "getProviderBalance",
      "getRebates",
      "getDiscounts"
    ]),
    async onGetBalance() {
      if (this.refreshing) return;
      try {
        this.loading++;
        await this.getProviderBalance(this.provider);
      } catch (error) {
        // this.$notify(error.message, "error");
        this.maintenance = error.message;
      } finally {
        this.loading--;
      }
    },
    showErrorModal() {
      this.$notify(
        "自上次领取返水奖金后未产生有效投注，暂无返水奖金发放！",
        "error"
      );
    },
    async modalOpen(button) {
      await this.setProvider(this.provider);
      this.$emit("update:type", button.type);
      this.$emit("update:modal", true);
    },
    async onGetRebates() {
      try {
        this.loading++;
        await this.getRebates(this.provider);
      } catch (error) {
        this.$notify(error.message, "error");
      } finally {
        this.loading--;
      }
    },
    async onGetDiscounts() {
      try {
        this.loading++;
        await this.getDiscounts(this.provider);
      } catch (error) {
      } finally {
        this.loading--;
      }
    }
  },
  async beforeMount() {
    await Promise.all([
      this.onGetBalance(),
      this.onGetRebates(),
      this.onGetDiscounts()
    ]);
    console.log(this.provider.enname, this.provider.balance);
  }
};
</script>

<style lang="sass" scoped>
  .provider-shared
    padding: 7px 10px
    p
      font-size: 12px
      line-height: 14px
      padding: 4px 0
      margin: 0
    button
      float: left
      display: flex
      align-items: center
      justify-content: center
      width: 80px
      height: 24px
      border: 1px solid #4A90E2
        radius: 4px
      color: #4A90E2
      font:
        size: 12px
        weight: 100
      transition: all 0.3s linear

      &:not(:first-child)
        margin-left: 10px

      i
        font-size: 14px
        margin-right: 6px

      &:hover:enabled
        background: #4A90E2
        color: white

      &:disabled
        color: #222
        border-color: #222
        cursor: not-allowed
  .cursor-none
    cursor none
  .name
    font-weight: bold
  .balance
    font-size: 24px
    .fa
      font-size: 14px
    .balance
      //font-weight: bold
      color: #4a4a4a

  .provider
    padding: 0
    // width: 32.5%
    border:
      width: 1px 1px 1px 4px
      style: solid
      color: #F0F0F0
      radius: 4px
    margin-bottom: 15px
    min-height: 135px
    overflow: hidden

    &:not(:nth-of-type(3n+1))
      margin-left: 1.25%
      // padding-left: 1.25%

    .top-provider-detail
      position: relative
      height: 91px
      background: #F5F5F5
      padding: 20px

      .logo-container
        display: flex
        align-items: center
        justify-content: center
        height: 100%
        width: 50px
        margin-right: 20px

        img
          width: 40px
          height: 40px

      .details
        p
          font:
            size: 14px
            weight: 100
          margin: 0

          &.name
            letter-spacing: 1px

          &.balance
            font:
              size: 24px
              weight: 300

            i
              font-size: 13px

      .btn-refresh
        position: absolute
        top: 20px
        right: 20px

        i
          color: #9B9B9B

    .buttons-container
      height: 42px
      padding: 9px

      button
        float: left
        display: flex
        align-items: center
        justify-content: center
        width: 80px
        height: 24px
        border: 1px solid #4A90E2
          radius: 4px
        color: #4A90E2
        font:
          size: 12px
          weight: 100
        transition: all 0.3s linear

        &:not(:first-child)
          margin-left: 10px

        i
          font-size: 14px
          margin-right: 6px

        &:hover:enabled
          background: #4A90E2
          color: white

        &:disabled
          color: #222
          border-color: #222
          cursor: not-allowed

</style>
