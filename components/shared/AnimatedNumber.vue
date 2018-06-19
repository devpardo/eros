<template>
  <!-- span
    slot(:number="number") {{number}} -->
  <span>
    <slot :number="number">{{number}}</slot>
  </span>
</template>

<script>
  import animatedNumber from "~/mixins/animatedNumber";
  export default {
    name: "AnimatedNumber",
    mixins: [animatedNumber]
  };
</script>
