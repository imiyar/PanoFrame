<template>
  <div ref="parent" class="anim-wrapper" :style="{ width }">
    <div class="anim" :style="{ width: `${this.animatedWidth}px` }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { TweenLite, Power2 } from 'gsap';

export default {
  name: 'AnimatedWidth',

  props: {
    width: String,
  },

  data() {
    return {
      animatedWidth: 0,
    };
  },

  watch: {
    width() {
      this.$nextTick(() => {
        TweenLite.to(this.$data, 1, {
          animatedWidth: this.$refs.parent.offsetWidth,
          ease: Power2.easeInOut,
          onComplete: () => { this.$emit('animfinished'); },
        });
      });
    },
  },

  mounted() {
    window.addEventListener('resize', () => {
      this.$nextTick(() => {
        this.animatedWidth = this.$refs.parent.offsetWidth;
      });
    });
    this.$nextTick(() => {
      this.animatedWidth = this.$refs.parent.offsetWidth;
    });
  },
};
</script>

<style lang="scss" scoped>
.anim-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  .anim {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
