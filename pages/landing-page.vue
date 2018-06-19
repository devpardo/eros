<template>
  <section class="landing-page-content" id="landing">
    <div class="container">
      <!--First Box -->
      <div class="lnd-head">
        <div class="row">
          <!-- Slider -->
          <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
            <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#carousel-example-generic" data-slide-to="0" class="active" style="display: none"></li>
                <li data-target="#carousel-example-generic" data-slide-to="1" style="display: none"></li>
                <li data-target="#carousel-example-generic" data-slide-to="2" style="display: none"></li>
              </ol>
              <div class="carousel-inner" role="listbox">
                <div class="item active">
                  <img src="/images/landing-page/banner1.jpg" alt="baner" class="img-responsive" />
                </div>
                <div class="item">
                  <img src="/images/landing-page/banner2.jpg" alt="baner" class="img-responsive" />
                </div>
                <div class="item">
                  <img src="/images/landing-page/banner3.jpg" alt="baner" class="img-responsive" />
                </div>
              </div>
            </div>
          </div>

          <div class="lnd-notes">
            <!-- Infos -->
            <div class="col-lg-4 col-md-4 col-md-notes">
              <p class="blue txt-md">新会员体育首张注单</p>
              <p class="blue txt-lg">失利返还100% </p>
              <p class="blue txt-md">NBA加时赛输球保险 赢球加码</p>
            </div>
            <!-- QR Code-->
            <div class="lnd-qr col-xs-12 col-sm-12">
              <div class="col-info">
                <p>官方微信号：
                  <span class="blue">mr007yiwan</span>
                </p>
                <p>扫描右侧二维码，添加好友</p>
              </div>
              <div class="col-qr">
                <img src="/images/landing-page/qr-code.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Second Box-->
      <div class="row">
        <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
          <div class="lnd-realtime">
            <h4>实时线路检测</h4>

            <div class="box">
              <div class="box-progress box-mob">
                <ul class="progress-title">
                  <li>网络状态</li>
                  <li class="center">状态显示</li>
                  <li class="center">网络速度</li>
                  <li class="right mob-right">立即访问</li>
                </ul>
              </div>
              <button class="btn btn-primary btn-nav btn-mob">重新检测</button>
            </div>

            <div class="box">
              <div class="box-progress">
                <button class="btn btn-green">极速</button>
                <div class="progressbar">
                  <div class="progress">
                    <div class="progress-bar bg-green" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="max-width: 95%">
                    </div>
                  </div>
                </div>
                <span class="txt-green">78ms</span>
              </div>
              <button class="btn btn-primary">点击进入</button>
            </div>

            <div class="box">
              <div class="box-progress">
                <button class="btn btn-green">极速</button>
                <div class="progressbar">
                  <div class="progress">
                    <div class="progress-bar bg-green" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="max-width: 80%">
                    </div>
                  </div>
                </div>
                <span class="txt-green">204ms</span>
              </div>
              <button class="btn btn-primary">点击进入</button>
            </div>

            <div class="box">
              <div class="box-progress">
                <button class="btn btn-orange">极速</button>
                <div class="progressbar">
                  <div class="progress">
                    <div class="progress-bar bg-orange" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="max-width: 60%">
                    </div>
                  </div>
                </div>
                <span class="txt-orange">1243ms</span>
              </div>
              <button class="btn btn-primary">点击进入</button>
            </div>

            <div class="box">
              <div class="box-progress">
                <button class="btn btn-red">极速</button>
                <div class="progressbar">
                  <div class="progress">
                    <div class="progress-bar bg-red" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="max-width: 30%">
                    </div>
                  </div>
                </div>
                <span class="txt-red">24ms</span>
              </div>
              <button class="btn btn-primary">点击进入</button>
            </div>

          </div>
        </div>

        <div class="col-lg-4 col-md-4 col-noleft-pad">
          <div class="links">
            <div class="box link-md">
              <img src="/images/landing-page/register.png" class="link-img" alt="" />
              <div class="link-cont">
                <p class="lnk-title">免费开户</p>
                <p>REGISTER</p>
              </div>
            </div>

            <div class="box link-md">
              <img src="i/mages/landing-page/mobile.png" class="link-img" alt="" />
              <div class="link-cont">
                <p class="lnk-title">手机投注</p>
                <p>MOBILE</p>
              </div>
            </div>

            <div class="box link-lg">
              <img src="/images/landing-page/app.png" class="link-img" alt="" />
              <div class="link-cont">
                <p class="lnk-title"> 亿万先生APP下载</p>
                <p>MR007 APP DOWNLOAD</p>
              </div>
            </div>

            <div class="box link-md">
              <img src="/images/landing-page/chrome.png" class="link-img" alt="" />
              <div class="link-cont">
                <p class="lnk-title">谷歌下载</p>
                <p>CHROME</p>
              </div>
            </div>

            <div class="box link-md">
              <img src="/images/landing-page/anti-jack.png" class="link-img" alt="" />
              <div class="link-cont">
                <p class="lnk-title"> 防止劫持</p>
                <p>ANTI-HIJACK</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- Services -->
      <div class="row">
        <div class="services-box">
          <div class="col-lg-3 col-md-3 col-line ">
            <img src="/images/landing-page/f1.png" class="serv-img" alt="" />
            <h4 class="txt-green">极为便利的银行服务</h4>
            <p>
              【亿万先生】现已对接所有主流银行与在线支付，彻底解决通过网络在线进行支付的不安全因素，为用户提供安全、稳定、快速的资金支付渠道，彻底保障用户支付安全。
            </p>
          </div>

          <div class="col-lg-3 col-md-3 col-line ">
            <img src="/images/landing-page/f2.png" class="serv-img" alt="" />
            <h4 class="txt-orange">极为便利的银行服务</h4>
            <p>
              【亿万先生】现已对接所有主流银行与在线支付，彻底解决通过网络在线进行支付的不安全因素，为用户提供安全、稳定、快速的资金支付渠道，彻底保障用户支付安全。
            </p>
          </div>

          <div class="col-lg-3 col-md-3 col-line ">
            <img src="/images/landing-page/f3.png" class="serv-img" alt="" />
            <h4 class="txt-red">极为便利的银行服务</h4>
            <p>
              【亿万先生】现已对接所有主流银行与在线支付，彻底解决通过网络在线进行支付的不安全因素，为用户提供安全、稳定、快速的资金支付渠道，彻底保障用户支付安全。
            </p>
          </div>

          <div class="col-lg-3 col-md-3 no-line ">
            <img src="/images/landing-page/f4.png" class="serv-img" alt="" />
            <h4 class="txt-blue">极为便利的银行服务</h4>
            <p>
              【亿万先生】现已对接所有主流银行与在线支付，彻底解决通过网络在线进行支付的不安全因素，为用户提供安全、稳定、快速的资金支付渠道，彻底保障用户支付安全。
            </p>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "landing-page"
};
</script>

