<template>
  <div
    class="player-wrapper"
    @mousedown="$refs.input.focus()"
    @touchstart="$refs.input.focus()">
    <video
      ref="panoPlayer"
      class="video-js vjs-fill"
      controls
      preload="auto">
      <source :src="videoSource.src" :type="videoSource.type">
    </video>
    <input ref="input" class="input">
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import { mapState, mapGetters } from 'vuex';

import '@/plugins/panoplayer.min';
import '@/plugins/panoplayer.min.css';

export default {
  name: 'VideoPlayer',

  props: {
    name: String,
  },

  data() {
    return {
      player: null,
      panoPlayer: null,
      nextKeyframeIndex: {
        lat: 0,
        lon: 0,
        fov: 0,
        rate: 0,
        subtitle: 0,
      },
      subtitleEndTime: 0,
    };
  },

  computed: {
    ...mapState('player', [
      'muteOnStart',
      'init',
      'min',
      'max',
      'return',
      'needUpdate',
    ]),

    ...mapState('timeline', [
      'keyframeTime',
      'keyframes',
    ]),

    ...mapState([
      'mode',
    ]),

    ...mapGetters('player', [
      'panoOptions',
      'videoSource',
      'narrativeData',
    ]),

    ...mapGetters('timeline', [
      'findPos',
    ]),

    names() {
      return Object.keys(this.keyframes);
    },
  },

  watch: {
    mode(val) {
      if (val !== this.name) {
        this.player.pause();
      }
    },

    videoSource(val) {
      if (this.player !== null) {
        this.player.src(val);
      }
    },

    narrativeData() {
      this.player.currentTime(0);
      this.player.pause();
      this.player.hasStarted(false);
    },

    muteOnStart(val) {
      this.player.muted(val);
    },

    keyframeTime(val) {
      if (this.player.hasStarted()) {
        this.player.currentTime(val);
        this.player.pause();
      }
    },

    init: {
      handler(val) {
        this.panoPlayer.init(val);
        const names = Object.keys(this.nextKeyframeIndex);
        names.forEach((name) => {
          if (this.nextKeyframeIndex[name] === 0) {
            this.update(name, val[name], 0);
          }
        });
      },
      deep: true,
    },

    max: {
      handler(val) {
        this.panoPlayer.max(val);
      },
      deep: true,
    },

    min: {
      handler(val) {
        this.panoPlayer.min(val);
      },
      deep: true,
    },

    return: {
      handler(val) {
        this.panoPlayer.returnStep(val);
      },
      deep: true,
    },

    needUpdate(val) {
      if (val !== '') {
        this.findKeyframePos(val, this.player.currentTime());
        this.$emit('updated');
      }
    },
  },

  mounted() {
    this.player = videojs(this.$refs.panoPlayer);
    this.panoPlayer = this.player.panoPlayer(this.panoOptions);

    this.player.ready(() => {
      this.player.on('loadedmetadata', () => {
        this.$emit('loadedmetadata', this.player.duration());
      });

      this.player.on('firstplay', () => {
        this.player.playbackRate(this.init.rate);
        this.player.muted(this.muteOnStart);
      });

      this.player.on('timeupdate', () => {
        const time = this.player.currentTime();

        this.names.forEach((name) => {
          const index = this.nextKeyframeIndex[name];
          const item = this.keyframes[name][index];

          if (item && (time >= item.time)) {
            if (name === 'subtitle') {
              this.subtitleEndTime = item.endTime;
            }
            this.update(name, item.value, index + 1);
          } else if ((name === 'subtitle') && (time > this.subtitleEndTime)) {
            this.update(name, '', index);
          }
        });

        this.$emit('timeupdate', this.player.currentTime());
      });

      this.player.on('seeked', () => {
        const time = this.player.currentTime();
        this.names.forEach((name) => {
          this.findKeyframePos(name, time);
        });
      });
    });

    this.panoPlayer.ready(() => {
      this.panoPlayer.on('camerapositionchange', () => {
        this.$emit('camerapositionchange', this.panoPlayer.current());
      });
    });
  },

  methods: {
    update(name, now, nextIndex) {
      switch (name) {
        case 'rate': {
          this.player.playbackRate(now);
          break;
        }
        case 'subtitle': {
          this.$emit('subtitlechange', now);
          break;
        }
        default: {
          this.panoPlayer.default({ [name]: now });
        }
      }
      this.$emit('defaultchange', { name, value: now });
      this.nextKeyframeIndex[name] = nextIndex;
    },

    findKeyframePos(name, time) {
      const { item, index } = this.findPos(name, time);
      if (name === 'subtitle') {
        this.subtitleEndTime = item.endTime;
        this.update(
          name,
          time <= item.endTime ? item.value : '',
          index + 1,
        );
      } else {
        this.update(name, item.value, index + 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.player-wrapper{
  height: 100%;
  width: 100%;

  .input {
    width: 0px;
    height: 0px;
    opacity: 0;
  }
}
</style>
