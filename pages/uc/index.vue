<template>
  
</template>

<script>
export default {
  middleware: "notAuthorized",
  beforeCreate() {
    this.$router.push("/uc/account");
  }
};
</script>

