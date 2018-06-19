<template>
  <form>
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <div class="card">
        <div class="card-title">您的银行账号</div>
        <vue-select v-model="selectedBank" label="bankname" v-validate="'required'" data-vv-as="银行" name="bank" :options="banks"></vue-select>
        <span v-if="errors.has('bank')" class="text-red">
          {{errors.first("bank")}}
        </span>
        <input class="form-control" v-model="form.bankAccountNo" v-validate="'required|numeric|min:4|max:4'" data-vv-as="帐户" name="bankAccount" type="text" placeholder="银行账号（只需后4位）" />
        <span v-if="errors.has('bankAccount')" class="text-red">
          {{errors.first("bankAccount")}}
        </span>
        <input class="form-control" v-model.number="form.name" type="text" v-validate="{ required: true, regex:/^[\u3000\u3400-\u4DBF\u4E00-\u9FFF\·]{2,15}$/}" data-vv-as="名称" name="name" placeholder="持卡人姓名" />
        <span v-if="errors.has('name')" class="text-red">
          {{errors.first("name")}}
        </span>
      </div>
      <span class="fa fa-arrow-right"></span>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <div class="card">
        <div class="card-title">官方收款银行账号</div>
        <div class="custom-input">{{currentChannel.bankname}}</div>
        <div class="custom-input">{{currentChannel.address}}</div>
        <div class="custom-input">{{currentChannel.merchantid}}</div>
        <div class="custom-input">{{currentChannel.remark}}</div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DepositMethodFormOffline",
  props: {
    form: {
      type: Object
    },
    currentChannel: {
      type: Object
    },
    isOfflineValid: {
      type: Boolean
    }
  },
  data() {
    return {
      selectedBank: null
    };
  },
  computed: {
    ...mapGetters("bank", ["banks"]),
    bank() {
      return this.currentChannel || {};
    },
    hasErrors() {
      return this.$validator.errors.any();
    }
  },
  watch: {
    selectedBank(val) {
      if (!val) return;
      this.form.bankId = val.id;
    },
    hasErrors(val) {
      this.$emit("update:isOfflineValid", !val);
    },
    form: {
      async handler(val) {
        await this.$validator.validate();
      },
      deep: true
    }
  },
  async mounted() {
    await this.$store.dispatch("bank/getBanks");
  }
};
</script>


<style lang="sass" scoped>
  .custom-input
    padding: 6px 12px
    margin: 10px auto
    border: 1px solid #cccccc
    border-radius: 3px
    background: #eeeeee
    color: #999999
  .card
    background: #F5F5F5
    width: 75%
    padding: 20px 30px
    margin: 20px 0
    border: 1px solid #D7D7D7
    border-radius: 4px

    .card-title
      color: #4A4A4A
      text-align: center
      font-size: 12px

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

  .form
    overflow: hidden

    p.title
      color: #9B9B9B
      margin-bottom: 0
      font-weight: 100

    p.payment-note
      color: #D8D8D8
      margin: 5px 0
      font-weight: 100

      a
        color: #4A90E2

    span.checked
      color: #4A90E2

    .form-container
      padding: 20px
      border: 1px solid #c4c4c4
      margin: 5px 0

    .offline-bank-form
      background: #F5F5F5
      border: 1px solid #D7D7D7
      text-align: center
      padding:
        top: 10px
        right: 10px
        bottom: 20px
        left: 10px
      width: 100%

      &.userDetails
        border: 1px solid #D7D7D7

      p
        margin-bottom: 0
        font-weight: 100


    .input-holder
      position: relative
      display: inline-block
      margin: 0 5px

      .bank-icon
        padding: 4px 4px 4px 57px
        background:
          color: #fff
          position: 25px 8px
          repeat: no-repeat

      ::placeholder
        color: #9B9B9B

      label
        color: #9B9B9B
        font-weight: 100

      i
        position: absolute
        top: 24px
        left: 10px
        color: #9B9B9B

      i.override
        top: 44px

      input
        height: 40px
        // width: 410px
        width: 100%
        margin-top: 10px
        border: 1px solid #D7D7D7
        padding: 0 10px 0 25px
        display: block
    .info
      margin-top: 10px

      p
        margin-bottom: 0
        color: #4A90E2
        font:
          size: 12px
          weight: 100
        line-height: 22px

    p.form-note
      color: #9B9B9B
      font-weight: 100
      display: inline
      margin:
        left: 5px
        right: 5px

      span
        color: #4A90E2

    button.btn
      float: left
      margin:
        left: 5px
        right: 5px
        bottom: 25px

    button.btn-submit
      color: white
      font-weight: 100
      line-height: 40px
      min-width: 200px
      padding: 0 20px
      background: #4A90E2
      border: none
      margin-top: 10px
      border-radius: 20px

    button.btn-right-label
      color: #4A90E2
      font:
        size: 12px
        weight: 100
      min-width: 200px
      padding: 2px 20px
      background: transparent
      border: 1px solid #4A90E2
      margin-top: 10px
      border-radius: 20px

    button.btn-cancel
      line-height: 38px
      padding: 0 20px

  @media (max-width: 375px and 414px)
    .card
      width: 100%!important
    span.fa.fa-arrow-right
      top: 94%!important
      right: 44%!important
      transform: rotate(90deg)

  @media only screen and (max-width: 768px)
    .col-sm-12
      padding-left: 0
      padding-right: 0
    .col-xs-12
      padding-left: 0
      padding-right: 0
  @media only screen and (min-width: 1024px)
    .col-xs-12
      padding-left: 0
      // padding-right: 0
    .form .input-holder input
      width: 350px
    .form .offline-bank-form
      width: 400px
</style>
