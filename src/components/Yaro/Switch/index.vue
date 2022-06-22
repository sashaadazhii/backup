<template>
  <div :class="containerClass" @click="onClick($event)">
    <div class="y-hidden-accessible">
      <input
        ref="input"
        type="checkbox"
        :checked="checked"
        :disabled="disabled"
        v-bind="$attrs"
        @focus="onFocus($event)"
        @blur="onBlur($event)"
        @keydown.enter.prevent="onClick($event)"
        role="switch"
      />
    </div>
    <div class="y-switch__slider" />
    <div class="y-switch__label">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: 'Switch',
  inheritAttrs: false,
  emits: ['click', 'update:modelValue', 'change', 'input'],
  props: {
    modelValue: {
      type: null,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    class: null,
    trueValue: {
      type: null,
      default: true
    },
    falseValue: {
      type: null,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      focused: false
    }
  },
  methods: {
    onClick(event) {
      if (!this.$attrs.disabled) {
        const newValue = this.checked ? this.falseValue : this.trueValue
        this.$emit('click', event)
        this.$emit('update:modelValue', newValue)
        this.$emit('change', event)
        this.$emit('input', newValue)
        this.$refs.input.focus()
      }
      event.preventDefault()
    },
    onFocus() {
      this.focused = true
    },
    onBlur() {
      this.focused = false
    }
  },
  computed: {
    containerClass() {
      return [
        'y-switch',
        this.class,
        {
          'y-switch--checked': this.checked,
          'y-switch--disabled': this.$attrs.disabled,
          'y-switch--focus': this.focused,
          'y-switch--disabled': this.disabled,
        }
      ]
    },
    checked() {
      return this.modelValue === this.trueValue
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
