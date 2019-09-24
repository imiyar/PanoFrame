<template>
  <animated-width v-bind="$attrs" @animfinished="$emit('ready')">
    <div class="footer">
      <div class="separator"></div>
      <span><slot></slot></span>
    </div>
  </animated-width>
</template>

<script>
import { AnimatedWidth } from '@/components/common';

export default {
  name: 'AppFooter',

  components: {
    AnimatedWidth,
  },

  inheritAttrs: false,
};
</script>

<style scoped lang="scss">
@import "@/plugins/element-variables.scss";

.footer {
  width: 100%;
  color: $--color-text-secondary;
  font-size: $text-small;
  text-align: center;
  line-height: 18px;

  .separator {
    background-color: $--border-color-light;
    height: 1px;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
