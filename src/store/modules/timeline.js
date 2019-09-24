import Vue from 'vue';
import {
  binarySearch,
  msToString,
  stringToMs,
} from '@/util';

export default {
  namespaced: true,

  state: {
    keyframes: {
      lat: [],
      lon: [],
      fov: [],
      rate: [],
      subtitle: [],
    },

    keyframeTime: 0,
  },

  getters: {
    formattedKeyframeTime(state) {
      return msToString(state.keyframeTime);
    },

    findPos(state, getters, rootState) {
      return (name, time) => binarySearch(
        state.keyframes[name],
        time,
        { time: -1, value: rootState.player.init[name] },
      );
    },

    keyframePos(state, getters, rootState) {
      const names = Object.keys(state.keyframes);
      const result = {};
      names.forEach((name) => {
        result[name] = binarySearch(
          state.keyframes[name],
          state.keyframeTime,
          { time: -1, value: rootState.player.init[name] },
        );
      });
      return result;
    },

    subtitleTimeRange(state) {
      const result = [];
      state.keyframes.subtitle.forEach((item) => {
        result.push(`${msToString(item.time)} - ${msToString(item.endTime)}`);
      });
      return result;
    },
  },

  mutations: {
    addKeyframe(state, data) {
      state.keyframes[data.name].splice(data.index, 0, data.item);
    },

    removeKeyframe(state, data) {
      state.keyframes[data.name].splice(data.index, 1);
    },

    setKeyframe(state, data) {
      Vue.set(state.keyframes[data.name], data.index, data.item);
    },

    setKeyframeTime(state, time) {
      if (typeof time === 'number') {
        state.keyframeTime = time;
      } else if (typeof time === 'string') {
        state.keyframeTime = stringToMs(time);
      }
    },

    clearKeyframes(state) {
      state.keyframes = {
        lat: [],
        lon: [],
        fov: [],
        rate: [],
        subtitle: [],
      };
      state.keyframeTime = 0;
    },
  },
};
