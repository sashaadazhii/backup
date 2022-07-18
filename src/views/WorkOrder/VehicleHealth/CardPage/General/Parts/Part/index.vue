<template>
  <div class="part__wrapper" :class="{'-select': part.select}">
    <div class="y-check" :class="{'-active': part.select}" @click="select(part.id)" />
    <span># {{ part.name }}</span>
    <Label :label="`$ ${part.core}`" border size="large" class="-grey" />
    <Label :label="`${part.quantity}`" border size="large" class="-grey" />
    <Label :label="`$ ${part.price}`" border size="large" class="-grey" />
    <span>${{ part.total }}</span>
    <Dropdown size="medium" :modelValue="part.type" :options="types" @change="change" :disabled="!part.select" />
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'
import Dropdown from '@/components/Yaro/Dropdown'
import {mapMutations} from 'vuex'

export default {
  name: 'CardPageGeneralPart',
  components: {Label, Dropdown},
  props: {
    part: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      types: ['Warranty Claim', 'In-house', 'Manufacturers']
    }
  },
  methods: {
    ...mapMutations({
      select: 'company/parts/select',
      change: 'company/parts/change'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
