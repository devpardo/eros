<template>
  <transition>
    <section class="v-modal-container" :key="promo ? promo.title : 'promo'">
      <div class="modal display-block">
        <div class="modal-dialog"  @click.self="close">
          <div class="modal-content">
            <div class="img-top" :style="[styles]">
              <a href="javascript:void(0)" data-dismiss="modal" class="close-btn" @click.self="close">
                <span></span>
                <span></span>
              </a>
            </div>
            <div class="content-details">
              <div class="details">
                <h4 class="title text-center">{{ promo.title }}</h4>
                <div class="other-details" v-html="promo.details"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  inject: ["MEDIA_SERVER"],
  props: {
    promo: {
      type: Object
    }
  },
  computed: {
    styles() {
      return { backgroundImage: `url(${this.promo.image})` };
    }
  },
  methods: {
    close() {
      this.$emit("update:promo", null);
    }
  }
};
</script>

<style lang="sass" scoped>

  .close-btn
    margin-bottom: 0
    margin-right: 0
    float: right
    width: 29px
    height: 29px
    margin: 10px
    cursor: pointer
    span
      position: absolute
      background: #FFFFFF
      width: 28px
      height: 1px
      margin: 15px 0 0
      -webkit-transition: .2s ease
      transition: .2s ease
      &:first-child
        -webkit-transform: rotate(45deg)
        transform: rotate(45deg)
      &:nth-child(2)
        -webkit-transform: rotate(-45deg)
        transform: rotate(-45deg)
  .close-btn:hover > span
    -webkit-transform: rotate(-180deg)
    transform: rotate(-180deg)


  .promo-modal-enter-active
    transition: all .5s
  .promo-modal-enter
    opacity: 0;

  .promo-modal-leave-active
    opacity: 0;

  .promo-modal-enter .modal-container,
  .promo-modal-leave-active .modal-container
    transform: scale(1.1);

  .v-modal-container
    z-index: 10000

    .modal
      .modal-dialog
        width: 840px
        height: 100%
        margin: 0 auto
        padding: 50px 0

        .modal-content
          height: 100%
          box-shadow: 0 3px 9px rgba(0,0,0,.15)
          overflow: hidden

          .img-top
            height: 240px
            background:
              size: cover
              repeat: no-repeat
            position: relative

            a
              position: absolute
              color: white
              opacity: 1
              top: 6px
              right: 10px

          .content-details
            height: calc(100% - 180px)
            padding:
              top: 30px
              right: 40px
              bottom: 75px
              left: 40px
            overflow-y: auto

            .details
              h4.title
                font-size: 24px
                margin:
                  top: 0
                  bottom: 30px

              .other-details
                table tr th, table tr td
                  border: 1px solid black

  .display-block
    display: block !important
    background: hsla(0, 0%, 0%, 0.5)

  @media (max-width: 768px)
    .modal-dialog
      width: 90% !important
      height: 100% !important
      margin: 0 auto !important
      padding: 50px 0 !important
    .v-modal-container .modal .modal-dialog .modal-content .img-top
      background-position: center
      position: relative

  @media (max-width: 414px)
    .modal-dialog
      width: 100%!important
      height: 100%!important
      margin: 0 auto!important
      padding: 50px 15px 70px!important

    .content-details
      padding: 40px 10px!important
      table
        width: 100%

    .v-modal-container .modal .modal-dialog .modal-content .img-top
      height: 100px
      background-position: center
      position: relative


</style>
