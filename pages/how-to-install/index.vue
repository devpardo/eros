<template>
  <section>
    <div class="container">
      <nuxt-child :key="$route.fullPath"></nuxt-child>
    </div>
  </section>
</template>

<script>
export default {
  name: "index",
  created() {
    this.$router.push("/how-to-install/desktop-app");
  }
};
</script>

<style lang="sass" scoped>
  
</style>
