<template>
    <transition name="modal">
      <div class="modal-mask-promo">
        <div @click="close" class="modal-overlay"></div>
        <div class="modal-wrapper">
          <div class="modal-content custom-modal-content">
            <div class="modal-body">
              <img src="~/assets/images/treasurebox.png">
              <h2>元现金</h2>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  name: "PromoModalClaim",
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .modal-overlay 
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: rgba(0, 0, 0, .5)
    z-index: 9

  .modal-mask-promo
    position: fixed
    z-index: 2000
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5)
    display: table
    transition: opacity .3s ease
    .modal-wrapper
      z-index: 10
      .modal-content
        border: 1px solid transparent
        background: transparent
        box-shadow: none
      .custom-modal-content
        width: 800px
        .modal-body
          color: $default
          background-color: transparent
  </style>
