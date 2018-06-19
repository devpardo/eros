import { getCache, setCache } from "@/utils";
export const state = () => ({
  stream: {
    cache: [],
    key: 0
  },
  ranks: {
    loading: true,
    day: [],
    week: [],
    month: [],
    key: "day"
  },
  game: {
    loading: true,
    cache: []
  }
});

export const getters = {
  streams: state => state.stream.cache,
  stream: state => state.stream.cache[state.stream.key],
  ranks: state => state.ranks[state.ranks.key],
  games: state => state.game.cache,
  gamesLoading: state => state.game.loading
};

export const mutations = {
  SET_GAMES: (state, payload) => (state.game.cache = payload),
  SET_STREAMS: (state, payload) => (state.stream.cache = payload),
  SET_STREAM_KEY: (state, payload) => (state.stream.key = payload),
  SET_RANKS: (state, payload) => (state.ranks[state.ranks.key] = payload),
  SET_RANK_KEY: (state, payload) => state.ranks[state.ranks.key]
};

export const actions = {
  async getGames({ dispatch, commit }) {
    try {
      const { data } = await this.$axios({
        url: `${process.env.API_MRTV}/home/getAllGameRoom4Api`,
        // credentials: true,
        mrtv: true
      }).then(res => res.data);
      commit("SET_GAMES", data);
    } catch (e) {}
  },
  async getStreams({ commit }) {
    const { data } = await this.$axios({
      method: "post",
      url: `${process.env.API_MRTV}/home/getalllives`,
      // credentials: true
    }).then(res => res.data);

    commit("SET_STREAMS", data);
  },
  async getRanks({ commit }, type) {
    const rankAPI = {
      day: "/ranklist/dayrankforricher",
      week: "/ranklist/weekRankForRicher",
      month: "/ranklist/monthRankForRicher"
    };

    const { data } = await this.$axios({
      method: "post",
      url: `${process.env.API_MRTV}${rankAPI[type]}`,
      // credentials: true
    }).then(res => res.data);

    commit("SET_RANK_KEY", type);
    commit("SET_RANKS", data);
  }
};
