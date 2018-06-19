<template>
  <div class="account-details clearfix" v-if="auth">
    <div class="user-balance col-md-3 col-sm-3 col-xs-12 custom-padding">
      <div class="ad-container">
        <p class="label-balance">主账户余额：</p>
        <p class="balance">
          <span class="currency">¥</span>
          <animated-number class="balance" :value="auth.balance">
            <template slot-scope="{ number }">{{ number }}</template>
          </animated-number>
        </p>
        <a class="refresh-balance" href="javascript:void(0)" @click="onRefreshBalance" :class="[classRefreshing]">
          <i class="fa fa-refresh"></i>
        </a>
      </div>
    </div>
    <div class="desktop-ac">

      <div class="user-details col-md-9 col-sm-9 col-xs-12 ">
        <div class="ad-container clearfix hide-content">
          <div class="img-vip-holder col-sm-2" :class="`vip-level-${ auth.userlevel }`">
            <span class="sr-only"></span>
          </div>
          <div class="other-details col-lg-11 col-md-10 col-sm-10">
            <div class="username-change-password clearfix">
              <p class="pull-left username">{{ auth.loginname }}</p>
              <a class="pull-right trigger-change-password" href="javascript:void(0)" @click="modal.change = true">
                <i class="fa fa-lock"></i>修改密码</a>
            </div>
            <div class="personal-details clearfix">
              <div class="col-md-6 col-sm-12 email">
                <p>
                  <span class="icon-holder">
                    <i class="fa fa-envelope"></i>
                  </span>{{ auth.email | maskChars(4) }}
                  <template v-if="!auth.emailstatus">
                    <!-- <a href="javascript:void(0)" @click="modal.email = true">申请验证 </a>
                    <a href="javascript:void(0)" @click="modal.code = true"> (验证码) </a> -->
                    <a href="javascript:void(0)" @click="modal.email = true"> (申请验证) </a>
                  </template>
                  <span v-else>
                    <a href="https://chat7.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=378548&configID=52507&jid=5460920356&s=1" target="_blank"> (修改) </a>
                  </span>
                </p>
                <p>
                  <span class="icon-holder">
                    <i class="fa fa-birthday-cake"></i>
                  </span>{{ auth.birthday }}</p>
              </div>
              <div class="col-md-6 col-sm-12 bank">
                <p>
                  <span class="icon-holder">
                    <i class="fa fa-user"></i>
                  </span>{{ auth.username | replaceChar(auth.username.length - 1,true) }}</p>
                <p>
                  <span class="icon-holder">
                    <i class="fa fa-credit-card"></i>
                  </span>
                  {{ !accounts.length ? "暂无绑定银行卡" : `${accounts.length} 已绑定银行卡` }}
                  <!-- <a href="javascript:void(0)" @click="onShowModalBanks">查看详情</a>
                  <a href="javascript:void(0)" @click="showAddBank"> withdraw</a> -->
                  <!-- <a v-if="!accounts.length" href="javascript:void(0)" @click="showAddBank">(add banks)</a> -->
                  <!-- <a v-else href="javascript:void(0)" @click="onShowModalBanks"> (show bank)</a> -->
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mobile-ac">
      <div class="show-details">
        <a data-toggle="collapse" class="kulapse" @click.stop="toggleLink('showdetails')">显示帐户详情
          <span v-if="currentLink === 'showdetails'" class="pull-right btn-close-open">
            <i class="fa fa-angle-up"></i>
          </span>
          <span v-else class="pull-right btn-close-open">
            <i class="fa fa-angle-down"></i>
          </span>
        </a>
      </div>
      <div class="panel-collapse collapse show" v-if="currentLink === 'showdetails'">
        <div class="panel-body hide-panel-pad">
          <div class="user-details col-md-9 col-sm-9 col-xs-12 custom-padding">
            <div class="ad-container clearfix">
              <div class="img-vip-holder col-sm-2" :class="`vip-level-${ auth.userlevel }`">
                <span class="sr-only"></span>
              </div>
              <div class="other-details col-sm-10">
                <div class="username-change-password clearfix">
                  <p class="pull-left username">{{ auth.loginname }}</p>
                  <a class="pull-right trigger-change-password" href="javascript:void(0)" @click="modal.change = true">
                    <i class="fa fa-lock"></i>修改密码</a>
                </div>
                <div class="personal-details clearfix">
                  <div class="col-md-6 col-sm-12 email">
                    <p>
                      <span class="icon-holder">
                        <i class="fa fa-envelope"></i>
                      </span>{{ auth.email | maskChars(4) }}
                      <template v-if="!auth.emailstatus">
                        <!-- <a href="javascript:void(0)" @click="modal.email = true">申请验证 </a>
                        <a href="javascript:void(0)" @click="modal.code = true"> (验证码) </a> -->
                        <a href="javascript:void(0)" @click="modal.email = true"> (申请验证) </a>
                      </template>
                      <span v-else>
                        <a href="https://chat7.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=378548&configID=52507&jid=5460920356&s=1" target="_blank"> (修改) </a>
                      </span>
                    </p>
                    <p>
                      <span class="icon-holder">
                        <i class="fa fa-birthday-cake"></i>
                      </span>{{ auth.birthday }}</p>
                  </div>
                  <div class="col-md-6 col-sm-12 bank">
                    <p>
                      <span class="icon-holder">
                        <i class="fa fa-user"></i>
                      </span>{{ auth.username | replaceChar(auth.username.length - 1,true) }}</p>
                    <p>
                      <span class="icon-holder">
                        <i class="fa fa-credit-card"></i>
                      </span>
                      {{ !accounts.length ? "暂无绑定银行卡" : `${accounts.length} 已绑定银行卡` }}
                      <!-- <a href="javascript:void(0)" @click="onShowModalBanks">查看详情</a>
                      <a href="javascript:void(0)" @click="showAddBank"> withdraw</a> -->
                      <!-- <a v-if="!accounts.length" href="javascript:void(0)" @click="showAddBank">(add banks)</a> -->
                      <!-- <a v-else href="javascript:void(0)" @click="onShowModalBanks"> (show bank)</a> -->
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-12">
      <hr>
    </div>
    <modal v-model="modal.bank">
      <h4 class="modal-title text-center" slot="header">
        <i class="fa fa-credit-card"></i>银行绑定</h4>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>银行卡号</th>
            <th>银行名称</th>
            <th>账户名称</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="!loading.banks">
            <tr v-for="(bank,index) of accounts" :key="index">
              <td>{{ bank.account | hideChar('start', 5) }}</td>
              <td>{{ bank.bankname }}</td>
              <td>{{ bank.accountname | hideChar('end', 3) }}</td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="3">装载银行</td>
          </tr>
        </tbody>
      </table>
      <div class="text-center" slot="footer">
        <div class="col-xs-12 clearfix">
          <a class="btn btn-default" @click="modal.bank = false">取消</a>
        </div>
      </div>
    </modal>

    <!-- <modal v-model="modal.email">
      <h4 class="modal-title text-center" slot="header">确认：是否进行邮箱号码验证</h4>
      <div class="text-center" slot="footer">
        <div class="col-xs-12 clearfix">
          <div class="btn btn-default" @click="modal.email = false">取消</div>
          <div class="btn btn-default btn-submit" @click="onSendEmailVerification">发送验证</div>
        </div>
      </div>
    </modal> -->
    <modal v-model="modal.email" noClose>
      <h4 class="modal-title text-center" slot="header">请求验证代码</h4>
      <div class="modal-body">
        <a href="javascript:void(0)" @click="onSendEmailVerification">
          <i class="fa fa-send"></i> 将验证发送到电子邮件</a> <br>
        <a href="https://chat7.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=378548&configID=52507&jid=5460920356&s=1" target="_blank">
          <i class="fa fa-phone"></i> 联系客户服务</a>
      </div>
      <div class="text-center" slot="footer">
        <div class="col-xs-12 clearfix">
          <div class="btn btn-default" @click="modal.email = false">取消</div>
        </div>
      </div>
    </modal>
    <modal v-model="modal.code" noClose>
      <h4 class="modal-title text-center" slot="header">输入电子邮件验证码</h4>
      <input v-model="code" class="form-control" type="text" placeholder="电子邮件验证码" />
      <div class="text-center" slot="footer">
        <div class="col-xs-12 clearfix">
          <div class="btn btn-default" @click="modal.code = false">取消</div>
          <div class="btn btn-default btn-submit" @click="onVerifyEmailVerification">发送验证</div>
        </div>
      </div>
    </modal>
    <change-password-modal v-model="modal.change"></change-password-modal>
    <bank-modal v-model="modal.bankAdd" />
  </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import Modal from "@/components/shared/Modal";
