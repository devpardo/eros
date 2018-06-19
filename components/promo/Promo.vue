<template>
  <div class="card">
    <div class="card-img-top" :style="[styles]">
      <span class="floating-btn">{{ time }}</span>
      <span v-for="(provider, index) of promo.providers" :key="index" class="game-provider">{{ provider }}</span>
    </div>

    <div class="card-block">
      <div class="card-block-header">
        <p class="title">{{ promo.title }}</p>
      </div>
      <div class="card-block-body">
        <span class="activity-label">{{ promo.activity.label }}</span>
        <span class="activity-date">{{ promo.activity.startDate }} - {{ promo.activity.endDate }}</span>
      </div>
      <div class="card-block-footer" v-html="promo.details"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Promo",
    inject: ["MEDIA_SERVER"],
    props: {
      promo: {
        type: Object
      }
    },
    computed: {
      styles() {
        return { backgroundImage: `url(${this.promo.image})` };
      },
      time() {
        let diff = ((new Date(this.promo.activity.endDate).getTime()) - new Date().getTime()) / (24 * 60 * 60 * 1000)
        if (diff <= 0) return "已结束"

        return `${Math.round( diff )}天后结束`;
      }
    }
  };
</script>

<style lang="sass" scoped>
  @media only screen and (max-width: 768px) and (min-width: 768px)
    span.game-provider
      padding: 5px 5px !important
</style>
