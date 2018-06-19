<template>
  <div>
    <div class="banner-platforms">
      <div class="container">
        <ul class="list-inline">
          <li v-for="(p,index) of platforms" :key="index" :class="[classActivePlatform(p)]">
            <a class="text-center" @click="changeActivePlatform(p)">
              {{p.name}}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <platform v-if="currentPlatform" :key="currentPlatform.platform" :platform="currentPlatform" />
  </div>
</template>
<script>
  import Platform from "@/components/game/Platform";
  import { mapGetters } from "vuex";
  export default {
    name: "Platforms",
    components: {
      Platform
    },
    props: {
      platforms: {
        type: Array
      }
    },
    computed: {
      ...mapGetters("platform", ["currentPlatform"])
    },
    watch: {
      ["$route.query.platform"](val) {
        this.changeActivePlatform({
          platform: val
        });
      }
    },
    methods: {
      changeActivePlatform(platform) {
        this.$store.commit("platform/SET_PLATFORM", platform.platform);
      },
      classActivePlatform(platform) {
        return {
          active:
            this.currentPlatform &&
            (this.currentPlatform.platform === platform.platform ||
              this.$route.query.platform === this.currentPlatform.platform)
        };
      }
    },
    async mounted() {
      await this.$store.dispatch("platform/getPlatforms");
      const [platform] = this.platforms;
      this.changeActivePlatform(platform);
    }
  };
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .banner-platforms
    background: $gray-6

    .container
      padding: 0
      ul
        margin: 0

        li
          min-width: 150px
          &.active
            background: $secondary
            a
              color: $gray-6
          a
            line-height: 60px
            width: 100%
            color: white
            font-weight: 600
            display: inline-block

  @media screen and (max-width: 767px)
    .banner-platforms .container ul li
      min-width: 50%

  @media screen and (min-width: 768px) and (max-width: 1024px)
    .banner-platforms .container ul li
      min-width: 250px

</style>
