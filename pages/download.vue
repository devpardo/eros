<template>
    <section class="download">
      <div class="dow-box">
        <div class="banner row">
          <div class="banner-img col-md-9 col-xs-12 col-sm-12 " :style="{backgroundImage:`url(${banner})`}"></div>
          <div class="dow-wap col-md-3">
            <h3>下载 亿万手游APP</h3>
            <h5>智能二维码，自动识别系统</h5>
            <img :src="`${MEDIA_SERVER}/web/download/qr/news/mrfun.png`" width="130">
            <h5>扫描二维码立即获取</h5>
          </div>
        </div>
          <div class="features row">
            <ul class="features-box col-md-12 col-xs-7 col-sm-7">
              <li  v-for="(feature , index) in features" :key="index" class="col-md-3 col-xs-12 col-sm-12">
                <img :src="feature.icon">
                <div>
                  <p class="feature-title">{{feature.titile}}</p>
                  <p class="feature-label">{{feature.label}}</p>
                </div>
              </li>
            </ul>
            <ul class="display-box col-md-12 col-xs-5 col-sm-5">
              <li>全新版本</li>
              <li>亿万手游APP</li>
              <li>点击按钮, 自动识别系统</li>
              <a href="https://cdn.mr007.co/downloads/todownload.html">
                <li>点击智能下载</li>
              </a>
            </ul>
        </div>
        <div class="container-box row">
          <div class="nav col-md-9 col-xs-12 col-sm-12">
            <p class="nav-tt display-none">
              <span class="fa fa-windows" style="color: #47abfd;"></span>
              桌面客户端
            </p>
            <ul class="nav-box display-none">
              <li v-for="(desktop , index) in desktops" :key="index" class="pc-lis col-md-6">
                <div class="pc-intro col-md-8">
                  <img :src="desktop.img">
                  <div>
                    <p>{{desktop.title}}</p>
                    <span>{{desktop.content}}</span>
                  </div>
                </div>
                <a :href="desktop.link">
                  <div class="pc-down col-md-3">
                      <p :class="desktop.icon"></p>
                      <p>高速下载</p>
                  </div>
                </a>
              </li>
            </ul>
            <p class="nav-tt">
              <span class="fa fa-android" style="color: #689f38;"></span>
              Android
            </p>
            <ul class="nav-box row">
              <li v-for="(item , index) in AdDatas" :key="index" class="pc-lis nav-lis col-md-3 col-xs-6 col-sm-6">
                <div class="nav-cont">
                  <img :src="item.bgImg" alt="" >
                  <p class="display-none">{{item.pcCont}}</p>
                </div>
                <img :src="item.Qrcode" alt="" class="Qrimg display-none">
                <div class="nav-display">
                  <p>{{item.cont}}</p>
                  <a :href="item.link">
                   <p>高速下载</p>
                  </a>
                </div>
              </li>
            </ul>
            <p class="nav-tt">
              <span class="fa fa-apple" style="color: #333333;"></span>
              IOS
            </p>
            <ul class="nav-box ios-nav">
              <li v-for="(item , index) in IOSDatas" :key="index" class="pc-lis nav-lis col-md-3">
                <div class="nav-cont">
                  <img :src="item.bgImg" alt="" >
                  <p class="display-none">{{item.pcCont}}</p>
                </div>
                <img :src="item.Qrcode" alt="" class="Qrimg display-none">
                <div class="nav-display">
                  <p>{{item.cont}}</p>
                  <a :href="item.link">
                    <p>高速下载</p>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div class="browser-box col-md-3 col-xs-12 col-sm-12 display-none">
            <ul v-for="(item , index) in browsers" :key="index">
              <li class="cont-warp">
                <img :src="item.icon" alt="">
                <div>
                  <p class="browser-title">{{item.title}}</p>
                  <p class="browser-cont">下载Windows版</p>
                </div>
              </li>
              <li class="code-warp">
                <img :src="item.Lcode" alt="">
                <img :src="item.Rcode" alt="">
              </li>
            </ul>
          </div>
        </div>
      </div>

    </section>
</template>
<script>
// import DownloadLayout from "~/components/download/DownloadLayout";
// import DownloadBrowser from "~/components/download/DownloadBrowser";

