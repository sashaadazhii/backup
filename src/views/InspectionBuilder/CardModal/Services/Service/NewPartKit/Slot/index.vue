<template>
  <div class="npart__block">
    <div class="npart__top">
      <div class="npart__text -large">Part {{ counter }}</div>
      <div class="npart__line"></div>
      <div class="npart__btn" @click="$emit('hideSlot')"><i class="i-remove_circle_outline" /></div>
    </div>
    <div class="npart__main">
      <Input v-model="name" title="Part Description" placeholder="Enter Part Description" />
      <div class="npart__row">
        <Input v-model="quantity" title="Quantity" placeholder="Quantity" v-maska="'####'" />
        <Input v-model="price" title="Price $" placeholder="$ Price" v-maska="{mask: 'HHHHHHHH', tokens: {H: {pattern: /[0-9.]/}}}" />
        <Input v-model="link" title="Link" placeholder="Link" />
      </div>
    </div>
  </div>
  <div class="npart__btn-large">
    <Button label="Add part" grey position="center" icon="i-add_circle" size="large" class="large-centered" @click="addPart()" />
  </div>
</template>

<script>
import Input from '@/components/Yaro/Input'
import Button from '@/components/Yaro/Button'
import {mapMutations} from 'vuex'

export default {
  name: 'SlotPartKitNew',
  components: {Input, Button},
  emits: ['hideSlot', 'addPart'],
  props: {
    serviceID: {
      type: Number,
      required: true
    },
    localPart: {
      type: Object
    },
    counter: {
      type: Number
    }
  },
  data() {
    return {
      name: null,
      quantity: null,
      price: null,
      link: null,
      isAdded: false
    }
  },

  created() {
    if (this.localPart) {
      const {name, quantity, price, link} = this.localPart
      this.name = name
      this.quantity = quantity
      this.price = price
      this.link = link
    }
  },
  methods: {
    ...mapMutations({
      add: 'company/cannedServices/addPartsKit',
      update: 'company/cannedServices/updatePart'
    }),
    addPart() {
      const {name, quantity, price, link} = this
      const part = {
        id: this.$getID(),
        serviceID: this.serviceID,
        name,
        price,
        quantity,
        link
      }
      this.isAdded = true
      this.$emit('addPart', part)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
