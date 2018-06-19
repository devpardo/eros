import Vue from "vue";
import { getCache, setCache, sleep, decodeToken, reverseString } from "@/utils";
import * as apiPT from "~/utils/pt";
export const state = () => ({
  cache: {},
  key: "PT-1",
  loading: false
});

export const getters = {
  loading: state => state.loading,
  cache: ({ cache }, getters) => key => (key ? cache[key] : cache[state.key]),
  games: (state, getters) => state.cache[state.key] //(state.key ? getters.cache(state.key) : undefined) //getters.cache(state.key)
};

export const mutations = {
  SET_GAMES: (state, { key, data }) => {
    state.key = key;
    Vue.set(state.cache, key, data);
  },
  SET_KEY: (state, payload) => (state.key = payload),
  SET_LOADING: (state, payload = false) => (state.loading = payload)
};

export const actions = {
  async getCachedGames({ commit, getters }, key) {
    const data = getCache(key);

    if (data) commit("SET_GAMES", { key, data });
    commit("SET_KEY", key);
    commit("SET_LOADING");
    return !!getters.games;
  },
  async getGames({ commit, dispatch }, { platform, type = 1 }) {
    const key = `${platform}-${type}`;
    // if (await dispatch("getCachedGames", key)) return;

    try {
      commit("SET_LOADING", true);
      const { data } = await this.$axios({
        method: "post",
        url: "/api/games/filter",
        data: {
          platform,
          type
        }
      }).then(res => res.data);
      if (!data) return;
      const games = data.map(game => {
        game.img_url = game.img_url.replace(
          "http://media.mr007.co/images",
          process.env.MEDIA_SERVER
        );
        return game;
      });
      commit("SET_GAMES", { key, data: games });
    } catch (e) {
    } finally {
      commit("SET_LOADING");
    }
  },
  async generateGameLoader(context, payload) {
    const { image, name } = payload;
    const html = `
    <head>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Impact;
        }
        .loader {
          margin: 0;
          padding: 0; 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          min-height: 100vh; 
          color: white; 
          background: #000;
          text-align: center;
        }
        .game-image {
          height: 150px;
          width: 150px;
        }
        .game-title {
          padding: 20px;
          font-size: 20px;
          font-weight: normal;                    
        }
      </style>
    </head>
    <div class="loader">
      <div>
        <!--<img class="game-image" src="~assets/images/loading.bubbles.svg" />-->
        <div class="game-title"> 正在加载 ${name} ，请稍后。</div>
      </div>
    </div>
    `;
    window.game.document.write(html);
    window.game.document.title = `Game: ${name}`;
    window.game.focus();
  },
  async launchGame({ commit, dispatch, rootGetters }, { game, platform }) {
    if (!rootGetters.auth) throw new Error("请登录");
    await dispatch("generateGameLoader", {
      name: game.gamename || game.enname || game.GameName
    });

    const types = {
      PT: "launchGamePT",
      TTG: "launchGameTTG",
      MG: "launchGameMG"
    };

    const type = game.liveGame
      ? "launchGames"
      : types[platform.platform] || "launchGames";
    const data = { ...game, platform: platform.platform };
    await dispatch(type, data);
  },

  async launchGamePT({ commit, rootGetters }, payload) {
    // const { gamecode: gameCode } = payload;
    // const body = {
    //   gameCode // All Platforms
    // };
    // const loginCallback = await apiPT.requestPTLogin(
    //   rootGetters.auth.loginname,
    //   atob(rootGetters.password),
    //   1
    // );
    // const tokenResponse = await apiPT.requestPTTemporaryToken(1);
    // const url = `http://cache.download.banner.drunkenmonkey88.com/casinoclient.html?game=${
    //   payload.gamecode
    // }&language=ZH-CN&;nolobby=1`;
    const isMobile = /Mobi/i.test(window.navigator.userAgent);
    window.game.location.href = `${
      process.env.API_MR
    }/game/ptLaunchGame?gameCode=${payload.gamecode}&gameType=0&sig=${
      rootGetters.token
    }${isMobile ? "" : "&agent=web"}`;
  },
  async gameLaunch(context, payload) {
    const windowKey = payload.window || "game";
    if (!window[windowKey]) throw new Error("开始游戏时不要关闭窗口");
    const { data, success, message } = await this.$axios({
      method: "POST",
      url: "/game/launchgames",
      data: payload,
      withToken: true
    }).then(res => res.data);
    if (!success) {
      window[windowKey].close();
      throw new Error(message);
    }
    window[windowKey].location.href = data;
    window[windowKey] = null;
  },
  async launchGames({ dispatch }, payload) {
    const { gamecode: gameCode, platform, liveGame } = payload;
    const body = {
      gameCode, // All Platforms
      platform,
      liveGame
    };
    await dispatch("gameLaunch", body);
  },
  async launchGameTTG({ dispatch }, payload) {
    const {
      gameid: gameId,
      gametype: gameType,
      gamename: gameName,
      platform
    } = payload;
    const body = {
      gameId, // TTG
      gameCode: gameId, // All Platforms
      gameType, // TTG, MRTV
      gameName, // TTG
      platform
    };
    await dispatch("gameLaunch", body);
  },
  async launchGameMG({ dispatch }, payload) {
    const { gameid: gameId, platform } = payload;
    const body = {
      gameCode: gameId, // All Platforms
      platform
    };
    await dispatch("gameLaunch", body);
  }
};
