<template>
  <div class="footer-desktop">
    <div class="common-footer-row">
      <div class="common-footer-sitemap container">
        <div class="common-footer-sitemap_col">
          <div class="common-footer-sitemap_unit">
            <div class="common-footer-sitemap_maincat">
              <span>社交媒体</span>
            </div>
            <div class="common-footer-sitemap_list">
              <div class="common-footer-sitemap_subcat">
                <a :href="liveChatLink" target="_blank">
                  <i>7×24小时在线客服</i>
                </a>
              </div>
              <div class="common-footer-sitemap_subcat">
                <p>
                  <i>客服热线: 13145210773</i>
                </p>
              </div>
              <div class="common-footer-sitemap_subcat">
                <a href="mailto:mr007cs@qq.com" class="email">
                  <i>官方邮箱</i>
                </a>
              </div>
              <div class="common-footer-sitemap_subcat">
                <a href="http://wpa.qq.com/msgrd?v=3&uin=800063619&site=qq&menu=yes" target="_blank">
                  <i>客服QQ</i>
                </a>
              </div>
              <div class="common-footer-sitemap_subcat">
                <p>
                  <i>官方微博</i>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="common-footer-sitemap_col">
          <div class="common-footer-sitemap_unit">
            <div class="common-footer-sitemap_maincat">
              <span>牌照信息</span>
            </div>
            <div class="common-footer-sitemap_list">
              <div class="common-footer-sitemap_subcat">
                <p>
                  <i>菲律宾政府PAGCOR博彩牌照认证</i>
                </p>
              </div>
            </div>
            <div class="common-footer-sitemap_maincat">
              <span>责任博彩</span>
            </div>
            <div class="common-footer-sitemap_list">
              <div class="common-footer-sitemap_subcat">
                <p class="desc">
                  <i>如要浏览本站，您必须达到所在国家所规定的法定成年年龄，阅读并同意以下条款及声明。</i>
                </p>
                <nuxt-link to="/cooperation/terms">
                  <i class="fa fa-exclamation-triangle"></i>
                  <i>服务条款</i>
                </nuxt-link>
                <nuxt-link to="/cooperation/privacy">
                  <i>隐私保护</i>
                </nuxt-link>
                <nuxt-link to="/cooperation/responsible-gaming">
                  <i>责任博彩</i>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="common-footer-sitemap_col">
          <div class="common-footer-sitemap_unit">
            <div class="common-footer-sitemap_maincat">
              <span>合作平台</span>
            </div>
            <div class="common-footer-sitemap_list">
              <div v-for="(link, index) of links.cooperation" :key="index" class="common-footer-sitemap_subcat">
                <a :href="link.link" target="_blank">
                  <i>{{link.label}}</i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="common-footer-sitemap_col">
          <div class="common-footer-sitemap_unit">
            <div class="common-footer-sitemap_maincat">
              <span>客户支持</span>
            </div>
            <div class="common-footer-sitemap_list">
              <div v-for="(link, index) of links.support" :key="index" class="common-footer-sitemap_subcat">
                <nuxt-link :to="link.link">
                  <i>{{link.label}}</i>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="common-footer-sitemap_col">
          <div class="common-footer-sitemap_unit">
            <div class="common-footer-sitemap_maincat">
              <span>充值方式</span>
            </div>
            <div class="common-footer-sitemap_list">
              <div v-for="(link, index) of links.recharge" :key="index" class="common-footer-sitemap_subcat">
                <nuxt-link :to="link.link">
                  <i>{{link.label}}</i>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div>2018© MR007 All Rights Reserved.</div>
      </div>
    </div>

  </div>
</template>

