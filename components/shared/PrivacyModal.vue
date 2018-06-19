<template>
  <modal v-bind="$props" v-on="$listeners" :bodyClass="[privacyStyle.body]" :headerClass="[privacyStyle.header]" :containerClass="[privacyStyle.container]">
    <template slot="header">
      <div class="privacy-header">
        <div class="privacy-header-title">{{privacy.pageTitle}}</div>
      </div>
    </template>
    <template>
      <div class="privacy-content-container">
        <div class="privacy-content" v-for="(content, contentIndex) of privacy.content" :key="contentIndex" @click="toggleActive(contentIndex)">
          <div class="privacy-content-title">{{content.title}}</div>
          <div class="privacy-content-bodies" v-for="(paragraph, index) of content.body" :key="index" :class="[currentContentIndex === contentIndex ? 'active' : '']">
            <div class="privacy-content-body">{{paragraph.content}}</div>
          </div>
        </div>
      </div>
    </template>
  </modal>
</template>
<script>
import cooperation from "~/json/cooperation";
import Modal from "~/components/shared/Modal";
export default {
  name: "PrivacyModal",
  components: {
    Modal
  },
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      currentContentIndex: -1
    };
  },
  computed: {
    privacy() {
      return cooperation.find(cooperation => cooperation.name === "privacy");
    }
  },
  methods: {
    toggleActive(contentIndex) {
      this.currentContentIndex =
        this.currentContentIndex === contentIndex ? -1 : contentIndex;
    }
  }
};
</script>
<style lang="sass" scoped>
  
  .privacy-header
    padding: 10px
    height: 80px
    
  .privacy-header-title
    font-size: 30px
    color: #fff
    line-height: 60px
    color: #206B99
    border-bottom: 1px solid #D9EDF7
    padding-bottom: 10px
    text-align: center

  .privacy-content-container
    max-height: 500px
    overflow-y: auto
    padding: 30px
  .privacy-content
    margin-bottom: 10px
    border: 1px solid #bce8f1
    font-size: 12px
    text-align: left
    border-radius: 5px

  .privacy-content-title
    padding: 10px
    color: #31708f
    background: #d9edf7
    font-size: 14px
    font-weight: 500
    text-align: center
    cursor: pointer
    
  .privacy-content-bodies
    height: 0
    transform: height .3s ease-in-out
    overflow: hidden
    &.active
      height: 100%
  .privacy-content-body
    padding: 10px
    border: 2px #222
</style>

<style lang="sass" module="privacyStyle">
  .body,
  .header 
    padding: 0 !important

  .container 
    width: 80vw !important
  
</style>
