<template>
  <div class="scroll" v-if="filters">
    <div class="tab-menu">
      <p>请选择筛选类型</p>
      <ul class="tab-container list-inline">
        <li v-for="(filter, index) of filters" :key="index" :class="{ active: isFilterActive(filter) }">
          <a href="javascript:void(0)" @click="changeFilter(filter)">{{ filter.cnLabel }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    page: {
      type: Number
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      defaultFilter: {
        type: 1,
        page: this.page,
        startDate: "2018-01-01",
        endDate: "2018-10-10"
      },
      currentFilter: null
    };
  },
  computed: {
    ...mapGetters("transaction", ["filters"])
  },
  watch: {
    async page(val) {
      if (!this.currentFilter) return;
      await this.changeFilter(this.currentFilter);
    }
  },
  methods: {
    ...mapActions("transaction", ["getTransactions"]),
    isFilterActive(filter) {
      return this.currentFilter && filter.type === this.currentFilter.type;
    },
    async changeFilter(filter) {
      this.currentFilter = filter;
      this.defaultFilter.type = filter.type;
      this.defaultFilter.page = this.page;
      this.$emit("update:loading", true);
      await this.getTransactions(this.defaultFilter);
      this.$emit("update:loading", false);
      this.$emit("change", this.currentFilter.enLabel);
    }
  },
  async mounted() {
    await this.$store.dispatch(
      "transaction/getTransactions",
      this.defaultFilter
    );
    const [filter] = this.filters;
    this.changeFilter(filter);
  }
};
</script>

<style lang="sass">
  @import './assets/sass/_variables'
  .tab-menu
    .tab-container
      margin-left: 0

      li
        position: relative
        padding: 0

        &:not(:first-child)
          margin-left: 10px

        a
          font:
            size: $font-size-small
            weight: 100
          color: $gray-16
          width: 100px
          height: 40px
          display: inline-block
          text-align: center
          line-height: 40px
          border: 1px solid $gray-18

        &.active
          &:before
            content: ''
            position: absolute
            top: 0
            right: 0
            border:
              width: 5px
              style: solid
              color: $light-blue-4 $light-blue-4 transparent transparent

          a
            background: $gray-13
            border: 1px solid $light-blue-4

  @media (max-width: 414px)
    .scroll
      // overflow-x: scroll
      // overflow-y: hidden
      // height: 120px
      // white-space:nowrap
      .tab-menu .tab-container
        margin-left: 0
        width: 100%
    .tab-menu .tab-container li:not(:first-child)
      margin-left: 0

    .tab-menu .tab-container li
      position: relative
      padding: 2px
      width: 50%
    
    .tab-menu .tab-container li a
      width: 100%

    .tab-menu .tab-container li.active:before
      top: 2px
      right: 2px
</style>
