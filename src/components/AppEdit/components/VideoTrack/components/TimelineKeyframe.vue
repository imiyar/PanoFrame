<template>
  <div
    class="timeline-keyframe"
    v-loading.fullscreen="showLoading"
    element-loading-text="Loading..."
    element-loading-background="rgba(0, 0, 0, 0.2)">

    <!-- Previous/Next keyframe buttons -->
    <div class="btns">
      <span class="el-icon-caret-left btn" @click="previousKeyframe"></span>
      <span class="el-icon-caret-right btn" @click="nextKeyframe"></span>
    </div>

    <!-- Keyframes -->
    <div class="container">
      <div v-if="duration">
        <div
          v-for="(keyframe, index) in keyframes"
          :key="keyframe.time"
          :class="['keyframe', { active: index === keyframePos.index && keyframePos.found }]"
          :style="{ left: `${keyframe.time / duration * 100}%` }"
          :title="title(keyframe)"
          @click="setKeyframeTime(keyframe.time)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { msToString } from '@/util';

export default {
  name: 'TimelineKeyframe',

  props: {
    name: String,
  },

  computed: {
    ...mapState('player', [
      'duration',
    ]),

    keyframes() {
      return this.$store.state.timeline.keyframes[this.name];
    },

    keyframePos() {
      return this.$store.getters['timeline/keyframePos'][this.name];
    },

    showLoading() {
      return this.duration === null || this.duration === undefined;
    },
  },

  methods: {
    ...mapMutations('timeline', [
      'setKeyframeTime',
    ]),

    previousKeyframe() {
      const index = this.keyframePos.found ? this.keyframePos.index - 1 : this.keyframePos.index;
      if (index < 0) {
        this.setKeyframeTime(0);
      } else {
        this.setKeyframeTime(this.keyframes[index].time);
      }
    },

    nextKeyframe() {
      if (this.keyframePos.index >= this.keyframes.length - 1) {
        this.setKeyframeTime(this.duration);
      } else {
        this.setKeyframeTime(this.keyframes[this.keyframePos.index + 1].time);
      }
    },

    title(keyframe) {
      return `time: ${msToString(keyframe.time)}, value: ${keyframe.value}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/plugins/element-variables.scss';

.timeline-keyframe {
  display: flex;
  justify-content: left;
  align-items: center;

  .btns {
    font-size: $text-big;
    width: 40px;
    flex: 0 0 auto;

    .btn {
      cursor: pointer;
    }
  }

  .container {
    position: relative;
    height: 30px;
    width: 100%;
    margin: 0 10px 0 20px;
    flex: 0 1 auto;
    background-color: rgba(255, 255, 255, 0.1);

    .keyframe {
      position: absolute;
      top: 50%;
      transform: rotate(45deg) translate(-7px);
      background-color:$--color-text-primary;
      width: 10px;
      height: 10px;
      cursor: pointer;

      &.active {
        background-color:$--color-primary;
        z-index: 100;
      }
    }
  }
}

</style>
