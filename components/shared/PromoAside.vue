<template>
  <div>
    <div class="promo-trigger">
      <li v-for="(link,index) of links" :key="index">
        <a :class="link.class" @click="checkUser(link, index)" data-toggle="tab" :href="`#promo-${index}`"></a>
      </li>
    </div>
    <promo-modal :promo-id.sync="promoId" />
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import PromoModal from "~/components/shared/PromoModal";
  export default {
    name: "PromoAside",
    components: {
      PromoModal
    },
    data() {
      return {
        links: [
          { name: "Feat", class: "open-feat", id: 0 },
          { name: "TC", class: "open-tc", id: 1 },
          { name: "Spin", class: "open-spin", id: 2 }
        ],
        promoId: -1
      };
    },
    computed: {
      ...mapGetters(["auth"])
    },
    methods: {
      async checkUser(link, id) {
        if (!this.auth && link.class === "open-feat") {
          this.promoId = id;
        } else if (this.auth) {
          await this.$store.dispatch("treasure/getTreasures");
          this.promoId = id;
        } else {
          this.$store.commit("modal/OPEN_MODAL", {
            content: "请先前往登录。",
            type: "error"
          });
        }
      }
    },
    async mounted() {
      console.log(this.$router)
      if(this.$route.name === 'index') this.promoId = 0;
    }
  };
</script>

<style lang="sass">
  .promo-trigger
    height: 320px
    width: 160px
    position: fixed
    z-index: 999
    transform: translateY(-50%)
    top: 50%
    left: 0
    background-image: url("https://cdn.mr007.co/images/web/promo/bg_.png")
    background-repeat: no-repeat
    background-position: center left

    li
      list-style: none

      a
        position: absolute
        height: 88px
        width: 92px
        background-repeat: no-repeat
        background-position: top center

        &.open-feat
          background-image: url("https://cdn.mr007.co/images/web/promo/nav-feat-1.png")
          top: 0

        &.open-tc
          background-image: url("https://cdn.mr007.co/images/web/promo/nav-che-1.png")
          top: 105px
          right: 0

        &.open-spin
          background-image: url("https://cdn.mr007.co/images/web/promo/nav-spin-1.png")
          bottom: 40px

</style>
