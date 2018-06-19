<template>
  <section class="account-center-holder">
    <div class="account-center container custom-padding">
      <bank-cards></bank-cards>
      <bottom-info :info="bottomInfo"></bottom-info>
    </div>
  </section>
</template>

<script>
import BankCards from "~/components/account_center/withdraw/BankCards";
import BottomInfo from "~/components/account_center/BottomInfo";

export default {
  middleware: "notAuthorized",

  components: {
    BankCards,
    BottomInfo
  },
  data() {
    return {
      bottomInfo: {
        icon: "fa fa-exclamation-triangle",
        message: `提交提款订单后，请您耐心等候。亿万先生24小时在线客服会尽快为您审核，如遇“账户异常”等提示导致提款失败，请联系 <a href="https://chat7.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=378548&configID=52507&jid=5460920356&s=1" target="_blank" style="color: #4A90E2;">在线客服。</a>`
      }
    };
  },
  methods: {
    isNumber(event) {
      let charCode = event.which ? event.which : event.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        event.preventDefault();
      } else {
        return true;
      }
    }
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
      padding: 20px 15px 40px
      min-height: 680px
      position: relative
</style>
