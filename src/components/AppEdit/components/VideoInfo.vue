<template>
  <div class="container">
    <div
      v-for="data in tableData"
      :key="data.name"
      class="row">
      <div class="col">{{ data.name }}</div>
      <div class="col">{{ data.value }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'VideoInfo',

  data() {
    return {
      cellStyleObj: {
        border: 'none',
        padding: '10px 0',
        verticalAlign: 'top',
      },
    };
  },

  computed: {
    ...mapGetters('player', [
      'tableData',
    ]),

    height() {
      return this.$store.state.mode === 'edit' ? this.$refs.container.offsetHeight : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/plugins/element-variables.scss";

.container {
  box-sizing: border-box;
  border-bottom: 1px solid $--border-color-light;
  overflow: auto;

  .row{
    padding: 12px 0;
    overflow: hidden;

    .col {
      float: left;
      width: 50%;
    }
  }
}

</style>
