<template>
  <section class="register static-navbar-page-margin" style="background-color: #f2f2f2">
    <div class="container">
      <div class="panel panel-info main-panel">
        <div class="panel-heading">
          会员注册
        </div>

        <div class="panel-body">
          <div class="panel panel-info">
            <div class="panel-heading">
              <i class="fa fa-user"></i>
              用户信息
            </div>

            <div class="panel-body">
              <!-- <div class="form-group">
                <span class="text-info help-text" :class="hasHelpText('username')">6-15位数字、字母、下划线</span>
                <label for="username">
                  <span class="text-danger">*</span>用户名：</label>
                <input type="text" autocomplete="off" v-model="form.username" name="username" class="form-control" @focus="addHelpText('username')" @blur="removeHelpText('username')">
              </div> -->
              <input-help-text v-model="form.username" key="username" label="用户名：" help="6-15位数字、字母、下划线" required />
              <input-help-text v-model="form.password" key="password" type="password" label="密 码：" help="密码长度6-18位数字和字母组合，如mr007lover" required />
              <input-help-text v-model="form.confirmPassword" key="cpassword" type="password" label="确认密码：" help="请再次输入确认密码" required />
              <!-- <div class="form-group">
                <span class="text-info help-text" :class="hasHelpText('password')">密码长度6-18位数字和字母组合，如mr007lover</span>
                <label for="password">
                  <span class="text-danger">*</span>密 码：</label>
                <input type="password" autocomplete="off" v-model="form.password" name="password" class="form-control" @focus="addHelpText('password')" @blur="removeHelpText('password')">
              </div> -->
              <!-- <div class="form-group">
                <span class="text-info help-text hide" ref="cpassword">请再次输入确认密码</span>
                <label for="cpassword">
                  <span class="text-danger">*</span>确认密码：</label>
                <input type="password" autocomplete="off" v-model="form.confirmPassword" name="cpassword" class="form-control" @focus="showHelpText('cpassword')" @blur="showHelpText('cpassword')">
              </div> -->
            </div>
          </div>

          <div class="panel panel-info">
            <div class="panel-heading">
              <i class="fa fa-info-circle"></i>
              个人信息
            </div>

            <div class="panel-body">
              <!-- <div class="form-group">
                <span class="text-info help-text hide" ref="actualName">6-15位数字、字母、下划线</span>
                <label for="actualName">真实姓名：</label>
                <input type="text" autocomplete="off" v-model="form.actualName" name="actualName" class="form-control" @focus="showHelpText('actualName')" @blur="showHelpText('actualName')">
              </div> -->
              <input-help-text v-model="form.actualName" key="actualName" label="真实姓名：" help="6-15位数字、字母、下划线" />
              <div class="form-group">
                <label>性别：</label>

                <div class="gender-holder clearfix">
                  <label class="col-xs-6 text-center">
                    <input type="radio" name="gender" v-model="form.gender" value="1">
                    <p>先生</p>
                  </label>
                  <label class="col-xs-6 text-center">
                    <input type="radio" name="gender" v-model="form.gender" value="2">
                    <p>女士</p>
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label>出生日期</label>

                <div class="month-holder clearfix">
                  <div class="col-xs-4">
                    <!-- {{ form.birthDate.yearSelection }}
                    <div class="dropdown">
                      <button class="btn btn-default dropdown-toggle" role="button" data-id="year" title="年" type="button" data-toggle="dropdown">
                        <span class="value">{{ form.birthDate.yearSelection }}</span>
                        <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu scrollable-menu" role="menu">
                        <li v-for="(yr,index) of year" :key="index">
                          <a href="javascript:void(0)" @click.native="yearSelect(yr)">{{ yr }}</a>
                        </li>
                      </ul>
                    </div> -->
                    <no-ssr>
                      <vue-select v-model="form.birthDate.year" :options="years" />
                    </no-ssr>
                  </div>
                  <div class="col-xs-4">
                    <!-- <div class="dropdown">
                      <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                        <span class="value">{{ form.birthDate.monthSelection }}</span>
                        <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu scrollable-menu" role="menu">
                        <li v-for="(month,index) of months" :key="index">
                          <a href="javascript:void(0)" @click="monthSelect(month)">{{ month }}</a>
                        </li>
                      </ul>
                    </div> -->
                    <no-ssr>
                      <vue-select v-model="form.birthDate.month" :options="months" />
                    </no-ssr>
                  </div>
                  <div class="col-xs-4">
                    <!-- <div class="dropdown">
                      <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                        <span class="value">{{ form.birthDate.daySelection }}</span>
                        <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu scrollable-menu" role="menu">
                        <li v-for="(day,index) of days" :key="index">
                          <a href="javascript:void(0)" @click="daySelect(day)">{{ day }}</a>
                        </li>
                      </ul>
                    </div> -->
                    <no-ssr>
                      <vue-select v-model="form.birthDate.day" :options="days" />
                    </no-ssr>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { getYears, getPaddedNumbers } from "~/utils";
import InputHelpText from "~/components/shared/InputHelpText";
import RegisterInput from "~/components/shared/RegisterInput";
import MrSelect from "~/components/shared/MrSelect";
export default {
  middleware: "authenticated",
  inject: ["MEDIA_SERVER"],
  components: {
    InputHelpText,
    RegisterInput,
    MrSelect
  },
  data() {
    return {
      processing: false,
      background: "registration-bg.jpg",
      years: getYears(1900).map(String),
      months: getPaddedNumbers(12).map(String),
      days: getPaddedNumbers(10).map(String),
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
      }
    };
  },
  methods: {
    async sendForm() {
      try {
        if (!this.agree) throw new Error("Please agree with our rules");
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
          affCode: ""
        };
        await this.$store.dispatch("register", form);
      } catch (error) {
        this.$store.commit("MODAL_DETAILS", {
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
  }
};
</script>

<style lang="sass">
  @import './assets/sass/_variables'
  .signup-group
    font-family:  Avenir,"Avenir Next","Helvetica Neue",Helvetica,Arial,sans-serif
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
    font-size: 10px

  .formGroup-checkbox 
    margin-top: 10px
    padding-left: 36px

  .col-select
    padding: 0
  

  .checkbox
    display: inline-block
    width: 20px
    height: 20px
    border: 2px solid #e6e6e6
    background-color: #fff
    background-repeat: no-repeat
    -webkit-appearance: none
    -moz-appearance: none
    appearance: none
    margin: -6px 5px!important
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

    .container
      .panel.panel-info.main-panel
        margin: 0 auto

        .form-group
          position: relative

          // .month-holder
          //   div[class*="col-"]
          //     padding: 0
          //     width: 32%

          //     &:not(:first-child)
          //       margin-left: 2%
              
          //     button
          //       width: 100%
          //       position: relative
          //       text-align: left
          //       padding-right: 25px

          //       span.caret
          //         position: absolute
          //         top: 14px
          //         right: 10px
              
          //     .scrollable-menu
          //       height: auto
          //       max-height: 250px
          //       overflow-x: hidden

          input[type="checkbox"]
            margin-right: 5px

          // label span
          //   color: red

          

  @media (max-width: 768px)
    .register .container .panel.panel-info.main-panel
      width: 100%
      margin: 0 auto

    .signup-group
      padding: 20px
      width: 100%
    

</style>
