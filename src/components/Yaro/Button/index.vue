<template>
  <button :class="buttonClass" type="button" :disabled="disabled" v-ripple>
    <div v-if="loading" class="y-button--loading-icon">
      <i :class="loadingIcon" />
    </div>
    <i v-if="icon" :class="iconClass" :style="{fontSize: iconSize}" />
    <span class="y-button--label">{{ label || '&nbsp;' }}</span>
  </button>
</template>

<script>
import Ripple from '../ripple'

export default {
  name: 'Button',
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
    iconPos: {
      type: String,
      default: 'left'
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingIcon: {
      type: String,
      default: 'i-loading y-spin'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: null
    },
    iconSize: String
  },
  computed: {
    buttonClass() {
      return {
        'y-button': true,
        'y-button--icon-only': this.icon && !this.label,
        'y-button--disabled': this.disabled || this.loading,
        'y-button--loading': this.loading,
        'y-button--mini': this.size === 'mini',
        'y-button--small': this.size === 'small',
        'y-button--large': this.size === 'large',
        'y-button--huge': this.size === 'huge',
        'y-button--circle': this.$attrs.hasOwnProperty('circle'),
        'y-button--border': this.$attrs.hasOwnProperty('border'),
        'y-button--red': this.$attrs.hasOwnProperty('red'),
        'y-button--grey': this.$attrs.hasOwnProperty('grey'),
        'y-button--center': this.position === 'center'
      }
    },
    iconClass() {
      return [
        this.icon,
        'y-button--icon',
        {
          'y-button--icon--left': this.iconPos === 'left' && this.label,
          'y-button--icon--right': this.iconPos === 'right' && this.label
        }
      ]
    }
  },
  directives: {
    ripple: Ripple
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
