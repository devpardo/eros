<template>
  <section class="register static-navbar-page-margin">
    <div class="container">
      <h1 class="PageTitle">创建亿万先生账号</h1>

      <div class="signup-group">
        <p class="text-center">请填写以下信息，完善的注册信息能让您获得更多的亿万动态及优惠资讯。</p>
        <div class="register-input-group">

          <input type="text" class="disabled"/>
          <input type="password" class="disabled"/>

          <div class="form-group-reg">
            <div class="reg-label col-xs-12 col-md-4">
              <label for="username" class="label">
                <span class="label-span"> 用户名 </span>
              </label>
            </div>
            <div class="col-xs-12 col-md-8">
              <mr-input v-model="form.username" key="register_username" autocomplete="off" v-validate="validations.username.rules" :data-vv-as="validations.username.alias" name="username" type="text" placeholder="6-15位数字及英文字母组合" :error="errors.has('username')" :error-message="errors.first('username')" />
            </div>
          </div>

          <div class="form-group-reg">
            <div class="reg-label col-xs-12 col-md-4">
              <label for="fullname" class="label">
                <span class="label-span"> 真实姓名 </span>
              </label>
            </div>
            <div class="col-xs-12 col-md-8">
              <mr-input v-model="form.actualName" v-validate="validations.actualName.rules" :data-vv-as="validations.actualName.alias" name="actualName" type="text" placeholder="与有效证件相一致的真实姓名" :error="errors.has('actualName')" :error-message="errors.first('actualName')" />
            </div>
          </div>

          <div class="form-group-reg">
            <div class="reg-label col-xs-12 col-md-4">
              <label for="password" class="label">
                <span class="label-span"> 登录密码 </span>
              </label>
            </div>
            <div class="col-xs-12 col-md-8">
              <mr-input v-model="form.password" v-validate="validations.password.rules" :data-vv-as="validations.password.alias" name="password" type="password" placeholder="8位以上数字及英文字母组合" :error="errors.has('password')" :error-message="errors.first('password')" />
            </div>
          </div>

          <div class="form-group-reg">
            <div class="reg-label col-xs-12 col-md-4">
              <label for="confirmPassword" class="label">
                <span class="label-span"> 确认密码 </span>
              </label>
            </div>
            <div class="col-xs-12 col-md-8">
              <mr-input v-model="form.confirmPassword" v-validate="confirmPasswordRules" :data-vv-as="validations.confirmPassword.alias" name="confirmPassword" type="password" placeholder="必须与登录密码相一致" :error="errors.has('confirmPassword')" :error-message="errors.first('confirmPassword')" />
            </div>
          </div>

          <div class="form-group-reg">
            <div class="reg-label col-xs-12 col-md-4">
              <label for="Bday" class="label">
                <span class="label-span"> 出生日期 </span>
              </label>
            </div>
            <div class="col-md-8 col-xs-12">
              <div class="col-xs-4 col-select">
                <mr-select v-model="form.birthDate.year" rules="required" name="year" :options="years" />
              </div>
              <div class="col-xs-4 col-select">
                <mr-select v-model="form.birthDate.month" rules="required" name="month" :options="months" />
              </div>
              <div class="col-xs-4 col-select">
                <mr-select v-model="form.birthDate.day" rules="required" name="day" :options="days" />
              </div>
            </div>
          </div>

          <div class="form-group-reg">
            <div class="reg-label col-xs-12 col-md-4">
              <label for="email" class="label">
                <span class="label-span"> 邮箱地址 </span>
              </label>
            </div>
            <div class="col-xs-12 col-md-8">
              <mr-input v-model="form.email" v-validate="validations.email.rules" :data-vv-as="validations.email.alias" name="email" type="email" placeholder="电子邮箱地址" :error="errors.has('email')" :error-message="errors.first('email')" />
            </div>
          </div>

          <div class="form-group-reg">
            <div class="reg-label col-xs-12 col-md-4">
              <label for="contact" class="label">
                <span class="label-span"> 手机号 </span>
              </label>
            </div>
            <div class="col-xs-12 col-md-8">
              <mr-input v-model="form.phone" v-validate="validations.phone.rules" :data-vv-as="validations.phone.alias" name="phone" type="phone" placeholder="11位中国大陆手机号" :error="errors.has('phone')" :error-message="errors.first('phone')" />
            </div>
          </div>

          <div class="SignupForm_groupCheckbox">
            <!-- <div class="formGroup formGroup-checkbox">
              <input class="checkbox" type="checkbox">
              <label class="formLabel">
                <span>I'd like to stay in touch with Nintendo via e-mail to receive special offers, game news, and more.</span>
              </label>
            </div> -->
            <div class="formGroup formGroup-checkbox">
              <input v-model="agree" type="checkbox" class="checkbox">
              <label class="formLabel">
                我已阅读并同意接受亿万先生的
                <a href="javascript:void(0)" @click="modal.terms = true">使用条款及隐私权政策</a>。
              </label>
            </div>
          </div>
          <div class="Group">
            <button class="btn btn-primary" @click="submit" :disabled="!isFormAgreed">
              <span> 提交注册 </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <terms-modal v-model="modal.terms" />
    <privacy-modal v-model="modal.privacy" />
  </section>
