<template>
  <section class="account-center-holder">
    <div class="account-center container custom-padding">
      <filters :page="page" :loading.sync="loading" @change="filter = $event" />
      <data-table :key="filter" :items="transactions" :columns="columns" :properties="properties" :server="server" :loading="loading" @page="setPage">
        <template slot="item" slot-scope="{ item }">
          <td>
            <div class="hidden-xs">
              {{ item.date | date("YYYY-MM-DD hh:mm:ss") }}
            </div>
            <div class="visible-xs">
              <div>
                {{ item.date | date("YYYY-MM-DD") }}
              </div>
              <div>
                {{ item.date | date("hh:mm:ss") }}
              </div>
            </div>
          </td>
          <td>{{ item.message }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.no }}</td>
        </template>
      </data-table>
    </div>
  </section>
</template>

<script>
import Filters from "~/components/account_center/records/Filters";
import DataTable from "~/components/account_center/records/DataTable";
import { mapGetters } from "vuex";

export default {
  middleware: "notAuthorized",
  components: {
    Filters,
    DataTable
  },
  data() {
    return {
      properties: ["date", "message", "amount", "no"],
      columns: ["创建时间", "交易明细", "交易金额", "订单号"],
      page: 1,
      loading: false,
      filter: ""
    };
  },
  computed: {
    ...mapGetters("transaction", ["transactions", "pages", "totalRecords"]),
    server() {
      return this.pages && this.totalRecords
        ? {
            pages: this.pages,
            total: this.totalRecords
          }
        : null;
    }
  },
  methods: {
    setPage(page) {
      this.page = page + 1;
    }
  }
};
</script>

<style lang="sass" scoped>
  .page-enter, .page-leave-to 
    opacity: 1
  
  .page-enter-active, .page-leave-active 
    transition-duration: 0s !important

  .account-center-holder
    .account-center
      padding: 20px 15px
      position: relative
</style>
