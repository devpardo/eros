<template>
  <aside class="aside hidden-xs" :class="{ 'active': isActive }">
    <a class="aside-btn" v-on:click="toggleActive">
      <i class="fa fa-question-circle"></i>
    </a>
    <div class="aside-details">
      <ul>
        <li v-for="(detail,index) of details" :key="index">
          <a :href="detail.link" @click="detail.click ? showChat() : ''">
            <i :class="detail.icon"></i>
            {{ detail.name }}
          </a>
        </li>
      </ul>
      <div class="qr-code text-center">
        <template v-for="(item, index) of qr">
          <p v-if="item.type === 'p'" :key="`content-${index}`">{{ item.content }}</p>
          <img v-else-if="item.type === 'img'" :key="`image-${index}`" :src="`${mediaServer + item.content}`" />
        </template>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  inject: ["MEDIA_SERVER"],
  data() {
    return {
      isActive: false,
      mediaServer: this.MEDIA_SERVER + "/",
      details: [
        {
          icon: "fa fa-commenting",
          name: "24x7在线客服",
          click: true
        },
        {
          icon: "fa fa-qq",
          link: "http://wpa.qq.com/msgrd?v=3&uin=122487848&site=qq&menu=yes",
          name: "800063619"
        },
        { icon: "fa fa-phone", name: "131-4521-0773" }
      ],
      qr: [
        { type: "p", content: "扫码加好友" },
        { type: "p", content: "订阅最新资讯" },
        { type: "img", content: "web/aside-qr-code.jpg" },
        { type: "p", content: "官方微信客服" },
        { type: "img", content: "web/aside-qr-code2.jpg" },
        { type: "p", content: "备用微信客服" }
      ]
    };
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
    showChat() {
      window.open(
        `https://chat7.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=378548&configID=52507&jid=5460920356&s=1`
      );
    }
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .aside
    position: fixed
    width: 220px
    right: -170px
    top: 50%
    -webkit-transform: translateY(-50%)
    -ms-transform: translateY(-50%)
    transform: translateY(-50%)
    z-index: 15
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)
    -moz-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)
    -ms-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)
    -o-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)

    &.active
      right: 0

    .aside-btn, .aside-details
      float: left

    .aside-btn
      display: inline-block
      height: 50px
      width: 50px
      background: rgba(7, 34, 64, 0.8)
      border-top-left-radius: $radius-curve
      border-bottom-left-radius: $radius-curve
      text-align: center

      i
        line-height: 50px
        font-size: 20px
        color: white

    .aside-details
      width: 170px
      min-height: 298px
      background: rgba(7, 34, 64, 0.8)
      padding: 10px

      ul
        li
          padding: 5px 10px
          border-bottom: 1px solid $gray-22

          a
            color: white
            line-height: 20px

            i
              display: inline-block
              width: 20px

      .qr-code
        p
          color: white
          margin:
            top: 3px
            bottom: 0

        img
          margin-top: 4px
</style>
