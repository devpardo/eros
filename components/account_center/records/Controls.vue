<template>
  <div class="bottom-controls clearfix">
    <div class="items-selector pull-left clearfix">
      <p class="pull-left">显示</p>
      <select class="form-control pull-left" v-model="itemsToBeDisplayed" @change="changeDisplayedItems">
        <template v-for="option in selectOptions">
          <option :value="option">{{ option }}</option>
        </template>
      </select>
      <p class="pull-left">条记录，目前显示第 <span>{{ paginationOptions === 0 ? '0' : currentPage }}</span> 至 <span>{{ paginationOptions }}</span> 条交易记录，共 <span>{{ totalData }}</span> 条。</p>
    </div>

    <ul class="pagination pagination-sm pull-right clearfix" v-if="paginationOptions > 0">
      <li class="prev">
        <a href="javascript:void(0)" @click="goToPrev()">上页</a>
      </li>
      <template v-for="i in paginationOptions">
        <li :class="{ active: i === currentPage }">
          <a href="javascript:void(0)" @click="changePaginationCurrentPage(i)">{{ i }}</a>
        </li>
      </template>
      <li class="next">
        <a href="javascript:void(0)" @click="goToNext()">下页</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["dataItems"],
  created() {
    this.$bus.$on("setPaginationMeta", (_paginationOptions, _totalData) => {
      this.currentPage = 1;
      this.paginationOptions = _paginationOptions;
      this.totalData = _totalData;
    });
  },
  mounted() {
    this.totalData = this.dataItems.length;
    this.paginationOptions = Math.ceil(this.dataItems.length / 10);
  },
  data() {
    return {
      itemsToBeDisplayed: 10,
      selectOptions: [10, 25, 50, 100],
      currentPage: 1,
      paginationOptions: 0,
      totalData: 0
    };
  },
  methods: {
    changePaginationCurrentPage(_page) {
      this.currentPage = _page;

      this.$bus.$emit("changeMeta", _page, this.itemsToBeDisplayed);
    },
    changeDisplayedItems() {
      this.paginationOptions = Math.ceil(
        this.dataItems.length / this.itemsToBeDisplayed
      );
      this.$bus.$emit("changeMeta", this.currentPage, this.itemsToBeDisplayed);
    },
    goToPrev() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.changePaginationCurrentPage(this.currentPage);
      }
    },
    goToNext() {
      if (
        this.currentPage <
        Math.ceil(this.dataItems.length / this.itemsToBeDisplayed)
      ) {
        this.currentPage += 1;
        this.changePaginationCurrentPage(this.currentPage);
      }
    }
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .bottom-controls
    .items-selector
      select
        outline: none
        width: 100px
        margin: 0 10px
      
      p
        line-height: 34px
        font:
          size: $font-size-small
          weight: 100
        margin: 0
        color: $gray-16

        span
          font-weight: 900
          color: $gray-base


    ul.pagination
      margin: 0

      li
        font:
          size: $font-size-small
          weight: 100


        &:hover a
          background: none

        a
          color: $gray-16
          border: none
          height: 30px
          min-width: 30px
          padding: 0
          text-align: center
          line-height: 30px
          margin-left: 5px

        &.active
          a
            background: $gray-17
            background: linear-gradient($default, $gray-17)
            border: 1px solid $gray-18
              radius: 2px

        &.prev, &.next
          a:focus
            background: none
            outline: none
</style>