</template>

<script>
import { mapState } from "vuex";
import { getYears, getPaddedNumbers } from "~/utils";
import InputHelpText from "~/components/shared/InputHelpText";
import RegisterInput from "~/components/shared/RegisterInput";
import MrSelect from "~/components/shared/MrSelect";
import MrInput from "~/components/shared/MrInput";
import TermsModal from "~/components/shared/TermsModal";
import PrivacyModal from "~/components/shared/PrivacyModal";
export default {
  middleware: "authenticated",
  inject: ["MEDIA_SERVER"],
  components: {
    InputHelpText,
    RegisterInput,
    MrSelect,
    MrInput,
    TermsModal,
    PrivacyModal
  },
  data() {
    return {
      modal: {
        terms: false,
        privacy: false
      },
      processing: false,
      background: "registration-bg.jpg",
      years: getYears({ startYear: 1900, limit: 18 })
        .map(String)
        .reverse(),
      months: getPaddedNumbers(12).map(String),
      days: getPaddedNumbers(31).map(String),
      agree: false,
      form: {
        username: "",
        password: "",
        confirmPassword: "",
        actualName: "",
        email: "",
        phone: "",
        gender: "",
        birthDate: {
          year: "年",
          month: "月",
          day: "日"
        }
      },
      validations: {
        username: {
          rules: {
            required: true,
            alpha_num: true,
            regex: /(?=^[^0])(?=.*[a-zA-Z])(?=.*[0-9])([a-zA-Z0-9]+)$/,
            min: [6],
            max: [15]
          },
          alias: "用户名"
        },
        actualName: {
          rules: {
            required: true,
            regex: /^[\u3000\u3400-\u4DBF\u4E00-\u9FFF\·]{2,15}$/,
            min: [2],
            max: [15]
          },
          alias: "真实姓名"
        },
        email: {
          rules: {
            required: true,
            email: true
          },
          alias: "邮箱地址"
        },
        password: {
          rules: {
            required: true,
            alpha_num: true,
            min: [8],
            max: [30]
          },
          alias: "登录密码"
        },
        confirmPassword: {
          rules: {
            required: true,
            alpha_num: true,
            min: [8],
            max: [30]
          },
          alias: "确认密码"
        },
        phone: {
          rules: {
            required: true,
            digits: [11]
          },
          alias: "手机号"
        }
      },
      validationMessages: {
        username: {
          regex: "用户名必须为字母与数字的组合，且不能以数字”0“开头"
        },
        actualName: {
          // required: "Actual Name is Required",
          regex: "必须是2-15位的中文字符"
        },
        // email: {
        //   required: "Email is required",
        //   email: "Email is invalid format"
        // },
        password: {
          alpha_num: "登录密码 只能包含字母与数字.",
          min: "仅限8位以上数字及字母组合"
        },
        confirmPassword: {
          min: "仅限8位以上数字及字母组合",
          is: "必须与登录密码相一致"
        }
        // phone: {
        //   required: "Phone is required",
        //   digits: "Must contain 11 Digits"
        // }
      }
    };
  },
  computed: {
    confirmPasswordRules() {
      return {
        ...this.validations.confirmPassword.rules,
        is: [this.form.password]
      };
    },
    isFormValid() {
      return Object.keys(this.fields).every(field => this.fields[field].valid);
    },
    isFormAgreed() {
      return this.isFormValid && this.agree;
    }
  },
  watch: {
    async agree(val) {
      await this.$validator.validate("*");
      if (!this.isFormValid) {
        this.agree = false;
      }
    }
  },
  methods: {
    async submit() {
      try {
        if (!this.isFormValid) throw new Error("Form is not valid");
        if (!this.agree)
          throw new Error("请阅读并同意接受亿万先生的使用条款及隐私权政策");
        if (this.processing) return;
        this.processing = true;
        const form = {
          loginName: this.form.username,
          fullName: this.form.actualName,
          userPassword: btoa(this.form.password),
          confirmUserPassword: btoa(this.form.confirmPassword),
          birthday: `${this.form.birthDate.year}-${this.form.birthDate.month}-${
            this.form.birthDate.day
          }`,
          gender: this.form.gender,
          email: this.form.email,
          mobile: this.form.phone,
          confirmed: true,
          affCode: this.$storage.getItem("affCode")
        };
        await this.$store.dispatch("register", form);
        this.$router.push({ name: "index" });
        this.$storage.removeItem("affCode");
      } catch (error) {
        this.$store.commit("modal/OPEN_MODAL", {
          title: "注册失败",
          content: error.message,
          type: "error"
        });
      } finally {
        this.processing = false;
      }
    },
    openDisclaimer() {
      if (process.browser) {
        window.open(
          `${window.location.host}/cooperation/disclaimer`,
          "_blank",
          "width=1000,height=500"
        );
      }
    }
  },
  created() {
    // Object.keys(this.rules).forEach(key => {
    //   const rule = this.rules[key];
    //   this.$validator.attach({
    //     name: key,
    //     rules: rule.rules,
    //     getter: () => this.form[key]
    //   });
    // });
    this.$validator.localize("zh_CN", {
      custom: this.validationMessages
    });
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .signup-group
    margin-top: 30px
    margin-bottom: 50px
    padding: 44px 130px
    border: 10px solid #fff
    border-radius: 8px
    color: #3c3c3c
    width: 960px
    font-weight: 300
    margin: 0 auto

  .form-group-reg
    display: table
    width: 100%
    table-layout: fixed
    margin-bottom: 30px

    .reg-label
      display: table-cell
      padding-top: 8px
      padding-right: 20px
      font-size: 14px
      line-height: 1.4
      vertical-align: top
      margin-bottom: 10px

      .label
        margin-bottom: 10px
        padding-left: 10px
        border-left: 5px solid #00c6b3
        line-height: 1
        border-radius: 0
        vertical-align: -3px
        font-weight: 300
        font-size: 14px
        color: #3c3c3c

        span
         color: black
         font-size: 14px

  .PageTitle
    margin: 29px auto 19px
    font-size: 28px
    font-weight: normal
    text-align: center
    letter-spacing: 0.5px

  .SignupForm_groupCheckbox
    margin-top: 30px
    padding-bottom: 10px
    border-top: 2px solid #e6e6e6
    border-bottom: 2px solid #e6e6e6
    font-size: 12px

  .formGroup-checkbox
    margin-top: 10px
    padding-left: 15px

  .col-select
    padding: 0

  .checkbox
    display: inline-block
    width: 24px
    height: 14px
  .btn
    padding: 11px 20px
    border-radius: 29px
    font-size: 14px
    line-height: 1.29
    box-sizing: border-box
    display: inline-block
    margin-bottom: 0
    border: 2px solid transparent
    background-image: none
    text-align: center
    vertical-align: middle
    cursor: pointer
    min-width: 150px

  .Group
    text-align: center
    margin-top: 30px

    .register-input-group
      margin-top: 30px
  .dropdown-toggle
    white-space: nowrap !important
  .register
    padding: 30px 0
    background-color: #f2f2f2

  .disabled
    background: red
    width: 0
    height: 0
    border: 0

  // .form-new
  //   display: block
  //   width: 100%
  //   min-height: 40px
  //   margin: 0
  //   padding: 6px 14px
  //   border: 2px solid #e6e6e6
  //   border-radius: 6px
  //   font-size: 14px
  //   box-shadow: none

  //   &:focus
  //     border-color: #00d1b2
  //     outline: none



  @media (max-width: 768px)
    .register .container .panel.panel-info.main-panel
      width: 100%
      margin: 0 auto

    .signup-group
      padding: 20px
      width: 100%


</style>
