<template>
  <label
    class="field__label"
    :class="{
      'right-text': rightText,
      'icon-left': iconLeft,
      'icon-right': iconRight,
      error,
      'error-message': errorMessage,
      medium: size === 'medium',
      small: size === 'small',
      mini: size === 'mini',
      '--theme-white': theme === 'white',
      '--theme-red': theme === 'red',
      '--theme-blue': theme === 'blue',
      disabled
    }"
  >
    <div v-if="title" class="field__title" :class="{required}">{{ title }}</div>
    <input type="text" class="field__input" :placeholder="placeholder" :value="modelValue" @input="updateValue" />
    <div class="field__icon field__icon--error"><i class="i-info" /></div>

    <div v-if="rightText" class="field__icon-text" :class="{[iconColor]: iconColor}">
      {{ rightText }}
    </div>
    <div v-if="iconLeft" class="field__icon left" :class="{[iconColor]: iconColor}">
      <i :class="{[iconLeft]: iconLeft}" />
    </div>
    <div v-if="iconRight" class="field__icon right" :class="{[iconColor]: iconColor}">
      <i :class="{[iconRight]: iconRight}" />
    </div>
    <div v-if="error && errorMessage" class="field__error">{{ errorMessage }}</div>
  </label>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    modelModifiers: {
      type: Object,
      default: () => ({})
    },
    placeholder: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    iconLeft: {
      type: String,
      default: null
    },
    iconRight: {
      type: String,
      default: null
    },
    iconColor: {
      type: String,
      default: null
    },
    rightText: {
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
    size: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String
    }
  },
  emits: {
    'update:modelValue': null,
    input: null
  },
  data() {
    return {}
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
      this.$emit('input', event.target.value)
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
