import TWEEN from "tween.js";
export default {
  props: {
    value: {
      type: Number
    },
    delay: {
      type: Number,
      default: 500
    },
    decimals: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      number: 0,
      loading: false
    };
  },
  watch: {
    value: {
      async handler(newVal, oldVal) {
        if (process.server) return (this.number = newVal);
        if (!this.loading) {
          await this.$sleep(this.delay);
          this.tween(0, newVal);
          return (this.loading = true);
        }
        this.tween(oldVal, newVal);
      },
      immediate: true
    }
  },
  methods: {
    tween(startValue, endValue) {
      const vm = this;
      const animate = () => {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      };
      new TWEEN.Tween({ tweeningValue: startValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(function() {
          vm.number = this.tweeningValue.toFixed(vm.decimals);
        })
        .start();

      animate();
    }
  }
};