import BankModal from "@/components/account_center/withdraw/BankModal";
import ChangePasswordModal from "@/components/account_center/account/ChangePasswordModal";
export default {
  components: {
    AnimatedNumber,
    Modal,
    BankModal,
    ChangePasswordModal
  },
  data() {
    return {
      currentLink: "",
      modal: {
        bank: false,
        change: false,
        email: false,
        bankAdd: false,
        code: false,
        withdraw: false
      },
      code: "",
      refreshing: false,
      loading: {
        banks: false
      }
    };
  },
  computed: {
    ...mapGetters(["auth"]),
    ...mapGetters("bank", ["accounts"]),
    classRefreshing() {
      return this.refreshing ? "fa-spin" : "";
    }
  },
  methods: {
    ...mapActions(["sendEmailVerification", "verifyEmailVerification"]),
    async onRefreshBalance() {
      this.refreshing = true;
      await this.$store.dispatch("getAuth");
      this.refreshing = false;
    },
    async onSendEmailVerification() {
      await this.sendEmailVerification();
      this.modal.email = false;
      this.modal.code = true;
    },
    async onVerifyEmailVerification() {
      if (!this.code) return;
      try {
        await this.verifyEmailVerification(this.code);
        this.modal.code = false;
      } catch (error) {
        this.$notify(error.message, "error");
      } finally {
        this.code = "";
      }
    },
    async onShowModalBanks() {
      this.modal.bank = true;
      this.loading.banks = true;
      await this.$store.dispatch("bank/getAccounts");
      this.loading.banks = false;
    },
    onShowModalWithdraw() {
      this.modal.withdraw = true;
    },
    showAddBank() {
      this.modal.bankAdd = true;
    },
    toggleLink(name) {
      this.currentLink = this.currentLink === name ? "" : name;
    }
  },
  async mounted() {
    await this.$store.dispatch("bank/getAccounts");
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'

  .kulapse
    height: 40px
    display: block
    line-height: 40px

  .btn-close-open
    display: inline-block
    margin-top: 6px
    width: 25px
    height: 25px
    background: #ffffff
    text-align: center
    line-height: 25px
    border: 1px solid #e3e3e3
    border-radius: 3px
    font-size: 18px

  .balance
    font-size: 32px !important
  .account-details
    margin-top: 15px

    .user-balance
      padding-right: 0

    .user-details
      padding-left: 10px

    .ad-container
      min-height: 100px
      padding: 17px
      background: #F5F5F5
      position: relative

      p
        margin-bottom: 0
        color: #4A4A4A

        &.balance
          font-size: 32px

          span
            font-size: 14px

      a.refresh-balance
        position: absolute
        top: 18px
        right: 15px

        i
          color: #9B9B9B

      .img-vip-holder
        padding: 0
        height: 58px
        width: 68px
        background-position: center center
        background-size: contain
        background-repeat: no-repeat

      .other-details
        p.username
          font-weight: 100
          letter-spacing: .5px

        .trigger-change-password
          color: #9B9B9B
          font-size: 12px

          i
            margin-right: 5px

        .personal-details
          margin-top: 6px
          p, i, span
            color: #9B9B9B
            font-size: 12px
            letter-spacing: 0.5px

          p
            line-height: 20px

            span.icon-holder
              display: inline-block
              width: 20px

          .email
            padding-left: 0

          .bank
            border-left: 1px solid #D7D7D7

    @media only screen and (max-width: 768px)
      .user-balance
        padding-right: 15px
        margin-bottom: 15px

      .user-details
        padding-left: 15px
        margin-bottom: 15px

  .v-select, .v-select *
    text-align: left!important
    & /deep/ button.clear
      display: none !important

  .modal-mask .modal-wrapper .modal-container
    .modal-header
      padding: 20px 0
      border-bottom: 1px solid $gray-15

      h4
        color: $light-blue-3

    .modal-body
      padding:
        top: 25px
        bottom: 10px

      .form-group
        display: block
        width: 100%
        margin-bottom: 20px

        p
          text-align: left
          line-height: 34px
          font-weight: 100

    .modal-footer
      a
        margin-left: 5px
        min-width: 90px

        &.btn-submit
          background: $light-blue-3
          border: none
          color: white
          padding: 7px 12px

  .vip-level-0
    background: url("~/assets/images/lvlico/lv0.png")

  .vip-level-1
    background: url("~/assets/images/lvlico/lv1.png")

  .vip-level-2
    background: url("~/assets/images/lvlico/lv2.png")

  .vip-level-3
    background: url("~/assets/images/lvlico/lv3.png")

  .vip-level-4
    background: url("~/assets/images/lvlico/lv4.png")

  .vip-level-5
    background: url("~/assets/images/lvlico/lv5.png")

  .vip-level-6
    background: url("~/assets/images/lvlico/lv6.png")

  .vip-level-7
    background: url("~/assets/images/lvlico/lv7.png")

  .vip-level-8
    background: url("~/assets/images/lvlico/lv8.png")

  .vip-level-9
    background: url("~/assets/images/lvlico/lv9.png")

  .vip-level-10
    background: url("~/assets/images/lvlico/lv10.png")

  .vip-level-11
    background: url("~/assets/images/lvlico/lv11.png")

  .vip-level-12
    background: url("~/assets/images/lvlico/lv12.png")

  .vip-level-13
    background: url("~/assets/images/lvlico/lv12.png")

  @media only screen and (max-width: 768px)
    .other-details .personal-details .bank
      border: none !important
      padding-left: 0

  @media (max-width: 414px)
    .desktop-ac
      display: none
    .show-details
      padding: 0 15px
    .account-details
      margin-bottom: 15px
    .user-details
      margin-top: 15px
    .panel-body.hide-panel-pad
      padding: 0
  @media (min-width: 768px)
    .mobile-ac
      display: none


</style>
