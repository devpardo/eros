<template>
  <section class="mobile text-center static-navbar-page-margin">
    <div class="pin interface">
      <div class="container">
        <h1>{{ interface.title }}</h1>
        <p v-html="interface.content"></p>
        <template v-for="image in interface.images">
          <img :src="`/images/mobile/${image.src}`" :class="image.class" class="img-responsive">
        </template>
      </div>
    </div>
    <div class="pin products">
      <div class="container">
        <h4>{{ products.title }}</h4>
        <h1>{{ products.slogan }}</h1>
        <p v-for="content in products.contents">
          {{ content }}
        </p>
        <template v-for="image in products.images">
          <img :src="`/images/mobile/${image.src}`" :class="image.class" class="img-responsive">
        </template>
      </div>
    </div>
    <div class="pin compatibility">
      <div class="container">
        <h4>{{ compatibility.title }}</h4>
        <h1>{{ compatibility.slogan }}</h1>
        <p v-for="content in compatibility.contents">
          {{ content }}
        </p>
        <template v-for="image in compatibility.images">
          <img :src="`/images/mobile/${image.src}`" :class="image.class" class="img-responsive">
        </template>
      </div>
    </div>
    <div class="pin games">
      <div class="container">
        <h4>{{ games.title }}</h4>
        <h1>{{ games.slogan }}</h1>
        <p v-for="content in games.contents">
          {{ content }}
        </p>
        <template v-for="image in games.images">
          <img :src="`/images/mobile/${image.src}`" :class="image.class" class="img-responsive">
        </template>
      </div>
    </div>
    <div class="pin deposit">
      <div class="container">
        <h4>{{ deposit.title }}</h4>
        <h1>{{ deposit.slogan }}</h1>
        <p v-for="content in deposit.contents">
          {{ content }}
        </p>
        <template v-for="image in deposit.images">
          <img :src="`/images/mobile/${image.src}`" :class="image.class" class="img-responsive">
        </template>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        interface: {
          title: "随时随地，想玩就玩！",
          content:
            "亿万先生手机畅玩版已正式上线！<br>使用手机打开浏览器输入现有域名或者扫描下方二维码即可畅玩，一起来进入掌控的世界吧！",
          images: [{ src: "phone-img-2.png" }]
        },
        products: {
          title: "产品",
          slogan: "完美支持4大平台",
          contents: [
            "PT、TTG、AG真人、体育四合一，任您选择，玩你所想。",
            "PT、TTG千款游戏网上冲浪，掌中娱乐，极致享受。",
            "AG真人全新上线，尽享完美真人视讯体验。",
            "亿万体育实时赛事，边看边投，畅玩无限！"
          ],
          images: [
            { src: "platforms-img-2.png" },
            { src: "arrow-down.png", class: "arrow-down" }
          ]
        },
        compatibility: {
          title: "兼容",
          slogan: "完美兼容手机、平板和笔记本电脑",
          contents: [
            "手机、平板、电脑自由切换，畅玩游戏。",
            "安卓、IOS系统完美兼容，HTML5绝佳享受！"
          ],
          images: [
            { src: "compatibility-img-2.png" },
            { src: "arrow-down.png", class: "arrow-down" }
          ]
        },
        games: {
          title: "游戏",
          slogan: "精彩刺激、多样丰富的游戏",
          contents: [
            "更快更稳定的游戏体验，速度与激情的冲击。",
            "秒速加载，轻松游戏，尽在亿万无限畅玩版！"
          ],
          images: [
            { src: "games-img-2.png" },
            { src: "arrow-down.png", class: "arrow-down" }
          ]
        },
        deposit: {
          title: "支付",
          slogan: "极速秒存功能，支持微信支付和支付宝",
          contents: [
            "整合在线秒存、微信、支付宝、线下支付四大支付方式。",
            "便捷存提，完爆出纳，一手掌控！"
          ],
          images: [{ src: "deposits-img.png" }]
        }
      };
    }
  };
</script>

<style lang="sass">
  @import './assets/sass/_variables'
  .mobile
    div.pin
      padding: 40px 0
      background: $mobile-pin-background

      img
        display: block
        margin: 0 auto

      img.arrow-down
        margin-top: 40px

      h4
        color: $mobile-content-text-color
        font-size: 12pt
        margin:
          top: 0
          bottom: 20px
      
      h1
        font-size: 18pt
        color: $mobile-title-text-color
        margin:
          top: 0
          bottom: 20px

      &.interface 
        padding-bottom: 0

        .container
          h1
            font-size: 32pt
            margin-top: 0

          p
            margin-bottom: 40px
            font-size: 14pt
            line-height: 18pt
</style>
