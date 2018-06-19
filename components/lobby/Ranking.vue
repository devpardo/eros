<template>
  <div class="lobby-ranking pull-right" :style="{ backgroundImage: `url(${mediaServer}people-rank-bg.jpg)` }">
    <div class="tab-menu clearfix">
      <p class="pull-left">富豪排行榜</p>
      <ul class="list-unstyled list-inline pull-right rank-menu">
        <li v-for="(rankType, key) of rankTypes" :key="key" :class="{ active: key === rankKey }" @click="changeActiveRank(key)">
          <a href="javascript:void(0)" @click="fetchRanks(key)">
            {{rankType}}
          </a>
        </li>
      </ul>
    </div>
    <div class="tab-content clearfix">
      <template v-if="!loading">
        <div id="rank-1" class="tab-pane fade active in" v-if="ranks && ranks.length">
          <ul class="userRank">
            <li v-for="(user, index) in ranks" :key="index" class="clearfix">
              <img :src="`${mediaServer}badge-rank1.png`" class="badge-rank pull-left" alt="" v-if="index === 0">
              <img :src="`${mediaServer}badge-rank2.png`" class="badge-rank pull-left" alt="" v-else-if="index === 1">
              <img :src="`${mediaServer}badge-rank3.png`" class="badge-rank pull-left" alt="" v-else-if="index === 2">
              <p class="pull-left ranking" v-else>{{ (index + 1) }}</p>

              <div class="user-content clearfix pull-left">
                <img :src="user.pic" alt="" class="img-responsive img-circle pull-left avatar">

                <div class="details pull-left">
                  <p class="level">Lv.{{ user.userlevel }}</p>
                  <p class="name">{{ user.nickname }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="no-data" v-else>
          <i class="fa fa-warning"></i>
          <p>No ranking</p>
        </div>
      </template>
      <div class="spinner" style="top: 45px; margin-left: -14px" v-else>
        <div class="spinner-icon" style="height: 28px; width: 28px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    props: ["mediaServer"],

    data() {
      return {
        avatarLink: "http://static.mr007.tv/upload/users/",
        rankMenuActive: 0,
        rankKey: "day",
        rankTypes: {
          day: "日",
          week: "周",
          month: "月"
        },
        loading: false
      };
    },
    computed: {
      ...mapGetters("mrtv", ["ranks"])
    },
    methods: {
      async fetchRanks(type) {
        this.loading = true;
        await this.$store.dispatch("mrtv/getRanks", type);
        this.loading = false;
      },
      changeActiveRank(rank) {
        this.rankKey = rank;
      }
    },
    async mounted() {
      await this.fetchRanks("day");
    }
  };
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'

  .spinner
    position: absolute
    left: 50%
    top: 50%
    margin:
      left: -20px
      top: -20px
    z-index: 19
    animation: loading-bar-spinner .8s linear infinite

    .spinner-icon
      border:  solid 3px transparent
      border:
        top-color:  #ffffff
        left-color: #ffffff
      border-radius: $radius-curve

  @keyframes loading-bar-spinner
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)
  
  .no-data
    color: white
    text-align: center
    margin-top: 20px
    opacity: 0.5

    i
      font-size: 75px
      margin-bottom: 5px
    
    p
      font:
        size: 14px
        weight: 100

  .lobby-ranking
    height: 621px
    width: 226px
    background-size: cover
    overflow: hidden

    .tab-menu
      color: white
      padding: 10px
      border-bottom: 1px solid #FFFFFF
      margin-bottom: 10px
      
      p
        margin: 0
        font:
          size: 1.3em
          weight: 100
          

      ul.rank-menu
        margin: 0

        li
          border: 1px solid #FFFFFF
          border-radius: 2px
          padding:
            right: 4px
            left: 4px
          
          &:not(:first-child)
            margin-left: 5px
          
          &:last-child:after 
            content: '\203A'
            position: relative
            left: -3px


          &.active
            border-color: #f5a623
            
            a
              color: #f5a623

          a
            color: white
            font-size: 12px

    .tab-content
      padding: 4px
      position: relative

      div[id*="rank-"]
        .userRank
          li
            display: block
            width: 100%
            background: rgba(255,255,255,0.4)
            background: rgb(206, 179, 233)
            padding: 5px
            border-radius: $radius-base
            height: 50px

            &:not(:first-child)
              margin-top: 3px

            img.badge-rank, p.ranking
              margin-right: 10px
              width: 25px

            img.badge-rank
              height: 30px
              width: 25px
              margin-top: 5px
            
            p.ranking
              line-height: 40px
              text-align: center
              color: #F5A623
              text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.4)
              
            .user-content
              height: 100%
              
              img.avatar
                height: 40px
                width: 40px
                margin-right: 10px
              
              .details
                margin-top: 5px
                
                p
                  margin: 0

                  &.name
                    text-overflow: ellipsis
                    white-space: nowrap
                    overflow: hidden
                    color: #333333
                    width: 123px

                  &.level
                    line-height: 12px
                    font-size: 12px
                    color: #4A90E2

  @media (max-width: 1199px)
    .lobby-ranking
      width: 30%
  @media (max-width: 768px) 
    .lobby-ranking
      width: 100%
      height: auto
</style>
