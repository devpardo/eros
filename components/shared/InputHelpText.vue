<template>
  <div class="form-group">
    <label :for="$vnode.key">
      <span class="text-info help-text" :class="showHelpText">{{help}}</span>
      <span class="text-danger" v-if="required">*</span>
      <span style="color: black !important;">{{label}}</span>
    </label>
    <input class="form-control" :value="value" :name="$vnode.key" autocomplete="off" :type="type" @input="onInput" @focus="showHelp = true" @blur="showHelp = false" />
  </div>
</template>

<script>
export default {
  props: {
    help: {
      type: String
    },
    label: {
      type: String
    },
    value: {
      type: null
    },
    required: {
      type: Boolean
    },
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      showHelp: false
    };
  },
  computed: {
    showHelpText() {
      return this.showHelp ? "" : "hide-text";
    }
  },
  methods: {
    onInput(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style lang="sass">
  @import './assets/sass/_variables'
  .help-text
    transition: transform .3s ease-in-out
    transform-origin: bottom right
    position: absolute
    top: -18px
    right: 0
    background: $register-helptext-background
    color: white
    font-size: 0.8em
    padding: 10px
    border: 1px solid $register-helptext-border
      radius: $radius-base

    &:before
      content: ''
      position: absolute
      bottom: -5px
      right: 10px
      width: 0
      height: 0
      border-left: 6px solid transparent
      border-right: 6px solid transparent
      border-top: 5px solid $register-helptext-background

    &.hide-text
      transform: scale(0)

</style>
