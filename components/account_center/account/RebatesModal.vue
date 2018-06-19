<template>
  <modal v-if="provider" :value="value" v-on="$listeners" :bodyClass="[rebatesModalStyles.body]" :headerClass="[rebatesModalStyles.header]" class="rebate">
    <template slot="header">
      <div class="rebate-header">
        <div class="name"></div>
        <div class="rebate-total">
          <i class="fa fa-cny"></i>
          {{parseFloat(provider.rebatesTotal).toFixed(2)}}
        </div>
        <span class="remark">当前平台可领返水奖金总额</span>
      </div>
    </template>
    <template>
      <div class="rebate-cat">
        <ul>
          <template v-if="!provider.rebates.length">
            <li>
              <p>暂无返水数据</p>
            </li>
          </template>
          <li>
            <div class="rebate-box" v-for="(rebate,index) of provider.rebates" :key="index">
              <span class="rebate-data">{{rebate.rebateday | date("YYYY-MM-DD, hh:mm:ss")}}</span>
              <span class="rebate-amount">
                <i class="fa fa-cny"></i>{{parseFloat(rebate.amount).toFixed(2)}}</span>
            </div>
          </li>
        </ul>
      </div>
      <!--<table class="table table-bordered">-->
      <!--<thead>-->
      <!--<tr>-->
      <!--<th v-for="(column,index) of columns" :key="index">{{ column }}</th>-->
      <!--</tr>-->
      <!--</thead>-->
      <!--<tbody>-->
      <!--<template v-if="!provider.rebates.length">-->
      <!--<tr>-->
      <!--<td colspan="3">No Rebates</td>-->
      <!--</tr>-->
      <!--</template>-->
      <!--<tr v-for="(rebate,index) of provider.rebates" :key="index">-->
      <!--<td>{{rebate.rebateday | date}}</td>-->
      <!--<td>{{rebate.amount}}</td>-->
      <!--<td>{{rebate.remark}}</td>-->
      <!--</tr>-->
      <!--</tbody>-->
      <!--</table>-->
    </template>
    <template slot="footer" class="footer">
      <div class="btn btn-primary" @click="transferRebates" :disabled="loading"> 一键领取 </div>
    </template>
  </modal>
</template>


<script>
import { mapActions } from "vuex";
import Modal from "~/components/shared/Modal";
export default {
  name: "RebatesModal",
  components: {
    Modal
  },
  props: {
    value: {
      type: Boolean
    },
    provider: {
      type: Object
    }
  },
  data() {
    return {
      rebate: 0,
      columns: ["返水", "金额", "备注"],
      loading: false
    };
  },
  methods: {
    ...mapActions("provider", ["useRebates"]),
    async transferRebates() {
      if (!this.provider.rebatesTotal) return;
      try {
        this.loading = true;
        await this.useRebates(this.provider);
        this.$emit("input", false);
      } catch (error) {
        this.$notify(error.message, "error");
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="sass" module="rebatesModalStyles">
  .body,
  .header
    padding: 0 !important
  .body
    padding: 20px !important
</style>
<style lang="sass" scoped>
  .btn-primary
    width: 100%
    text-align: center !important
    padding: 10px 0
    border-radius: 30px
    font-size: 14px
  .rebate
    .rebate-header
      background: linear-gradient(70deg, #053754, #2664a4)
      height: 120px
      .name
      .rebate-total
        color: #ffc554
        font-size: 40px
        padding: 25px 0 2px 0
        font-weight: 900
        .fa
          font-size: 14px
          color: rgba(#fff, .5)
      .remark
        font-size: 12px
        color: rgba(#fff, .5)
  .rebate-cat
    overflow-y: auto
    max-height: 300px
    li
      width: 100%
      text-align: left
      .rebate-box
        width: 22%
        margin-right: 10px
        margin-bottom: 10px
        display: inline-block
        border-radius: 4px
        text-align: center
        span
          float: left
          width: 100%
          &:first-child
            padding: 10px
          &:nth-child(2)
            padding: 10px
        .rebate-data
          background: #2c6fae
          font-size: 12px
          color: #fff
        .rebate-amount
          background: #f2f2f2
          color: #2c6fae
          font-size: 1.2em
        .fa
          font-size: 14px
          color: #999
</style>
