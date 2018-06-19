import Vue from "vue";
import {
  cookieStorage,
  parseCookie,
  sleep,
  random,
  encodeToken,
  reverseString
} from "@/utils";
import bannersJSON from "@/json/banners.json";
import noticesJSON from "@/json/notices";

const privateRoutes = ["lobby", ""];

export const state = () => ({
  credential: {
    username: "",
    password: ""
  },
  auth: {
    token: null,
    user: null,
    refreshing: false
  },
  loading: false,
  levels: [],
  banners: [],
  notices: [],
  cooperation: [],
  treasures: [],
  lottery: [],
  links: [
    {
      id: "Home",
      name: "首页",
      to: {
        name: "index"
      }
    },
    {
      id: "Game",
      name: "老虎机",
      badge: "新游",
      to: {
        name: "game"
      },
      links: []
    },
    {
      id: "Casino",
      name: "真人娱乐",
      to: {
        name: "casino"
      }
    },
    {
      id: "Fishing",
      name: "全民捕鱼",
      to: {
        name: "fishing"
      }
    },
    {
      id: "Sport",
      name: "体育",
      badge: "电子竞技",
      links: []
    },
    {
      id: "Lotto",
      name: "彩票",
      event: "lotto",
      auth: true,
      platform: "BB",
      game: {
        gamename: "BB Lottery"
      }
    },
    {
      id: "Level",
      name: "VIP特权",
      to: {
        name: "level"
      }
    },
    {
      id: "Promo",
      name: "优惠活动",
      to: {
        name: "promo"
      }
    },
    {
      id: "Cooperation",
      name: "加盟合作",
      to: {
        name: "new-cooperation"
      }
    }
  ]
});

export const getters = {
  auth: state => state.auth.user,
  token: state => state.auth.token,
  banners: state => state.banners,
  notices: state => state.notices,
  credential: state => state.credential,
  levels: state => state.levels,
  cooperation: state => state.cooperation,
  treasures: state => (state.treasures ? state.treasures.treasure_list : []),
  treasureTotalConsume: state =>
    state.treasures ? state.treasures.total_consume : 0,
  lottery: state => state.lottery,
  links: state => state.links,
  isMobile: () => /Mobi/i.test(window.navigator.userAgent)
};

