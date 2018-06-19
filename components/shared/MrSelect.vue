<template>
  <div class="control">
    <no-ssr>
      <vue-select class="form-new input" v-bind="$props" v-on="listeners" :class="classes"></vue-select>
    </no-ssr>
    <span v-show="error">{{errorMessage}}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    options: {
      type: Array
    },
    error: {
      type: Boolean
    },
    errorMessage: {
      type: String
    }
  },
  computed: {
    classes() {
      return { "is-danger": this.error };
    },
    listeners() {
      return {
        ...this.$listeners,
        input: value => this.$emit("input", value)
      };
    }
  }
};
</script>
<style lang="sass">
  @import './assets/sass/_variables'

  .is-danger
    border-color: #ff4646!important
    background-color: #ffe4e4!important
      
  .v-select
    cursor: text
    background: #fff
    border: 2px solid #e6e6e6
    border-radius: 6px
    
    & /deep/ button.clear
      display: none

  .dropdown-toggle
    border: 0

</style>
