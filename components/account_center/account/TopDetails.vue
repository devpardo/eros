<template>
  <div class="ac-top-details clearfix">
    <div class="col-md-6 col-sm-6 col-xs-12 custom-padding">
      <p class="greetings">尊贵的亿万会员，欢迎回来！</p>
    </div>
    <div class="col-md-6 col-sm-6 col-xs-12 custom-padding">
      <p class="last-login">上次登录：{{ lastLogin.replace('T', ' ').replace('.000Z', '') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["lastLogin"]
};
</script>

<style lang="sass" scoped>
  .ac-top-details
    border-bottom: 1px solid #D7D7D7
    padding: 15px 0

    p
      margin-bottom: 0

    .greetings
      font-size: 16px
      color: #4A4A4A

    .last-login
      margin-top: 4px
      font-size: 12px
      color: #9B9B9B
      text-align: right

  @media (max-width: 768px)
    .ac-top-details .last-login
      text-align: left
  
  // @media (max-width: 414px)
  //   .custom-padding
  //     padding-left: 7px
  //     padding-right: 7px
</style>
