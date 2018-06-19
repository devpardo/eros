<template>
  <nav class="row">

    <navigation-desktop class="hidden-xs" :links="links" :auth="auth" v-on="navigationListeners">
    </navigation-desktop>

    <navigation-mobile class="visible-xs" :links="links" :auth="auth" v-on="navigationListeners">
    </navigation-mobile>
    <no-ssr>
      <promo-modal :promo-id.sync="promoId" />
    </no-ssr>
    <modal v-model="modal.logout" noClose>
      <h4 slot="header" class="modal-title text-center">
        <span>温馨提示</span>
      </h4>
      <div>
        <p class="text-center">确定要退出登录？</p>
      </div>
      <div slot="footer">
        <a class="btn btn-default btn-confirm" @click="modal.logout = false">取消</a>
        <a class="btn btn-default btn-submit btn-confirm" @click="logout">确认</a>
      </div>
    </modal>
    <mail-modal v-if="auth" v-model="modal.mail" :key="auth ? auth.loginname : 'default'"></mail-modal>
  </nav>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavigationDesktop from "~/components/shared/NavigationDesktop";
import NavigationMobile from "~/components/shared/NavigationMobile";
import Modal from "~/components/shared/Modal";
import MailModal from "~/components/shared/MailModal";
import PromoModal from "~/components/shared/PromoModal";
export default {
  name: "Navigation",
  components: {
    NavigationDesktop,
    NavigationMobile,
    Modal,
    MailModal,
    PromoModal
  },
  data() {
    return {
      promoId: -1,
      modal: {
        logout: false,
        mail: false
      },
      navigationListeners: {
        logout: () => (this.modal.logout = true),
        mail: () => (this.modal.mail = true),
        login: this.login,
        lotto: this.launchLotto,
        promo: this.showPromoDialog,
        sport: this.launchSport
      },
      isScrolled: false
    };
  },
  computed: {
    ...mapGetters(["auth", "loading", "links"])
  },
  watch: {
    $route: {
      handler({ name }) {
        if (!this.$isServer && name !== "index") return;
        this.promoId = 0;
      },
      immediate: true
    }
  },
  methods: {
    showPromoDialog(id) {
      if (this.$store.getters.auth === null) {
        return this.$store.commit("modal/OPEN_MODAL", {
          content: "请先前往登录。",
          type: "error"
        });
      }
      this.promoId = id;
    },
    ...mapActions(["login"]),
    ...mapActions("platform", ["getPlatforms"]),
    ...mapActions("game", ["gameLaunch"]),
    async logout() {
      await this.$store.dispatch("logout");
      this.modal.logout = false;
    },
    async launchLotto() {
      if (!process.browser) return;
      try {
        const game = {
          gamename: "BB Lottery",
          img_url: ""
        };
        if (!this.auth) throw new Error("请登录后再操作。");
        window.game = window.open("", "_blank");
        window.game.document.title = `Launching Game: BB Lottery`;

        await this.$store.dispatch("game/launchGame", {
          game,
          platform: {
            platform: "BB"
          }
        });
      } catch (error) {
        this.$store.commit("modal/OPEN_MODAL", {
          content: error.message,
          type: "error"
        });
        window.game.close();
      } finally {
        window.game = null;
      }
    },

    async launchSport(link) {
      const { platform, game } = link;
      const key = link.platform;
      let screenWidth = window.screen.width;
      let screenHeight = window.screen.height;

      let left = (screenWidth - 1020) / 2;
      let top = (screenHeight - 680) / 2;
      let strWindowFeatures = `menubar=no,toolbar=no,location=no,resizable=no,scrollbars=no,status=no,innerHeight=680, innerWidth=1020,left=${left},top=${top}`;
      window[key] = window.open("", "", strWindowFeatures);
      try {
        await this.gameLaunch({
          platform,
          window: key
        });
      } catch (e) {
        // console.dir(e);
        if (!window[key]) return;
        if (platform === "SB") {
          window[key].location.href = "http://sb.mr2009.com/zh-cn/Sport/Index";
        } else {
          window[key].close();
        }
      }
    }
  }
};
</script>
