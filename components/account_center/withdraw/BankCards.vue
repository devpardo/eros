<template>
  <div class="withdraw-bank-card">
    <div class="col-xs-12">
      <p class="title">请选择已绑定银行卡</p>
    </div>
    <div class="bank-account-container clearfix">
      <div class="col-md-3 col-xs-12 col-sm-6" v-for="(account,index) of accounts" :key="index">
        <bank-card :bank="account" @click.native="changeBank(account.id)" />
      </div>
      <div class="col-md-3 col-xs-12 col-sm-6 add-bank">
        <div class="bank-account add-bank-account text-center" @click="addBank">
          <i class="fa fa-plus-circle"></i>
          <p>新增银行卡</p>
        </div>
      </div>
    </div>
    <withdraw-form></withdraw-form>
    <bank-modal v-model="modal.add" />
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  import BankCard from "~/components/account_center/withdraw/BankCard";
  import BankModal from "~/components/account_center/withdraw/BankModal";
  import WithdrawForm from "~/components/account_center/withdraw/WithdrawForm";
  export default {
    name: "BankCards",
    components: {
      BankCard,
      BankModal,
      WithdrawForm
    },
    computed: {
      ...mapGetters("bank", ["accounts", "currentAccount"])
    },
    data() {
      return {
        modal: {
          add: false
        }
      };
    },
    async mounted() {
      await this.$store.dispatch("bank/getAccounts");
      if (!this.accounts.length) return;
      const [account] = this.accounts;
      this.changeBank(account.id);
    },
    methods: {
      changeBank(id) {
        this.$store.commit("bank/SET_ACCOUNT", id);
      },
      addBank() {
        this.modal.add = true;
      }
    }
  };
</script>

<style lang="sass" scoped>
  .withdraw-bank-card
    margin-bottom: 20px
    
    p.title
      color: #4A4A4A 
      margin-bottom: 0
      font-weight: 100

    .bank-account-container
      margin-bottom: 20px
      .bank-account
        position: relative
        // width: 240px
        width: 100%
        height: 65px
        border: 1px solid #D7D7D7
        float: left
        margin-top: 10px
        cursor: pointer
        padding: 10px 15px

        &.add-bank-account
          i
            font-size: 24px
            color: #D7D7D7

          p
            font-size: 12px
            margin:
              top: 3px
              bottom: 0
            color: #9B9B9B

        &:not(:nth-child(4n+1))
          // margin-left: 10px

        &.active
          border-color: #4A90E2

          &:before
            content: ''
            position: absolute
            border:
              top: solid 5px #4A90E2
              right: solid 5px #4A90E2
              bottom: solid 5px transparent
              left: solid 5px transparent
            top: 0
            right: 0

        .top-details
          margin-bottom: 5px

          .bank-name
            margin:
              left: 10px
              bottom: 0
            font-size: 12px
            line-height: 24px
        
        .bottom-details
          p
            font-size: 12px
            color: #9B9B9B
            margin-bottom: 0

            span
              margin-left: 5px

          a
            color: #9B9B9B
            line-height: 1px

  @media only screen and (max-width: 767px)
    .col-sm-12
      padding-left: 0
      padding-right: 0
    .col-xs-12
      padding-left: 0
      padding-right: 0
  @media only screen and (min-width: 768px) and (max-width: 1023px)
    .col-sm-6:nth-child(odd)
      padding-left: 0
    .col-sm-6:nth-child(even)
      padding-right: 0
  // @media only screen and (min-width: 1024px)
  //   .col-md-3:nth-child(1)
  //     padding-left: 0
  //     padding-right: 20px
  //   .col-md-3:nth-child(2)
  //     // padding-left: 10px
  //     padding-left: 0
  //     padding-right: 20px
  //   .col-md-3:nth-child(3)
  //     padding-left: 0
  //     padding-right: 20px
  //     // padding-right: 10px
  //   .add-bank
  //     // padding-left: 5px
  //     padding-right: 0
  //     padding-left: 0

  // .pr-zero
  //   padding-right: 0
  
  // .pl-sm
  //   padding-left: 10px
</style>
