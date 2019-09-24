<template>
  <div ref="container" class="container">
    <div class="bar" :style="{ left: `${this.left * 100}%` }">
      <div
        class="rect"
        @mousedown.prevent="mousedownHandler"
        @touchstart.prevent="mousedownHandler"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'TimelineBar',

  data() {
    return {
      width: 0,
      offset: 0,
      isInteracting: false,
    };
  },

  computed: {
    ...mapState([
      'mode',
    ]),

    ...mapState('player', [
      'duration',
    ]),

    ...mapState('timeline', [
      'keyframeTime',
    ]),

    left: {
      get() {
        return this.duration !== null ? this.keyframeTime / this.duration : 0;
      },

      set(val) {
        if (this.duration !== null) {
          this.setKeyframeTime(val * this.duration);
        }
      },
    },
  },

  watch: {
    mode(val) {
      if (val === 'edit') {
        this.$nextTick(() => this.updateWidth());
      }
    },
    immediate: true,
  },

  mounted() {
    this.$nextTick(function update() {
      this.updateWidth();
      document.addEventListener('mouseup', this.mouseupHandler.bind(this));
      document.addEventListener('touchend', this.mouseupHandler.bind(this));
      document.addEventListener('mousemove', this.mousemoveHandler.bind(this), { passive: false });
      document.addEventListener('touchmove', this.mousemoveHandler.bind(this), { passive: false });
      window.addEventListener('resize', this.updateWidth.bind(this));
      window.addEventListener('orientationchange', this.updateWidth.bind(this));
    });
  },

  methods: {
    ...mapMutations('timeline', [
      'setKeyframeTime',
    ]),

    mousedownHandler() {
      this.isInteracting = true;
      this.offset = this.$refs.container.getBoundingClientRect().left;
    },

    mousemoveHandler(event) {
      if (this.isInteracting) {
        event.preventDefault();
        const pos = (event.clientX || event.touches[0].clientX) - this.offset;
        this.left = Math.max(0, Math.min(this.width, pos)) / this.width;
      }
    },

    mouseupHandler() {
      if (this.isInteracting) {
        this.setKeyframeTime(Math.round(this.left * this.duration));
        this.isInteracting = false;
      }
    },

    updateWidth() {
      if (this.$refs.container) this.width = this.$refs.container.scrollWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/plugins/element-variables.scss';

.container {
  position: relative;

  .bar {
    position: absolute;

    .rect {
      position: absolute;
      transform: translate(-5px);
      height: 30px;
      width: 10px;
      background-color:$--color-primary;
      cursor: pointer;
    }

    .line {
      position: absolute;
      transform: translate(-1px, 30px);
      height: 210px;
      width: 2px;
      background-color:$--color-primary;
    }
  }
}
</style>
