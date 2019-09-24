<template>
  <div class="input-group">
    <input-number-validation
      v-bind="settingInit"
      :value="initVal"
      :name="name"
      :max="maxVal"
      :min="minVal"
      @input="setInit({ name, value: $event })"/>
    <input-number-validation
      v-bind="settingMax"
      :value="maxVal"
      :name="name"
      :max="maxMax"
      :min="initVal"
      @input="setMax({ name, value: $event })"/>
    <input-number-validation
      v-bind="settingMin"
      :value="minVal"
      :name="name"
      :max="initVal"
      :min="minMin"
      @input="setMin({ name, value: $event })"/>
    <input-number-validation
      v-bind="settingReturn"
      :value="returnVal"
      :name="name"
      :max="Infinity"
      :min="0"
      @input="setReturn({ name, value: $event })"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { InputNumberValidation } from '@/components/common';

export default {
  name: 'InputGroup',

  components: {
    InputNumberValidation,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
  },

  data() {
    return {

    };
  },

  computed: {
    initVal() {
      return this.$store.state.player.init[this.name];
    },

    maxVal() {
      return this.$store.state.player.max[this.name];
    },

    minVal() {
      return this.$store.state.player.min[this.name];
    },

    returnVal() {
      return this.$store.state.player.return[this.name];
    },

    maxMax() {
      if (this.name === 'fov') return 179;
      return this.name === 'lat' ? 89 : Infinity;
    },

    minMin() {
      if (this.name === 'fov') return 1;
      return this.name === 'lat' ? -89 : -Infinity;
    },

    settingInit() {
      return {
        label: 'Initial: ',
        gutter: '5px',
        boundaryValidation: true,
        keyframeValidation: false,
        emptyValidation: true,
      };
    },

    settingMax() {
      return {
        label: 'Maximum: ',
        gutter: '5px',
        boundaryValidation: true,
        keyframeValidation: true,
        keyframeBoundary: 'max',
        emptyValidation: true,
      };
    },

    settingMin() {
      return {
        label: 'Minimum: ',
        gutter: '5px',
        boundaryValidation: true,
        keyframeValidation: true,
        keyframeBoundary: 'min',
        emptyValidation: true,
      };
    },

    settingReturn() {
      return {
        label: 'Returning Speed: ',
        gutter: '5px',
        boundaryValidation: true,
        keyframeValidation: false,
        emptyValidation: true,
      };
    },
  },

  methods: {
    ...mapMutations('player', [
      'setInit',
      'setMax',
      'setMin',
      'setReturn',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
