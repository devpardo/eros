<template>
  <div class="promo-claim">
    <ul class="list-inline">
        <li class="claim-img"><img :src="claim.img" alt="" /></li>
        <li class="claim-text">
            <h3>{{claim.title}}</h3>
            <p>{{claim.desc}}</p>
        </li>
        <li class="cl-btn"><a class="claim-btn" :href="claim.claimGoto"></a></li>
    </ul>
  </div>  
</template>

<script>
export default {
  name: "TreasureClaims",
  props: {
    claim: {
      type: Object
    }
  }
};
</script>
<style lang="sass" scoped>

  @import './assets/sass/_variables'
  .claim-text
      h3
        font-size: 1em
        color: $yellow-17
      p
        margin-top: 5px
        font-size: $font-size-small
        color: $gray-16
  .claim-img
    width: 80px
    vertical-align: middle
  .claim-text
    vertical-align: middle
    text-align: left
    width: 380px
  .cl-btn
    vertical-align: middle
  .claim-btn
    background-image: url('http://cdn.mr007.co/images/web/promo/tc-claim-btn.png')
    background-repeat: no-repeat
    background-position: center center
    height: 34px
    width: 115px
    display: block
</style>
