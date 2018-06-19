<template>
  <div class="notices-container-background">
    <div class="notices-container container">
      <div class="notices" @click="openNoticeModal()">
        <i class="fa fa-rss rss-icon" style="float: left"></i>

        <transition v-if="currentNotice" name="notice" type="animation" appear @after-enter="setCurrentNotice">
          <div class="notice-item" :key="noticeKey">
            {{ currentNotice.notice }}
          </div>
        </transition>

      </div>
    </div>
    <notice-modal v-model="modal.notice" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NoticeModal from "@/components/shared/NoticeModal";
export default {
  components: { NoticeModal },
  data() {
    return {
      modal: {
        notice: false
      },
      noticeIndex: 0,
      noticeKey: `notice-${+new Date()}`
    };
  },
  computed: {
    ...mapGetters(["notices"]),
    currentNotice() {
      return this.notices ? this.notices[this.noticeIndex] : undefined;
    }
  },
  methods: {
    openNoticeModal(notice) {
      this.modal.notice = true;
    },
    setCurrentNotice() {
      if (!this.notices) return;
      this.noticeIndex =
        this.noticeIndex < this.notices.length - 1 ? this.noticeIndex + 1 : 0;
      this.noticeKey =
        this.notices.length === 1 ? `notice-${+new Date()}` : this.noticeIndex;
    }
  },
  async mounted() {
    await this.$store.dispatch("getNotices");
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'

  @keyframes notices-animation
    0%
      transform: translateX(100%)

    100%
      transform: translateX(-100%)

  .notice-enter-active
    animation: notices-animation 15s linear infinite
    cursor: pointer
  .notice-leave-active
    opacity: 0

  .notices-container-background
    background: rgba(0,0,0,0.6)
    width: 100%

  .notices-container
    position: relative
    height: 35px
    color: white
    overflow: hidden
    // padding: 10px 5px
    max-width: 1192px
    // margin: 0 auto
    left: -5px

  .notice-item
    &:hover
      animation-play-state: paused !important

  .notices
    overflow: hidden
    white-space: nowrap
    width: inherit
    line-height: 35px
    margin-left: -3px

  .rss-icon
    position: absolute
    left: 1px
    top: 11px

  // @media (max-width: 320px)
  //   .notices-container
  //     left: -1px
  //   .notices
  //     margin-left: 4px

  // @media (max-width: 375px)
  //   .notices-container
  //     left: -1px
  //   .notices
  //     margin-left: 4px

  @media (max-width: 414px)
    .notices-container
      left: -1px
    .notices
      margin-left: 4px

  @media only screen and (max-width: 480px)
    .notices
      margin-right: -15px
      margin-left: 4px
      font-size: smaller
    .notices-container-background
      background: rgba(0,0,0,1)
    // .notice-enter-active
    //   animation-duration: 20s
    .rss-icon
      left: 7px

  @media (min-width: 768px)
    .notices
      margin-right: -15px
      margin-left: -2px
</style>