export default {
  inject: ["MEDIA_SERVER"],
  components: {
    // DownloadLayout,
    // DownloadBrowser
  },
  data() {
    return {
      banner: `${this.MEDIA_SERVER}/web/download/qr/news/banner.jpg`,
      features:[
        {
          icon: "/web/download/qr/news/icon_hb.png",
          titile: "出色 · 用户体验极佳的UI界面",
          label: "让您舒适的体验游戏的快乐"
        },
        {
          icon: "/web/download/qr/news/icon_q.png",
          titile: "高效 · 稳定的充值存款渠道",
          label: "高成功率存款，拒绝充值失败"
        },
        {
          icon: "/web/download/qr/news/icon_d.png",
          titile: "灵活 · 智能的娱乐游戏体验",
          label: "完美移植PC端优势，娱乐更流畅"
        },
      ].map(feature =>{
        feature.icon = `${this.MEDIA_SERVER}${feature.icon}`
        return feature
      }),
      desktops: [
        {
          img: "/web/download/qr/news/win_mr.png",
          title: "亿万桌面版",
          content: "更快，更稳定，更好用的桌面客户端",
          icon: "fa fa-arrow-circle-o-down",
          link: "http://yw007.com/mr007.exe"
        },
        {
          img: "/web/download/qr/news/win_pt.png",
          title: "PT客户端",
          content: "PT游戏官方客户端，稳定，不卡顿",
          icon: "fa fa-arrow-circle-o-down",
          link: "http://cdn.genesis-pt.net/mr007/setupglx.exe"
        },
      ].map(dessktop =>{
        dessktop.img = `${this.MEDIA_SERVER}${dessktop.img}`
        return dessktop
      }),
      AdDatas:[
        {
          bgImg: "/web/download/qr/news/Android_mr.png",
          Qrcode: "/web/download/qr/news/mrfun.png",
          pcCont: "亿万-安卓版",
          cont: "亿万手游安卓版",
          link: "https://mr-mobile-2f504.firebaseapp.com/android/mr.apk"
        },
        {
          bgImg: "/web/download/qr/news/Android_pt.png",
          Qrcode: "/web/download/qr/news/android_ptt.png",
          pcCont: "PT-安卓版",
          cont: "PT平台安卓版",
          link: "http://m.mp176388.com/download.html"
        },
        {
          bgImg: "/web/download/qr/news/Android_ag.png",
          Qrcode: "/web/download/qr/news/android_ag.png",
          pcCont: "AG-安卓版",
          cont: "AG平台安卓版",
          link: "http://agmbet.com/universal/AG_setup.apk"
        },
        {
          bgImg: "/web/download/qr/news/Android_gg.png",
          Qrcode: "/web/download/qr/news/android_gg.png",
          pcCont: "GG-安卓版",
          cont: "GG捕鱼安卓版",
          link: "https://dl.gg626.com/iOS/public/download.html"
        },
      ].map(item =>{
        [item.bgImg,item.Qrcode] = [`${this.MEDIA_SERVER}${item.bgImg}`,`${this.MEDIA_SERVER}${item.Qrcode}`]
        return item
      }),
      IOSDatas:[
        {
          bgImg: "/web/download/qr/news/IOS_mr.png",
          Qrcode: "/web/download/qr/news/mrfun.png",
          pcCont: "亿万-IOS版",
          cont: "亿万手游IOS版",
          link: "https://mr-mobile-2f504.firebaseapp.com"
        },
        // {
        //   bgImg: "/web/download/qr/news/IOS_ag.png",
        //   Qrcode: "/web/download/qr/news/ios_ag.png",
        //   pcCont: "AG-IOS版",
        //   cont: "AG平台IOS版",
        //   link: "http://agmbet.com/"
        // },
        {
          bgImg: "/web/download/qr/news/IOS_gg.png",
          Qrcode: "/web/download/qr/news/ios_gg.png",
          pcCont: "GG-IOS版",
          cont: "GG平捕鱼OS版",
          link: "https://dl.gg626.com/iOS/public/download.html"
        },
      ].map(item =>{
        [item.bgImg,item.Qrcode] = [`${this.MEDIA_SERVER}${item.bgImg}`,`${this.MEDIA_SERVER}${item.Qrcode}`]
        return item
      }),
      browsers:[
        {
          icon: "/web/download/qr/news/icon_chrome.png",
          title: "chrome",
          Lcode: "/web/download/qr/news/chrome-Android.jpg",
          Rcode: "/web/download/qr/news/chrome-IOS.jpg",
        },
        {
          icon: "/web/download/qr/news/icon_firefox.png",
          title: "Firefox",
          Lcode: "/web/download/qr/news/firefox-Android.jpg",
          Rcode: "/web/download/qr/news/firefox-IOS.jpg",
        }
      ].map(item =>{
        [item.icon,item.Lcode,item.Rcode] = [`${this.MEDIA_SERVER}${item.icon}`,`${this.MEDIA_SERVER}${item.Lcode}`,`${this.MEDIA_SERVER}${item.Rcode}`]
        return item
      })
    };
  }
};
</script>
<style lang="sass">


  .download
    background: #edf1f7
    div,ul,li[class*="col-"]
      padding: 0
    .display-none
      display: block
    .row
      margin: 0
    .dow-box
      width: 100%
      max-width: 1200px
      height: auto
      margin: 96px auto 0
      .banner
        min-height: 0
        height: auto
        overflow: hidden
        background: #edf1f7
        .banner-img
          background-size: cover
          height: 240px
        .dow-wap
          height: 240px
          background: #fff
          text-align: center
          color: #2790e6
      .features
        margin-top: 10px
        padding-top: 10px
        height: 60px
        background: #fff
        .features-box
          margin: 0
          display: flex
          justify-content: space-around
          flex-wrap: wrap
          li
            width: 274px
            display: flex
            justify-content: space-between
            align-items: center
            background-color: #fff
            img
              width: 42px
              height: 42px
              margin-right: 20px
            p
              margin: 0
          .feature-title
            font-size: 16px
            color: #333333
          .feature-label
            font-size: 12px
            color: #999999
      .display-box
        display: none
      .nav-tt
        margin-top: 30px
        .fa
          &:before
            font-size: 20px
      .nav-box
        display: flex
        justify-content: space-between
        li
          display: flex
          align-items: center
          justify-content: space-between
          margin-right: 12px
          background: #fff
        .pc-lis
          height: 100px
        .nav-lis
          width: 213px
          padding: 0 1%
          img
            width: 68px
            height: 68px
          .Qrimg
            width: 86px
            height: 86px
        .nav-display
          display: none
        .pc-intro
          display: flex
          justify-content: space-around
          align-items: center
          p
            font-size: 14px
            color: #39404c
          span
            font-size: 12px
            color: #8a8f99
        a
          .pc-down
            width: 100px
            height: 100px
            padding-top: 20%
            text-align: center
            vertical-align: middle
            background: #e1e5ea
            color: #8a8f99
            cursor: pointer
            .fa
              &:before
                font-size: 28px
            &:hover
               background: #49a2ea
               color: #fff
        .nav-cont
          p
            margin: 0
      .ios-nav
        display: flex
        justify-content: normal
      .browser-box
        margin-top: 64px
        ul
          padding-top: 10px
          width: 300px
          height: 204px
          background: #fff
        .cont-warp
          display: flex
          justify-content: space-around
          img
            width: 68px
            height: 68px
          .browser-title
            text-align: left
            line-height: 28px
            font-size: 30px
            color: #9a9b9b
          .browser-cont
            width: 140px
            height: 30px
            background: #2790e6
            text-align: center
            line-height: 30px
            color: #fff
        .code-warp
          padding-top: 10px
          display: flex
          justify-content: space-around
  @media (max-width: 768px)
    .download
      .display-none
        display: none
      .dow-box
        margin-top: 0rem
        min-width: 100%;
        padding: .4rem .8rem
        .banner
          .banner-img
            height: 8.3rem
        .dow-wap
          display: none
        .features
          margin-top: 0
          background-color: #edf1f7
          .features-box
            .feature-title
              font-size: 1rem
            li
              padding: 2%
              justify-content: normal
              margin: 0 .5rem .5rem 0
              img
                margin-right: .2rem
                width: 3rem
                height: 3rem
          .display-box
            padding: 1.4rem 0
            display: block
            background-color: #fff
            text-align: center
            color: #1576fc
            font-size: 2rem
            font-weight: bolder
            li:nth-child(3)
              font-weight: normal
              font-size: 1rem
            a
              li
                margin: 5% 0 0 13%
                font-size: 1.2rem
                font-weight: normal
                width: 10rem
                height: 2.5rem
                line-height: 2.5rem
                background-color: #1576fc
                color: #fff
        .container-box
          .nav-tt
            margin: 0
          .display-none
            display: none
          .nav-box
            flex-wrap: wrap
            justify-content: normal
            .nav-lis
              height: 6.25rem
              width: 46%
              margin-bottom: 1rem
              img
                width: 4rem
                height: 4rem
                margin-left: 12%
            .nav-display
              display: block
              width: 9rem
              text-align: center
              font-size: 1.2rem
              a
                p
                  width: 6.25rem
                  height: 1.8rem
                  line-height: 1.8rem
                  background-color: #689f38
                  color: #fff
                  margin-left: 15%



</style>
