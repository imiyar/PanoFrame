<template>
  <div class="timeline-input">
    <input-number-validation
      ref="inputNumber"
      class="input-number"
      :value="value"
      :name="name"
      :max="maxValue"
      :min="minValue"
      :boundaryValidation="true"
      @input="inputHandler"/>

    <el-button
      icon="el-icon-plus"
      size="mini"
      type="primary"
      plain circle
      @click="addHandler"/>

    <el-button
      icon="el-icon-minus"
      size="mini"
      type="primary"
      plain circle
      @click="removeHandler"/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { InputNumberValidation } from '@/components/common';

export default {
  name: 'TimelineInput',

  components: {
    InputNumberValidation,
  },

  props: {
    name: String,
  },

  data() {
    return {
      value: 0,
    };
  },

  computed: {
    ...mapState('timeline', [
      'keyframeTime',
    ]),

    ...mapGetters('timeline', [
      'findPos',
    ]),

    initValue() {
      return this.$store.state.player.init[this.name];
    },

    maxValue() {
      return this.$store.state.player.max[this.name];
    },

    minValue() {
      return this.$store.state.player.min[this.name];
    },

    keyframes() {
      return this.$store.state.timeline.keyframes[this.name];
    },

    keyframePos() {
      return this.$store.getters['timeline/keyframePos'][this.name];
    },
  },

  watch: {
    keyframePos: {
      handler(data) {
        this.value = data.item.value;
        if (!data.found) {
          this.$nextTick(() => {
            this.$refs.inputNumber.$refs.input.currentValue = undefined;
          });
        } else {
          this.$nextTick(() => {
            this.$refs.inputNumber.$refs.input.currentValue = this.value;
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    ...mapMutations('timeline', [
      'addKeyframe',
      'setKeyframe',
      'removeKeyframe',
    ]),

    ...mapMutations('player', [
      'setNeedUpdate',
    ]),

    inputHandler(newValue) {
      this.value = newValue;
      if (!this.keyframePos.found) {
        if (newValue !== undefined) {
          this.addHandler();
        }
      } else {
        this.setKeyframe({
          name: this.name,
          index: this.keyframePos.index,
          item: { time: this.keyframeTime, value: this.value },
        });
        this.setNeedUpdate(this.name);
      }
    },

    addHandler() {
      if (!this.keyframePos.found) {
        this.addKeyframe({
          name: this.name,
          index: this.keyframePos.index + 1,
          item: { time: this.keyframeTime, value: this.value },
        });
        this.setNeedUpdate(this.name);
      }
    },

    removeHandler() {
      if (this.keyframePos.found) {
        // the input event should not be triggered after keyframe is removed
        this.setKeyframe({
          name: this.name,
          index: this.keyframePos.index,
          item: {
            time: this.keyframeTime,
            value: this.keyframePos.index > 0 ? this.keyframes[this.keyframePos.index - 1].value : this.initValue,
          },
        });
        this.removeKeyframe({
          name: this.name,
          index: this.keyframePos.index,
        });
        this.setNeedUpdate(this.name);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.timeline-input {
  min-width: 190px;

  .input-number {
    display: inline;
    margin-right: 14px;
  }
}
</style>
