<template>
  <div class="form-group form-captcha">
    <img :src="captcha" alt="" ref="captcha" @onload="load">
    <i class=" captcha-refresher" @click="change">
      看不到图片？换一个
    </i>
  </div>
</template>

<script>
  export default {
    name: "Captcha",
    data() {
      return {
        blob: null,
      };
    },
    computed: {
      captcha() {
        if (!process.browser || !this.blob) return;
        return window.URL.createObjectURL(this.blob);
      }
    },
    methods: {
      async load() {
        if (!process.browser || !this.captcha) return;
        window.URL.revokeObjectURL(this.captcha);
      },
      async change() {
        if (!process.browser && !this.loading) return;
        this.blob = await this.$store.dispatch("getServerCaptcha");
      }
    },
    async mounted() {
      await this.change();
    }
  };
</script>

