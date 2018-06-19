<template>
  <modal :value="value" @input="$emit('input',false)">
    <h4 slot="header" class="modal-title text-center">
      <i class="fa fa-credit-card"></i>
      银行绑定
    </h4>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>银行卡号</th>
          <th>银行名称</th>
          <th>账户名称</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{{ bankDetails.account_no | hideChar('start', 5) }}</td>
          <td>{{ bankDetails.name }}</td>
          <td>{{ bankDetails.account_name | hideChar('end', 3) }}</td>
        </tr>
      </tbody>
    </table>
    <div slot="footer" class="text-center">
      <div class="col-xs-12 clearfix">
        <a class="btn btn-default" @click="isVisible = false">取消</a>
      </div>
    </div>
  </modal>
</template>

<script>
  import Modal from "@/components/shared/Modal";
  export default {
    name: "BankDetailsModal",
    components: {
      Modal
    },
    props: {
      value: {
        type: Boolean
      },
      bankDetails: {
        type: Object
      }
    }
  };
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .modal-mask .modal-wrapper .modal-container
    width: 500px

    .modal-header .modal-title
      color: $light-blue-2

    .modal-body
      table
        margin-bottom: 0

        tr td
          text-align: left
          font:
            size: 13px
            weight: 100

    .modal-footer
      border: none
      padding-top: 8px

      a
        font:
          size: 12px
          weight: 100
        padding: 0 15px
        line-height: 30px
        box-sizing: border-box


</style>
