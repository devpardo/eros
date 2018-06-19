<template>
  <modal :value="value" @input="close" noClose>
    <h4 class="modal-title text-center" slot="header">添加银行账户</h4>
    <span v-if="errors.has('api')" class="has-error">
      {{errors.first("api")}}
      <hr>
    </span>
    <div class="form-group clearfix">
      <p class="col-xs-4">开户银行</p>
      <div class="col-xs-8">
        <vue-select v-model="form.bank" data-vv-value-path="mutableValue" v-validate="validations.bank.rules" :data-vv-as="validations.bank.alias" name="bank" label="bankname" :options="banks" placeholder="请选择银行"></vue-select>
        <span v-if="errors.has('bank')" class="has-error">
          {{errors.first("bank")}}
        </span>
      </div>
    </div>

    <label class="form-group clearfix">
      <p class="col-xs-4">真实姓名</p>
      <div class="col-xs-8">
        <input class="form-control" type="text" :value="auth.username" name="username" :class="[errors.has('username') ? 'has-error' : '']" readonly>
        <span v-if="errors.has('username')" class="has-error">
          {{errors.first("username")}}
        </span>
      </div>
    </label>
    <label class="form-group clearfix">
      <p class="col-xs-4">收款账号</p>
      <div class="col-xs-8">
        <input class="form-control" type="text" v-validate="validations.account.rules" :data-vv-as="validations.account.alias" name="account" :class="[errors.has('account') ? 'has-error' : '']" v-model="form.account" :minlength="16" :maxlength="19" placeholder="请输入正确的银行卡号，16-19位数字。" @input="resetAPIErrors">
        <span v-if="errors.has('account')" class="has-error">
          {{errors.first("account")}}
        </span>
      </div>
    </label>
    <label class="form-group clearfix">
      <p class="col-xs-4">开户行地址</p>
      <div class="col-xs-8">
        <input class="form-control" type="text" v-model="form.address" v-validate="validations.address.rules" :data-vv-as="validations.address.alias" name="address" placeholder="必填">
        <span v-if="errors.has('address')" class="has-error">
          {{errors.first("address")}}
        </span>
      </div>
    </label>
    <div class="text-center" slot="footer">
      <div class="col-xs-12 clearfix">
        <a class="btn btn-default btn-submit pull-right" :disabled="loading" @click="submit">
          <i v-if="loading" class="fa fa-refresh fa-spin"></i>
          <span> 确定添加 </span>
        </a>
        <a class="btn btn-default pull-right" @click="close">取消</a>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Modal from "~/components/shared/Modal";

export default {
  name: "BankModal",
  components: {
    Modal
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      form: {
        bank: null,
        account: "",
        address: ""
      },
      validations: {
        bank: {
          rules: {
            required: true
          },
          alias: "银行"
        },
        account: {
          rules: {
            required: true,
            numeric: true,
            min: 16,
            max: 19
          },
          alias: "帐户"
        },
        address: {
          rules: {
            required: true
          },
          alias: "开户行地址"
        }
      },
      validationMessages: {
        bank: {
          required: "请选择银行名称"
        },
        account: {
          required: "请输入正确的银行卡号，16-19位数字",
          min: "请输入正确的银行卡号，16-19位数字",
          max: "请输入正确的银行卡号，16-19位数字"
        },
        address: {
          required: "请输入开户行地址"
        }
      }
    };
  },
  computed: {
    ...mapGetters("bank", ["banks"]),
    ...mapGetters(["auth"]),
    isBankAccountInRange() {
      return this.form.account.length < 16;
    },
    isFormValid() {
      return Object.keys(this.fields).every(field => this.fields[field].valid);
    }
  },
  methods: {
    ...mapActions("bank", ["createBankAccount", "getBanks"]),
    resetAPIErrors() {
      this.$validator.errors.remove("api");
    },
    close() {
      this.reset();
      this.input();
    },
    input() {
      this.$emit("input", false);
    },
    setBank(bank) {
      this.form.bank = bank;
    },
    reset() {
      this.form = {
        bank: "",
        account: "",
        address: ""
      };
      // const [bank] = this.banks;
      // this.setBank(bank);
    },
    async submit() {
      try {
        if (this.loading) return;
        await this.$validator.validate("*");
        if (!this.isFormValid) return;
        this.loading = true;
        await this.createBankAccount(this.form);
        this.close();
      } catch (error) {
        this.$validator.errors.add({
          field: "api",
          msg: error.message
        });
      } finally {
        this.loading = false;
      }
    }
  },
  async mounted() {
    await this.getBanks();
    this.reset();
    this.$validator.localize("zh_CN", {
      custom: this.validationMessages
    });
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  input.has-error
    border-color: #ff4646 !important
    background-color: #ffe4e4 !important
  span.has-error
    margin-top: 5px
    color: #ff4646

  .v-select, .v-select *
    text-align: left!important
    & /deep/ button.clear
      display: none !important
  .modal-mask .modal-wrapper .modal-container 
    .modal-header 
      padding: 20px 0
      border-bottom: 1px solid $gray-15

      h4
        color: $light-blue-3

    .modal-body
      padding:
        top: 25px
        bottom: 10px

      .form-group
        display: block
        width: 100%
        margin-bottom: 20px

        p
          text-align: left
          line-height: 34px
          font-weight: 100
          white-space: nowrap

    .modal-footer
      a
        margin-left: 5px
        min-width: 90px

        &.btn-submit
          background: $light-blue-3
          border: none
          color: white
          padding: 7px 12px

</style>
