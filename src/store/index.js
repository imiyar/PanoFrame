import Vue from 'vue';
import Vuex from 'vuex';
import player from './modules/player';
import timeline from './modules/timeline';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    player,
    timeline,
  },

  state: {
    mode: 'preview',
  },

  mutations: {
    setMode(state, mode) {
      state.mode = mode;
    },

    loadData(state, data) {
      if (data === null) return;
      if (data.videoId !== state.player.videoId) {
        state.player.duration = null;
        state.player.videoId = data.videoId;
      }
      state.player.muteOnStart = data.muteOnStart;
      state.player.init = data.init;
      state.player.max = data.max;
      state.player.min = data.min;
      state.player.return = data.return;
      state.player.title = data.title;
      state.timeline.keyframes = data.keyframes;
    },
  },
});
