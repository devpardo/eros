<template>
  <modal v-bind="$props" v-on="$listeners">
    <template slot="header">
      <h3 class="title"></h3>
    </template>
    <template>
      <div class="contents main-container" ref="testing">
        <template v-for="(notice, index) in notices">
          <div class="content" :key="index">
            <div class="panel-group">
              <div class="panel panel-info">
                <div class="panel-body-s row">
                    <div class="panel-left col-md-2 col-xs-2 col-xs-2">
                      <p>{{newData(notice.intime).substr(-2,2)}}</p>
                    </div>
                    <div class="panel-right col-md-10 col-sm-10 col-xs-10">
                      <p class="content">{{ notice.notice }}</p>
                      <span class="bottom">
                        <div class="l">{{ newData(notice.intime) }}</div>
                        <div class="r">亿万先生运营团队</div>
                      </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from "~/components/shared/Modal";
import { mapGetters } from "vuex";
export default {
  name: "NoticeModal",
  components: {
    Modal
  },
  props: {
    value: {
      type: Boolean
    },
    notice: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(["notices"])
  },
  methods: {
    newData(num) {
      Date.prototype.format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return fmt;
      };
      return new Date(num).format("yyyy-MM-dd");
    }
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .text-white
    color: #FFF
  h3.title
      /*color: #206B99*/
      /*border-bottom: 1px solid #D9EDF7*/
      /*padding-bottom: 10px*/
      margin:
        top: 0
        bottom: 0

  .main-container
    height: 600px
    overflow-y: auto
    // padding:
    //   left: 5px
    //   right: 0

    .content
      // h4.title
      //   color: #206B99
      //   margin:
      //     top: 0
      //     bottom: 15px

      .panel-group
        margin-bottom: 12px
        .panel.panel-info
          .panel-heading
            padding: 10px
            color: $panel-heading-text-color
            background: $panel-heading-background
            border-color: $panel-heading-border-color
            h6
              font-size: 14px
            h4
              a
                display: block
                padding: 12px 15px

          .panel-body-s
            display: flex
            border-left: 4px solid #279ed8;
            *:last-child
              margin-bottom: 0
            .panel-left
              background: #4e4e4e url("/static/images/ico/dataPng.png") no-repeat 50% 50%
              background-size: 45px 50px
              p
                position: absolute
                left: 40%
                top: 48%
                text-align: center
                color: #ffffff
            .panel-right
              padding: 15px
              p
                letter-spacing: 1px
              .content
                font-size: 14px
                color: #4a4a4a
                font-weight: bold
                margin-bottom: 10px
              .bottom
                font-size: 12px
                color: #9B9B9B
                .l
                  float: left
                .r
                  float: right
          .row
            margin: 0
  @media (max-width: 768px)
    .main-container
      .content h4.title
        margin-top: 15px
        margin-bottom: 15px
      padding-left: 0
      padding-right: 0
  
  @media (min-width: 361px) and (max-width: 375px)
    .main-container
      height: 520px

  @media (min-width: 321px) and (max-width: 360px)
    .main-container
      height: 460px

  @media (max-width: 320px)
    .main-container
      height: 320px
</style>
