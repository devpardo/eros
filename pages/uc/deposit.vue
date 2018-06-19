<template>
  <section class="account-center-holder">
    <div class="account-center container custom-padding">
      <div class="deposit-bank-card">
        <deposit-methods></deposit-methods>
      </div>
      <bottom-info :info="bottomInfo"></bottom-info>
    </div>
  </section>
</template>

<script>
import DepositMethods from "~/components/account_center/deposit/DepositMethods";
import BottomInfo from "~/components/account_center/BottomInfo";
export default {
  middleware: "notAuthorized",

  components: {
    BottomInfo,
    DepositMethods
  },
  data() {
    return {
      bottomInfo: {
        icon: "fa fa-exclamation-triangle",
        message: `如遇“账户异常”等提示导致支付失败，请联系 <a href="https://chat7.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=378548&configID=52507&jid=5460920356&s=1" target="_blank" style="color: #4A90E2;">在线客服。</a>`
      }
    };
  }
};
</script>

<style lang="sass" scoped>
  .page-enter, .page-leave-to
    opacity: 1

  .page-enter-active, .page-leave-active
    transition-duration: 0s !important

  .account-center-holder
    .account-center
      padding: 20px 15px 20px
      height: 100%
      position: relative
</style>
