import AnimatedNumber from "@/components/shared/AnimatedNumber";
import { mapGetters } from "vuex";
export default {
  components: {
    AnimatedNumber
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    auth: {
      type: Object
    },
    links: {
      type: Array
    },
    gamesDropDown: {
      type: Boolean
    },
    sportsDropDown: {
      type: Boolean
    }
  },
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      refreshing: false
    };
  },
  computed: {
    ...mapGetters("message", ["messages", "unreadCount"]),
    balance() {
      const balance = this.auth ? this.auth.balance : 0;
      return parseFloat(balance).toFixed(2);
    },
    classRefreshing() {
      return this.refreshing ? "fa-spin" : "";
    }
  },
  methods: {
    closeGamesDropDown() {
      this.$emit("update:gamesDropDown", false);
    },
    closeSportsDropDown() {
      this.$emit("update:sportsDropDown", false);
    },
    toggle() {
      this.$emit("input", !this.value);
    },
    async refreshBalance() {
      if (this.refreshing) return;
      this.refreshing = true;
      await this.$store.dispatch("getAuth");
      this.refreshing = false;
    },
    logout() {
      this.credentials = {
        username: "",
        password: ""
      };
      this.$emit("logout");
    }
  }
};
