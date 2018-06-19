<template>
  <section class="forgot-password static-navbar-page-margin">
    <div class="container">
      <div class="titie-box">
        <h1>忘记密码</h1>
        <p>请输入您注册的用户名及真实姓名。</p>
        <p>并选择以邮箱或短信的方式获取重置密码的验证码信息。</p>
      </div>
      <div class="panel panel-info">
        <div class="panel-body">
          <div class="tab-content">
            <div id="form" ref="formTab" class="tab-pane fade" :class="{ 'active in': step === 1 }">
              <div class="form-group">
                <label class="lump lump-green"></label>
                <label for="username">用户名:</label>
                <input type="text" autocomplete="off" v-model="form.username" name="username" class="form-control" placeholder="请输入用户名">
              </div>
              <div class="form-group">
                <label class="lump lump-green"></label>
                <label for="actualName">真实姓名:</label>
                <input type="text" autocomplete="off" v-model="form.name" name="actualName" class="form-control" placeholder="真实姓名">
              </div>
              <div class="row">
                <div class="form-group col-md-6 col-sm-6 col-xs-6">
                  <label class="lump lump-orange"></label>
                  <label for="captcha">验证码:</label>
                  <input type="text" autocomplete="off" v-model="form.code" name="code" class="form-control" placeholder="请输入右侧验证码">
                </div>
                <captcha />
              </div>
              <div class="form-group text-center">
                <a href="javascript:void(0)" class="btn" @click="evaluateForm">提交</a>
              </div>
            </div>
            <div id="method" class="tab-pane fade clearfix" :class="{ 'active in': step === 2 }">
              <button class=" btn-lg btn-block btn-email" @click="evaluateMethod('email')" >通过电子邮件的方式获取验证码</button>
              <button class=" btn-lg btn-block btn-message" @click="evaluateMethod('message')">通过手机短信的方式获取验证码</button>
            </div>
            <div class="tab-pane fade clearfix" :class="{ 'active in': step === 3 }">
              <div class="form-group form-method clearfix">
                <div class="form-group">
                  <label class="lump lump-orange"></label>
                  <label for="username">验证码:</label>
                  <input type="text" autocomplete="off" v-model="confirmation.verification" name="username" class="form-control" placeholder="请输入获取的验证码">
                </div>
                <div class="form-group">
                  <label class="lump lump-green"></label>
                  <label for="actualName">新密码:</label>
                  <input type="password" autocomplete="off" v-model="confirmation.password" class="form-control" placeholder="请输入新的密码">
                </div>
                <div class="form-group">
                  <label class="lump lump-green"></label>
                  <label for="actualName">确认密码:</label>
                  <input type="password" autocomplete="off" v-model="confirmation.confirmPassword" class="form-control" placeholder="请确认新的密码">
                </div>
              </div>
              <div class="form-group text-center">
                <a href="javascript:void(0)" class="btn " @click="confirmDetails">提交</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Captcha from "~/components/shared/Captcha";
export default {
  inject: ["MEDIA_SERVER"],
  middleware: "authenticated",
  components: {
    Captcha
  },
  data() {
    return {
      step: 1,
      loading: false,
      form: {
        username: "",
        name: "",
        code: ""
      },
      confirmation: {
        verification: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    ...mapActions([
      "checkUserInfo",
      "sendPasswordCode",
      "verifyChangePassword"
    ]),
    reset() {
      this.form = {
        username: "",
        name: "",
        code: ""
      };
      this.confirmation = {
        verification: "",
        password: "",
        confirmPassword: ""
      };
    },

    async evaluateForm() {
      this.step = await this.checkUserInfo(this.form);
    },
    async evaluateMethod(types) {
      console.log(types);
      this.step = await this.sendPasswordCode({
        type: types
      });
    },
    async confirmDetails() {
      if (
        this.confirmation.verification !== "" &&
        this.confirmation.new !== "" &&
        this.confirmation.pw !== ""
      ) {
        if (this.confirmation.new === this.confirmation.pw) {
          this.$store.dispatch("REQUEST_FORGOT_PASSWORD_STEP_3", {
            code: this.confirmation.verification,
            newPassword: this.confirmation.new
          });
          this.$router.push({ name: "index" });
        } else {
          this.$store.commit("MODAL_DETAILS", {
            type: "error",
            content: "Password not match"
          });
        }
      } else {
        this.$store.commit("MODAL_DETAILS", {
          type: "error",
          content: "请完整输入上述信息项。"
        });
      }
      try {
        await this.verifyChangePassword(this.confirmation);
        //this.step = 1;
      } catch (error) {}
    },
    openCustomerServiceChat() {
      if (process.browser) {
        window.open(
          "https://chat7.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=378548&configID=52507&jid=5460920356&s=1",
          "_blank",
          "height=550,width=800,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no"
        );
      }
    }
  }
};
</script>

<style lang="sass">
  $border-color: #BCE8F1

  .form-captcha
    height: 70px
    display: flex
    align-items: flex-end

    img
      width: 143px
      height: 50px

    .captcha-refresher
      margin-left: 10px
      font-size: 12px
      color: #4A90E2
      cursor: pointer
      text-decoration: underline

  .form-method
    margin-top: 10px

  .forgot-password
    padding: 30px 0
    background: #F0F0F0
    label
      font-weight: normal
    .container
      height: 540px
      .titie-box
        margin-bottom: 20px
        text-align: center
        color: #4A4A4A
        h1
          font-size: 32px
          font-weight: normal
          margin-bottom: 20px
        p
          margin: 0px
      .panel.panel-info
        width: 640px
        margin: 0 auto
        border: none

        .panel-body
          .tab-content
            padding: 10px
            #method
              label[class*="col-"]
                cursor: pointer

                input[type="radio"]
                  display: none

                  &:checked ~ .image
                    background-position: -100px -361px

                .image
                  margin: 0 auto 5px
                  height: 55px
                  width: 90px
                  background: url('https://cdn.mr007.co/images/web/icon_007.png')
                    position: -100px -460px
                    repeat: no-repeat

                &:first-child
                  .image
                    background-position: -2px -460px

                  input[type="radio"]:checked ~ .image
                    background-position: -2px -364px

        .panel-footer
          div[class*="col-"]
            &.text-muted
              padding-top: 5px
            h4, p
              margin: 0
        .panel-info
          border: 0
        .form-control
          height: 50px
        .btn
          background: #00BFAA
          color: #FFFFFF
          width: 200px
          height: 50px
          border-radius: 25px
          font-size: 14px
          line-height: 40px
        .lump
          margin-right: 8px
          width: 5px
          height: 16px
          vertical-align: middle
        .lump-green
          background: #00BFAA
        .lump-orange
          background: #F5A623
        .btn-block
          height: 50px
          font-size: 14px
          color: #FFFFFF
          border-radius: 25px
        .btn-email
          background: #DF9418
        .btn-message
          margin-top: 20px
          background: #00BFAA
        .row
          margin-bottom: 20px
  @media (max-width: 768px)
    .forgot-password .container .panel.panel-info
      width: 100%
      margin: 0 auto
  @media (max-width: 414px)
    .form-captcha .captcha-refresher
      position: absolute
      top: 489px

  @media (max-width: 375px)
    .form-captcha .captcha-refresher
      position: absolute
      top: 509px

</style>
