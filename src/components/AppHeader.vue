<template>
  <animated-width v-bind="$attrs" @animfinished="$emit('ready')">
    <div
      class="header">
      <div class="header-title">
        <span><slot></slot></span>
      </div>
      <div class="header-button-group">
        <el-button size="small" type="primary" round plain @click="upload">
          Upload JSON
        </el-button>
        <el-button size="small" type="primary" round plain @click="download">
          Download JSON
        </el-button>
        <input ref="uploadLink" type="file" value="" class="upload-input"/>
        <a ref="downloadLink" download="PanoFrameSettings.json"></a>
      </div>
    </div>
  </animated-width>
</template>

<script>
import { AnimatedWidth } from '@/components/common';

export default {
  name: 'AppHeader',

  components: {
    AnimatedWidth,
  },

  inheritAttrs: false,

  mounted() {
    this.$refs.uploadLink.onchange = (event) => {
      const reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        this.$store.commit('loadData', data);
        this.$refs.uploadLink.value = '';
        this.$store.commit('player/clearPlayerData');
      };
    };
  },

  methods: {
    download() {
      const playerData = this.$store.state.player;
      const data = {
        videoId: playerData.videoId,
        muteOnStart: playerData.muteOnStart,
        init: playerData.init,
        max: playerData.max,
        min: playerData.min,
        return: playerData.return,
        title: playerData.title,
        keyframes: this.$store.state.timeline.keyframes,
      };
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      this.$refs.downloadLink.href = url;
      this.$refs.downloadLink.click();
    },

    upload() {
      this.$refs.uploadLink.click();
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/plugins/element-variables.scss";

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 30px;
  vertical-align: center;

  .header-title {
    font-size: $text-big;
    font-weight: bold;
  }

  .upload-input {
    width: 0;
    height: 0;
  }
}
</style>
