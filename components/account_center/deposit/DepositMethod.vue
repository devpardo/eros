<template>
  <div v-if="currentMethod">
    <!-- <div class="tab-pane tab-fade" :id="currentMethod.id" :class="[activeClass]">
      <deposit-method-channels />
    </div> -->
    <div class="tab-pane tab-fade" :id="currentMethod.id" :class="[activeClass]">
      <deposit-method-banks />
    </div>
  </div>
</template>

<script>
  import DepositMethodChannels from "@/components/account_center/deposit/DepositMethodChannels";
  import DepositMethodBanks from "@/components/account_center/deposit/DepositMethodBanks";
  import DepositMethodForm from "@/components/account_center/deposit/DepositMethodForm";
  import DepositMethodQRForm from "@/components/account_center/deposit/DepositMethodForm";

  import { mapGetters } from "vuex";
  export default {
    name: "DepositMethod",
    props: {
      currentMethod: {
        type: Object
      }
    },
    components: {
      DepositMethodChannels,
      DepositMethodBanks,
      DepositMethodForm,
      DepositMethodQRForm
    },
    computed: {
      activeClass() {
        return { "active in": true };
      }
    }
  };
</script>
<style lang="sass" scoped>
  .card
    background: #F5F5F5
    width: 75%
    padding: 20px 30px
    margin: 20px 0
    border: 1px solid #D7D7D7
    border-radius: 4px

    h6.card-title
      color: #4A4A4A
      text-align: center

    .form-control
      margin: 10px 0
      font-size: 12px

  span.fa.fa-arrow-right
    position: absolute
    top: 130px
    right: 56px
    color: #D7D7D7
    font-size: 24px

  p.payment-note
      color: #D8D8D8
      margin: 5px 0
      font-weight: 100
  a
    color: #4A90E2

</style>
