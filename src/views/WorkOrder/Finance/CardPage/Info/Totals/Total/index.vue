<template>
  <div class="total__wrapper">
    <div class="total__header" :class="{'-parts': total.parts}">
      <i :class="`i-square total__icon -${total.color}`"/>
      <div class="total__title">{{ total.name }}</div>
      <div class="total__price">
        <i :class="`i-monetization_on -${total.color}`" /><span>${{ total.price }}</span>
      </div>
      <i v-if="total.parts" class="i-keyboard_arrow_down total__btn" :class="{'-rotate': show}" @click="show = !show" />
    </div>
    <div v-if="show" class="total__body">
      <div v-for="(part, idx) of total.parts" :key="idx" class="total__part">
        <span>{{part.name}}</span>
        <span>{{part.quantity || ''}}</span>
        <span>${{part.price}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinanceTotal',
  props: {
    total: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
