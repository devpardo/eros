<template>
  <div class="tab-content">
    <template v-for="(data, index) in dataItems">
      <div :id="data.name" class="tab-pane fade" :class="{ 'in active': index === 0 }" :key="index">
        <div class="col-xs-3 download-lead-box" v-for="(item, index) in data.items" :key="index">
          <img :src="`${MEDIA_SERVER}/web/download/${item.image}`" class="item-image">
          <h4 class="name">{{ item.name }}</h4>
          <a :href="item.downloadLink" class="btn-download">
            <i class="fa fa-download"></i>下载
          </a>
          <img :src="`${MEDIA_SERVER}/web/download/qr/${item.qr}`" class="qr-code">
          <p v-if="!item.fileVersion" class="file-details">大小 {{ item.fileSize }}
            <a :href="item.instLink" class="howtoinstall">如何安装?</a>
          </p>
          <p v-else class="file-details">文件版本 {{ item.fileVersion }}
            <a :href="item.instLink" class="howtoinstall">如何安装?</a>
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  inject: ["MEDIA_SERVER"],
  props: ["dataItems"]
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .tab-content
    .tab-pane
      .download-lead-box
        padding: 60px 0
        margin-top: 20px
        width: 24%
        height: 320px
        position: relative
        border: 1px solid #e3e3e3
        text-align: center

        &:not(:nth-child(4n))
          margin-right: 1.33333333333%

        h4.name
          margin:
            top: 0
            bottom: 1em
          color: #3D98BC

        img.item-image
          height: 77px
          margin-bottom: 1em

        a.btn-download
          margin-bottom: 1em
          padding: 10px 55px
          background: #006C9D
          border-radius: $radius-5x
          color: white
          display: inline-block
          -webkit-transition: 0.1s all linear
          -moz-transition: 0.1s all linear
          -ms-transition: 0.1s all linear
          -o-transition: 0.1s all linear
          transition: 0.1s all linear

          &:hover
            padding: 10px 60px

            + img.qr-code
              display: initial
              opacity: 1

        img.qr-code
          position: absolute
          top: 10px
          left: 50%
          margin-left: -85px
          display: none
          opacity: 0
          width: 170px
          box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5)
          -webkit-transition: 0.3s opacity linear
          -moz-transition: 0.3s opacity linear
          -ms-transition: 0.3s opacity linear
          -o-transition: 0.3s opacity linear
          transition: 0.3s opacity linear
        
        p.file-details
          font-size: 12px
          color: #777777

          a
            color: #006C9D
            font-weight: 900
            margin-left: 10px

  @media (max-width: 768px) and (min-width: 416px)
    .tab-content .tab-pane .download-lead-box
      width: 48%
  
  @media (max-width: 414px)
    .tab-content .tab-pane .download-lead-box
      width: 100%

</style>
