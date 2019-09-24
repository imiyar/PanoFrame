<template>
  <div class="edit">
    <div class="edit-info">
      <video-player
        name="edit"
        class="video-player"
        @defaultchange="setDefault"
        @camerapositionchange="setCurrent"
        @timeupdate="setCurrentTime"
        @loadedmetadata="setDuration"
        @updated="setNeedUpdate('')"/>
      <angle-info class="angle-info"/>
      <video-info class="video-info"/>
    </div>

    <el-tabs ref="panel" class="edit-panel" tab-position="left" >
      <el-tab-pane label="Video Track" class="tab-pane">
        <video-track/>
      </el-tab-pane>
      <el-tab-pane label="Text Track" class="tab-pane">
        <text-track/>
      </el-tab-pane>
      <el-tab-pane label="Player Settings" class="tab-pane">
        <player-settings/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { VideoPlayer } from '@/components/common';
import {
  AngleInfo,
  VideoInfo,
  VideoTrack,
  TextTrack,
  PlayerSettings,
} from './components';

export default {
  name: 'AppEdit',

  components: {
    VideoPlayer,
    AngleInfo,
    VideoInfo,
    VideoTrack,
    TextTrack,
    PlayerSettings,
  },

  mounted() {
    this.$nextTick(() => {
      // Set Element UI's tab content height
      this.$refs.panel.$el.children[1].style.height = '100%';
    });
  },

  methods: {
    ...mapMutations('player', [
      'setDuration',
      'setDefault',
      'setCurrentTime',
      'setCurrent',
      'setNeedUpdate',
    ]),
  },
};
</script>

<style scoped lang="scss">
.edit {
  display: flex;
  height: 100%;
  flex-direction: column;

  .edit-info {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin-bottom: 30px;
    height: 260px;
    flex: 1 0 auto;

    .video-player {
      width: 265px;
      max-width: 45%;
      flex: 1 0 auto;
    }

    .angle-info {
      width: 120px;
      flex: 0 0 auto;
    }

    .video-info {
      width: 220px;
      max-width: 35%;
      flex: 1 0 auto;
    }
  }

  .edit-panel {
    flex: 0 0 auto;
    height: 260px;

    .tab-pane {
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
