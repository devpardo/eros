<template>
  <div class="providers">
    <div class="col-md-4 col-sm-6 col-xs-12 custom-padding" v-for="(provider,index) of providers" :key="index">
      <provider :provider="provider" :modal.sync="modal" :type.sync="currentModalType" :index="index" :class="`provider-${provider.id}`" />
    </div>
    <provider-modal v-if="currentProvider && currentModalType !== 'TRANSFER_BONUS'" v-model="modal" :provider="currentProvider" :type.sync="currentModalType" :key="providerKey" />
    <rebates-modal v-else-if="currentProvider" v-model="modal" :provider="currentProvider" :key="providerKey" />
  </div>
</template>

<script>
import Provider from "@/components/account_center/account/Provider";
import ProviderModal from "@/components/account_center/account/ProviderModal";
import RebatesModal from "@/components/account_center/account/RebatesModal";
import Modal from "~/components/shared/Modal";
import AnimatedNumber from "~/components/shared/AnimatedNumber";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Provider,
    Modal,
    AnimatedNumber,
    ProviderModal,
    RebatesModal
  },
  data() {
    return {
      modal: false,
      currentModalType: "TRANSFER_IN"
    };
  },
  computed: {
    ...mapGetters("provider", ["providers", "currentProvider"]),
    providerKey() {
      return this.currentProvider
        ? this.currentProvider.enname + this.currentModalType
        : "default";
    }
  },
  async beforeMount() {
    await this.$store.dispatch("provider/getProviders");
  }
};
</script>

<style lang="sass" scoped>

  .provider-1
    border-left-color: #13426D !important

  .provider-2
    border-left-color: #006934 !important

  .provider-3
    border-left-color: #DF384C !important

  .provider-4
    border-left-color: #F24200 !important

  .provider-5
    border-left-color: #0D628F !important

  .provider-6
    border-left-color: #F08704 !important

  .provider-7
    border-left-color: #E7AC25 !important

  .provider-8
    border-left-color: #000 !important

  .provider-9
    border-left-color: #F08704 !important

  .provider-10
    border-left-color: #226606 !important

  .provider-11
    border-left-color: #076899 !important

  .provider-12
    border-left-color: #f08704 !important

</style>
