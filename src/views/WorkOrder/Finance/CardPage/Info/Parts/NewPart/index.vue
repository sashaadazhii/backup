<template>
  <div class="npart__wrapper">
    <div class="npart__top">
      <i class="i-build" />
      <Input v-model="name" size="small" placeholder="Enter part #" />
      <Dropdown v-model="markup" :options="markups" size="small" placeholder="Markup"></Dropdown>
      <Input v-model="quantity" placeholder="Quantity" size="small" v-maska="'####'" />
      <Input v-model="cost" placeholder="$ Cost/Unit" size="small" v-maska="{mask: 'HHHHHHHH', tokens: {H: {pattern: /[0-9.]/}}}" />
      <Input v-model="price" placeholder="$ Price/Unit" size="small" v-maska="{mask: 'HHHHHHHH', tokens: {H: {pattern: /[0-9.]/}}}" />
    </div>
    <div class="npart__bottom">
      <Button label="Save" @click="save" />
      <Button label="Cancel" border @click="cancel" />
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Dropdown from '@/components/Yaro/Dropdown'
import Input from '@/components/Yaro/Input'
import Button from '@/components/Yaro/Button'

export default {
  name: 'InfoNewPart',
  components: {Dropdown, Input, Button},
  emits: ['close'],
  data() {
    return {
      markups: ['Warranty Claim', 'In-house', 'Manufactures'],
      markup: '',
      name: '',
      price: null,
      cost: null,
      quantity: null
    }
  },
  methods: {
    ...mapMutations({
      add: 'finance/addPart'
    }),
    save() {
      const {name, quantity, price, cost, markup} = this
      const part = {
        id: this.$getID(),
        name: `Part #${this.name}`,
        price,
        quantity,
        cost,
        markup
      }
      console.log(part)
      this.add(part)
      this.$emit('close')
    },
    cancel() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
