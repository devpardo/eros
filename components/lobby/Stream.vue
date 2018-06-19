<template>
  <a :href="link" target="_blank" class="people">
    <img :src="stream.pic" alt="" class="img-responsive" :style="styleOnline">
    <span class="live" v-if="isOnline">正在直播</span>

    <div class="details">
      <div class="table-holder">
        <p class="name">{{ stream.artistname }}</p>

        <div class="schedule">
          <p class="sched">我会在以下的时段出现哦</p>
          <ul class="list-unstyled">
            <li v-for="(schedule,index) of stream.schedule" :key="index">
              <span class="date" v-if="schedule.weekday == 1">{{weekdays[index]}}</span>
              <span class="time">{{ (schedule.onlinetime).replace(/\s+/g, '') }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "Stream",
    inject: ["API_MR"],
    props: {
      stream: {
        type: Object
      }
    },
    data() {
      return {
        weekdays: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      };
    },
    computed: {
      ...mapGetters(["token"]),
      link() {
        return `${this.API_MR}/api/mrtv/redirect?type=room&id=${
          this.stream.artistid
        }&token=${this.token}`;
      },
      isOnline() {
        return !!+this.stream.caststatus;
      },
      styleOnline() {
        return { opacity: this.isOnline ? 1 : 0.6 };
      }
    }
  };
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .people
    width: 200px
    height: 148px
    margin-bottom: 9.7px
    position: relative
    overflow: hidden
    cursor: pointer

    &:hover
      .details
        max-height: 148px
        background: rgba(0,0,0,0.6)

        p.name
          line-height: 32px

    &.pull-left
      margin-right: 10px
    
    .details, .live
      position: absolute

    .live
      top: 5px
      right: 5px
      font:
        size: 10px
        weight: 100
      color: white
      background: rgba(0,0,0,0.3)
      border-radius: $radius-min-4
      padding: 3px 5px
      z-index: 2

    .details
      padding: 0 15px
      bottom: 0
      right: 0
      left: 0
      height: 100%
      max-height: 35px
      color: white
      background: rgba(0,0,0,0.5)
      transition: all 0.1s linear

      .table-holder
        display: table
        height: 100%
        width: 100%
        padding-bottom: 10px
        
      p, ul
        margin: 0

      p.name
        line-height: 35px
        font-size: 13px
        display: table-row
        height: 100%
      
      .schedule
        display: table-row
        vertical-align: bottom

        p.sched
          color: #ffc317
          font-size: 10px

        ul
          li
            line-height: 14px
            span
              font-size: 10px

              &.date
                color: #ffc317
                width: 30px
                display: inline-block

    @media (max-width: 1199px)
      .lobby-people-list
        width: 70%
        .people
          width: 49%
    @media (max-width: 768px)
      .lobby-people-list
        width: 100%
        .people
          width: 47%
    @media (max-width: 414px)
      .lobby-people-list
        .people
          width: 100%
</style>
