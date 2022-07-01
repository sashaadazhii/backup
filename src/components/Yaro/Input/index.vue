<template>
  <label
    class="field__label"
    :class="{
      'right-text': rightText,
      'left-text': leftText,
      'icon-left': iconLeft,
      'icon-right': iconRight,
      error,
      'error-message': errorMessage,
      medium: size === 'medium'
    }"
  >
    <div v-if="title" class="field__title">{{ title }}</div>
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
    }
  },
  emits: {
    'update:modelValue': null
  },
  data() {
    return {}
  },
  methods: {
    updateValue(event) {
      // console.log(this.modelModifiers)
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
