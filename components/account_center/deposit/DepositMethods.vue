
<template>
  <section class="tab-deposit">
    <deposit-method-channels v-if="!loading" :channels="methodsChannels" :current-channel="currentMethodChannel" />
    <div class="tab-content tab-container custom-padding">
      <deposit-method :current-method="currentChannelMethod" />
      <deposit-method-form v-if="currentChannelMethod" :current-method="currentChannelMethod" :current-channel="currentMethodChannel" />
    </div>
  </section>
</template>

<script>
import DepositMethodForm from "~/components/account_center/deposit/DepositMethodForm";
import DepositMethod from "~/components/account_center/deposit/DepositMethod";
import DepositMethodChannels from "~/components/account_center/deposit/DepositMethodChannels";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DepositMethods",
  components: {
    DepositMethodForm,
    DepositMethod,
    DepositMethodChannels
  },
  data() {
    return {
      loading: true,
      form: {
        type: "Deposit",
        title: "请输入存款金额",
        btnLabel: "确认并提交",
        notes: [
          {
            icon: "fa fa-info-circle",
            message: "单笔最低存款额为 10 元，最高为 10000 元。"
          }
        ],
        offline_payment_notes: [
          {
            icon: "fa fa-info-circle",
            message:
              "支持使用【支付宝】转账，推荐选择【招商银行】，可更快到账。"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("method", [
      "methods",
      "currentMethod",
      "methodsChannels",
      "currentMethodChannel",
      "currentChannelMethod"
    ]),
    // ...mapGetters("channel", ["currentChannel"]),
    isOfflineBanking() {
      return this.currentMethod.category === "offline";
    }
  },
  methods: {
    // ...mapActions("method", ["setMethod", "isActiveMethod"]),
    // isActiveMethod(id) {
    //   return this.currentMethod && this.currentMethod.id === id;
    // },
    // activeLogo(method) {
    //   const image = this.isActiveMethod(method.id)
    //     ? method.logo.active
    //     : method.logo.default;
    //   return `/images/uc/${image}`;
    // }
  },
  async mounted() {
    await this.$store.dispatch("method/getMethods");
    await this.$store.dispatch("method/getAllChannels");
    this.loading = false;
  }
};
</script>

<style lang="sass">
  .tab-deposit
    ul.nav.nav-pills
      // border-bottom: 1px solid #F0F0F0
      // margin-bottom: 25px
      // padding-bottom: 20px
      margin-bottom: 20px

      li
        width: 120px
        height: 40px
        text-align: center
        border: 1px solid #D7D7D7
        position: relative

        &:not(:first-child)
          margin-left: 8px

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

          &:after
            content: ""
            position: absolute
            left: 50%
            bottom: -21px
            margin-left: -6px
            border-left: 6px solid transparent
            border-right: 6px solid transparent
            border-bottom: 6px solid #A5C7F0

          a
            color: #4A4A4A

        a
          background: transparent
          color: #9B9B9B
          font:
            size: 12px
            weight: 100

        img.tab-menu-logo
          height: 24px
          width: 24px
          margin:
            top: -3px
            right: 5px

    .tab-content.tab-container
      width: 100%
      border: 2px solid #A5C7F0
      padding: 20px
      min-height: 580px
      position: relative

    @media only screen and (max-width: 767px)
      .col-xs-12
        padding:
          left: 0
          right: 0

      .name
        width: 75%

    @media only screen and (min-width: 768px) and (max-width: 991px)
      .col-sm-6:nth-child(odd)
        padding:
          left: 0
          right: 10px
      .col-sm-6:nth-child(even)
        padding:
          left: 10px
          right: 0

      .name
        width: 75%

    @media (min-width: 992px)
      .col-md-offset-1
        margin-left: 0
      .col-md-2
        width: 20%
        padding:
          left: 0
          right: 10px
      .col-md-3
        padding:
          left: 0
          right: 10px

      .name
        width: 60%

  @media screen and (max-width: 600px)
    .tab-deposit
      .tab-content.tab-container
        min-height: 300px
</style>
