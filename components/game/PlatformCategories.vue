<template>
  <div class="platform-category">
    <div class="container mobile-container">
      <div id="platform-select">
        <vue-select :value="defaultCategory" :options="optionPlatformCategories" @input="onPlatformTypeSelectMobile" class="visible-xs"></vue-select>
      </div>
      <ul class="platform-category-list pull-left hidden-xs">
        <li class="platform-type" v-for="(type, index) of platform.type" :key="index" :class="[isCurrentType(type) ? 'active' : '']">
          <a @click="onPlatformTypeSelect(type)">{{type.name}}</a>
        </li>
      </ul>
      <div class="pull-right game-search form-group ">
          <i class="fa fa-search"></i>
          <input class="form-control game-search-input" :value="search" placeholder="搜索游戏" @input="onSearch">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlatformCategories",
  data() {
    return {
      defaultCategory: {
        label: `热门游戏`,
        value: 1
      }
    };
  },
  props: {
    platform: {
      type: Object
    },
    search: {
      type: String
    }
  },
  methods: {
    onPlatformTypeSelect(type) {
      this.$router.push({
        name: "game",
        query: { platform: this.platform.platform, type: type.id }
      });
    },
    onPlatformTypeSelectMobile(type) {
      if (!type) {
        type = {
          value: 1
        };
      }
      this.$router.push({
        name: "game",
        query: { platform: this.platform.platform, type: type.value }
      });
    },
    isCurrentType(type) {
      const { type: currentType } = this.$route.query;
      return currentType !== undefined && currentType === type.id;
    },
    onSearch(event) {
      this.$emit("update:search", event.target.value);
    }
  },
  computed: {
    optionPlatformCategories() {
      return this.platform.type.map(platform => ({
        label: platform.name,
        value: platform.id.toString()
      }));
    }
  }
};
</script>

<style lang="sass" scoped>
  // .platform-select
  //   margin-bottom: 15px
  .v-select, .v-select *
    text-align: left!important
    & /deep/ button.clear
      display: none !important

  .game-search
    border: 1px solid rgba(#00aeff, .2) !important
    padding: 0 !important
    margin-bottom: 0 !important
    margin-top: -10px !important
    width: 240px
    .fa
      float: left
      position: absolute
      padding: 10px
      color: rgba(#00aeff, .5)
    &-input
      border: 0
      padding: 0 10px
      padding-left: 30px
      background: rgba(#000, .5)
      color: #fff
      &::placeholder
        font-size: 14px
        font-weight: lighter
        color: rgba(#fff, .5)

  .platform-type
    position: relative
    display: inline-block
    color: rgba(#fff, .7)
    transition: color .2s
    &:hover
      color: rgba(#fff, 1) !important
      text-shadow: 0 0 15px #00aeff, 0 0 30px rgba(#00aeff, .5)
    &.active
      color: rgba(#fff, 1) !important
      text-shadow: 0 0 15px #00aeff, 0 0 30px rgba(#00aeff, .5)

  .platform-category
    position: relative
    padding-top: 20px
    .container
      padding: 0
      #platform-select
        .dropdown
          margin-bottom: 15px
          background: #fff

    .platform-category-list
      list-style: none
      li
        display: inline
        padding: 0 15px
        border-left: solid 1px rgba(#fff, .2)
        &:first-child
          border-left: none
          padding-left: 0
        a
          text-decoration: none
          color: inherit

  @media (max-width: 320px)
    .platform-category .platform-category-list li
      padding: 0 14px
  @media (max-width: 414px)
    .platform-category .platform-category-list li:last-child
      clear: both
      margin-top: 10px !important
    .game-search
      width: 49%
    .dropdown
      width: 49%
      border: 1px solid rgba(0,174,255,.2) !important
      background: rgba(#000, .5) !important
      padding: 0 !important
      margin-bottom: 0 !important
      margin-top: -10px !important
      float: left

</style>
