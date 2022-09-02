<template>
  <div :class="containerClass">
    <div v-if="title" class="y-textarea__title">{{ title }}</div>
    <textarea
      class="y-textarea__text"
      v-bind="$attrs"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      :disabled="disabled"
      :style="{height: `${height}px`}"
    />
    <i v-if="error" class="i-info y-textarea__error-icon" />
    <div v-if="error && errorMessage" class="y-textarea__error">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: 'Textarea',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: null
    },
    class: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    height: String
  },
  emits: {
    'update:modelValue': null
  },
  computed: {
    containerClass() {
      return [
        'y-textarea',
        this.class,
        {
          'y-textarea--error': this.error,
          'y-textarea--error-message': this.errorMessage
        }
      ]
    }
  },
  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
// export default {
//   props: ['modelValue'],
//   emits: ['update:modelValue'],
//   render() {
//     return h(SomeComponent, {
//       modelValue: this.modelValue,
//       'onUpdate:modelValue': (value) => this.$emit('update:modelValue', value)
//     })
//   }
// }
</script>

<style lang="scss" scoped>
@import 'style';
</style>
