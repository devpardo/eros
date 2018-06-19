<template>
  <transition name="modal">
    <div class="modal-mask" v-if="value">
      <global-events @keyup.esc="close" @keyup.enter="$emit('submit')" />
      <div class="modal-overlay" @click="close"></div>
      <div class="modal-wrapper bg-fade">
        <div class="modal-container" :class="containerClass">
          <div class="modal-header" :class="headerClass" v-if="$slots.header">
            <div v-if="!noClose" @click="close" class="close-btn">
              <i class="fa fa-times" aria-hidden="true"></i>
            </div>
            <slot name="header"></slot>
          </div>
          <div class="modal-body" :class="bodyClass" v-if="$slots.default">
            <slot></slot>
          </div>
          <div class="modal-footer text-center" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import GlobalEvents from "vue-global-events";
import scrollable from "~/mixins/scrollable";
export default {
  name: "Modal",
  mixins: [scrollable(["value"])],
  components: {
    GlobalEvents
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean
    },
    containerClass: {
      type: null
    },
    bodyClass: {
      type: null
    },
    headerClass: {
      type: null
    },
    noClose: {
      type: Boolean
    }
  },
  watch: {
    value(val) {
      if (val) this.$emit("open");
    }
  },
  methods: {
    close() {
      if (this.loading) return;
      this.$emit("close");
      this.$emit("input", false);
    }
    // escapeKeyClose(event) {
    //   if (event.keyCode !== 27) return;
    //   this.close();
    // },
    // enterKeySubmit(event) {
    //   if (event.keyCode !== 13) return;
    //   this.$emit("submit");
    // }
  }
  // beforeMount() {
  //   this.$addListenersToEvent(
  //     "keyup",
  //     this.escapeKeyClose,
  //     this.enterKeySubmit
  //   );
  // },
  // beforeDestroy() {
  //   this.$removeListenersToEvent(
  //     "keyup",
  //     this.escapeKeyClose,
  //     this.enterKeySubmit
  //   );
  // }
};
</script>
