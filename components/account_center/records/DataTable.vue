<template>
  <div v-if="items">
    <div class="search-container">
      <div class="search-box">
        <input type="text" placeholder="输入关键字搜索" v-model="search">
        <i class="fa fa-search"></i>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th v-for="(column,index) of columns" :key="index">{{column}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td :colspan="columns.length" class="text-center" style="width:100px">
              Loading Page: {{pagination.page + 1}}
            </td>
          </tr>
          <template v-else-if="results.length">
            <tr v-for="(item,index) of results" :key="index">
              <slot name="item" :item="item" :index="index"></slot>
            </tr>
          </template>
          <tr v-else>
            <td class="no-data" colspan="4">
              <slot name="no-results">无交易记录</slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bottom-controls clearfix">
      <div class="items-selector pull-left clearfix">
        <div class="pull-left">
          <span>显示</span>
          <select v-if="hasPaginationSize" class="form-control" v-model="pagination.size">
            <option v-for="(option,index) of pagination.options" :key="index" :value="option">{{option}}</option>
          </select>
          <span>条记录，目前显示第
            <span>{{ pagination.page + 1 }} 至</span>
            <span>{{ chunks.length }} 条交易记录，共</span>
            <span>{{ total }} 条。</span>
          </span>
        </div>
      </div>
      <div class="clearfix text-center">
        <ul class="pagination pagination-xs pagination-right " v-if="pages > 1">
          <li class="prev" v-if="!isFirstPage">
            <a href="javascript:void(0)" @click="prevPage"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>
          </li>
          <li v-for="page of pages" :key="page">
            <a :class="[page === pagination.page + 1 ? 'active' : '']" href="javascript:void(0)" @click="setPage(page)">{{page}}</a>
          </li>
          <li class="next" v-if="!isLastPage && pages > 1">
            <a href="javascript:void(0)" @click="nextPage"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { chunk } from "@/utils";
export default {
  name: "DataTable",
  props: {
    items: {
      type: Array
    },
    columns: {
      type: Array
    },
    properties: {
      type: Array
    },
    tabSearch: {
      type: String
    },
    server: {
      type: Object
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      search: "",
      hasPaginationSize: false,
      pagination: {
        page: 0,
        size: 20,
        options: [10, 25, 50, 100]
      }
    };
  },
  computed: {
    total() {
      return this.server ? this.server.total : this.items.length;
    },
    pages() {
      return this.server ? this.server.pages : this.chunks.length;
    },
    chunks() {
      if (this.server) return this.items;
      if (this.items.length < this.pagination.size) {
        this.pagination.page = 0;
        return [this.items];
      }
      const chunks = chunk(this.items, this.pagination.size);
      this.pagination.page =
        this.pagination.page > chunks.length
          ? chunks.length
          : this.pagination.page;

      return chunks;
    },
    chunk() {
      if (this.server) return this.items;
      return this.chunks[this.pagination.page];
    },
    results() {
      return this.chunk
        ? this.chunk.filter(item =>
            this.properties.some(
              field =>
                !!item[field] &&
                item[field]
                  .toString()
                  .toLowerCase()
                  .includes(this.search.toLowerCase())
            )
          )
        : [];
    },
    isFirstPage() {
      return this.pagination.page === 0;
    },
    isLastPage() {
      return this.pagination.page == this.pages - 1;
    }
  },
  methods: {
    prevPage() {
      this.pagination.page--;
      this.$emit("page", this.pagination.page);
    },
    nextPage() {
      this.pagination.page++;
      this.$emit("page", this.pagination.page);
    },
    setPage(page) {
      this.pagination.page = page - 1;
      this.$emit("page", this.pagination.page);
    }
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .pagination-right
    float: right

  .pagination
    a
      transition: border-bottom .5s ease-in-out
      padding: 9px 13px
      &.active
        background: $blue-3
        color: #fff
  .search-container
    margin:
      top: 12px
      bottom: 20px
    padding-bottom: 20px
    border-bottom: 1px solid $gray-18
  
    .search-box
      width: 400px
      height: 40px
      position: relative
      border: 1px solid $gray-18
        radius: 4px
      overflow: hidden

      input
        height: 100%
        width: 100%
        border: none
        outline: none
        padding: 0 35px 0 10px
        font:
          size: $font-size-small
          weight: 100

      ::placeholder
        color: $gray-18
      // ::-webkit-input-placeholder
      //   color: $gray-18

      // ::-moz-placeholder
      //   color: $gray-18

      // :-ms-input-placeholder
      //   color: $gray-18

      // :-moz-placeholder
      //   color: $gray-18

      i.fa
        position: absolute
        top: 11px
        right: 12px
        color: $gray-14
  .table-responsive
    table.table.table-striped
      border: 1px solid $gray-18
      thead
        background: $gray-19
        height: 55px
        tr
          th
            color: black
            font-weight: 100

            &:nth-child(1)
              width: 25%
              
            &:nth-child(2)
              width: 25%

            &:nth-child(3), &:nth-child(4)
              width: 25%

      tbody tr td
        color: $gray-16
        font:
          size: $font-size-small
          weight: 100

        &.no-data
          font-size: $font-size-small
          text-align: center

      tr th, tr td
        padding: 12px 8px

  .pull-left
    display: inline
    font-size: $font-size-small
    white-space: nowrap

    .form-control
      display: inline
      width: 16%
      margin: 0 15px
      border-radius: 1px
    span
      display: inline
    i.fa.fa-caret-down
      position: absolute
      left: 105px
      top: 730px

  .pagination
    display: inline-block
    padding-left: 0
    margin: 0 0 20px 0
    border-radius: 4px

  @media (max-width: 414px)
    .search-container
      .search-box
        width:  100%
    .pagination-xs
      float: none
      margin-top: 15px


  
</style>
