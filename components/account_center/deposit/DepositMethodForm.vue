<template>
  <div class="forms">
    <div class="form">
      <deposit-method-form-offline v-if="isOffline" :form="form" v-bind="$props" :isOfflineValid.sync="isOfflineValid" />
      <div>
        <p class="title"> 请输入存款金额 </p>
        <div class="col-sm-12 col-xs-12">
          <template v-if="!form.gift">
            <div class="input-holder">
              <i class="fa fa-yen"></i>
              <input type="number" v-focus v-model.number="form.amount" placeholder="请输入存款金额" /></div>
          </template>
          <template v-else-if="!noGift">
            <div class="form-container">
              <span class="checked">
                <i class="fa fa-lg fa-check-circle"></i>
              </span>
              <div class="input-holder">
                <label>请输入存款金额
                  <i class="fa fa-yen override"></i>
                  <input type="number" v-model.number="form.amount" placeholder="请输入存款金额" /></label>
              </div>
              <div class="input-holder">
                <label>登录名称
                  <span v-if="errors.has('offline_username')" class="text-red">
                    {{errors.first('offline_username')}}
                  </span>
                  <input type="text" v-model="form.username" v-validate="'required|alpha_num'" data-vv-as="登录名" name="offline_username" placeholder="登录名称" />

                </label>

              </div>
              <p class="form-note">成功支付后您将可获得
                <span>100.0</span>
                元代付奖金
              </p>
            </div>
          </template>
          <div class="info">
            <p v-if="currentChannel">
              <i class="fa fa-info-circle"></i>
              单笔最低存款额为 {{currentChannel.single_dp_min}} 元，最高为 {{currentChannel.single_dp_max}} 元。
            </p>
          </div>
          <button class="btn btn-submit" @click="deposit" :disabled="!canSubmit">
            <i class="fa fa-refresh fa-spin" v-if="loading"></i>
            确认并提交
          </button>
          <!--<button v-if="isOffline" class="btn btn-right-label" :class="[form.gift ? 'btn-cancel' : '']" :disabled="loading" @click="form.gift = !form.gift">
            <span v-if="form.gift">取消并返回</span>
            <span v-else>
              选择为他人支付/存款
              <br/>
              <span style="color: red"> 可获得1%代付奖金 </span>
            </span>
          </button>-->
        </div>
      </div>
      <deposit-modal-qr v-model="modal.qr" :amount="qrMeta.amount" :qr-image="qrMeta.image" :remark-code="qrMeta.code" />
      <modal v-model="modal.deposit" noClose>
        <div slot="header" class="modal-title text-center" style="color: #337ab7">
          <i class="fa fa-check-circle"></i>
          成功
        </div>
        <div class="text-center" style="padding: 20px">
          <div v-if="isBank || isQRPayRedirect" class="btn btn-lg btn-primary" @click="depositRedirect">
            继续存款
            <i class="fa fa-arrow-right"></i>
          </div>
          <span v-else-if="isShowQrCodeImg">
            请使用扫码工具扫描下方二维码完成支付。
            <img :src="`https://tool.kd128.com/qrcode?text=${encodeURIComponent(depositResponse.data.qr_url)}&w=200`" />
          </span>
          <span v-else-if="isOffline">
            成功：保存完成！
          </span>
          <span v-else>
            成功
          </span>
        </div>
        <div slot="footer" class="text-center">
          <div type="button" class="btn btn-default" @click="closeModalDeposit">
            确定
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import DepositModalQr from "~/components/account_center/deposit/DepositModalQR";
import DepositMethodFormOffline from "~/components/account_center/deposit/DepositMethodFormOffline";
import Modal from "~/components/shared/Modal";
import { mapGetters } from "vuex";
export default {
  name: "DepositMethodForm",
  components: {
    DepositModalQr,
    DepositMethodFormOffline,
    Modal
  },
  props: {
    noGift: {
      type: Boolean
    },
    currentMethod: {
      type: Object
    },
    currentChannel: {
      type: Object
    }
  },
  data() {
    return {
      isOfflineValid: false,
      modal: {
        qr: false,
        deposit: false
      },
      qrMeta: {
        image: "",
        code: ""
      },
      depositResponse: null,
      loading: false,
      form: {
        amount: "",
        gift: false,
        username: "",
        name: "",
        bankId: "",
        bankAccountNo: ""
      },
      methodActions: {
        QRpay: "depositCodeTransfer",
        QRtransfer: "depositQRPay",
        bank: "depositBankTransfer",
        offline: "depositOffline"
      }
    };
  },
  computed: {
    canSubmit() {
      const valid = this.currentChannel && this.form.amount && !this.loading;
      return this.isOffline ? valid && this.isOfflineValid : valid;
    },
    isOffline() {
      return this.currentMethod && this.currentMethod.category === "offline";
    },
    isBank() {
      return this.currentMethod && this.currentMethod.category === "bank";
    },
    isShowQrCodeImg() {
      return (
        this.depositResponse &&
        this.depositResponse.data &&
        this.depositResponse.data.qrCode &&
        this.depositResponse.data.qr_url
      );
    },
    isQRPayRedirect() {
      return (
        this.currentMethod &&
        this.currentMethod.category === "QRpay" &&
        this.depositResponse &&
        this.depositResponse.data &&
        !this.depositResponse.data.is_qr_code
      );
    }
  },
  watch: {
    "modal.deposit"(val) {
      this.$scrollable(!val);
    }
  },
  methods: {
    giveCredits() {
      this.gift = true;
    },
    isNumber(event) {
      const regex = /^\d+$/;
      const valid = regex.test(event.target.value);
      return valid ? true : event.preventDefault();
    },
    async deposit() {
      console.log("----");
      try {
        if (!this.noGift) {
          const valid = await this.$validator.validate();
          if (!valid) return;
        }
        if (this.isOffline && !this.isOfflineValid) return;
        if (this.loading) return;
        this.loading = true;
        const methodAction = this.methodActions[this.currentMethod.category];

        const data = await this.$store.dispatch(
          `channel/${methodAction}`,
          this.form
        );
        this.depositResponse = data;
        if (
          this.currentMethod.category === "QRtransfer" &&
          this.depositResponse.data.qr_address
        ) {
          ({
            qr_address: this.qrMeta.image,
            remark_code: this.qrMeta.code
          } = this.depositResponse.data);
          this.qrMeta.amount = this.form.amount;
          this.modal.qr = true;
        } else {
          this.modal.deposit = true;
        }
      } catch (error) {
        console.log(error);
        this.$store.commit("modal/OPEN_MODAL", {
          content: error.message,
          type: "error"
        });
      } finally {
        this.loading = false;
        this.form.amount = "";
      }
    },
    closeModalDeposit() {
      console.log(this.depositResponse, "....");
      this.modal.deposit = false;
      this.form = {
        ...this.form,
        amount: "",
        gift: false,
        username: "",
        name: "",
        bankAccountNo: ""
      };
    },
    async depositRedirect() {
      if (!this.depositResponse) return;
      const data = this.depositResponse.data;
      window.deposit = window.open("", "_blank");
      if (data && data.deposit_request) {
        const form = this.generateRedirectForm({
          fields: data.deposit_request.fieldsAndValues,
          url: data.redirect_url
        });
        console.log(form);
        window.deposit.document.title = data.redirect_url;
        window.deposit.document.body.appendChild(form);
        await form.submit();
        window.deposit.document.body.removeChild(form);
      } else {
        window.deposit.location.href = data.redirect_url;
      }
      window.deposit.focus();
      this.closeModalDeposit();
    },
    generateRedirectForm({ fields, url }) {
      const form = document.createElement("form");
      form.setAttribute("id", +new Date());
      form.setAttribute("method", "post");
      form.setAttribute("action", url);
      Object.keys(fields).forEach(key => {
        const value = fields[key];
        const input = document.createElement("input");
        input.setAttribute("hidden", value);
        input.setAttribute("name", key);
        input.setAttribute("value", value);
        form.appendChild(input);
      });
      return form;
    }
  }
};
</script>

<style lang="sass" scoped>
  input[type=number]
    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button
      -webkit-appearance: none
      margin: 0
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
