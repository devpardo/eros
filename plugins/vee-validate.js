import Vue from "vue";
import VeeValidate, { Validator } from "vee-validate";
import zhCN from 'vee-validate/dist/locale/zh_CN';
Validator.localize('zh_CN', zhCN);
Vue.use(VeeValidate);
