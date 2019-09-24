<template>
  <div class="input-validation">
    <label v-if="label" :style="{ paddingRight: gutter }">
      {{ label }}
    </label>
    <el-input-number
      ref="input"
      v-model="inputValue"
      controls-position="right"
      size="mini"
      class="input-number"
      :step="name === 'rate' ? 0.1 : 1"
      :step-strictly="true"
      :placeholder="placeholder"
      @change="changeHandler"/>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui';
import { debounce } from '@/util';

const debouncedAlert = debounce((message, title) => {
  MessageBox.alert(message, title);
}, 200);

export default {
  name: 'InputNumberValidation',

  props: {
    name: String,
    value: Number,

    max: {
      type: Number,
      default: Infinity,
    },

    min: {
      type: Number,
      default: -Infinity,
    },

    label: {
      type: String,
      default: '',
    },

    gutter: {
      type: String,
      default: '0px',
    },

    boundaryValidation: {
      type: Boolean,
      default: false,
    },

    keyframeValidation: {
      type: Boolean,
      default: false,
    },

    keyframeBoundary: {
      type: String,
      default: 'max',
    },

    emptyValidation: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      inputValue: this.value,
      placeholder: String(this.value),
    };
  },

  computed: {
    keyframes() {
      return this.$store.state.timeline.keyframes[this.name];
    },
  },

  watch: {
    value(val) {
      this.inputValue = val;
      this.placeholder = String(val);
    },
  },

  methods: {
    changeHandler(newValue) {
      let isValid = true;
      if (this.emptyValidation && newValue === undefined) {
        isValid = false;
      }

      if (this.boundaryValidation) {
        if (newValue > this.max) {
          this.debouncedAlert(
            `This value should be smaller than ${this.max} according to your player settings`,
            'Fail',
            { type: 'error' },
          );
          isValid = false;
        } else if (newValue < this.min) {
          this.debouncedAlert(
            `This value should be larger than ${this.min} according to your player settings`,
            'Fail',
            { type: 'error' },
          );
          isValid = false;
        }
      }

      if (this.keyframeValidation) {
        for (let i = 0; i < this.keyframes.length; i += 1) {
          let compare = this.keyframes[i].value - newValue;
          compare = this.keyframeBoundary === 'max' ? compare : -compare;
          if (compare > 0) {
            this.debouncedAlert(
              `You have one or more keyframes whose values are larger than ${newValue}`,
              'Fail',
              { type: 'error' },
            );
            isValid = false;
            break;
          }
        }
      }

      if (isValid) {
        this.inputValue = newValue;
        this.placeholder = String(newValue);
        this.$emit('input', newValue);
      } else {
        this.inputValue = parseInt(this.placeholder, 10);
        this.$nextTick(() => {
          this.$refs.input.currentValue = parseInt(this.placeholder, 10);
          this.$nextTick(() => {
            this.$refs.input.$refs.input.$refs.input.value = '';
          });
        });
      }
    },

    debouncedAlert,
  },
};
</script>

<style lang="scss" scoped>
.input-validation {
  width: 240px;

  .input-number {
    width: 120px;
  }
}
</style>