<script>
import AnimatedNumber from "@/components/shared/AnimatedNumber";
export default {
  components: {
    AnimatedNumber
  },
  inject: ["MEDIA_SERVER"],
  data() {
    return {
      links: {
        cooperation: [
          {
            link: "https://www.playtech.com/",
            label: "Playtech - the source of success"
          },
          {
            link: "http://toptrendgaming.com/",
            label: "Toptrend Gaming"
          },
          {
            link: "https://asia-gaming.com/",
            label: "Asia Gaming"
          },
          {
            link: "http://www.gg-gaming.com/",
            label: "GG Gaming"
          },
          {
            link: "https://www.pgsoft.com/",
            label: "Pocket Games Soft"
          },
          {
            link: "https://www.188bet.com/zh-cn/sports",
            label: "188 Sports"
          },
          {
            link: "https://www.bb-in.com/",
            label: "BB-in Lottery"
          },
          {
            link: "https://www.microgaming.co.uk/games",
            label: "Microgaming"
          }
        ],
        support: [
          {
            link: "/cooperation/faq",
            label: "常见问题"
          },
          {
            link: "/level",
            label: "会员晋级"
          },
          {
            link: "/new-cooperation",
            label: "加盟合作"
          },
          {
            link: "/download",
            label: "下载中心"
          },
          {
            link: "/mobile",
            label: "手机投注"
          },
          {
            link: "/how-to-install",
            label: "安装向导"
          }
        ],

        recharge: [
          {
            link: "/uc/deposit",
            label: "支付宝支付"
          },
          {
            link: "/uc/deposit",
            label: "QQ钱包"
          },
          {
            link: "/uc/deposit",
            label: "微信支付"
          },
          {
            link: "/uc/deposit",
            label: "京东钱包"
          },
          {
            link: "/uc/deposit",
            label: "银联扫码"
          },
          {
            link: "/uc/deposit",
            label: "网银支付"
          },
          {
            link: "/uc/deposit",
            label: "苏宁扫码"
          },
          {
            link: "/uc/deposit",
            label: "线下存款"
          }
        ]
      },
      liveChatLink:
        "https://chat7.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=378548&configID=52507&jid=5460920356&s=1",
      linksUnknwon: [
        {
          name: "Common Problem",
          cname: "常见问题",
          link: "/cooperation/faq"
        },
        {
          name: "Members Promotion",
          cname: "会员晋级",
          link: "/level"
        },
        {
          name: "Terms Of Service",
          cname: "服务条款",
          link: "/cooperation/terms"
        },
        {
          name: "Privacy",
          cname: "隐私保护",
          link: "/cooperation/privacy"
        },
        {
          name: "Responsible Betting",
          cname: "责任博彩",
          link: "/cooperation/responsible-gaming"
        },
        {
          name: "Affiliate",
          cname: "加盟合作",
          link: "/new-cooperation"
        },
        {
          name: "Download",
          cname: "下载中心",
          link: "/download"
        },
        {
          name: "Mobile",
          cname: "手机投注",
          link: "/mobile"
        }
      ],
      copyrightDetails: {
        logoUrl: `${this.MEDIA_SERVER}/web/footer-logo.png`,
        copyright: "Copyright ©2018 亿万先生版权所有",
        license: "菲律宾政府PAGCOR博彩牌照认证"
      },
      contactInfo: {
        title: "客户服务支持",
        customerSupportDetails: [
          { name: "客服热线：", contact: "131-4521-0773" },
          { name: "客服邮箱：", contact: "mr007cs@qq.com" },
          { name: "客服QQ：", contact: "800063619" }
        ]
      }
    };
  },
  methods: {
    randomNumber: function() {
      return Math.floor(Math.random() * (2000 - 1 + 1)) + 1;
    }
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .footer-desktop
    .links-container
      background: #f2f2f2

      .logo
        float: left
        padding: 10px
        height: 36px
      .links
        display: block
        justify-content: space-between
        // margin-top: 10px
        margin: 0

        ul
          list-style: none
          margin: 0

        li
          float: left
          margin-right: 20px
          color: $gray-14
          &:hover
            color: $gray-1


          &:not(:first-child)
            // margin-left: 40px

          a
            padding: 0 5px
            line-height: 37px
            color: $gray-14
            font-size: 13px
            &:hover
              color: $gray-1
      .active-user-count
        padding: 4px 0
        color: #9B9B9B
        .user-count
          padding-right: 5px
          font-size: 20px
    .details-container
      background: $gray-20
      padding: 20px 0
      font-size: 0.9em
      color: $gray-14

      .container
        .copyright
          padding-left: 0

          img.logo
            width: 100px
            margin-bottom: 18px

          p
            img.pagcor
              display: inline-block
              margin: -3px 2px 0
              height: 16px
              width: 72.84px
          ul
           li
            display: inline-block
            padding: 0 5px

          .copyright-text
            font-size: 12px
            .license-text
              padding-left: 10px
              color: #000

        .contact-info
          padding-right: 0

          h4
            margin-top: 0

          ul
            margin: 0

            li
              float: right
              display: inline-block
              min-width: 65px
              .aff-ico
                opacity: 0.2

    @media screen and (max-width: 767px)
      .details-container
        padding: 20px 0
        .container
          .copyright
            padding:
              bottom: 20px
              right: 0
            text-align: center
            p
              color: #FFF
              span
                color: #FFF !important
                display: block
                padding-left: 0
          .contact-info
            padding-left: 0
            text-align: center
            ul
              li
                float: none

      .links-container
        .active-user-count
            display: none
        .links
          li
            float: none
            margin-right: 0
            padding:
              left: 15px
              right: 15px
            border:
              top: 1px solid #D7D7D7
            i
              float: right
              position: relative
              top: 12px
            a
              padding: 0

    @media screen and (min-width: 768px) and (max-width: 1023px)
      .details-container
        padding: 20px 0
        .container
          .copyright
            padding:
              bottom: 20px
              right: 0
            text-align: center
            p
              color: #FFF
              span
                color: #FFF !important
                display: block
                padding-left: 0
          .contact-info
            padding-left: 0
            text-align: center
            ul
              li
                float: none
                .aff-ico
                  height: 35px

      .links-container
        .links
          li
            margin-right: 12px
            a
              font-size: 11px !important

    .affiliates
      background: $gray-20
      .container
        text-align: center
        li
          display: inline
          .aff-ico
            opacity: .2
      .img-holder
        padding: 15px 15px

    .pr-zero
      padding-right: 0

    .pl-zero
      padding-left: 0

  .common-footer-row
    padding: 4px 0
    height: 100%
    color: #3c3c3c
    position: relative
    background-color: #f2f2f2
    -webkit-font-smoothing: antialiased

    .common-footer-sitemap
      margin-top: 4px
      padding: 0
      ::after
        content: ''
        display: block
        clear: both
      .common-footer-sitemap_col
        ::nth-child(4n + 1)
          clear: left
        width: 20%
        float: left
        display: inline
        padding-right: 20px
        .common-footer-sitemap_maincat
          margin-top: 40px
          padding-bottom: 20px
          span
            display: inline-block
            position: relative
            font-weight: bold
            vertical-align: top
            border-left: solid 4px #206b99
            margin-bottom: -5px
            font-size: 14px
            line-height: 13px
            padding-left: 8px
            padding-top: 2px
            margin-top: -1px
        .common-footer-sitemap_subcat
          margin-top: -4px
          margin-bottom: -4px
          font-size: 12px
          line-height: 30px
          .desc
            line-height: 14px !important
          a
            color: inherit
            text-decoration: none
            display: inline-block
            line-height: 16px
            margin-right: 10px
            &:hover
              color: #206b99 !important
            .fa
              color: #3c3c3c
              margin-right: 4px

    .footer-bottom
      width: 100%
      text-align: center
      font-size: 12px
      color: #9B9B9B
      margin: 40px 0 10px 0
</style>
