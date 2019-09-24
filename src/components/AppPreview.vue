<template>
  <div class="preview">
    <div class="player">
      <video-player name="preview" @subtitlechange="subtitle = $event"/>
    </div>
    <div class="title">
      <span>{{ title }}</span>
    </div>
    <div class="subtitle">
      <span>{{ subtitle }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { VideoPlayer } from '@/components/common';

export default {
  name: 'AppPreview',

  components: {
    VideoPlayer,
  },

  data() {
    return {
      subtitle: '',
    };
  },

  computed: {
    ...mapState('player', [
      'title',
    ]),
  },
};
</script>

<style scoped lang="scss">
@import "@/plugins/element-variables.scss";

.preview {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;

  .title {
    font-size: $text-title;
    font-weight: bold;
    overflow: hidden;
    height: 30px;
    margin: 30px 0;
    flex: 0 0 auto;
  }

  .subtitle {
    font-size: $text-big;
    overflow-x: hidden;
    overflow-y: auto;
    height: 80px;
    max-height: 150px;
    flex: 1 0 auto;
  }

  .player {
    height: 380px;
    flex: 2 0 auto;
  }
}
</style>
