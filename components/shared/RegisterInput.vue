<template>
  <div class="reg-input col-xs-12 col-md-8"><input class="form-new" :value="value" :name="$vnode.key" :min="min" :max="max" :placeholder="placeholder" autocomplete="off" :type="type" @input="onInput" />
    <div class="form-error">
      <p class="form-error-message">
        <span>Please enter a valid e-mail address.</span>
      </p>
    </div>
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
    placeholder: {
      type: String,
      default: "enter a text"
    },
    type: {
      type: String,
      default: "text"
    },
    min: {
      type: [Number, String],
      default: ""
    },
    max: {
      type: [Number, String],
      default: ""
    },
    name: {
      type: String
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

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .mr-error
    border-color: #ff4646!important
    background-color: #ffe4e4
  .form-error
    display: none
    &.show-error
      display: block
      .form-error-message
        color: #ff4646
        text-align: left
        font-size: 12px
        text-indent: 3px
    
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

    &::placeholder
      color: #A8A8A8
  
    .reg-input
      display: table-cell
      box-sizing: border-box

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
