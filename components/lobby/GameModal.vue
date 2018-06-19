<template>
  <modal :value="value" @input="input">
    <h4 slot="header" class="modal-title text-center">
      <i class="fa fa-info-circle"></i>
      选择游戏房间
    </h4>
    <ul class="game-list">
      <li v-for="(room,index) of game.rooms" :key="index">
        <a class="xx-game-link" :href="href(room)" target="_blank">{{ room.roomname }}</a>
      </li>
    </ul>
    <div slot="footer" class="text-center">
      <a class="btn btn-default" @click="close">确定</a>
    </div>
  </modal>
</template>

<script>
  import Modal from "~/components/shared/Modal";
  import { mapGetters } from "vuex";
  export default {
    name: "GameModal",
    inject: ["API_MR"],
    components: {
      Modal
    },
    props: {
      value: {
        type: Boolean
      },
      game: {
        type: Object
      }
    },
    computed: {
      ...mapGetters(["token"])
    },
    methods: {
      close() {
        this.$emit("input", false);
      },
      input(value) {
        this.$emit("input", value);
      },
      href(room) {
        return `${this.API_MR}/api/mrtv/redirect?type=game&game=${
          this.game.category
        }&id=${room.roomid}&token=${this.token}`;
      }
    }
  };
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .game-list
    border: 1px solid #DDDDDD
      radius: $radius-min-4

    li
      &:not(:first-child)
        border-top: 1px solid #DDDDDD
      
      a
        display: inline-block
        line-height: 40px
        width: 100%
        text-align: center
        transition: all 0.3s linear

        &:hover
          background: #e8e8e8
</style>

