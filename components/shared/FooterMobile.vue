<template>
  <div class="footer-mobile">
    <div class="links-container">
      <div class="container">
        <div class="row">
          <ul class="links">
            <li class="link has-sub-link" @click.stop="toggleLink('social-media')">
              <a>社交媒体</a>
              <span v-if="currentLink === 'social-media'" class="icon">
                <i class="fa fa-chevron-circle-up"></i>
              </span>
              <span v-else class="icon">
                <i class="fa fa-chevron-circle-down"></i>
              </span>
              <ul class="sub-links" v-if="currentLink === 'social-media'">
                <li>
                  <a :href="liveChatLink" target="_blank">
                    7×24小时在线客服
                  </a>
                </li>
                <li>
                  <p>客服热线: 13145210773</p>
                </li>
                <li>
                  <a href="mailto:mr007cs@qq.com" class="email">官方邮箱</a>
                </li>
                <li>
                  <a href="http://wpa.qq.com/msgrd?v=3&uin=800063619&site=qq&menu=yes" target="_blank">客服QQ</a>
                </li>
                <li>
                  <p>官方微博</p>
                </li>
              </ul>
            </li>
            <li class="link has-sub-link" @click.stop="toggleLink('license-info')">
              <a>牌照信息</a>
              <span v-if="currentLink === 'license-info'" class="icon">
                <i class="fa fa-chevron-circle-up"></i>
              </span>
              <span v-else class="icon">
                <i class="fa fa-chevron-circle-down"></i>
              </span>
              <ul class="sub-links" v-if="currentLink === 'license-info'">
                <li>
                  <p>菲律宾政府PAGCOR博彩牌照认证</p>
                </li>
              </ul>
            </li>
            <li class="link has-sub-link" @click.stop="toggleLink('responsible-gaming')">
              <a>责任博彩</a>
              <span v-if="currentLink === 'responsible-gaming'" class="icon">
                <i class="fa fa-chevron-circle-up"></i>
              </span>
              <span v-else class="icon">
                <i class="fa fa-chevron-circle-down"></i>
              </span>
              <ul class="sub-links" v-if="currentLink === 'responsible-gaming'">
                <li>
                  <p>如要浏览本站，您必须达到所在国家所规定的法定成年年龄，阅读并同意以下条款及声明。</p>
                </li>
                <li>
                  <nuxt-link to="/cooperation/terms">
                    <i class="fa fa-exclamation-triangle"></i>
                    服务条款
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/cooperation/privacy">隐私保护</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/cooperation/responsible-gaming">责任博彩</nuxt-link>
                </li>
              </ul>
            </li>
            <li class="link has-sub-link" @click.stop="toggleLink('cooperation')">
              <a>合作平台</a>
              <span v-if="currentLink === 'cooperation'" class="icon">
                <i class="fa fa-chevron-circle-up"></i>
              </span>
              <span v-else class="icon">
                <i class="fa fa-chevron-circle-down"></i>
              </span>
              <ul class="sub-links" v-if="currentLink === 'cooperation'">
                <li v-for="(link, index) of links.cooperation" :key="index">
                  <a :href="link.link" target="_blank">{{link.label}}</a>
                </li>
              </ul>
            </li>
            <li class="link has-sub-link" @click.stop="toggleLink('customer-support')">
              <a>客户支持</a>
              <span v-if="currentLink === 'customer-support'" class="icon">
                <i class="fa fa-chevron-circle-up"></i>
              </span>
              <span v-else class="icon">
                <i class="fa fa-chevron-circle-down"></i>
              </span>
              <ul class="sub-links" v-if="currentLink === 'customer-support'">
                <li v-for="(link, index) of links.support" :key="index">
                  <nuxt-link :to="link.link">{{link.label}}</nuxt-link>
                </li>
              </ul>
            </li>
            <li class="link has-sub-link" @click.stop="toggleLink('recharge-method')">
              <a>充值方式</a>
              <span v-if="currentLink === 'recharge-method'" class="icon">
                <i class="fa fa-chevron-circle-up"></i>
              </span>
              <span v-else class="icon">
                <i class="fa fa-chevron-circle-down"></i>
              </span>
              <ul class="sub-links" v-if="currentLink === 'recharge-method'">
                <li v-for="(link, index) of links.recharge" :key="index">
                  <nuxt-link :to="link.link">{{link.label}}</nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="details-container">
      <div class="container">
        <div class="col-xs-12 col-sm-6 copyright">
          <p class="copyright-text">2018© MR007 All Rights Reserved.</p>
        </div>
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
      currentLink: "",
      liveChatLink:
        "https://chat7.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=378548&configID=52507&jid=5460920356&s=1",
      linksUnknown: [
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
    },
    toggleLink(name) {
      this.currentLink = this.currentLink === name ? "" : name;
    }
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .footer-mobile
    padding-bottom: 40px
    background: #d8d8d8
    .links-container
      background: #f2f2f2
      ul.links
        list-style: none
        margin: 0
        li

          i
            float: right
            position: relative
            top: 12px
          a
            padding: 0
            line-height: 37px
            color: $gray-14
            font-size: 13px
            &:hover
              color: $gray-1
          &.link
            margin-right: 0
            padding:
              left: 7px
              right: 7px
            border:
              top: 1px solid #D7D7D7
            display: block
            justify-content: space-between
            margin: 0
            color: $gray-14
            // color: white
            font:
              size: 13px
              weight: 100
            display: inline-block
            width: 100%
            position: relative
            span.icon
            &.has-sub-link
              ul.sub-links
                li
                  border: none
                  padding-left: 20px
                  i
                    float: left
                    position: relative
                    top: 13px
                    padding-right: 5px
                  a
                    color: $gray-14
                    width: 100%
                  p
                    margin: 0
                    line-height: 37px
                    color: #9B9B9B
                    font-size: 13px
      .active-user-count
        padding: 4px 0
        color: #9B9B9B
        .user-count
          padding-right: 5px
          font-size: 20px
    .details-container
      padding: 20px 0
      font-size: 0.9em
      color: $gray-14

      .container
        .copyright
          // padding-left: 0
          padding:
            // bottom: 20px
            right: 0
            left: 0
          text-align: center
          p
            color: rgba(#000, .5)
            margin: 0
            font-weight: normal
            span
              color: #FFF !important
              display: block
              padding-left: 0
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
          padding:
            right: 0
            left: 0
          text-align: center
          h4
            margin-top: 0

          ul
            margin: 0

            li
              // float: right
              display: inline-block
              min-width: 65px
              .aff-ico
                opacity: 0.2

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

</style>