export const mutations = {
  SET_AUTH: (state, payload) => {
    // if (payload) cookieStorage.setItem("user", payload);
    // else cookieStorage.removeItem("user");
    state.auth.user = payload;
  },
  SET_TOKEN: (state, payload) => {
    if (payload) cookieStorage.setItem("token", payload, { expires: 7 });
    else cookieStorage.removeItem("token");
    state.auth.token = payload;
  },
  SET_LOADING: (state, payload) => (state.loading = payload),
  SET_BANNERS: (state, payload) => (state.banners = payload),
  SET_NOTICES: (state, payload) => (state.notices = payload),
  SET_COOPERATION: (state, payload) => (state.cooperation = payload),
  SET_CREDENTIAL: (state, { username, password }) =>
    (state.credential = { username, password }),
  SET_MAIN_BALANCE: (state, payload) =>
    state.auth.user ? (state.auth.user.balance = payload) : null,
  SET_REFRESHING: (state, payload = false) => (state.auth.refreshing = payload),
  SET_LEVEL: (state, levels) => {
    state.levels = levels;
  },
  SET_TREASURES: (state, payload) => (state.treasures = payload),
  SET_LOTTERY: (state, payload) => (state.lottery = payload),
  SET_LINKS: (state, payload) => (state.links = payload)
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    // Cookie Based Auth
    try {
      if (!req.headers.cookie) return;
      let { token } = parseCookie(req.headers.cookie);
      if (!token) return;
      commit("SET_TOKEN", token);
      await dispatch("getAuth");
    } catch (error) {
      console.log(error);
      cookieStorage.removeItem("token");
    }
  },
  async getLinks({ commit, dispatch, getters }) {
    await Promise.all([
      dispatch("platform/getPlatforms"),
      dispatch("sport/getSports")
    ]);
    const linkSportIndex = getters.links.findIndex(link => link.id === "Sport");
    const linkGameIndex = getters.links.findIndex(link => link.id === "Game");
    const links = JSON.parse(JSON.stringify(getters.links));
    links[linkSportIndex].links = getters["sport/sports"];
    links[linkGameIndex].links = getters["platform/platforms"];
    commit("SET_LINKS", links);
  },
  async getAuth({ commit }) {
    const { data: providers, user, success, message } = await this.$axios({
      method: "post",
      url: "/api/m/account",
      withToken: true
    }).then(res => res.data);
    if (!user || !providers) return;
    commit("SET_AUTH", user);
    return providers;
  },
  async login({ commit, dispatch }, credentials) {
    try {
      // Check all fields if not empty
      const isValid = Object.keys(credentials).every(key => !!credentials[key]);

      if (!isValid) throw new Error("请正确输入您的账户名及登录密码。");

      const { username: loginName, password } = credentials;

      const body = {
        loginName,
        password: btoa(password)
      };

      let { data, user, success, message } = await this.$axios({
        method: "post",
        url: "/api/login",
        data: body
      }).then(res => res.data);

      if (!success) throw new Error(message);
      commit("SET_TOKEN", data.token);
      commit("SET_AUTH", user);
      this.$router.push({ name: "index" });
    } catch (error) {
      commit("modal/OPEN_MODAL", {
        title: "登录失败",
        content: error.message, //"用户名不存在或密码错误，请核实后重新输入。",
        type: "error"
      });
    }
  },
  async register({ commit }, payload) {
    const { data, user, success, message } = await this.$axios({
      method: "post",
      url: "/api/register",
      data: payload
    }).then(res => res.data);
    if (!success) throw new Error(message);
    commit("SET_TOKEN", data.token);
    commit("SET_AUTH", user);
  },
  async logout({ commit, dispatch }) {
    commit("SET_TOKEN", null);
    commit("SET_AUTH", null);
    this.$router.push({ name: "index" });
  },
  async checkUserInfo({ commit }, payload) {
    try {
      const isValid = Object.keys(payload).every(key => !!payload[key]);
      if (!isValid) throw new Error("请完整输入上述信息项。");

      const { username: userName, name: realName, code } = payload;

      const body = {
        userName,
        realName,
        code
      };

      const { data, success, message } = await this.$axios({
        method: "post",
        url: "/api/user/checkUserInfo",
        data: body,
        withCredentials: true
      }).then(res => res.data);
      if (!success) throw new Error(message);
      return 2;
    } catch (error) {
      commit("modal/OPEN_MODAL", {
        content: error.message,
        type: "error"
      });
      return 1;
    }
  },

  async sendPasswordCode({ commit }, payload) {
    try {
      const { type } = payload;
      const body = {
        type
      };
      const { data, success, message } = await this.$axios({
        method: "post",
        url: "/api/user/getPasswordWay",
        data: body,
        withCredentials: true
      }).then(res => res.data);
      if (!success) throw new Error(message);
      return 3;
    } catch (error) {
      commit("modal/OPEN_MODAL", {
        content: "输入验证码",
        type: "error"
      });
      return 2;
    }
  },
  async verifyChangePassword({ commit }, payload) {
    try {
      const isValid = Object.keys(payload).every(key => !!payload[key]);
      if (!isValid) throw new Error("请完整输入上述信息项。");
      const {
        password: newPassword,
        confirmPassword,
        verification: code
      } = payload;
      if (newPassword !== confirmPassword)
        throw new Error("新密码与确认密码必须一致");
      const body = {
        code,
        newPassword: btoa(newPassword)
      };
      const { data, success, message } = await this.$axios({
        method: "post",
        url: "/api/user/changePassword",
        data: body,
        withCredentials: true
      }).then(res => res.data);
      if (!success) throw new Error(message);
    } catch (error) {
      commit("modal/OPEN_MODAL", {
        content: "服务异常",
        type: "error"
      });
    }
  },
  async changePassword({ commit, state }, payload) {
    const { new: password, old: old_password } = payload;
    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/api/m/change-password",
      data: {
        password: btoa(password),
        old_password: btoa(old_password)
      },
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);
  },
  async getServerCaptcha() {
    const { data } = await this.$axios({
      method: "post",
      url: "/api/user/captcha",
      responseType: "blob",
      withCredentials: true
    });
    return data;
  },
  async sendEmailVerification({ commit, getters }) {
    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/user/sendValidate2Email",
      data: {
        email: getters.auth.email
      },
      withToken: true
    }).then(res => res.data);

    if (!success) throw new Error(message);
    commit("modal/OPEN_MODAL", {
      content: `已发送验证码至 :<br> ${getters.auth.email}`,
      type: "success"
    });
  },
  async verifyEmailVerification({ commit, getters }, payload) {
    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/user/validateEmail",
      data: {
        code: payload
      },
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);
    commit("modal/OPEN_MODAL", {
      content: `Email: ${getters.auth.email} 已成功验证邮箱 ${payload}`,
      type: "success"
    });
  },
  async getBanners({ commit }) {
    let banners = bannersJSON;
    try {
      // TODO Fix Cors ISSUE on Java Host
      // const { data } = await this.$axios({
      //   method: "post",
      //   //url: "/api/banner",
      //   url: `${window.location.protocol}//mr005.cc/v2.0/assets/js/banner.json`
      // }).then(res => res.data);
      // banners = data;
      const { data, success } = await this.$axios({
        method: "post",
        url: "/api/banner"
      }).then(res => res.data);
      banners = data;
    } catch (error) {
    } finally {
      commit("SET_BANNERS", banners);
    }
  },
  async getNotices({ commit }) {
    let notices = noticesJSON;
    try {
      const { data, success } = await this.$axios({
        method: "get",
        url: "/api/notifications"
      }).then(res => res.data);
      notices = data;
    } catch (error) {
    } finally {
      commit("SET_NOTICES", notices);
    }
  },

  async getCooperation({ commit }) {
    let cooperation = cooperationJSon;
    try {
    } catch (error) {
    } finally {
      commit("SET_COOPERATION", cooperation);
    }
  },

  async getLevels({ commit, state, getters }, level) {
    const { data } = await this.$axios({
      method: "get",
      url: "/api/bonus/vip",
      withToken: !!getters.token
    }).then(res => res.data);
    commit("SET_LEVEL", data);
  },

  async getTreasures({ commit }) {
    const { data, success, message } = await this.$axios({
      method: "get",
      url: "/activity/treasure/getStatus",
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);
    //data.treasure_list[0].can_get = 1
    commit("SET_TREASURES", data);
  },
  async getTreasure(context, { id }) {
    const { data, success, message } = await this.$axios({
      method: "get",
      url: `/activity/treasure/getTreasure?chestid=${id}`,
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);
    return data;
  },
  async getLottery({ commit }) {
    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/activity/turntable/lotteryValue",
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);
    commit("SET_LOTTERY", data);
  },
  async getLotteryReward({ commit }) {
    const { data, success, message } = await this.$axios({
      method: "post",
      url: "/activity/turntable/lottery",
      withToken: true
    }).then(res => res.data);
    if (!success) throw new Error(message);
    return data;
  }
};
