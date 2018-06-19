<template>
  <modal v-if="provider" :value="value" v-on="$listeners" no-close :bodyClass="[providerModal.body]" :headerClass="[providerModal.header]" :loading="loading" @submit="onSubmit" @close="closeModal">
    <template>
      <div>
        <div class="tabs">
          <div :class="[providerModal.tab, t.value === type ? providerModal.active : '']" v-for="(t, index) of types" :key="index" @click="changeTransferType(t.value)">
            {{t.label}}
          </div>
          <div class="form-group">

            <template v-if="isTransferIn">
              <div class="main-bal transfer-icon">
                <p class="center">主账户余额</p>
                <div class="center">
                  <div style="18px">
                    <span class="currency">¥</span>
                    <animated-number :value="auth.balance">
                      <span style="font-size: 24px; color: black" slot-scope="{ number }">{{ number }}</span>
                    </animated-number>
                    <img src="~/assets/images/transfer-icon.png" class="transfer-icon">
                  </div>
                </div>
              </div>
              <div class="main-bal">
                <p class="center">{{provider.cnname}}余额</p>
                <div class="center">
                  <div style="18px">
                    <span class="currency">¥</span>
                    <animated-number :value="provider.balance">
                      <span style="font-size: 24px; color: black" slot-scope="{ number }">{{ number }}</span>
                    </animated-number>
                  </div>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="main-bal">
                <p class="center">{{provider.cnname}}余额</p>
                <div class="center">
                  <div style="18px">
                    <span class="currency">¥</span>
                    <animated-number :value="provider.balance">
                      <span style="font-size: 24px; color: black" slot-scope="{ number }">{{ number }}</span>
                    </animated-number>
                  </div>
                </div>
              </div>
              <div class="main-bal transfer-icon">
                <p class="center">主账户余额</p>
                <div class="center">
                  <div style="18px">
                    <span class="currency">¥</span>
                    <animated-number :value="auth.balance">
                      <span style="font-size: 24px; color: black" slot-scope="{ number }">{{ number }}</span>
                    </animated-number>
                    <img src="~/assets/images/transfer-icon.png" class="transfer-icon">
                  </div>
                </div>
              </div>
            </template>

          </div>

          <div v-if="isTransferIn" class="tab-item" key="TRANSFER_IN">
            <div class="form-group modal-input">

              <label for="amount" class="text-black">转账金额</label>
              <input v-focus v-model.number="amount" class="form-control form-dark" data-vv-as="金额" v-validate="`decimal:0|min_value:1|max_value:${auth.balance}`" name="amount" type="number " placeholder="请输入转账金额" min="0 " step="0.01">
              <p class="margin-bottom">
                <i class="fa fa-exclamation-circle"></i>此次转账每笔金额至少为：￥1.0
              </p>
              <span v-if="errors.has('amount')" class="text-danger">{{ errors.first('amount') }}</span>
            </div>

            <div class="form-group selectionBox">
              <label for="discount" class="text-black">请选择转账优惠</label>
              <div id="provider-select">
                <select class="form-control" v-model="discount">

                  <template v-if="providerDiscounts && providerDiscounts.length">
                    <option selected value="">
                      没有
                    </option>
                    <option v-for="(discount, index) of providerDiscounts" :key="index" :value="discount.value">
                      {{discount.label}}
                    </option>
                  </template>
                  <option v-else selected value="">
                    无
                  </option>
                </select>
                <!-- <vue-select v-if="isTransferIn" v-model="discount" :options="providerDiscounts" placeholder="请选择优惠">
                  <span slot="no-options">无</span>
                </vue-select> -->
              </div>
            </div>

          </div>
          <div v-else class="tab-item" key="TRANSFER_OUT">
            <div class="form-group modal-input">
              <label for="amount" class="text-black">转账金额</label>
              <input v-focus v-model.number="amount" class="form-control form-dark" data-vv-as="金额" v-validate="`required|decimal:0|min_value:1|max_value:${providerBalance}`" name="amount" type="number " placeholder="转账金额" min="0 " step="0.01">
              <span v-if="errors.has('amount')" class="text-danger">{{ errors.first('amount') }}</span>
            </div>
          </div>
        </div>
      </div>

    </template>
    <span v-if="errorMessage" class="text-red" style="margin-top: 10px">
      {{errorMessage}}
      <hr>
    </span>

    <div class="btn modal-button" :class="button" :disabled="!canSubmit" @click="onSubmit">
      <i class="fa fa-refresh fa-spin text-black" v-if="loading"></i>
      {{submitLabel}}
    </div>
    <div class="btn btn-primary btn-white modal-button" @click="closeModal">取消</div>

  </modal>
</template>

