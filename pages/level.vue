<template>
  <section class="static-navbar-page-margin">
    <div class="hints">
      <div class="container">
        <div class="col-md-3 col-xs-12 image"><img :src="`images/${topContent.image}`" /></div>
        <div class="col-md-9 col-xs-12 content">
          <h4>{{ topContent.content.title }}</h4>
          <ul class="hints-list">
            <li v-for="(hint, index) of topContent.content.hints" :key="index">
              <i class="fa fa-star"></i> {{ hint }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="member">
      <div class="container">
        <template v-if="levels.length">
          <vue-select class="visible-xs" :value="defaultLevel" :options="levelsWithLabel" @input="changeLevel" :placeholder="`${auth ? `VIP ${authLevel}` : 'VIP 1'}`"></vue-select>
          <div class="scroll-view hidden-xs">
            <ul class="level-list list-inline">
              <li v-for="(level, index) of levelsFiltered" :key="index" :class="[classSelectedLevel(level), classCurrentLevel(level)]">
                <p class="upper-text">Lv. {{ level.level }}</p>
                <a href="javascript:void(0)" @click="changeLevel(level)">
                  <div class="link" :class="bothPassed(level)"></div>
                  <div class="line" :class="bothPassed(level)"></div>
                </a>
                <p class="bottom-text" v-if="level.bottomText">{{ level.bottomText }}</p>
                <p class="bottom-text" v-if="level.level === 12">亿万先生</p>
              </li>
            </ul>
          </div>
          <div class="tab-content main-tab-content">
            <transition name="fade" mode="out-in">
              <div class="tab-pane active" v-if="currentLevel === level.level" v-for="(level, index) of levelsFiltered" :key="index">
                <div class="tab-header row">
                  <div class="col-xs-12 col-sm-6 text-right tab-title">
                    <p>VIP{{ level.level }} 晋级福利</p>
                  </div>
                  <div class="col-xs-12 col-sm-6 qualification-requirement">
                    <p>晋级要求：</p>
                    <!--p 累计{{ level.level }}次或以上总额达到{{ level.deposit }}元存款。-->
                    <p>存款总额达到{{ level.deposit }}元。</p>
                  </div>
                </div>
                <div class="tab-body row" v-if="level.bonus_list">
                  <div class="col-md-6 col-sm-12 col-xs-12 no-padding-mobile" v-for="(item, index) in level.bonus_list" :key="index">
                    <div class="panel panel-default vip-panel">
                      <div class="panel-heading vip-panel-heading">
                        <p class="panel-title pull-left">
                          <i class="fa fa-star"></i>{{ item.bonusname }}</p>
                        <div class="btn-group btn-group-sm top-level-btn-group pull-right">
                          <a v-for="(content, index) in item.platform" :key="index" class="btn" href="javascript:void(0)" :class="{ active: index === 0 }" @click="changeActive">
                            {{ content.platform_name }}
                          </a>
                        </div>
                      </div>
                      <div class="panel-body panel-level">
                        <div class="tab-content">
                          <div class="tab-pane fade active in">
                            <ul class="list-inline list-level-data">
                              <li>
                                <p>￥{{ item.baseamount }}</p>
                                <p>最低转账金额</p>
                              </li>
                              <li>
                                <p>{{ item.bonusrate }}%</p>
                                <p>奖金比例</p>
                              </li>
                              <li>
                                <p>本金+红利的{{ item.flowrequire }}倍投注额</p>
                                <p>提存要求</p>
                              </li>
                              <li>
                                <p>￥{{ item.maxamount }}</p>
                                <p>最高奖励额度</p>
                              </li>
                              <li>
                                <nuxt-link class="btn btn-sm btn-primary disabled" v-if="!auth" to="/">请先登录。</nuxt-link>
                                <nuxt-link class="btn btn-sm btn-primary" v-else-if="item.can_use === 0" to="/uc/account">立即使用</nuxt-link>
                                <nuxt-link class="btn btn-sm rebate-not-used" href="javascript:void(0)" v-else-if="item.can_use === 1" to="/uc/account">立即使用</nuxt-link>
                                <a class="btn btn-sm rebate-used" v-else-if="item.can_use === 2">已使用</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultLevel: {
        label: `VIP 1`,
        value: 1,
        level: 1
      },
      currentLevel: 1,
      topContent: {
        image: "ico-member-logo.png",
        content: {
          title: "亿万先生尊贵会员特权中心",
          hints: [
            "任何会员一旦注册成为亿万先生，系统默认的会员等级为VIP0；",
            "只要达到晋级要求，系统会自动为您提升VIP等级，无需会员自行申请；",
            "晋级要求需同时达到相应的存款次数以及存款金额，具体请查看各等级详情；",
            "各VIP等级的具体福利，请会员点击相应等级的图标进行查看；",
            "如有任何问题，请联系在线客服咨询；",
            "本晋级细则一切最终解释权归亿万先生在线娱乐所有。"
          ]
        }
      }
    };
  },
  computed: {
    ...mapGetters(["auth", "levels"]),
    levelsFiltered() {
      return this.levels.filter(level => level.level < 13);
    },
    authLevel() {
      return this.auth
        ? !this.auth.userlevel
          ? 1
          : this.auth.userlevel > 12
            ? 12
            : this.auth.userlevel
        : 1;
    },
    levelsWithLabel() {
      return this.levelsFiltered.map(level => ({
        label: `VIP ${level.level}`,
        value: level.level,
        level: level.level
      }));
    }
  },
  methods: {
    changeLevel(level) {
      this.currentLevel = level ? level.level : this.authLevel;
    },
    changeActive(event) {
      let _btnClicked = event.target;

      setTimeout(() => {
        if (!_btnClicked.classList.contains("active")) {
          let _btnParent = _btnClicked.parentNode;

          for (let i = 0, e = _btnParent.children; i < e.length; i++) {
            if (e[i].classList.contains("active")) {
              e[i].classList.remove("active");
              break;
            }
          }
          _btnClicked.classList.add("active");
        }
      });
    },
    isCurrentLevel(level) {
      return this.currentLevel === level.level;
    },
    classSelectedLevel(level) {
      return this.isCurrentLevel(level) ? "active current-level" : "";
    },
    classCurrentLevel(level) {
      return this.authLevel === level.level ? "active current-level" : "";
    },
    bothPassed(level) {
      const passed = level.level < this.authLevel;
      return [
        {
          "both-passed": passed
        },
        { passed }
      ];
    }
  },
  async beforeMount() {
    await this.$store.dispatch("getLevels");
    if (this.auth) {
      this.defaultLevel = {
        label: `VIP ${this.authLevel}`,
        value: this.authLevel,
        level: this.authLevel
      };
      this.currentLevel = this.authLevel;
    }
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .v-select, .v-select *
    text-align: left!important
    & /deep/ button.clear
      display: none !important

  section
    min-height: 600px
    .hints
      padding: 15px 0
      background: $blue-8

      .container
        .image
          padding: 15px 0 0
          width: 22%

        .content
          color: white

          ul li
            line-height: 20px

            i
              font-size: 10px
              line-height: 20px
    .member
      padding: 30px 0

      .container
        .level-list
          padding-top: 20px
          margin-left: 0

          li
            position: relative
            width: calc(100%/12)
            height: 10px
            padding: 0

            &.active, &.current-level
              a
                bottom: -2px

                .link
                  position: relative
                  height: 20px
                  width: 20px
                  border: 5px solid $blue-7
                    radius: 20px
                  margin-top: -5px
                  z-index: 2
                  background: white

                .line
                  top: 3px

            &.current-level a div.line:before
              background: $blue-7

            a
              display: block
              text-align: center
              position: relative
              height: 25px

              .link
                height: 15px
                width: 15px
                border-radius: 15px
                background: $gray-8
                display: inline-block
                color: white

                &.passed
                  background: $blue-7

              .line
                width: 100%
                top: 5px
                left: 0
                position: absolute

                &:before, &:after
                  content: ''
                  position: absolute
                  width: 50%
                  height: 4px
                  background: $gray-8
                  z-index: -1

                &:before
                  left: 0

                &:after
                  right: 0

                &.passed:before
                  background: $blue-7

                &.both-passed
                  &:before, &:after
                    background: $blue-7

            p
              position: absolute
              text-align: center
              width: 100%
              left: 0

              &.upper-text
                color: $blue-7
                top: -25px

              &.bottom-text
                color: #989291
                bottom: -45px

        @media (max-width: 768px)
          .scroll-view
            overflow-x: scroll
            overflow-y: hidden
            height: 80px
            white-space:nowrap

            .level-list
              width: 1177px

        .tab-content.main-tab-content
          margin-top: 50px
          border:
            width: 3px 1px 1px
            style: solid
            color: $blue-7
          padding: 20px

          .tab-pane
            .list-level-data
              margin-bottom: 0

              li
                width: 20%
                display: table-cell
                vertical-align: middle
                text-align: center
                padding: 5px 0

                &:not(:first-child)
                  border-left: 1px solid $blue-7

                p
                  margin-bottom: 0
                  color: $gray-9

                  &:first-child
                    color: $blue-7
                    font-weight: 600

                a
                  min-width: 90px
                  display: inline-block

                a.rebate-used
                  background: $gray-10
                  color: $gray-11

                a.rebate-not-used
                  background: $secondary
                  color: $gray-base

              @media (max-width: 375px and 414px)

                li
                  width: 100%
                  display: inline
                  vertical-align: middle
                  text-align: center
                  padding: 10px
                  display: block

                  &:not(:first-child)
                    border-left: none

                  &:not(:last-child)
                    border-left: none
                    border-bottom: 1px solid $blue-7
                    width: 100%

                  .btn-primary
                    margin: 0 auto
                    background-image: none

            .tab-header
              margin: 0 15px 20px 15px
              border-bottom: 1px solid $gray-12
              padding-bottom: 20px

              .qualification-requirement
                p
                  margin: 0
                  color: #607D8B

              .tab-title
                font:
                  size: 2em
                  weight: bold
                color: $blue-7
                border-right: 1px solid $gray-12

              @media (max-width: 375px and 414px)
                .no-padding-mobile
                    padding: 0  
                .tab-title
                  border-right: 0
                  font-size: 1.5em
                  text-align: center

                .qualification-requirement
                  text-align: center


            .tab-body
              margin: 0

              .vip-panel
                border-radius: 4px 4px 0 0
                box-shadow: none
                border-color: $blue-7

                .vip-panel-heading
                  background: $blue-7
                  padding: 6px 10px
                  border-color: transparent
                  overflow: auto

                  .panel-title
                    color: white
                    line-height: 34px
                    font-size: 14px

                  @media (max-width: 375px and 414px)
                    .no-padding-mobile
                      padding: 0
                    .panel-title
                      display: block
                      width: 100%
                      text-align: center

                    .top-level-btn-group.pull-right
                      margin: 0 auto
                      float: none

                  .btn-group
                    background: $default
                    color: $blue-7
                    border: 2px solid $default
                      radius: 20px

                    .btn
                      border-radius: 15px
                      min-width: 80px

                      &.active
                        background: $blue-6
                        color: $default

                .panel-level
                  padding: 0

  @media (max-width: 375px and 414px)
    .no-padding-mobile
      padding: 0
    .list-inline
      margin-left: 0

    .container
      padding-left: 10px
      padding-right: 10px

    .tab-title
      font:
        size: 1em
        weight: bold
      color: $blue-7
      border-right: none

  @media (max-width: 1024px) and (min-width: 769px)
    section .member .container .tab-content.main-tab-content .tab-pane .tab-body .vip-panel .vip-panel-heading .panel-title
      color: $default
      line-height: 32px
      font-size: 12px

  @media (max-width: 768px)
    section.static-navbar-page-margin
      .hints
        .container
          .image
            padding: 15px 0 0
            width: 100%
            display: flex
            justify-content: center

    section .member .container .level-list li p.upper-text
      color: hsl(206, 49%, 39%)
      top: -23px
  @media (max-width: 480px)
    .no-padding-mobile
      padding: 0
    .hints-list
      font-size: 10px
  
  @media (max-width: 414px)
    section.static-navbar-page-margin
      .hints
        .container
          .image
            justify-content: left
            img
              width: 150px
              height: 100%
</style>
