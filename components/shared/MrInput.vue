<template>
  <div class="control">
    <input class="form-new input" v-bind="$attrs" :value="value" v-on="listeners" :class="classes" />
    <span v-show="error">{{errorMessage}}</span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String
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
        input: event => this.$emit("input", event.target.value)
      };
    }
  }
};
</script>

<style lang="sass" scoped>

  .form-new
    display: block
    width: 100%
    min-height: 40px
    margin: 0
    padding: 6px 14px
    border: 2px solid #e6e6e6
    border-radius: 6px
    font-size: 14px
    box-shadow: none

    &:focus
      border-color: #00d1b2
      background: #ffffff

  input.is-danger
    border-color: #ff4646!important
    background-color: #ffe4e4!important

  span
    color: #ff4646
    text-align: left
    font-size: 12px
    text-indent: 3px

</style>
