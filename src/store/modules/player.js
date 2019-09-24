import { msToString, deepCopy } from '@/util';
import config from '@/data/config';

export default {
  namespaced: true,

  state: {
    videoList: config.videoList,
    videoId: 0,
    narrativeId: -1,
    muteOnStart: true,

    currentTime: 0,
    duration: undefined,

    init: deepCopy(config.init),
    max: deepCopy(config.max),
    min: deepCopy(config.min),
    return: deepCopy(config.return),

    default: deepCopy(config.init),
    current: {
      lat: config.init.lat,
      lon: config.init.lon,
      fov: config.init.fov,
    },

    needUpdate: '',

    title: config.videoList[0].text,
  },

  getters: {
    narrativeList: state => config.narrativeList[state.videoId],

    videoSource: state => ({
      src: state.videoList[state.videoId].src,
      type: state.videoList[state.videoId].type,
    }),

    narrativeData: (state, getters) => {
      if (state.narrativeId === -1) {
        return null;
      }
      return getters.narrativeList[state.narrativeId].data;
    },

    panoOptions: state => ({
      initLat: state.init.lat,
      initLon: state.init.lon,
      initFov: state.init.fov,
      maxLat: state.max.lat,
      maxLon: state.max.lon,
      maxFov: state.max.fov,
      minLat: state.min.lat,
      minLon: state.min.lon,
      minFov: state.min.fov,
      returnStepLat: state.return.lat,
      returnStepLon: state.return.lon,
      returnStepFov: state.return.fov,
    }),

    tableData: (state, getters) => [
      {
        name: 'Video Source:',
        value: getters.videoSource.src.match(/[^/]+$/)[0],
      },
      {
        name: 'Current Time:',
        value: `${getters.formattedCurrentTime} / ${getters.formattedDuration}`,
      },
      {
        name: 'Current Field of View:',
        value: state.current.fov,
      },
      {
        name: 'Default Latitude:',
        value: state.default.lat,
      },
      {
        name: 'Default Longitude:',
        value: state.default.lon,
      },
      {
        name: 'Default Field of View:',
        value: state.default.fov,
      },
      {
        name: 'Playback Rate:',
        value: state.default.rate,
      },
      {
        name: 'Title:',
        value: state.title,
      },
      {
        name: 'Subtitle:',
        value: state.default.subtitle,
      },
    ],

    formattedCurrentTime: state => msToString(state.currentTime),
    formattedDuration: state => msToString(state.duration),
  },

  mutations: {
    setVideoId(state, id) {
      state.duration = null;
      state.videoId = id;
      state.narrativeId = -1;
      state.title = config.videoList[id].text;
    },

    setNarrativeId(state, id) {
      state.narrativeId = id;
    },

    setMuteOnStart(state, bool) {
      state.muteOnStart = bool;
    },

    setInit(state, data) {
      state.init[data.name] = data.value;
    },

    setMax(state, data) {
      state.max[data.name] = data.value;
    },

    setMin(state, data) {
      state.min[data.name] = data.value;
    },

    setReturn(state, data) {
      state.return[data.name] = data.value;
    },

    setDefault(state, data) {
      state.default[data.name] = data.value;
    },

    setCurrent(state, data) {
      state.current.lat = Math.round(data.lat);
      state.current.lon = Math.round(data.lon);
      state.current.fov = Math.round(data.fov);
    },

    setCurrentTime(state, time) {
      state.currentTime = time;
    },

    setDuration(state, duration) {
      state.duration = duration;
    },

    setNeedUpdate(state, name) {
      state.needUpdate = name;
    },

    setTitle(state, title) {
      state.title = title;
    },

    clearPlayerData(state) {
      state.default = deepCopy(config.init);
      state.current = {
        lat: config.init.lat,
        lon: config.init.lon,
        fov: config.init.fov,
      };
    },
  },
};