<script>
import Modal from "~/components/shared/Modal";
import AnimatedNumber from "~/components/shared/AnimatedNumber";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ProviderModal",
  components: {
    Modal,
    AnimatedNumber
  },
  props: {
    value: {
      type: Boolean
    },
    provider: {
      type: Object
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      errorMessage: "",
      isActive: true,
      discount: null,
      amount: "",
      rebate: 0,
      loading: false,
      columns: ["Rebate Day", "Amount", "Remark"],
      types: [
        {
          label: "转入",
          value: "TRANSFER_IN"
        },
        {
          label: "转出",
          value: "TRANSFER_OUT"
        }
      ],
      validationMessages: {
        amount: {
          decimal: "不要输入任何小数",
          min_value: "转账金额不可小于1元。"
        }
      }
    };
  },
  computed: {
    ...mapGetters(["auth"]),
    submitLabel() {
      return this.isTransferIn ? "转入" : "转出";
    },
    isTransferIn() {
      return this.type === "TRANSFER_IN";
    },
    canSubmit() {
      return !!(!this.loading && this.amount && !this.$validator.errors.any());
    },
    button() {
      return this.isTransferIn ? "btn-primary" : "btn-warning";
    },
    hasDiscounts() {
      return (
        this.provider &&
        this.provider.discounts &&
        this.provider.discounts.length
      );
    },
    providerDiscounts() {
      return this.hasDiscounts
        ? this.provider.discounts.map(discount => ({
            value: discount.id,
            label: discount.name
          }))
        : [];
    },
    providerBalance() {
      return this.provider && this.provider.balance ? this.provider.balance : 0;
    }
  },
  methods: {
    ...mapActions("provider", ["useRebates", "transfer"]),
    async onSubmit() {
      if (!this.canSubmit) return;
      await this.onTransfer();
    },
    closeModal() {
      if (this.loading) return;
      this.amount = 0;
      this.discount = null;
      this.errorMessage = "";
      this.$emit("input", false);
    },
    async onTransfer() {
      this.errorMessage = "";
      try {
        this.loading = true;
        await this.$store.dispatch(`provider/transfer`, {
          amount: this.amount,
          discount: this.discount,
          type: this.type
        });
        this.loading = false;
        this.closeModal();
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
      }
    },
    changeTransferType(type) {
      console.log(type);
      this.$emit("update:type", type);
    }
  },
  mounted() {
    this.$validator.localize("zh_CN", {
      custom: this.validationMessages
    });
  }
};
</script>

<style lang="sass" scoped>

  $success: #3E3
  $danger: #F13
  .v-select, .v-select *
    text-align: left!important
    & /deep/ button.clear
      display: none !important

  .success-text
    color: $success !important
  .form-group
    .text-danger
      color: $danger !important
      text-align: left !important
      font-size: 12px
      font-weight: bold

  .user-select-none
    user-select: none
  .provider-logo
    margin: 0px 15px
  .provider-balance
    float: right
    margin-top: 24px
    font-size: 20px
    margin-right: 10px
  .button-back
    background: #0b5883
    border-radius: 50%
    font-size: 24px
    line-height: 18px
    height: 36px
    width: 36px
    padding: 8px
    transition: all .5s
    cursor: pointer
    position: absolute
    top: -12px
    right: -12px
    &:hover
      background: #444

  .modal-icon
    font-size: 24px
    font-weight: bold
    padding: 20px
    animation: modal-icon-loading .5s

    @keyframes modal-icon-loading
      from
        transform: scale(0) translateX(-200px)
      to
        transform: scale(1) translateX(0px)

  .modal
    &-title
      background: #0b5883
      color: white
      text-align: left
      border-bottom: 1px solid #4AF

      h3
        margin-left: 10px
        line-height: 40px
        display: inline-block

    &-button
      margin-top: 10px
      transition: all .5s ease-in-out

    &-loading
      font-size: 36px
      padding: 20px

    &-input
      width: 80%
      margin: 0 auto

      label
        margin-top: 10px
        float: left
  input#amount
    background: hsl(0, 0%, 93%)
    margin: 7px 0
  .form-control
    height: 45px
    font-size: 20px
    font-weight: bold
    border: 0px
    box-shadow: none
    border-radius: 0 !important
    background: #eee
    &::placeholder
      font-size: 14px
      font-weight: normal
  .fa-exclamation-circle:before
    content: "\f06a"
    color: hsl(197, 56%, 43%)
    padding: 0 2px
  p.margin-bottom
    padding: 5px 0
    font-size: 12px !important
  .main-bal
    width: 50%
    float: left
    padding: 30px 0
    .transfer-icon
      position: absolute
      left: 48%

  .modal-mask .modal-wrapper .modal-container .modal-body
    min-height: 470px!important

  .modal-mask .modal-wrapper .modal-container .modal-body p.center
    margin: 0
    text-align: center

  .btn
    width: 38%
    padding: 10px
    margin: 10px
    border-radius: 40px
  .btn.btn-primary.btn-white.modal-button
    background: hsl(0, 0%, 100%)
    color: hsl(0, 0%, 70%)
    border-color: hsl(0, 0%, 70%)

  .btn-warning
    color: hsl(0, 0%, 100%)
    background-color: hsl(197, 56%, 43%)
    border-color: hsl(197, 56%, 43%)

  .selectionBox
    margin: 0 50px 10px 50px
    label
      width: 400px
      margin: 20px 0 5px 0
    .dropdown
      border-radius: 0 !important

  @media (max-width: 767px)
    .selectionBox
      margin: 0 35px 10px 35px

  @media (min-width: 376px) and (max-width: 414px)
    .v-select .selected-tag
      white-space: nowrap
      text-overflow: ellipsis
      width: 280px
      display: block
      overflow: hidden

  @media (min-width: 321px) and (max-width: 375px)
    .v-select .selected-tag
      white-space: nowrap
      text-overflow: ellipsis
      width: 250px
      display: block
      overflow: hidden


  @media (max-width: 320px)
    #provider-select .v-select .selected-tag
      white-space: nowrap !important
      text-overflow: ellipsis !important
      width: 230px !important
      display: block !important
      overflow: hidden !important
  #provider-select
    font-size: 12px
    select
      font-size: inherit
</style>

<style lang="sass" module="providerModal">
  .body,
  .header
    padding: 0 !important
  .body
    padding-bottom: 10px!important
  .tab
    display: inline-block
    width: 50%
    padding: 20px
    font-size: 18px
    cursor: pointer
    border-bottom: 1px solid #e3e3e3
    color: #222
    &.active
      border-bottom: 1px solid #3898bd
      color: #3898bd
</style>
