<template>
  <div class="landing-page">
    <div class="header">
      <div class="top-area">
        <div class="container">
          <ul>
            <li>
              <img src="~/assets/images/mrlogo-w.png" height="40px" class="mr-logo">
            </li>
            <li>
              <img src="/images/landing-page/world-cup.png" class="img" height="40px">
            </li>
            <li>
              <p>世界杯官方指定投注网站</p>
            </li>
            <li>
              <img src="/images/landing-page/fox.png" height="40px" class="img">
            </li>
          </ul>
          <div class="msg-mob">
            <img src="/images/landing-page/message-icon.png" class="msg-icon" height="40px">
          </div>
          <form class="form-inline">
            <div class="form-group">
              <nuxt-link class="btn-online-service" to="/online-service">在线客服</nuxt-link>

            </div>
          </form>
        </div>
      </div>
    </div>
    <nuxt></nuxt>
    <footer id="footer-web">
      <div class="links-container">
        <div class="container">
          <ul class="links">
            <li class="link-text">合作平台</li>
            <li v-for="(cooperation, index) of cooperationPlatform" :key="index">
              <img :src="`/images/landing-page/${cooperation.image}`" alt="">
            </li>
            <li class="link-text">支付合作</li>
            <li v-for="(payment, index) of paymentCooperation" :key="index">
              <img :src="`/images/landing-page/${payment.image}`" alt="">
            </li>
          </ul>
        </div>
      </div>
    </footer>
    <div class="footer" id="footer-mobile">

      <div class="footer-top">
        <div class="footer-text">
          <p>亿万先生合作平台</p>
        </div>
        <div class="footer-images">
          <div class="footer-img" v-for="(cooperation, index) of cooperationPlatform" :key="index">
            <img :src="`/images/landing-page/${cooperation.image}`" class="img-responsive" />
          </div>
        </div>
      </div>

      <div class="footer-top">
        <div class="footer-text">
          <p>合作支付</p>
        </div>
        <div class="footer-images">
          <div class="footer-img-coop" v-for="(payment, index) of paymentCooperation" :key="index">
            <img :src="`/images/landing-page/${payment.image}`" class="img-responsive" />
          </div>
        </div>
      </div>

    </div>
    <div class="copy-right">
      <div class="container text-center">
        <hr class="ftr-hr">
        <p class="copyright">版权 © 2012 - 2018 | MR007 | 版权所有</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cooperationPlatform: [
        { image: "pt.png" },
        { image: "microgaming.png" },
        { image: "ag.png" },
        { image: "gg.png" },
        { image: "dt.png" },
        { image: "playngo.png" }
      ],
      paymentCooperation: [
        { image: "18+.png" },
        { image: "wepay.png" },
        { image: "alipay.png" },
        { image: "unionpay.png" },
        { image: "icon.png" }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .landing-page
    // background-image: url(/images/landing-page/landing-page-bg.png)
    // background-position: center center
    // background-repeat: no-repeat
    // background-attachment: fixed
    // background-size: cover
    // background-color:#FFF
    // height: 100vh
    background-image: url('/images/landing-page/landing-page-bg.png')
    background-size: cover
    background-position: center center
    background-repeat: no-repeat
    background-attachment: fixed
    display: block
    min-height: 864px
    .header
      position: fixed
      top: 0
      left: 0
      width: 100%
      margin: 0
      z-index: 100

      ul
        list-style: none
        display: table
        margin: 0
        line-height: 60px

        li
          float: left
          .mr-logo
            border-right: 1px solid #FFF
            padding-right: 24px

          &:not(:first-child)
            margin-left: 20px

          &.small-margin
            margin-left: 5px

          a
            color: white
            text-decoration: none

      .top-area, .navigation
        width: 100%

      .top-area
        min-height: 45px
        background: #1b7ac3

        .container
          ul
            float: left

            li
              a
                color: white
                line-height: 45px
                font:
                  size: 14px
                  weight: 300
                text-decoration: none
              p
                color: #f1f4dc
                font-size: 26px
                margin-bottom: 0

              i
                font-size: 18px
                margin-right: 2px

          form
            float: right
            padding: 14px 0

            div
              position: relative

              &:not(:first-child)
                margin-left: 5px

              a
                height: 32px
                font-size: 13px
                line-height: 32px
                text:
                  align: center
                  decoration: none

                &.btn-online-service
                  display: inline-block
                  width: 100px
                  background: #ff9900
                  color: white
                  letter-spacing: 0.5px
                  text-transform: uppercase
                  border: none
                    radius: 2px

    footer
      .links-container
        background: #959595
        line-height: 50px

        .links
          display: block
          justify-content: space-between
          margin: 0

          ul
            list-style: none
            margin: 0

          li
            float: left
            margin-right: 10px
            color: #e2e2e2
            &.link-text
              margin-right: 30px

            &:nth-child(7)
              margin-right: 50px

  @media ( min-width: 769px)
    .msg-icon, .copy-right
      display: none
    #footer-mobile
      display: none
  @media ( max-width: 768px)
    .msg-mob
      float: right
      padding: 10px
    .msg-icon
      display: block
    .landing-page .header .top-area .container form,
    .landing-page .header .top-area .container ul li p,
    .landing-page .header .top-area .container ul li img.img
      display: none !important
    .landing-page .header ul li .mr-logo
      border-right: none
    hr.ftr-hr
      margin-top: 30px
      margin-bottom: 20px
      border: 0
      border-top: 1px solid hsl(0, 0%, 54%)
    p.copyright
      color: hsl(0, 0%, 54%)
      padding-bottom: 30px
    #footer-web
      display: none
    #footer-mobile
      display: block
    .footer
      background-color: #959595
      padding: 15px 5px
      // margin-bottom: 25px
      .footer-top
        display: table
        width: 100%
        .footer-text
          display: table-cell
          width: 40%
          color: #e2e2e2
          vertical-align: middle
          text-align: center
          p
            margin: 0
        .footer-images
          display: table-cell
          width: 60%
          border-collapse: separate
          border-spacing: 5px
          vertical-align: middle
          .footer-img
            width: 33%
            padding: 6px
            display: inline-block
          .footer-img-coop
            width: 20%
            padding: 10px 0
            display: inline-block

    .footer-bottom
      text-align: center
      border-top: 1px solid #898989
      p
        margin-top: 10px
        color: #898989

  @media (max-width: 320px)
    .msg-mob
      padding: 7px
</style>
