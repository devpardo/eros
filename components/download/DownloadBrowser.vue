<template>
  <div class="browsers-container">
    <div class="container">
      <h4 class="title">{{ browser.title }}</h4>

      <div class="browsers row">

        <div v-for="(browser, index) of browser.browsers" :key="index" class="browser" :class="[index % 2 === 0 || index === 0 ? 'pull-left' : 'pull-right']">
          <div class="column first-column">
            <img :src="`${MEDIA_SERVER}/web/download/${browser.image}`">
            <a :href="!browser.button.link ? 'javascript:void(0)' : browser.button.link" class="btn btn-primary">{{ browser.button.label }}</a>
            <p>{{ browser.requirements }}</p>
          </div>

          <div v-for="(qr, index) in browser.qr" :key="index" class="column">
            <img :src="`${MEDIA_SERVER}/web/download/${qr.image}`" class="qr">
            <p class="version">{{ qr.name }}</p>
            <p class="browser-name">{{ browser.name }}</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["MEDIA_SERVER"],
  props: ["browser"]
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  div.browsers-container
    background: #F6F6F6
    padding: 38px 0 13px

    div.container
      h4.title
        margin:
          top: 0
          bottom: 40px
        // padding-bottom: 10px
        // border-bottom: 1px solid #e3e3e3
      
      .browsers
        padding:
          left: 15px
          right: 15px

        .browser
          min-width: 400px
          margin-bottom: 25px

          .column
            float: left

            &:not(.first-column)
              margin-left: 20px
              width: 104px

            &.first-column
              width: 210px

              img
                margin:
                  top: 11px
                  bottom: 18px

              a.btn
                background: #006C9D
                border: none
                  radius: $radius-10x
                margin-bottom: 10px
                min-width: 100px
              
              p
                color: #999999
                font-size: 12px

            img.qr
              margin-bottom: 3px
              width: 100%

            p
              &.version, &.browser-name
                margin-bottom: 0
                color: #999999
                font-size: 12px
                text-align: center

  @media (max-width: 780px) and (min-width: 417px) 
    div.browsers-container div.container .browsers .browser
      min-width: 100%
      padding-left: 123px
      margin-bottom: 25px

  @media (max-width: 414px)
    .pull-right, .pull-left
      float: none !important
    div.browsers-container div.container .browsers .browser
      &
        width: 100% !important
        display: block
        margin-bottom: 25px
        padding: 0px 50px
      .column.first-column
        &
          width: 100%
        a.btn
          background: #006c9d
          border: none
          border-radius: $radius-10x
          margin: 7px 10px
          margin-bottom: 10px
          min-width: 100px
      .column.first-column
        &
          width: 100%
          padding: 0 37px
        img
          margin-top: 11px
          margin-bottom: 18px
          margin-left: 11px
        a.btn
          background: #006c9d
          border: none
          border-radius: $radius-10x
          margin: 7px 40px
          margin-bottom: 10px
          min-width: 100px
  @media (max-width: 375px)
    div.browsers-container div.container .browsers .browser
      &
        padding: 0px 30px
  @media (max-width: 320px)
    div.browsers-container div.container .browsers .browser
      &
        padding: 0px 10px
</style>
