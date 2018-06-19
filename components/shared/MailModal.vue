<template>
  <modal :value="value" @input="input" :loading="loading" noClose :bodyClass="messageStyles.body">
    <h4 class="modal-title text-center" slot="header">站内信</h4>
    <table class="table table-striped">
      <thead>
        <tr>
          <th><input type="checkbox" v-model="checked" @click="checkAll" /></th>
          <th>标题</th>
          <th>日期</th>
          <th class="no-wrap">未/已读</th>
          <th>
            <i v-if="!loading" class="fa fa-trash cursor-pointer" @click="deleteAllCheckedMessages"></i>
            <i class="fa fa-refresh fa-spin" v-else></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(message,index) of currentPageMessages">
          <tr :key="`message-title-${index}`">
            <td><input type="checkbox" :value="message.id" v-model="checkedMessages" /></td>
            <td class="title txtleft" @click.self.stop="openMessage(message)">
              {{ message.message_title }}
            </td>

            <td class="txtleft">{{message.message_intime | date("YYYY/MM/DD") }}</td>
            <td>
              <i class="fa" :class="isMessageRead(message)"></i>
            </td>
            <td class="cursor-pointer txtleft" @click="deleteMessage(message.id)">
              <i class="fa fa-times-circle" v-if="!loading"></i>
              <i class="fa fa-refresh fa-spin" v-else></i>
            </td>
          </tr>

          <tr :key="`message-content-${index}`" v-if="openedMessages.includes(message.id)">
            <td colspan="5" class="message-content">
              {{message.message_content}}
            </td>
          </tr>

        </template>
      </tbody>
    </table>
    <div class="text-center" slot="footer">
      <div class="pagination-buttons">
        <button v-if="pagination.currentPage" class="btn btn-default" @click="pagination.currentPage--"> &lt; </button>
        <button class="btn btn-default" v-for="page of paginationPages" :key="page" @click="pagination.currentPage = page - 1" :class="[pagination.currentPage + 1 === page ? 'btn-info' : 'btn-default']"> {{ page }}</button>
        <button v-if="pagination.currentPage < pages - 1" class="btn btn-default" @click="pagination.currentPage++"> &gt; </button>
      </div>
      <a class="btn btn-default" @click="close">确定</a>
    </div>
  </modal>
</template>

<script>
// const message = {
//   id: 49,
//   isread: 0,
//   message_content: "test",
//   message_intime: "2018-05-10T03:34:43.000Z",
//   message_title: "test",
//   msgid: 61,
//   userid: 36160
// };
import { mapGetters, mapActions } from "vuex";
import Modal from "~/components/shared/Modal";
import { chunk } from "~/utils";
export default {
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
      loadingCounter: 0,
      isVisible: false,
      checkedMessages: [],
      checked: false,
      currentMessage: null,
      pagination: {
        currentPage: 0
      },
      openedMessages: []
    };
  },
  computed: {
    ...mapGetters("message", ["messages", "unreadCount"]),
    ...mapGetters(["auth"]),
    loading() {
      return !!this.loadingCounter;
    },
    messagePages() {
      return chunk([...this.messages] || [], 10);
    },
    currentPageMessages() {
      return this.messagePages[this.pagination.currentPage];
    },
    pages() {
      return this.messagePages.length;
    },
    paginationPages() {
      let number = this.pagination.currentPage;
      return Array.from({ length: 3 }, key => number++)
        .filter(Boolean)
        .filter(p => p <= this.pages);
    }
  },
  methods: {
    ...mapActions("message", ["getMessages", "removeMessage", "readMessage"]),
    isMessageRead(message) {
      return message.isread ? "fa-envelope-open" : "fa-envelope";
    },
    checkAll(event) {
      this.checkedMessages = !this.checked
        ? this.messages.map(message => message.id)
        : [];
    },
    async openMessage(message) {
      try {
        this.loadingCounter++;

        if (!message.isread) {
          await this.readMessage(message.id);
        }
        this.toggleMessage(message);
      } catch (error) {
      } finally {
        this.loadingCounter--;
      }
    },
    toggleMessage(message) {
      const exists = this.openedMessages.includes(message.id);
      console.log(exists, message.id);
      if (exists) {
        this.openedMessages = this.openedMessages.filter(
          id => id !== message.id
        );
        console.log("DELETED", message.id);
      } else {
        this.openedMessages.push(message.id);
      }
    },
    async deleteMessage(id) {
      try {
        this.loadingCounter++;
        await this.removeMessage(id);
      } catch (error) {
      } finally {
        this.loadingCounter--;
      }
    },
    async deleteAllCheckedMessages() {
      if (this.loading || !this.checkedMessages.length) return;
      await Promise.all(this.checkedMessages.map(this.deleteMessage));
      await this.getMessages();
    },
    close() {
      this.input(false);
    },
    input(val) {
      this.$emit("input", val);
    }
  },
  async mounted() {
    await this.getMessages();
    this.openedMessages = this.messages
      .filter(message => !!message.isread)
      .map(message => message.id);
  }
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .no-wrap
    white-space: nowrap
  .pagination-buttons
    display: flex
    justify-content: center
    padding:
      bottom: 10px
  .message-content
    text-decoration: none
    color: #222
  .modal-mask .modal-wrapper .modal-container
    width: 600px

    .modal-header
      h4
        color: $light-blue-2

    .modal-body
      table
        th
         font-size: 12px
        thead tr th td
          text-align: left

        .txtleft
          text-align: left

        tbody
          tr td
            font:
              size: $font-size-small
              weight: 100

            &.title
              width: 60%
              color: $light-blue-2
              cursor: pointer
              font-weight: 500

            i
              color: $gray-24
</style>


<style lang="sass" module="messageStyles">
  .body
    height: 400px
    overflow-y: auto

    @media screen and (max-width: 480px)
      height: 300px
</style>
