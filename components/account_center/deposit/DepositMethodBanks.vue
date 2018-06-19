<template>
  <div class="banks" v-if="banks && banks.length">
    <p class="title">请选择银行 </p>
    <div class="item-container clearfix">
      <div class="col-xs-12 col-sm-6 col-md-2 col-md-offset-1" v-for="(bank,index) of banks" :key="index" @click="setBank(bank)">
        <deposit-method-bank :bank="bank" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import DepositMethodBank from "@/components/account_center/deposit/DepositMethodBank";
  export default {
    name: "DepositMethodBanks",
    components: {
      DepositMethodBank
    },
    computed: {
      ...mapGetters("channel", ["banks"])
    },
    methods: {
      ...mapActions("channel", ["setBank"])
    }
  };
</script>

<style lang="sass" scoped>
  .banks .item-container a
    padding: 7px

    &.active
      span.badge
        background: #4A90E2

    img
      margin:
        right: 10px

    span
      display: inline-block
      // text-align: center
      font:
        size: 12px
        weight: 100
      height: 24px
      line-height: 24px
      padding: 0

      &.name
        color: #4A4A4A
</style>
