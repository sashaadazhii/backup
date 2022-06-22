<template>
  <div :style="containerStyle" :class="containerClass"></div>
</template>

<script>
export default {
  name: 'Skeleton',
  props: {
    shape: {
      type: String,
      default: 'rectangle' // rectangle / circle
    },
    size: {
      type: String,
      default: null
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '46px'
    },
    borderRadius: {
      type: String,
      default: null
    },
    animation: {
      type: String,
      default: 'wave'
    }
  },
  computed: {
    containerClass() {
      return [
        'y-skeleton',
        {
          'y-skeleton--circle': this.shape === 'circle',
          'y-skeleton--none': this.animation === 'none'
        }
      ]
    },
    containerStyle() {
      if (this.size) return {width: this.size, height: this.size, borderRadius: this.borderRadius}
      else return {width: this.width, height: this.height, borderRadius: this.borderRadius}
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
