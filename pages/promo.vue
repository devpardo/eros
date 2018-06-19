<template>
  <section class="static-navbar-page-margin promo-container">
    <div class="container promo-body">
      <promo-categories :categories="categories" :current-category.sync="currentPromoCategory" :loading="loading" />
      <transition name="fade" mode="out-in">
        <promos :key="categoryName" :promos="promosFiltered" :targetPromo.sync="promo" />
      </transition>
    </div>
    <promo-modal v-if="promo" :promo.sync="promo" />
  </section>
</template>

<script>
import PromoCategories from "~/components/promo/PromoCategories";
import Promos from "~/components/promo/Promos";
import PromoModal from "~/components/promo/PromoModal";
import { mapGetters } from "vuex";
import scrollable from "~/mixins/scrollable";

export default {
  name: "PagePromos",
  inject: ["MEDIA_SERVER"],
  mixins: [scrollable(["promo"])],
  components: {
    PromoModal,
    PromoCategories,
    Promos
  },
  data() {
    return {
      promo: null,
      currentPromoCategory: null,
      categories: [
        { name: "正在进行", category: "IN_PROGRESS" }, // ON PROGRESS PROMO
        { name: "即将开启", category: "UP_COMING" }, // COMING SOON PROMO
        { name: "长期活动", category: "NO_DUE" }, //REGULAR LONG TIME
        { name: "所有优惠", category: "ALL" } // ALL PROMO
      ],
      loading: false
      // categoriesNew: ["全部", "正在进行", "已经结束", "长期活动", "已过期"]
    };
  },
  computed: {
    ...mapGetters("promo", ["promos"]),
    categoryName() {
      return this.currentPromoCategory
        ? this.currentPromoCategory.category
        : "ALL";
    },
    promosFiltered() {
      return this.currentPromoCategory &&
        this.currentPromoCategory.category !== "ALL"
        ? this.promos.filter(promo =>
            promo.categories.includes(this.currentPromoCategory.category)
          )
        : this.promos;
    }
  },
  async mounted() {
    const [firstCategory] = this.categories;
    this.currentPromoCategory = firstCategory;
    this.loading = true;
    await this.$store.dispatch("promo/getPromos");
    this.loading = false;
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .fade-enter-active, .fade-leave-active
    transition: opacity .3s

  .fade-enter, .fade-leave-to
    opacity: 0

  .promo-container
    position: relative
    min-height: 769px
    padding: 20px 0

    .promo-body
      padding: 0

    &:before, &:after
      content: ''
      position: absolute
      top: 0
      left: 0
      background:
        image: url('/images/promo-male.png')
        repeat: no-repeat
        position: top center
      // height: 1195px
      height: 935px
      width: 484px
      z-index: -1

    &:after
      left: auto
      top: 150px
      right: 0
      background:
        image: url('/images/promo-female.png')
        repeat: no-repeat
        position: top center
      // height: 956px
      height: 785px
      width: 584px

      .main-tab-content
        margin-top: 20px

        .tab-pane
          overflow: auto

          .item-holder
            margin-bottom: 20px

          .card
            box-shadow: 0 2px 5px 0 rgba(199, 199, 199, 0.4)
            background: white
            cursor: pointer

            .card-img-top
              position: relative
              height: 121px
              background:
                size: cover
                repeat: no-repeat
                position: center center

              .floating-btn
                position: absolute
                top: 12px
                right: 10px
                display: inline-block
                font:
                  size: 11px
                  weight: 100
                color: white
                background: $secondary
                height: 24px
                line-height: 25px
                padding: 0 15px
                border-radius: $radius-4xl

            .card-block
              padding: 10px

              .card-block-header
                overflow: auto
                position: relative
                margin-bottom: 3px

                p.title, span.game-provider
                  float: left

                p.title
                  width: calc(100% - 58px)
                  font-size: 22px
                  text-overflow: ellipsis
                  white-space: nowrap
                  overflow: hidden
                  margin-bottom: 0

                span.game-provider
                  position: absolute
                  top: 4px
                  right: 0
                  height: 22px
                  width: 54px
                  background: $blue-5
                  text-align: center
                  line-height: 22px
                  border-radius: $radius-min-4
                  font-size: 12px
                  color: white

              .card-block-body
                margin-bottom: 6px

                span
                  font:
                    size: 12px
                    weight: 100

                  &.activity-label
                    color: $secondary

                  &.activity-date
                    color: $gray-light


              .card-block-footer
                height: 20px
                overflow: hidden

                *
                  padding: 0
                  margin: 0
                  width: 100%
                  text-overflow: ellipsis
                  white-space: nowrap
                  overflow: hidden
                  font:
                    size: 12px
                    weight: 100
                  color: $gray-light
  @media (max-width: 768px)
    .promo-container:before, 
    .promo-container:after
      width: 100%

</style>
