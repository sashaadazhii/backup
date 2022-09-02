<template>
  <div class="part__wrapper" :class="{'-select': part.select}">
    <div class="y-check" :class="{'-active': part.select}" @click="$emit('select', part.id)" />
    <span># {{ part.name }}</span>
    <Input v-model="core" size="small" />
    <Input v-model="quantity" size="small" />
    <Input v-model="price" size="small" />
    <span>${{ total }}</span>
    <Label :label="part.type" border size="large" class="-grey" />
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
    this.price = this.part.price
  },
  data() {
    return {
      core: null,
      quantity: null,
      price: null
    }
  },
  computed: {
    total() {
      return this.quantity * this.price
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
