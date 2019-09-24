<template>
  <div>
    <!-- Radio selections -->
    <div
      v-for="choice in choices"
      :key="choice.text"
      class="setting-item">
      <div class="setting-name">
        {{ choice.text }}
      </div>
      <div class="setting-content">
        <el-radio
          v-for="item in choice.list"
          :key="item.id"
          :value="choice.value"
          :label="item.id"
          @input="choice.handler">
          {{ item.text }}
        </el-radio>
      </div>
    </div>

    <!-- Input Groups -->
    <div
      v-for="item in inputData"
      :key="item.name"
      class="setting-item">
      <div class="setting-name">{{ item.text }}</div>
      <input-group class="setting-content" :name="item.name"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { MessageBox } from 'element-ui';
import {
  InputGroup,
} from './components';

export default {
  name: 'PlayerSettings',

  components: {
    InputGroup,
  },

  data() {
    return {

      inputData: [
        { text: 'Latitude:', name: 'lat' },
        { text: 'Longitude:', name: 'lon' },
        { text: 'Field of View:', name: 'fov' },
      ],
    };
  },

  computed: {
    ...mapState('player', [
      'videoList',
      'videoId',
      'narrativeId',
      'muteOnStart',
    ]),

    ...mapGetters('player', [
      'narrativeList',
      'narrativeData',
    ]),

    choices() {
      return [
        {
          text: 'Video Source: ',
          list: this.videoList,
          value: this.videoId,
          handler: this.sourceHandler,
        },
        {
          text: 'Use Sample Narratives: ',
          list: [{ id: -1, text: 'None' }].concat(this.narrativeList),
          value: this.narrativeId,
          handler: this.narrativeHandler,
        },
        {
          text: 'Mute on Start: ',
          list: [{ id: true, text: 'Yes' }, { id: false, text: 'No' }],
          value: this.muteOnStart,
          handler: this.setMuteOnStart,
        },
      ];
    },
  },

  methods: {
    ...mapMutations([
      'loadData',
    ]),

    ...mapMutations('player', [
      'setVideoId',
      'setNarrativeId',
      'setMuteOnStart',
      'clearPlayerData',
    ]),

    ...mapMutations('timeline', [
      'clearKeyframes',
    ]),

    sourceHandler(val) {
      MessageBox.confirm(
        'Changing video source will remove all your keyframe data. Continue?',
        'Warning',
        {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      ).then(() => {
        this.setVideoId(val);
        this.clearKeyframes();
        this.clearPlayerData();
      }).catch(() => {});
    },

    narrativeHandler(val) {
      MessageBox.confirm(
        'Changing sample narrative will remove all your keyframe data. Continue?',
        'Warning',
        {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      ).then(() => {
        this.setNarrativeId(val);
        this.clearPlayerData();
        if (val === -1) {
          this.clearKeyframes();
        } else {
          this.loadData(this.narrativeData);
        }
      }).catch(() => {});
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
    max-width: 200px;
    width: 160px;
    flex: 1 0 auto;
    font-weight: bold;
  }

  .setting-content {
    width: 615px;
    max-width: 970px;
    flex: 1 0 auto;
  }
}
</style>
