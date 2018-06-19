<template>
  <modal id="deposit-modal" :value="value" @input="input" class="container-round" :container-class="['bg-fade']">
    <template slot="header">
      <button class="close" type="button" @click="close">
        <span aria-hidden="true">×</span>
      </button>
      <h4 class="modal-title">
        <i class="fa fa-check-circle"></i> 您的订单已成功提交！
      </h4>
    </template>
    <div class="col-xs-12">
      <div class="top-note border-red">
        <h3>微信扫码成功率
          <span class="text-red">100%</span> 单笔
          <span class="text-red">10元</span> -
          <span class="text-red">1000元</span>
        </h3>
        <h4>（本页面只支持
          <span class="text-blue">微信扫码</span>入款）
        </h4>
        <p class="text-justify">
          <span class="text-red">注意：</span>
          每次付款请扫描最新入款二维码，保存的二维码请勿二次使用！
        </p>
        <p class="text-justify">
          <span class="text-red"> 特别提醒：</span>
          会员支付时，一定要备注页面提供的交易备注码，如无备注或备注错误，
        </p>
        <p>系统将无法为您即时入款，请各位会员配合。感谢您对亿万先生的支持！</p>
      </div>
    </div>
    <div class="qr-info clearfix">
      <div class="col-lg-5 col-md-5 col-sm-5 col-xs-6 no-padding-mobile">
        <img class="img-responsive" :src="qrImage">
        <div class="info text-left">
          <div>
            转账金额:
            <h3 class="inline-block text-red">{{ amount }}</h3>
          </div>
          <div>
            交易备注码:
            <h3 class="inline-block text-red"> {{remarkCode}}</h3>
          </div>
        </div>
      </div>
      <div class="col-lg-7 col-md-7 col-sm-7 col-xs-6 no-padding-mobile">
        <img class="img-responsive qr-img" :src="QRImage" alt="">
      </div>
    </div>
    <div class="col-xs-12">
      <div class="notes text-left">
        <p class="note text-red">
          <i class="fa fa-info-circle"></i>
          扫码后，请按图片所示填写【转账金额】与【交易备注码】进行转账，系统将会在3分钟内完成支付
        </p>
        <p>
          <i class="fa fa-info-circle text-blue"></i>
          若3分钟后仍未到账，请及时联系在线客服
          <a>在线客服</a>
        </p>
      </div>
    </div>
    <div class="clearfix"></div>
    <template slot="footer">
      <button class="btn btn-submit" type="button" @click="close">已完成支付</button>
    </template>
  </modal>

</template>

<script>
import Modal from "~/components/shared/DepositModal";
export default {
  name: "DepositModalQR",
  inject: ["MEDIA_SERVER"],
  components: {
    Modal
  },
  props: {
    value: {
      type: Boolean
    },
    amount: {
      type: null,
      default: 0
    },
    remarkCode: {
      type: String
    },
    qrImage: {
      type: String,
      default: "~/assets/images/qrcode.png"
    }
  },
  computed: {
    QRImage() {
      return `${this.MEDIA_SERVER}/web/uc/alipay-phone-img.png`;
    }
  },
  watch: {
    value(val) {
      this.$scrollable(!val);
    }
  },
  methods: {
    close() {
      this.$emit("input", false);
    },
    input(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="sass" scoped>

  @media only screen and (min-width : 320px)
    .qr-img
      height: 120px
      margin: 0 auto
    .no-padding-mobile
      padding: 0

  @media only screen and (min-width : 768px)
    .qr-img
      height: 295px
    .no-padding-mobile
      padding-right: 15px
      padding-left: 15px

  .modal-mask
    .modal-wrapper
      .modal-container
        .modal-header
          h4
            margin-top: 0
            color: hsl(208, 56%, 46%)
            text-align: center
            font-size: 1em
        .modal-body
          p
            font-size: .9em
          .col-xs-12
            .top-note
              border: 1px solid hsl(353, 98%, 41%)
              padding: 8px
              font-size: 1em
              margin: 10px 0
              p
                font-size: .9em
                text-align: center
              h3,h4
                font-size: 1em !important
                margin-top: 0
                margin-bottom: 0
  .qr-info
    padding: 8px
  .info
    background: white
    padding: 8px
    margin: 8px 0
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
    font-size: 12px
  .container-round
    border-radius: 100px

  .text-red
    color: hsl(353, 98%, 41%) !important
    margin: 0
    font-size: 1em

  .text-blue
    color: #1155a2
</style>
