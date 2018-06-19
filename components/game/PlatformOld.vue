<template>
  <div>
    <div class="platforms-category">
      <div class="container">
        <div class="tab-content">
          <ul class="list-inline">
            <li v-for="(type, index) of types" :key="index" :class="{ 'active in': currentType && type.id === currentType.id }" @click="loadGames(type)">
              <a class="text-center">{{type.name}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <platform-games :games="games" :loading="loading"></platform-games>
  </div>
  <!-- spinner(v-else) -->
</template>

<script>
  import { mapGetters } from "vuex";
  import PlatformGames from "@/components/game/PlatformGames";
  import Spinner from "@/components/shared/Spinner";
  export default {
    name: "Platform",
    components: {
      PlatformGames,
      Spinner
    },
    props: {
      platform: {
        type: Object
      }
    },
    data() {
      return {
        currentType: null
      };
    },
    async mounted() {
      const [type] = this.types;
      await this.loadGames(type);
    },
    computed: {
      ...mapGetters("game", ["games", "loading"]),
      types() {
        return this.platform ? this.platform.type : [];
      }
    },
    methods: {
      async loadGames(type) {
        await this.$store.dispatch("game/getGames", {
          platform: this.platform.platform,
          type: type.id
        });
        this.currentType = type;
      }
    }
  };
</script>


<style lang="sass" scoped>
  @import './assets/sass/_variables' 
  .platforms-category
    background: $gray-7

    .container .tab-content
      ul 
        margin: 0

        li
          padding: 0

          &.active a
            background: $yellow-14

          a
            display: inline-block
            color: white
            line-height: 40px
            padding:
              left: 20px
              right: 20px

  @media (max-width: 414px)
    .platforms-category .container .tab-content ul li
      &
        padding: 0
        width: 50%
        font-size: 14px
        text-align: center
      &.active a
        background: $yellow-14
        width: 100%
      a
        line-height: 40px
        padding-left: 0
        padding-right: 0

  @media (max-width: 768px)
    .platforms-category .container .tab-content ul li a
      padding-left: 19px
      padding-right: 19px
</style>
