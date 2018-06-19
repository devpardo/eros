<template>
  <div>
    <div class="col-sm-12 col-xs-1">
      <img :src="image">
      <p class="payment-note">银联钱包APP更新为云闪付APP，请使用云闪付手机APP内“扫一扫”功能扫码支付云闪付APP下载二维码（或进入
        <a href="http://cn.unionpay.com/zt/2017/139595361/?v=1516777593603">中国银联官网</a>
        下载）。
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DepositMethodQRForm",
    inject: ["MEDIA_SERVER"],
    computed: {
      image() {
        return `${this.MEDIA_SERVER}/web/account-center/unionpay_img.jpg`;
      }
    }
  };
</script>
