<template>
  <div class="npart__wrapper">
    <div class="npart__top">
      <i class="i-build" />
      <Input v-model="name" placeholder="Enter npart #" />
      <Input v-model="quantity" placeholder="Quantity" v-maska="'####'" />
      <Input v-model="price" placeholder="$ Price" v-maska="{mask: 'HHHHHHHH', tokens: {H: {pattern: /[0-9.]/}}}" />
    </div>
    <div class="npart__bottom">
      <Button label="Save" @click="save" />
      <Button label="Cancel" border @click="cancel" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Yaro/Button'
import Input from '@/components/Yaro/Input'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'CardModalServicePartNew',
  components: {Button, Input},
  emits: ['close'],
  props: {
    serviceID: {
      type: Number,
      required: true
    },
    localPart: {
      type: Object
    }
  },
  data() {
    return {
      name: '',
      quantity: null,
      price: null
    }
  },
  computed: {
    ...mapState({
      card: s => s.company.cardTemplates.template
    })
  },
  created() {
    if (this.localPart) {
      const {name, quantity, price} = this.localPart
      this.name = name
      this.quantity = quantity
      this.price = price
    }
  },
  methods: {
    ...mapMutations({
      add: 'company/cannedServices/addPart',
      update: 'company/cannedServices/updatePart'
    }),
    save() {
      const {name, quantity, price} = this
      const part = {
        id: this.$getID(),
        serviceID: this.serviceID,
        name,
        price,
        quantity,
        core: 0,
        select: false
      }
      if (this.localPart) {
        const {id, serviceID, core} = this.localPart
        part.id = id
        part.serviceID = serviceID
        part.core = core
        this.update(part)
      } else {
        this.add(part)
      }

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
