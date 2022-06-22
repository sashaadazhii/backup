<template>
  <div :class="containerClass" :style="{backgroundColor: color}">
    <slot>
      <i :class="iconClass" v-if="icon" />
      <span class="y-label__alias" v-if="alias && !icon">{{ alias }}</span>
      <div class="y-label__text" v-if="label">{{ label }}</div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Chip',
  emits: ['remove'],
  props: {
    label: {
      type: String
    },
    size: {
      type: String
    },
    icon: {
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
