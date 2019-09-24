<template>
  <div class="angle-info">
    <div v-for="setting in settings" :key="setting.id" class="angle-display">
      <div class="circle">
        <div
          class="line"
          :style="{ transform: `rotate(${(setting.value - 90)}deg)`}">
        </div>
        <span class="number">{{ setting.value }}</span>
      </div>
      <p class="text">{{ setting.text }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AngleInfo',

  computed: {
    ...mapState('player', [
      'current',
    ]),

    settings() {
      return [
        {
          id: 0,
          text: 'Latitude',
          value: this.current.lat,
        },
        {
          id: 1,
          text: 'Longitude',
          value: this.current.lon,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/plugins/element-variables.scss';

.angle-info {
  min-height: 260px;
  min-width: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .angle-display {
  position: relative;

    .circle {
      width: 100px;
      height: 100px;
      border: 3px solid $--color-primary;
      border-radius: 50%;
      margin-bottom: 5px;
      text-align: center;
      color: $--color-text-primary;

      .number {
        font-size: $text-title;
        line-height: 100px;
      }

      .line {
        position: absolute;
        height: 4px;
        width: 20px;
        background-color: $--color-primary;
        left: 83px;
        top: 51px;
        transform-origin: -30px 2px;
      }
    }

    .text {
      font-size: $text-regular;
      text-align: center;
    }
  }
}
</style>
