<template>
  <div :class="containerClass">
    <div v-if="label" class="y-input__title">{{ label }}</div>
    <label class="y-input__label">
      <i v-if="icon && type !== 'search'" :class="iconClass" />
      <i v-if="type === 'search'" class="y-input__icon y-input__icon--search i-search1" />
      <input :type="type" class="y-input__input" :placeholder="placeholder" :value="modelValue" @input="onInput" v-bind="$attrs" />
      <i v-if="type === 'search' && modelValue" class="y-input__icon y-input__icon--del i-circle_close grey" />
      <i v-if="error" class="y-input__icon y-input__icon--error i-info red" />
    </label>
    <div v-if="error && errorMessage" class="y-input__error">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'Input',
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },
    placeholder: String,
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    icon: String,
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: String,
    size: String
  },
  emits: {
    'update:modelValue': null
  },
  data() {
    return {}
  },
  computed: {
    containerClass() {
      return [
        'y-input',
        {
          'y-input--mini': this.size === 'mini',
          'y-input--small': this.size === 'small',
          'y-input--large': this.size === 'large',
          'y-input--huge': this.size === 'huge',
          'y-input--icon': this.icon
        }
      ]
    },
    iconClass() {
      return ['y-input__icon', this.icon]
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
