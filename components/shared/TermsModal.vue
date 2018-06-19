<template>
  <modal v-bind="$props" v-on="$listeners" :bodyClass="[termsStyle.body]" :headerClass="[termsStyle.header]" :containerClass="[termsStyle.container]">
    <template slot="header">
      <div class="terms-header">
        <div class="terms-header-title">用户使用条款及隐私权政策</div>
      </div>
    </template>
    <template>
      <div class="terms-content-container">
        <div class="terms-content" v-for="(content, contentIndex) of terms.content" :key="contentIndex" @click="toggleActive(contentIndex)">
          <div class="terms-content-title">{{content.title}}</div>
          <div class="terms-content-bodies active" v-for="(paragraph, index) of content.body" :key="index">
            <div class="terms-content-body">{{paragraph.content}}</div>
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
  name: "TermsModal",
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
      currentContentIndex: "all"
    };
  },
  computed: {
    terms() {
      return cooperation.find(cooperation => cooperation.name === "terms");
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

  .terms-header
    padding: 10px
    background: #fff

  .terms-header-title
    font-size: 20px
    line-height: 40px
    padding-top: 20px
    color: #206B99
    letter-spacing: 1px
    font-weight: bold

  .terms-content-container
    max-height: 500px
    overflow-y: auto
    padding: 0 40px 40px
  .terms-content
    margin-bottom: 10px
    border: 1px solid #bce8f1
    font-size: 12px
    text-align: left
    border-radius: 5px

  .terms-content-title
    padding: 10px
    color: #31708f
    background: #d9edf7
    font-size: 14px
    font-weight: 500
    text-align: left
    cursor: pointer
    font-weight: bold
  .terms-content-bodies
    height: 0
    transform: height .3s ease-in-out
    overflow: hidden
    &.active
      height: 100%
  .terms-content-body
    padding: 10px
    border: 2px #222
  .terms-content-button
    padding: 10px 0
    background-color: #085984
    margin: 0 auto
    width: 200px
    text-align: center
    color: #FFF
    border-radius: 20px

  @media (max-width:414px)
    .terms-content-container
      padding: 0 15px 15px !important
</style>

<style lang="sass" module="termsStyle">
  .body,
  .header
    padding: 0 !important

  .container
    width: 80vw !important

  @media (max-width:414px)
    .container
      width: 100% !important
</style>
