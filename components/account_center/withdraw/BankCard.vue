<template>
  <div class="bank-account" :class="[classActive]">
    <div class="top-details clearfix">
      <div class="logo-holder pull-left">
        <!--img(:src="`/images/ico/${bank_account.bankLogo}`")-->
      </div>
      <p class="bank-name pull-left">{{ bank.bankname }}</p>
    </div>
    <div class="bottom-details clearfix">
      <p class="pull-left">{{ bank.account | hideChar('start', 12, 'bank-account') }}
        <span>储蓄卡</span>
      </p>
      <a class="pull-right" href="javascript:void(0)" @click="modal.delete = true">
        <i class="fa fa-trash"></i>
      </a>
    </div>
    <modal v-model="modal.delete" no-close>
      <template slot="header">
        <h3 class="text-left text-info">确认</h3>
      </template>

      <template>
        <p>
          确认删除该银行账号
        </p>
      </template>

      <template slot="footer">
        <hr>
        <button class="btn btn-default" @click="modal.delete = false">取消</button>
        <button class="btn btn-primary" @click="deleteBankAccount" :disabled="loading">确认</button>
      </template>
    </modal>
  </div>
</template>

<script>
  import Modal from "~/components/shared/Modal";

  import { mapGetters } from "vuex";
  export default {
    name: "BankCard",
    components: {
      Modal
    },
    props: {
      bank: {
        type: Object
      }
    },
    data() {
      return {
        loading: false,
        modal: {
          delete: false
        }
      };
    },
    computed: {
      ...mapGetters("bank", ["currentAccount"]),
      active() {
        return this.currentAccount && this.bank.id === this.currentAccount.id;
      },
      classActive() {
        return {
          active: this.active
        };
      }
    },
    methods: {
      async deleteBankAccount() {
        this.loading = true;
        await this.$store.dispatch("bank/removeBankAccount", this.bank);
        this.loading = false;
      }
    }
  };
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .withdraw-bank-card
    margin-bottom: 20px
    
    p.title
      color: $gray-16 
      margin-bottom: 0
      font-weight: 100

    .bank-account-container
      .bank-account
        position: relative
        // width: 240px
        width: 100%
        height: 65px
        border: 1px solid $gray-18
        float: left
        margin-top: 10px
        cursor: pointer
        padding: 10px 15px

        &.add-bank-account
          i
            font-size: $font-size-h3
            color: $gray-18

          p
            font-size: $font-size-small
            margin:
              top: 3px
              bottom: 0
            color: $gray-14

        &:not(:nth-child(4n+1))
          // margin-left: 10px

        &.active
          border-color: $light-blue-4

          &:before
            content: ''
            position: absolute
            border:
              top: solid 5px $light-blue-4
              right: solid 5px $light-blue-4
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
            font-size: $font-size-small
            line-height: 24px
        
        .bottom-details
          p
            font-size: $font-size-small
            color: $gray-14
            margin-bottom: 0

            span
              margin-left: 5px

          a
            color: $gray-14
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
  @media only screen and (min-width: 1024px)
    .col-md-3:nth-child(1)
      padding-left: 0
      padding-right: 20px
    .col-md-3:nth-child(2)
      // padding-left: 10px
      padding-left: 0
      padding-right: 20px
    .col-md-3:nth-child(3)
      padding-left: 0
      padding-right: 20px
      // padding-right: 10px
    .add-bank
      // padding-left: 5px
      padding-right: 0
      padding-left: 0

  // .pr-zero
  //   padding-right: 0
  
  // .pl-sm
  //   padding-left: 10px
</style>
