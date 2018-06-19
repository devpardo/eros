<template>
  <div class="platform-menu">
    <div class="container mobile-container">
      <div class="platform-details">
        <div class="platform-title">
          <h3>{{platform.name}}</h3>
        </div>
        <template v-if="auth && platformProvider">
          <div class="platform-account-details">
            <animated-number v-if="!loading && platformProvider.status" :value="balance">
              <template slot-scope="{ number }">
                平台余额：
                <div class="balance">
                  ¥{{number}}
                </div>
              </template>
            </animated-number>
            <span v-else-if="loading">
              <img src="~assets/images/loading.bubbles.svg">
            </span>
            <span v-else-if="!platformProvider.status">
              {{maintenance || "平台维护"}}
            </span>
          </div>
          <div v-if="platformProvider.status && platformProvider.wallet" class="platform-actions">
            <template v-for="(button, index) of buttons">
              <div :key="index" @click="modalOpen(button)" class="cursor-pointer">
                <i :class="[button.icon]"></i>
                {{button.label}}
              </div>
              <span v-if="index === 0" :key="`${index}-slash`"> / </span>
            </template>
          </div>
        </template>
        <!-- <div v-if="platform.platform === 'PT'" class="pull-right">
          <div class="download-area">
            <a href="http://cdn.genesis-pt.net/mr007/setupglx.exe">
              <i class="fa fa-download"></i> 下载PT桌面版</a>
          </div>
        </div> -->
      </div>
    </div>
    <provider-modal v-if="currentProvider" v-model="modal.transfer" :provider="currentProvider" :type.sync="currentModalType" :key="providerKey" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AnimatedNumber from "~/components/shared/AnimatedNumber";
import ProviderModal from "~/components/account_center/account/ProviderModal";
export default {
  components: {
    AnimatedNumber,
    ProviderModal
  },
  props: {
    platform: {
      type: Object
    }
  },
  data() {
    return {
      loader: 0,
      maintenance: "",
      modal: {
        transfer: false,
        rebates: false
      },
      currentModalType: "TRANSFER_IN",
      buttons: [
        {
          type: "TRANSFER_IN",
          class: "btn-transparent",
          icon: "fa fa-repeat",
          label: "转入"
        },
        {
          type: "TRANSFER_OUT",
          class: "btn-transparent",
          icon: "fa fa-repeat fa-flip-horizontal",
          label: "转出"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["auth"]),
    ...mapGetters("provider", ["currentProvider", "providers"]),
    isNewPT() {
      return (
        this.platform &&
        (this.platform.platform === "SWPT" || this.platform.platform === "PG")
      );
    },
    loading() {
      return !!this.loader;
    },
    platformProvider() {
      return this.providers.find(
        provider => provider.enname === this.platform.platform
      );
    },
    balance() {
      return !this.platformProvider.wallet
        ? this.auth.balance
        : parseFloat(this.platformProvider.balance) || 0;
    },
    providerKey() {
      return this.currentProvider
        ? this.currentProvider.enname + this.currentModalType
        : "default";
    }
  },
  watch: {
    auth: "getProviderWithBalance"
  },
  methods: {
    ...mapActions("provider", [
      "getProviderBalance",
      "setProvider",
      "getProvider",
      "getDiscounts"
    ]),

    async onGetProviderBalance() {
      try {
        this.loader++;
        await this.getProviderBalance(this.platformProvider);
      } catch (error) {
        this.maintenance = error.message;
      } finally {
        this.loader--;
      }
    },
    async onGetProvider() {
      this.loader++;
      await this.getProvider(this.platformProvider);
      this.loader--;
    },
    async onGetDiscounts() {
      try {
        this.loader++;
        await this.getDiscounts(this.platformProvider);
      } catch (error) {
      } finally {
        this.loader--;
      }
    },
    async modalOpen(button) {
      await this.setProvider(this.platformProvider);
      this.currentModalType = button.type;
      this.modal.transfer = true;
    },
    async getProviderWithBalance() {
      await this.onGetProvider();
      await Promise.all([this.onGetProviderBalance(), this.onGetDiscounts()]);
    }
  },
  async mounted() {
    await this.getProviderWithBalance();
  }
};
</script>


<style lang="sass" scoped>
.download-area
  padding-top: 10px
  cursor: pointer
  margin-top: 10px!important

  a
    text-decoration: none
    color: rgba(#fff, .5)
    font-size: 12px
    padding: 10px 40px
    border: 1px solid rgba(#fff, .5)
    border-radius: 40px
    &:hover
      background: #FFFFFF
      color: #000
.platform-menu
  color: #ffffff
  .container
    padding: 0
  .platform-details
    .balance
      color: #fdcc63
    div
      display: inline-block
      margin: 0
      &:first-child
        margin-left: 0
        margin-right: 20px
    .platform-actions
      color: #4A90E2
      div
        color: #4A90E2
        margin: 0 3px
        text-decoration: underline
        margin: 0 5px
@media (max-width: 375px and 414px)
  .platform-menu
    .platform-details
      div
        display: inline-block
        margin: 0 3px
</style>
