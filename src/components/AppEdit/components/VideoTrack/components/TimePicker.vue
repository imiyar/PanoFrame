<template>
  <el-time-picker
    size="mini"
    value-format="HH:mm:ss"
    class="time-picker"
    :value="formattedKeyframeTime"
    :picker-options="pickerOptions"
    @input="setKeyframeTime">
  </el-time-picker>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'TimePicker',

  computed: {
    ...mapGetters('player', [
      'formattedDuration',
    ]),

    ...mapGetters('timeline', [
      'formattedKeyframeTime',
    ]),

    pickerOptions() {
      return {
        selectableRange: `00:00:00 - ${this.formattedDuration}`,
      };
    },
  },

  methods: {
    ...mapMutations('timeline', [
      'setKeyframeTime',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.time-picker {
  width: 200px !important;
}
</style>
