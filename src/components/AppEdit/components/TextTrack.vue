<template>
  <div>
    <div class="setting-item">
      <div class="setting-name">Title: </div>
      <div class="setting-col1">
        <el-input v-model="title" class="title" size="mini"/>
      </div>
      <div class="setting-col2">
      </div>
    </div>

    <div class="setting-item">
      <div class="setting-name">Subtitle: </div>
      <div class="setting-col1">
        <el-button class="btn" icon="el-icon-plus" size="mini" type="primary" plain circle @click="addHandler"/>
        <el-time-picker
          v-model="formattedStartTime"
          class="time-picker"
          value-format="HH:mm:ss"
          size="mini"
          placeholder="Start Time"
          :picker-options="startOptions"
          @change="changeHandler">
        </el-time-picker>
        <span class="separator"> - </span>
        <el-time-picker
          v-model="formattedEndTime"
          class="time-picker"
          value-format="HH:mm:ss"
          size="mini"
          placeholder="End Time"
          :picker-options="endOptions">
        </el-time-picker>
      </div>
      <div class="setting-col2">
        <el-input v-model="text" class="title" size="mini"/>
      </div>
    </div>

    <div class="subtitle">
      <div class="setting-item" v-for="(keyframe, index) in keyframes.subtitle" :key="keyframe.time">
        <div class="setting-name"></div>
        <div class="setting-col1">
          <el-button class="btn" icon="el-icon-minus" size="mini" type="primary" plain circle @click="removeHandler(index)"/>
          <span class="time">{{ subtitleTimeRange[index] }}</span>
        </div>
        <div class="setting-col2">
          {{ keyframe.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { msToString, stringToMs } from '@/util';

export default {
  name: 'TextTrack',

  data() {
    return {
      startTime: undefined,
      endTime: undefined,
      text: '',
    };
  },

  computed: {
    ...mapState('player', [
      'duration',
    ]),

    ...mapState('timeline', [
      'keyframes',
    ]),

    ...mapGetters('player', [
      'formattedDuration',
    ]),

    ...mapGetters('timeline', [
      'findPos',
      'subtitleTimeRange',
    ]),

    formattedStartTime: {
      get() {
        return msToString(this.startTime);
      },
      set(val) {
        this.startTime = stringToMs(val);
      },
    },

    formattedEndTime: {
      get() {
        return msToString(this.endTime);
      },
      set(val) {
        this.endTime = stringToMs(val);
      },
    },

    startOptions() {
      const endTime = this.formattedEndTime !== '' ? this.formattedEndTime : this.formattedDuration;
      return { selectableRange: `00:00:00 - ${endTime}` };
    },

    endOptions() {
      const startTime = this.formattedStartTime !== '' ? this.formattedStartTime : '00:00:00';
      return { selectableRange: `${startTime} - ${this.formattedDuration}` };
    },

    title: {
      get() {
        return this.$store.state.player.title;
      },
      set(val) {
        this.$store.commit('player/setTitle', val);
      },
    },

    subtitlePos() {
      return this.findPos('subtitle', this.startTime);
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

    addHandler() {
      if ((this.startTime === undefined) || (this.text === '')) return;
      const endTime = this.endTime === undefined ? this.duration : this.endTime;

      if (this.subtitlePos.found) {
        this.setKeyframe({
          name: 'subtitle',
          index: this.subtitlePos.index,
          item: {
            time: this.startTime,
            endTime,
            value: this.text,
          },
        });
      } else {
        this.addKeyframe({
          name: 'subtitle',
          index: this.subtitlePos.index + 1,
          item: {
            time: this.startTime,
            endTime,
            value: this.text,
          },
        });
      }

      this.setNeedUpdate('subtitle');
      this.startTime = undefined;
      this.endTime = undefined;
      this.text = '';
    },

    changeHandler() {
      if (this.subtitlePos.found) {
        this.text = this.subtitlePos.item.value;
        this.endTime = this.subtitlePos.item.endTime;
      }
    },

    removeHandler(index) {
      this.removeKeyframe({ name: 'subtitle', index });
      this.setNeedUpdate('subtitle');
    },
  },
};
</script>

<style lang="scss" scoped>
.setting-item {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 10px 0;

  .setting-name{
    max-width: 110px;
    width: 70px;
    flex: 1 0 auto;
    font-weight: bold;
  }

  .setting-col1 {
    width: 310px;
    max-width: 350px;
    flex: 1 0 auto;

    .time-picker {
      width: 120px;
    }

    .title {
      width: 300px;
    }

    .btn {
      margin-right: 12px;
    }

    .separator {
      display: inline-block;
      width: 20px;
      text-align: center;
    }

    .time {
      display: inline-block;
      width: 260px;
      text-align: center;
    }
  }

  .setting-col2 {
    width: 390px;
    flex: 1 0 auto;
  }
}

.subtitle {
  min-width: 770px;
  height: 160px;
  overflow: auto;
}
</style>
