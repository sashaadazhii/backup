<template>
  <div :class="containerClass" :style="{backgroundColor: color}">
    <slot>
      <i v-if="icon" :class="iconClass" :style="{color: iconColor, fontSize: iconSize}" />
      <span v-if="alias && !icon" class="y-label__alias">{{ alias }}</span>
      <span v-if="label || label === 0" class="y-label__text">{{ label }}</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Label',
  emits: ['remove'],
  props: {
    label: {
      type: [String, Number]
    },
    size: {
      type: String
    },
    icon: {
      type: String
    },
    iconColor: {
      type: String
    },
    iconSize: {
      type: String
    },
    alias: {
      type: String
    },
    color: {
      type: String
    }
  },
  computed: {
    containerClass() {
      return [
        'y-label',
        {
          'y-label--mini': this.size === 'mini',
          'y-label--small': this.size === 'small',
          'y-label--large': this.size === 'large',
          'y-label--huge': this.size === 'huge',
          'y-label--icon': this.icon,
          'y-label--icon-only': (this.icon || this.alias) && !this.label,
          'y-label--circle': this.$attrs.hasOwnProperty('circle'),
          'y-label--border': this.$attrs.hasOwnProperty('border')
        }
      ]
    },
    iconClass() {
      return ['y-label__icon', this.icon]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
