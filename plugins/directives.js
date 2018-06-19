import Vue from "vue";
import touch from "~/directives/touch";

Vue.directive("focus", {
  inserted(el) {
    el.focus();
  }
});
const isNumber = event => {
  let charCode = event.which ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    event.preventDefault();
  } else {
    return true;
  }
};
Vue.directive("number", {
  bind(el, binding) {
    el.addEventListener("keypress", isNumber);
  },
  unbind(el, binding) {
    el.removeEventListener("keypress", isNumber);
  }
});

Vue.directive(touch.name, touch);
