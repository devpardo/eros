<template>
  <li class="treasure-chest col-md-2 col-sm-2 col-xs-4" :id="id">
    
    <a href="javascript:void(0);" :class="[classes]" @click="getTreasure">
      <span class="tc-label"></span>
      <span class="tc-icon"></span>
      <h4> 活跃度： {{treasure.flow_require}} </h4>
    </a>
  </li>
</template>

<script>
export default {
  name: "TreasureChest",
  inject: ["MEDIA_SERVER"],
  props: {
    treasure: {
      type: Object
    }
  },
  data() {
    return {
      isClick: false
    };
  },
  computed: {
    id() {
      return `tc-${this.treasure.flow_require}`;
    },
    classes() {
      return this.treasure.can_get == 2
        ? "claimed"
        : this.treasure.can_get
          ? "unclaimed available"
          : "unclaimed unavailable";
    }
  },
  methods: {
    async getTreasure() {
      if (this.isClick) return;
      this.isClick = true;
      let { success, data, message } = await this.$axios({
        method: "post",
        url: "activity/treasure/getTreasure",
        data: {
          chestid: this.treasure.id
        },
        withToken: true
      }).then(response => response.data);
      let type = "success";
      if (success) {
        await this.$store.dispatch("getTreasures");
      } else {
        type = "error";
      }
      this.isClick = false;
      this.$store.commit("modal/OPEN_MODAL", {
        type,
        content: message
          ? message
          : `恭喜您已领取${this.treasure.bonusamount}元奖金！`
      });
    }
  }
};
</script>

<style lang="sass">

  .treasure-chest
    height: 150px
    padding: 5px
    margin-bottom: 20px
    a
      display: block
      height: 100%
      width: 100%
      border-radius: 5px
      margin: 0 auto
      width: 100px
      height: 100px
      position: relative
      span
        display: block
        height: 100px
        width: 100px
      span.tc-label
        height: 28px
      h4
        color: yellow
        font-size: 12px

  @media only screen and (min-width : 992px) 
    .bonus-prizes
      width: 760px

  @media only screen and (max-width : 768px) 
    .bonus-prizes
      width: 720px
    span.tc-label
      height: 28px
  @media only screen and (max-width : 480px) 
    .bonus-prizes
      width: 376px
    .treasure-chest 
      height: auto
      a
        height: auto
        width: 95px

        h4
          margin: 0 auto
          font-size: 10px
        span
          height: 75px
          width: 75px
          margin: 0 auto
        span.tc-label
          height: 19px
          top: 8px
  @media only screen and (max-width : 375px) 
    .bonus-prizes
      width: 96%
      margin: 0 7px

  @media only screen and (max-width : 320px) 
    .bonus-prizes
      width: 280px
      margin-bottom: 10px
    .treasure-chest
      margin-bottom: 5px
      margin-top: 0 
      height: auto
      a
        height: auto
        width: 85px
        span
          height: 75px
          width: 75px

</style>
