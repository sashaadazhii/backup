<template>
  <div class="part__wrapper">
    <div class="part__main">
      <div class="part__top">
        <i v-if="isNewLabour || isNewService" class="i-monetization_on" :style="[isNewService ? 'color: #BA8AE7' : 'color: #2C9AFF']" />
        <i v-else class="i-build" />
        <Input v-model="name" size="small" placeholder="Name" />
        <Input v-model="quantity" size="small" placeholder="Quantity" v-maska="'####'" />
        <Input v-model="price" size="small" placeholder="Price" v-maska="{mask: 'HHHHHHHH', tokens: {H: {pattern: /[0-9.]/}}}" />
        <span>{{ formatter(total) }}</span>
      </div>
      <div class="part__bottom">
        <textarea v-model="description" class="part__textarea" placeholder="Description"></textarea>
      </div>
    </div>

    <div class="part__footer">
      <Button label="Save" size="small" @click="addPart" />
      <Button label="Cancel" border size="small" @click="$emit('close')" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Yaro/Button'
import Input from '@/components/Yaro/Input'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'CardPageGeneralNewPart',
  components: {Input, Button},
  emits: ['close'],
  props: {
    part: {
      type: Object
    },
    service: {
      type: Object
    },
    isNewService: {
      type: Boolean
    },
    isNewLabour: {
      type: Boolean
    }
  },
  data() {
    return {
      name: null,
      core: null,
      quantity: null,
      price: null,
      description: null
    }
  },
  computed: {
    ...mapState({
      service: s => s.company.cannedServices.activeService
    }),
    total() {
      return (this.quantity * this.price).toFixed(2)
    }
  },
  methods: {
    ...mapMutations({}),
    addPart() {
      const {name, price, quantity, description} = this

      let part = {
        serviceID: this.service.id,
        id: this.$getID(),
        name,
        quantity,
        description,
        price,
        select: false,
        isLabour: false,
        isService: false
      }
      if (this.isNewLabour) {
        part = {
          serviceID: this.service.id,
          id: this.$getID(),
          name,
          quantity,
          description,
          price,
          select: false,
          isLabour: true,
          isService: false
        }
      }
      if (this.isNewService) {
        part = {
          serviceID: this.service.id,
          id: this.$getID(),
          name,
          quantity,
          description,
          price,
          select: false,
          isLabour: false,
          isService: true
        }
      }
      this.$emit('addPart', part)
      this.$emit('close')
    },
    formatter(val) {
      const price = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}).format(val)
      return price
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
