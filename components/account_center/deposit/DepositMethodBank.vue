<template>
  <div class="bank" href="javascript:void(0)" :class="classes">
    <!-- <img class="image" :src="image" @error="onErrorImage"> -->
    <span class="bank-icon" :class="classes">
      <img :src="bankImage">
    </span>
    <div class="name">{{bank.bankname}}</div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "DepositMethodBank",
    inject: ["MEDIA_SERVER"],
    props: {
      bank: {
        type: Object
      }
    },
    data() {
      return {
        imageErrored: false
      };
    },
    computed: {
      ...mapGetters("channel", ["currentBank"]),
      active() {
        return this.currentBank && this.currentBank.id === this.bank.id;
      },
      classes() {
        return {
          active: this.active
        };
      },
      bankImage() {
        if (!this.bank.imgClass) {
          return `${this.MEDIA_SERVER}/web/bank-icons/NULL.png`
        } else {
          return `${this.MEDIA_SERVER}/web/bank-icons/${ this.bank.imgClass }.png`
        }
      }
    },
    methods: {
      onErrorImage(event) {
        this.imageErrored = true;
      }
    }
  };
</script>

<style lang="sass" scoped>
  .bank
    position: relative
    float: left
    width: 100%
    height: 40px
    margin:
      right: 10px
      bottom: 10px
    border: 1px solid #D7D7D7
    padding: 5px
    cursor: pointer

    &.active
      background: #F5F5F5
      border: 1px solid #4A90E2

      &:before
        content: ''
        position: absolute
        border:
          width: 4px
          style: solid
          color: #4a90e2 #4a90e2 transparent transparent
          top: 4px solid #4a90e2
        top: 0
        right: 0

    .bank-icon
      img
        display: inline-block
        height: 24px
        width: 24px
        margin-right: 10px
    .name
      display: inline-block
</style>
