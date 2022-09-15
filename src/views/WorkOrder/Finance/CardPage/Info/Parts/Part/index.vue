<template>
  <div class="part__wrapper">
    <div class="part__title">{{ part.name }}</div>
    <Dropdown v-model="markup" :options="markups" size="small" placeholder="Choose Markup" theme="grey" />
    <div class="part__title">{{ part.quantity }}</div>
    <div class="part__title">${{ part.cost }}</div>
    <div class="part__title">${{ (part.cost * part.quantity).toFixed(2) }}</div>
    <div class="part__title">${{ part.price }}</div>
    <div class="part__title">${{ (part.price * part.quantity).toFixed(2) }}</div>
    <i class="i-more_horiz" />
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'

export default {
  name: 'InfoPart',
  components: {Dropdown},
  props: {
    part: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      markups: ['Warranty Claim', 'In-house', 'Manufactures'],
      markup: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
