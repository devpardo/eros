<template>
  <modal :value="value" @input="onInput" noClose>
    <h4 class="modal-title text-center" slot="header">更改密码</h4>
    <label class="form-group clearfix">
      <p>旧密码</p>
      <!--<input class="form-control" type="password" v-model="form.passwordOld" v-validate="validations.passwordOld.rules" :data-vv-as="validations.passwordOld.alias" name="passwordOld" placeholder="旧密码" :error="errors.has('passwordOld')"/>-->
      <input class="form-control" type="password" v-model="form.passwordOld" name="passwordOld" placeholder="旧密码" :error="errors.has('passwordOld')"/>
      <span v-if="errors.has('passwordOld')" class="text-red">
        {{errors.first('passwordOld')}}
      </span>
    </label>
    <label class="form-group clearfix">
      <p>新密码</p>
      <input class="form-control" type="password" v-model="form.passwordNew" v-validate="validations.passwordNew.rules" :data-vv-as="validations.passwordNew.alias" name="passwordNew" placeholder="8位以上数字及英文字母组合" :error="errors.has('passwordNew')"/>
      <span v-if="errors.has('passwordNew')" class="text-red">
        {{errors.first('passwordNew')}}
      </span>
    </label>
    <label class="form-group clearfix">
      <p>确认新密码</p>
      <input class="form-control" type="password" v-model="form.confirmPassword" v-validate="confirmPasswordRules" :data-vv-as="validations.confirmPassword.alias" name="confirmPassword" placeholder="必须与登录密码相一致" :error="errors.has('confirmPassword')" />
      <span v-if="errors.has('confirmPassword')" class="text-red">
        {{errors.first('confirmPassword')}}
      </span>
    </label>
    <div class="text-center" slot="footer">
      <div class="col-xs-12 clearfix">
        <a class="btn btn-default btn-submit pull-right" @click="onSubmit" :disabled="loading">确定</a>
        <a class="btn btn-default pull-right" @click="close" :disabled="loading">取消</a>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from "@/components/shared/Modal";
import { mapActions } from "vuex";
export default {
  name: "ChangePasswordModal",
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
      loading: false,
      form: {
        passwordOld: "",
        passwordNew: "",
        confirmPassword: ""
      },
      validations: {
        passwordOld: {
          rules: {
            required: true,
            alpha_num: true,
            min: [8],
            max: [30]
          },
          alias: "旧密码"
        },
        passwordNew: {
          rules: {
            required: true,
            regex: /(?=.*[a-zA-Z])(?=.*[0-9])([a-zA-Z0-9]+)$/,
            alpha_num: true,
            min: [8],
            max: [30]
          },
          alias: "新密码"
        },
        confirmPassword: {
          rules: {
            required: true,
            regex: /(?=.*[a-zA-Z])(?=.*[0-9])([a-zA-Z0-9]+)$/,
            alpha_num: true,
            min: [8],
            max: [30]
          },
          alias: "确认密码"
        }
      },
      validationMessages: {
        passwordOld: {
          alpha_num: "输入旧密码"
        },
        passwordNew: {
          regex: "新密码 只能包含字母数字",
          alpha_num: "输入新密码"
        },
        confirmPassword: {
          regex:"确认密码 只能包含字母与数字",
          is: "确认密码必须与新密码相一致"
        }
      }
    };
  },
  computed: {
    confirmPasswordRules() {
      console.log(this.form.passwordNew, this.form.confirmPassword);
      return {
        ...this.validations.confirmPassword.rules,
        is: [this.form.passwordNew]
      };
    },
    isFormValid() {
      return !this.$validator.errors.any();
    }
  },
  methods: {
    ...mapActions(["changePassword"]),
    async onSubmit() {
      try {
        if (this.loading) return;
        if (!this.isFormValid)
          throw new Error("确认密码必须与登录密码相一致。");
        this.loading = true;
        await this.changePassword({
          old: this.form.passwordOld,
          new: this.form.passwordNew
        });
        this.close();

        this.$notify("密码更改成功");
      } catch (error) {
        this.$store.commit("modal/OPEN_MODAL", {
          title: "失败",
          content: error.message,
          type: "error"
        });
      } finally {
        this.loading = false;
      }
    },
    onInput(event) {
      this.$emit("input", event);
    },
    close() {
      this.password = {
        passwordOld: "",
        passwordNew: "",
        confirmPassword: ""
      };
      this.onInput(false);
    }
  },
  created() {
    this.$validator.localize("zh_CN", {
      custom: this.validationMessages
    });
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .modal-mask .modal-wrapper .modal-container
    width: 400px

    .modal-header
      padding: 20px 0
      border-bottom: 1px solid $gray-15

      h4
        color: $light-blue-3

    .modal-body
      padding:
        top: 25px
        bottom: 15px

      .form-group
        display: block
        width: 100%
        margin-bottom: 15px

        p
          text-align: left
          line-height: 34px
          font-weight: 100

        input
          box-shadow: none

    .modal-footer
      a
        font:
          size: 12px
          weight: 100
        margin-left: 5px
        min-width: 90px
        line-height: 30px
        padding: 0 15px

        &.btn-submit
          background: $light-blue-3
          border-color: $light-blue-3
          color: white
</style>