<style lang="sass" scoped>
  .center
    text-align: center

  .right
    text-align: right
  

  .blue
    color: #2576bc

  .txt-lg
    font-size: 55px

  .txt-md
    font-size: 22px

  .btn-green
    color: hsl(0, 0%, 100%)
    background-color: hsl(94, 60%, 48%)
    border-color: hsl(94, 60%, 48%)
    padding: 0px 22px
    font-size: 1.2em
    margin: 2px !important
    float: left
    padding: 2px 21px !important

  .btn-orange
    color: hsl(0, 0%, 100%)
    background-color: #f2a32d
    border-color: #f2a32d
    padding: 0px 22px
    font-size: 1.2em
    margin: 2px !important
    float: left
    padding: 2px 21px !important

  .btn-red
    color: hsl(0, 0%, 100%)
    background-color: #f80002
    border-color: #f80002
    padding: 0px 22px
    font-size: 1.2em
    margin: 2px !important
    float: left
    padding: 2px 21px !important

  .txt-green
    color: hsl(94, 60%, 48%)

  .txt-orange
    color: #f2a32d

  .txt-red
    color: #f80002

  .txt-blue
    color: #3f93da

  .landing-page-content
    margin-top: 60px
    padding: 35px 0 50px
    .container
      .lnd-head
        padding: 30px 0
        .lnd-notes
          .col-md-notes
            padding-left: 0
            p
              margin: 0
          .lnd-qr
            background: hsl(0, 0%, 100%)
            margin-top: 6px
            width: 31%
            padding: 6px
            display: -webkit-inline-box
            border-top: 1px solid hsl(0, 0%, 85%)
            border-bottom: 1px solid hsl(0, 0%, 85%)
            .col-info
              width: 254px
              padding: 18px
              font-size: 16px
              height: 60px
              font-weight: 700

      .row
        .col-lg-8.col-md-8
          .lnd-realtime
            background: hsl(0, 0%, 100%)
            padding: 10px
            width: 96%
            .box
              button.btn.btn-primary.btn-nav
                background: #ff9900
                border-color: #ff9900
              .box-progress
                background-color: hsl(0, 0%, 93%)
                border-radius: 4px
                padding: 8px 13px
                margin: 7px 0
                width: 563px
                display: inline-block
                ul.progress-title
                  margin-bottom: 0
                  li
                    color: #7a7a7a
                    display: inline-block
                    width: 30%
                    padding: 6px 0
                .progressbar
                  padding: 6px 0 0
                  .progress
                    background-color: hsl(0, 0%, 81%)
                    border-radius: 33px
                    height: 10px
                    width: 60%
                    margin: 4px 25px
                    float: left
                    .btn
                      display: inline-block
                      padding: 11px 21px !important 
                      margin-bottom: 0
                      font-size: 14px
                      margin: 0 16px !important 
                      
              .btn
                display: inline-block
                padding: 13px 21px
                margin: -3px 16px 0 16px


      .row
        .col-lg-4.col-md-4
          .links
            .box
              background-color: hsl(207, 100%, 95%)
              border: 1px solid hsl(0, 0%, 85%)
              margin: 8px 4px
              &.link-md
                display: inline-block
                width: 47% !important
                .link-cont
                  color: hsl(200, 1%, 47%)
                  padding: 17px 0
                  p
                    margin: 0
                    -webkit-margin-before: 0.1em
                    -webkit-margin-after: 0
                    &.lnk-title
                      font-size: 18px
                      font-weight: 700
                img.link-img
                  padding: 24px 12px
                  float: left
              &.link-lg
                display: inline-block
                width: 96% !important
                img.link-img
                  padding: 24px 13px 24px 55px
                  float: left
                .link-cont
                  color: hsl(200, 1%, 47%)
                  padding: 17px 0
                  p
                    margin: 0
                    -webkit-margin-before: 0.1em
                    -webkit-margin-after: 0
                    &.lnk-title
                      font-size: 18px
                      font-weight: 700
        .col-lg-4.col-md-4.col-noleft-pad
            padding-left: 0

      .row
        .services-box
          margin: 20px 32px 20px 14px
          background: hsl(0, 0%, 100%)
          height: 310px
          text-align: center
          line-height: 25px
          color: #999999

          .col-lg-3.col-md-3
            &.col-line
              border-right: 1px solid hsl(0, 0%, 85%)
              height: 80%
              margin-top: 20px
              h4
                margin-bottom: 10px
            &.no-line
              border-right: 1px solid #ffffff
              height: 80%
              margin-top: 20px
            img.serv-img
              margin: 0 auto
              display: block
              padding: 0 20px 20px 20px
  
  @media (min-width: 1024px)
    .mob-right
      display: none !important
    .btn-mob
      display: none

  @media (max-width: 1196px)
    section#landing > .container > .lnd-head > .row > .col-lg-8.col-md-8 > img
      width: 98%
      margin-top: 7px
    .txt-md
      font-size: 20px
    .txt-lg
      font-size: 42px
    section#landing .container 
      .lnd-head .row .lnd-notes .lnd-qr
        background: hsl(0, 0%, 100%)
        margin-top: 6px
        width: 31%
        padding: 6px
        display: -webkit-inline-box
        border-top: 1px solid hsl(0, 0%, 85%)
        border-bottom: 1px solid hsl(0, 0%, 85%)
        .col-info
          width: 208px
          padding: 12px 0
          font-size: 16px
          height: 60px
          font-weight: 700
      .row
        .col-lg-8.col-md-8 .lnd-realtime .box .box-progress
          width: 435px
          .progressbar .progress
            width: 53%
        .col-lg-4.col-md-4 .links .box
          &.link-md img.link-img
            padding: 24px 8px
            float: left
            width: 37%
          &.link-lg img.link-img
            padding: 22px 13px 24px 36px

  @media (max-width: 1023px)
    button.btn.btn-primary.btn-nav.btn-mob
      display: none !important
    section#landing .container .lnd-head .row .lnd-notes .lnd-qr .col-info
      width: 69%
      padding: 62px 43px
      font-size: 30px
      height: 60px
      font-weight: 700
    .col-qr img
      width: 220px
    section#landing > .container > .lnd-head > .row > .col-lg-8.col-md-8 > img
      width: auto
      margin-bottom: 30px
    .landing-page-content
      margin-top: 40px
      padding: 35px 0 0!important

    .landing-page-content .container .lnd-head
      padding: 0

    .landing-page-content .container .lnd-head .lnd-notes .col-md-notes
      padding: 15px

    .txt-md
      font-size: 40px

    .txt-lg
      font-size: 105px
    
    .landing-page-content .container .row .services-box
      display: none
    .landing-page-content .container .row .col-lg-4.col-md-4 .links .box.link-md .link-cont,
    .landing-page-content .container .row .col-lg-4.col-md-4 .links .box.link-lg .link-cont
      display: none
    .landing-page-content .container .row .col-lg-4.col-md-4 .links .box.link-md,
    .landing-page-content .container .row .col-lg-4.col-md-4 .links .box.link-lg,
      display: inline-block
      width: 18% !important
    .landing-page-content .container .row .col-lg-4.col-md-4 .links .box
      background-color: #ffffff
    .landing-page-content .container .row .col-lg-4.col-md-4.col-noleft-pad
      padding-left: 15px
    section#landing .container .row .col-lg-4.col-md-4 .links .box.link-md img.link-img,
    section#landing .container .row .col-lg-4.col-md-4 .links .box.link-lg img.link-img,
      padding: 37px 8px
      float: left
      width: auto
      position: relative
      margin: 0 auto
      display: block
      transform: translate(50%,0%)

    section#landing .container .lnd-head .row .lnd-notes .lnd-qr
      width: 96%
      margin: 15px
    section#landing .container .row .col-lg-8.col-md-8 .lnd-realtime .box .box-progress
      width: 80%
    section#landing .container .row .col-lg-8.col-md-8 .lnd-realtime .box .box-progress.box-mob
      width: 100%
    .landing-page-content .container .row .col-lg-8.col-md-8 .lnd-realtime .box .box-progress ul.progress-title li
      width: 24%
    .landing-page-content .container .row .col-lg-8.col-md-8 .lnd-realtime
      width: 100%
    .landing-page-content .container .row .col-lg-8.col-md-8 .lnd-realtime .box .btn
      display: inline-block
      padding: 13px 32px
      margin: 0 0 0 10px
    .landing-page-content .container .row .col-lg-4.col-md-4 .links .box.link-md,
    .landing-page-content .container .row .col-lg-4.col-md-4 .links .box.link-lg
      width: 18.6% !important
    .landing-page-content .container .row .col-lg-4.col-md-4 .links .box
      margin: 17px 5px 11px

  @media (max-width: 768px)
    section#landing .container .row .col-lg-8.col-md-8 .lnd-realtime .box .box-progress .progressbar .progress
      width: 63%
  @media (max-width: 767px)
    .txt-md
      font-size: 1.6em
    .txt-lg
      font-size: 3.2em
    section#landing .container .lnd-head .row .lnd-notes .lnd-qr
      margin: 15px
    section#landing .container .row .col-lg-8.col-md-8 .lnd-realtime .box .box-progress
      width: 72%
    .landing-page-content .container .row .col-lg-8.col-md-8 .lnd-realtime .box .btn
      display: inline-block
      padding: 12px 4px
      margin-left: 0
    section#landing .container .row .col-lg-8.col-md-8 .lnd-realtime .box .box-progress .progressbar .progress
      width: 53%
    section#landing .container .lnd-head .row .lnd-notes .lnd-qr
      width: 92%
    .landing-page-content .container .row .col-lg-8.col-md-8 .lnd-realtime .box .box-progress .progressbar .progress
      margin: 9px 8px
      height: 6px
    .btn-green, .btn-red, .btn-orange
      padding: 2px 5px !important
    .landing-page-content .container .row .col-lg-8.col-md-8 .lnd-realtime .box .box-progress
      padding: 3px 13px
    .landing-page-content .container .row .col-lg-8.col-md-8 .lnd-realtime .box .btn
      padding: 8px 28px
      margin-left: 10px
      font-size: 12px
    section#landing .container .row .col-lg-4.col-md-4 .links .box.link-md img.link-img,
    section#landing .container .row .col-lg-4.col-md-4 .links .box.link-lg img.link-img
      padding: 11px 12px
      transform: none
    .landing-page-content .container .row .col-lg-4.col-md-4 .links .box
      margin: 15px 2px 11px

    
    
    @media (max-width: 414px)
      section#landing .container .row .col-lg-4.col-md-4 .links .box.link-md img.link-img, 
      section#landing .container .row .col-lg-4.col-md-4 .links .box.link-lg img.link-img
        padding: 11px 8px
      section#landing .container .row .col-lg-8.col-md-8 .lnd-realtime .box .box-progress .progressbar .progress
        width: 53%
      section#landing .container .row .col-lg-8.col-md-8 .lnd-realtime .box .box-progress
        width: 75%
      .landing-page-content .container .row .col-lg-8.col-md-8 .lnd-realtime .box .btn
        font-size: 10px
        padding: 7px 14px
        margin-left: 10px
        border-radius: 0
        
      .landing-page-content .container .row .col-lg-8.col-md-8 .lnd-realtime .box .box-progress .progressbar
        padding: 0
      .landing-page .header ul li:not(:first-child),
      .landing-page .header .top-area .container form
        display: none
      .landing-page .header .top-area .container ul li p
        display: none!important
      .landing-page .header ul li:not(:first-child)
        display: none
      section#landing .container .lnd-head .row .lnd-notes .lnd-qr .col-info
        width: 69%
        padding: 10px 10px
        font-size: 16px
        height: auto
        font-weight: 700
      .col-qr img
        width: 82px

  @media (max-width: 375px & 480px)
    .col-qr img
      width: 146px
    section#landing .container .lnd-head .row .lnd-notes .lnd-qr .col-info
      width: 69%
      padding: 37px 23px
      font-size: 20px
      height: 60px
      font-weight: 700

  @media (max-width: 320px)
    .landing-page-content .container .row .col-lg-8.col-md-8 .lnd-realtime .box
      font-size: 10px
    section#landing .container .row .col-lg-8.col-md-8 .lnd-realtime .box .box-progress .progressbar .progress
      width: 56%
    .landing-page-content .container .row .col-lg-8.col-md-8 .lnd-realtime .box .btn
      padding: 7px 7px
      margin-left: 10px
      margin-top: 10px
      border-radius: 0
    .txt-lg
      font-size: 3.0em
    section#landing .container .lnd-head .row .lnd-notes .lnd-qr .col-info
      width: 69%
      padding: 20px 10px
      font-size: 13px
    section#landing .container .row .col-lg-4.col-md-4 .links .box.link-md img.link-img, 
    section#landing .container .row .col-lg-4.col-md-4 .links .box.link-lg img.link-img
      padding: 7px 3px

    section#landing .container .row .col-lg-8.col-md-8 .lnd-realtime .box .box-progress .progressbar .progress
      width: 50%

  .bg-green
    background-color: #79cd36 !important

  .bg-orange
    background-color: #f2a32d !important

  .bg-red
    background-color: #f80002 !important

  @keyframes progress
    from
      width: 0

    to
      width: 100%


  @keyframes show
    from
      opacity: 0

    to
      opacity: 1


  section#landing > .container > .row > .col-lg-8.col-md-8 > .lnd-realtime > .box > .box-progress > .progressbar .progress .progress-bar
    font-weight: bolder
    color: hsl(0, 0%, 100%)
    background-color: hsl(211, 100%, 50%)
    border: 0px none
    box-shadow: none
    height: 10px
    border-radius: 33px
    width: 0
    animation: progress 1.5s ease-in-out forwards
  </style>
