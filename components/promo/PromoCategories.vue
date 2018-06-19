<template>
  <div class="list-item">
    <ul class="list-inline promo-list">
      <li v-for="(category, index) in categories" :key="index" :class="[currentCategory === category ? 'active' : '']" @click="onSelect(category)">
        <a>{{ category.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array
    },
    currentCategory: {
      type: Object
    }
  },
  methods: {
    onSelect(category) {
      this.$emit("update:currentCategory", category);
    }
  }
};
</script>

<style lang="sass" scoped>
  .list-item
    width: 100%
    ul.promo-list
      width: auto
      white-space: nowrap
      margin-left: 0
      border-bottom: 1px solid #EEEEEE
    li
      position: relative
      padding: 0

      &:not(:first-child)
        margin-left: 30px

      a
        font-size: 18px
        display: block
        width: 120px
        text-align: center
        color: #666666
        height: 38px

      &.active
        &:before
          content: ''
          position: absolute
          bottom: -1px
          height: 3px
          width: 100%
          background: #006C9D

        a
          color: #006C9D

      &:hover:not(.active)
        &:before
          content: ''
          position: absolute
          bottom: -1px
          height: 1px
          width: 100%
          background: #006C9D

        a
          color: #006C9D
  
  @media (max-width: 414px)
    .list-item
      width: 100%
    .list-item li:not(:first-child)
      margin-left: 0
    .list-inline>li
      width: 25%
    .list-item li a
      width: 100%
    ul.promo-list
      li
        a
          font-size: 13px
</style>
