<template>
  <main class="help">
    <div class="help-main">
      <div class="container">
        <div class="row">
          <div class="help-content">

            <div>
              <div class="help-head-title">
                <h3>
                  <span class="fa fa-support"></span> 客户支持 </h3>
              </div>
            </div>

            <div class="content-container">

              <cooperation-menu />

              <div class="contents col-md-9 col-sm-9 col-xs-12 main-container pull-right">
                <nuxt-child :key="$route.fullPath" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import CooperationMenu from "~/components/shared/CooperationTabMenu";
export default {
  name: "PageCooperation",
  components: {
    CooperationMenu
  }
};
</script>


<style lang="sass">
  @import './assets/sass/_variables'
  .div-boxs
    overflow: hidden
    position: relative
    min-height: 100%
  .div-height
    height: 165px
    width: 100%
  section.cooperation-container.container
    padding: 30px 15px
    position: relative

    h3.title
      color: #206B99
      // border-bottom: 1px solid #D9EDF7
      padding-bottom: 10px
      margin:
        top: 0
        bottom: 20px

  .panel-info
    border-color: hsl(0, 0%, 100%)
  .help
    margin-top: 95px
    .help-main
      background: #f2f2f2
      .container
        padding: 0
        .row
          margin: 0
          .help-content
            float: left
            width: 100%
            min-height: 600px
            .help-head-title
              color: #4a4a4a
            .content-container
              background: #FFFFFF
              border-radius: 8px
              padding: 30px 20px
              height: 100%
              display: inline-block
              width: 100%

  h4
    margin-top: 0
    margin-bottom: 0

  .tab-menu
    padding-left: 0
    float: left

    &.fixed
      position: fixed

    &.absolute
      position: absolute

    ul
      // border: 1px solid $cooperation-tm-base-color
        radius: $radius-min-4
      overflow: hidden

      li
        margin-top: 0

        &:not(:first-child)
          border-top: 1px solid $cooperation-tm-base-color

        a
          font:
            size: 16px
            weight: 300
          color: $cooperation-tm-text-color
          border-radius: 0

          &:hover:not(.active)
            background: $cooperation-tm-hover-background-color

        &.active
          a, a:focus
            background: hsl(0, 0%, 100%)
            font-weight: 700
            // background: $cooperation-tm-base-color !important
            color: $cooperation-tm-text-color !important


  .nav>li>a
    position: relative
    display: block
    padding: 15px
    border: 1px

  .panel-info
    border-color: #ffffff
    .panel-heading
      background: #ffffff
      color: hsl(200, 49%, 38%)
      border: 1px solid hsl(200, 42%, 75%)
      padding: 8px 15px
      border-top-left-radius: 0
      border-top-right-radius: 0
      h4
        font-size: 14px
        font-weight: bold

  .panel-info>.panel-heading+.panel-collapse>.panel-body
    border-top-color: #ffffff
    font-size: 12px
    img
      width: 90%

  .panel
    margin-bottom: 10px
    background-color: hsl(0, 0%, 100%)
    border-radius: 4px
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0)

  .help-title
    color: hsl(203, 65%, 36%)
    margin-top: 0
    margin-bottom: 15px
    h4
      font-size: 14px
      font-weight: bold
  .panel-group
    margin-bottom: 10px

  .help-head-title
    color: hsl(203, 65%, 36%)
    padding-bottom: 10px
    margin-top: 0

  h4.title
    color: hsl(203, 65%, 36%)
    margin-bottom: 20px

  @media (max-width: 768px)
    .help
      margin-top: 95px
      img
        width: 100%
      .help-head-title
        padding-left: 10px

  @media (max-width: 414px)
    .help
      margin-top: 0px
    .tab-menu
      padding-left: 15px
</style>
