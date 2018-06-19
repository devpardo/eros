<template>
  <div class="ac-menu">
    <div class="container ">
      <div class="list-items">
        <ul class="list-inline">
          <li v-for="(item,index) in menu" :key="index" :class="{ active: ($route.name).includes(item.name) }">
            <nuxt-link :to="item.link">
              <img class="hidden-xs" :src="`/images/ico/${item.icon}`" alt="" /> {{ item.c_name }}
            </nuxt-link>
            <span class="ac-badge" v-if="item.badge">{{ item.badge }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          name: "account",
          c_name: "账户信息",
          icon: "account-info-ico.png",
          link: "/uc/account"
        },
        {
          name: "deposit",
          c_name: "存款/充值",
          badge: "NEW",
          icon: "dep-ico.png",
          link: "/uc/deposit"
        },
        {
          name: "withdraw",
          c_name: "提款/提现",
          icon: "withdraw-ico.png",
          link: "/uc/withdraw"
        },
        {
          name: "record",
          c_name: "交易记录",
          icon: "record-ico.png",
          link: "/uc/records"
        }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
  .ac-menu
    background: #333333
    height: 120px
  
    .container
      padding:
        left: 35px
        right: 35px

      ul
        margin-top: 20px

        li
          height: 40px
          border-radius: 4px
          padding: 0 22px
          position: relative
          &:not(:first-child)
            margin-left: 20px

          &.active
            background: rgba(255, 255, 255, 0.10)

            &:before
              content: ''
              position: absolute
              left: 50%
              bottom: -15px
              margin-left: -6px
              border-left: 6px solid transparent
              border-right: 6px solid transparent
              border-bottom: 6px solid #FFFFFF

          a
            display: inline-block
            margin-top: 13px
            font:
              size: 12px
              weight: 100
            color: #FFFFFF
          
            img
              position: relative
              top: -1px
              margin-right: 5px
          
          span.ac-badge
            position: absolute
            top: 0px
            right: 15px
            line-height: 8px
            padding: 2px 3px 1px
            letter-spacing: 1px
            font:
              size: 7px
              weight: 100
            color: white
            background: #D9534F
  .list-items
    width: 100%
    overflow: hidden
    height: 80px
    ul
      width: auto
      white-space: nowrap
    
  @media (max-width: 414px)
    .ac-menu
      .container
        padding-left: 7px
        padding-right: 7px
        ul
          li
            text-align: center
            padding: 0
            width: 25%
            &:not(:first-child)
              margin-left: 0
            &:first-child
              margin-left: 5px
</style>
