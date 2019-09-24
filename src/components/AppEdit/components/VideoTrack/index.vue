<template>
  <div>
    <div class="setting-item">
      <div class="setting-name">Keyframe Time: </div>
      <div class="setting-input">
        <time-picker/>
      </div>
      <div class="setting-timeline no-arrow">
        <timeline-bar/>
      </div>
    </div>

    <div
      v-for="setting in settings"
      :key="setting.name"
      class="setting-item">
      <div class="setting-name">
        {{ setting.text }}
      </div>
      <div class="setting-input">
        <timeline-input :name="setting.name"/>
      </div>
      <div class="setting-timeline">
        <timeline-keyframe :name="setting.name"/>
      </div>
    </div>
  </div>
</template>

<script>
import {
  TimePicker,
  TimelineInput,
  TimelineKeyframe,
  TimelineBar,
} from './components';

export default {
  name: 'VideoTrack',

  components: {
    TimePicker,
    TimelineInput,
    TimelineKeyframe,
    TimelineBar,
  },

  data() {
    return {
      settings: [
        { text: 'Latitude: ', name: 'lat' },
        { text: 'Longitude: ', name: 'lon' },
        { text: 'Field of View: ', name: 'fov' },
        { text: 'Playback Rate: ', name: 'rate' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.setting-item {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 10px 0;

  .setting-name {
    max-width: 180px;
    width: 110px;
    flex: 1 0 auto;
    font-weight: bold;
  }

  .setting-input {
    width: 210px;
    max-width: 280px;
    flex: 1 0 auto;
  }

  .setting-timeline {
    width: 460px;
    flex: 1 0 auto;
  }

  .no-arrow {
    box-sizing: border-box;
    height: 30px;
    padding: 0 10px 0 60px;
  }
}
</style>
