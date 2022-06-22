<template>
  <div class="y-colors__wrapper">
    <div class="y-colors__list">
      <div
        v-for="(color, idx) of list"
        :key="color + idx"
        class="y-colors__item"
        :class="{'y-colors__item--active': color === localValue}"
        :style="{backgroundColor: color}"
        @click="selectColor(color)"
      />
    </div>
    <div class="y-colors__palette">
      <div class="y-colors__palette-line" />
      <div class="y-colors__palette-item" :style="{backgroundColor: customColor}" />
      <label class="y-colors__palette-label">
        <i class="i-palette y-colors__palette-icon" />
        <input class="y-colors__palette-input y-hidden-accessible" type="color" :value="localValue" @input="onInput" />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Colors',
  emits: ['update:modelValue'],
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    },
    palette: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      localValue: '#ffffff',
      customColor: null
    }
  },
  created() {
    if (this.modelValue) this.localValue = this.modelValue
    this.checkColor()
  },
  computed: {
    activeClass() {
      return true
    }
  },
  watch: {
    modelValue(color) {
      this.localValue = color
      this.checkColor()
    }
  },
  methods: {
    selectColor(color) {
      this.localValue = color
      this.customColor = null
      this.$emit('update:modelValue', color)
    },
    onInput(event) {
      this.localValue = event.target.value
      this.customColor = event.target.value
      this.$emit('update:modelValue', event.target.value)
    },
    checkColor() {
      const isColor = this.list.some(c => c === this.modelValue)
      if (!isColor) this.customColor = this.modelValue
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
