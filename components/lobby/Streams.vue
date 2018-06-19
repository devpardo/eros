<template>
  <div class="lobby-people-list clearfix pull-left">
    <template v-if="streams && streams.length">
      <stream v-for="(stream,index) of streams" v-if="index < 8" :key="index" :class="{ 'pull-left': (index % 2 === 0 || index === 0), 'pull-right': index % 2 !== 0 }" :stream="stream" />
    </template>
    <div class="loading" v-else>
      <div v-for="(i,index) of 8" :key="i" class="people animated-background" :class="{ 'pull-left': (index % 2 === 0 || index === 0), 'pull-right': index % 2 !== 0 }">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import Stream from "@/components/lobby/Stream";
  export default {
    name: "Streams",
    components: {
      Stream
    },
    computed: {
      ...mapGetters(["token"]),
      ...mapGetters("mrtv", ["streams"])
    },
    async mounted() {
      await this.$store.dispatch("mrtv/getStreams");
    }
  };
</script>

<style lang="sass" scoped>

  .lobby-people-list
    width: 410px

    

</style>
