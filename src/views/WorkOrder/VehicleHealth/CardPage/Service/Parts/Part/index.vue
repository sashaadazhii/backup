<template>
  <div class="part__wrapper" :class="{'-select': part.select}">
    <div class="y-check" :class="{'-active': part.select}" @click="$emit('select', part.id)" />
    <span># {{ part.name }}</span>
    <Input v-model="core" size="small" />
    <Input v-model="quantity" size="small" />
    <Input v-model="price" size="small" />
    <span>${{ total }}</span>
    <Label v-if="part.type" :label="part.type" border size="large" class="-grey" />
    <div v-else />
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'
import Input from '@/components/Yaro/Input'

export default {
  name: 'CardPageGeneralPart',
  components: {Label, Input},
  emits: {select: null},
  props: {
    part: {
      type: Object,
      required: true
    }
  },
  created() {
    const {price, core, quantity} = this.part
    this.price = price
    this.core = core
    this.quantity = quantity
  },
  data() {
    return {
      core: 0,
      quantity: 0,
      price: 0
    }
  },
  computed: {
    total() {
      return (this.quantity || 0 * this.price).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
