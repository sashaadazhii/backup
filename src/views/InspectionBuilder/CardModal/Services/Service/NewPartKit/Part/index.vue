<template>
  <div class="npart__block">
    <div class="npart__top">
      <div class="npart__text -large">Part {{ counter }}</div>
      <div class="npart__line"></div>
      <Button icon="i-remove_circle_outline" size="mini" circle border @click="$emit('onRemove', part.id)" />
    </div>
    <div class="npart__main">
      <Input :modelValue="part.name" @input="$emit('update:name', $event)" title="Part Description" placeholder="Enter Part Description" />
      <div class="npart__row">
        <Input :modelValue="part.quantity" @input="$emit('update:quantity', $event)" title="Quantity" placeholder="Quantity" v-maska="'####'" />
        <Input
          :modelValue="part.price"
          @input="$emit('update:price', $event)"
          title="Price $"
          placeholder="$ Price"
          v-maska="{mask: 'HHHHHHHH', tokens: {H: {pattern: /[0-9.]/}}}"
        />
        <Input :modelValue="part.link" @input="$emit('update:link', $event)" title="Link" placeholder="Link" />
      </div>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Yaro/Input'
import Button from '@/components/Yaro/Button'
import {mapMutations} from 'vuex'

export default {
  name: 'SlotPartKitNew',
  components: {Input, Button},
  emits: ['onRemove', 'update:name', 'update:quantity', 'update:price', 'update:link'],
  props: {
    counter: {
      type: Number
    },
    part: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
