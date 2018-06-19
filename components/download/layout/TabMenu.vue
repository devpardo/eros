<template>
  <ul class="nav nav-pills nav-justified">
    <template v-for="(item, index) in dataItems">
      <li :class="{ active: index === 0 }" :key="index">
        <a :href="`#${item.name}`" data-toggle="tab">
          <i :class="item.icon"></i> {{ item.label }}
        </a>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: ["dataItems"]
};
</script>

<style lang="sass" scoped>

  ul.nav.nav-pills.nav-justified
    li
      border-left: none
      
      &.active
        a
          background: #006C9D
      
      &:hover:not(.active) a
        background: #e7f4ff

      a
        padding: 15px
        border: 1px solid #006C9D
          left: none
          radius: 0

      &:first-child
        a
          border-left: 1px solid #006C9D
        
  @media (max-width: 414px)
    ul.nav.nav-pills.nav-justified li a
      border-left: 1px solid hsl(199, 100%, 31%) !important
    .nav-pills>li+li
      margin-left: 0

</style>
