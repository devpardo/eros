<template>

  <div class="form">
    <div class="col-sm-12 col-xs-12 withdraw-form custom-padding-none">
      <p class="title"> 请输入提款金额 </p>
      <div class="input-holder" v-if="withdrawal">
        <i class="fa fa-yen"></i>
        <input type="number" v-focus v-model.number="amount" data-vv-as="提款金额" v-validate="`required|decimal:2|min_value:${withdrawal.minWithdraw}|max_value:${withdrawal.maxWithdrawSingle}`" name="amount" @keypress="isNumber" step="0.01" />
        <p v-if="errors.has('amount')" class="text-red">
          {{errors.first("amount")}}
        </p>
      </div>
      <div class="info">
        <template v-if="withdrawal">
          <p>
            <i class="fa fa-info-circle"></i>
            单笔最低提款额为 {{withdrawal.minWithdraw}} 元，最高为 {{withdrawal.maxWithdrawSingle}} 元。
          </p>
          <p>
            <i class="fa fa-info-circle"></i>
            今日尚余提款次数为 {{withdrawal.userRemainNum}} 次，尚余提款额度为 {{withdrawal.userRemainWithdraw}} 元。
          </p>
        </template>
      </div>

      <button class="btn btn-submit" :disabled="loading || !amount || $validator.errors.any()" @click="submit">
        <i class="fa fa-refresh fa-spin" v-if="loading"></i>
        确认并提交
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "WithdrawForm",
  data() {
    return {
      loading: false,
      amount: "",
      validationMessages: {
        amount: {
          required: "请输入取款金额。",
          decimal: "取款金额只能保留2位小数"
        }
      }
    };
  },
  computed: {
    ...mapGetters("withdraw", ["withdrawal"])
  },
  methods: {
    ...mapActions("withdraw", ["getWithdrawalLimit", "withdraw"]),
    ...mapActions(["getAuth"]),
    isNumber(event) {
      // const regex = /[1-9]*/gi;
      // return regex.test(event.target.value);
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
    },
    async submit() {
      try {
        if (this.$validator.errors.any()) return;

        this.loading = true;
        await this.withdraw({
          amount: this.amount
        });

        this.amount = "";
        await Promise.all([this.getWithdrawalLimit(), this.getAuth()]);
        this.$store.commit("modal/OPEN_MODAL", {
          content:
            "提交成功：请耐心等待审核并及时查看银行短信提醒，祝您游戏愉快！",
          //"提交成功：请耐心等待审核并及时查看银行短信提醒，祝您游戏愉快！",
          type: "info"
        });
      } catch (error) {
        this.$store.commit("modal/OPEN_MODAL", {
          content: error.message,
          type: "error"
        });
      } finally {
        this.loading = false;
      }
    }
  },
  async mounted() {
    await this.getWithdrawalLimit();
    this.$validator.localize("zh_CN", {
      custom: this.validationMessages
    });
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button
    -webkit-appearance: none;
    margin: 0;


  .form
    p.title
      color: $gray-16
      margin-bottom: 0
      font-weight: 100
    .withdraw-form
      margin-bottom: 30px
    .input-holder
      position: relative

      i
        position: absolute
        top: 24px
        left: 10px
        color: $gray-14

      input
        height: 40px
        // width: 410px
        width: 100%
        margin-top: 10px
        border: 1px solid $gray-18
        padding: 0 10px 0 25px

    .info
      margin-top: 10px

      p
        margin-bottom: 0
        color: $light-blue-4
        font:
          size: 12px
          weight: 100
        line-height: 22px

    button.btn-submit
      color: white
      font-weight: 100
      line-height: 40px
      min-width: 200px
      padding: 0 20px
      background: $light-blue-4
      border: none
      margin-top: 10px
      border-radius: $radius-min-3

  @media only screen and (max-width: 768px)
    .form .withdraw-form
      margin-bottom: 60px

    // .col-sm-12
    //   padding-left: 0
    //   padding-right: 0

    // .col-xs-12
    //   padding-left: 0
    //   padding-right: 0
  @media only screen and (min-width: 1024px)
    .col-xs-12
      // padding-left: 0
      // padding-right: 0
    .form
      .input-holder input
        width: 410px
</style>
