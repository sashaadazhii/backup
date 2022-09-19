<template>
  <div class="npart__wrapper">
    <div class="npart__header">
      <div class="npart__title">Add Parts Kit to Replace all</div>
      <Button icon="i-circle_close" border circle @click="$emit('closeNew')" size="small" />
    </div>

    <Slot :counter="1" :serviceID="serviceID" @hideSlot="hideSlot(part)" @addPart="addPart" />
    <Slot v-for="(part, idx) in partsKit" :key="part.id" :counter="idx + 2" :serviceID="serviceID" @hideSlot="hideSlot(part)" @addPart="addPart" />

    <div class="npart__bottom">
      <Button label="Save" @click="save" />
      <Button label="Cancel" border @click="$emit('closeNew')" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Yaro/Button'
import Slot from './Slot'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'CardModalServicePartKitNew',
  components: {Button, Slot},
  emits: ['closeNew'],
  props: {
    serviceID: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      // partsKit: [{id: this.$getID(), name: null, quantity: null, price: null, link: null}],
      partsKit: [],
      part: null,
      isAdded: false
    }
  },
  computed: {},
  created() {
    // if (this.localPart) {
    //   const {name, quantity, price} = this.localPart
    //   this.name = name
    //   this.quantity = quantity
    //   this.price = price
    // }
  },
  methods: {
    ...mapMutations({
      add: 'company/cannedServices/addPartsKit'
      // update: 'company/cannedServices/updatePart'
    }),
    addPart(part) {
      this.part = part
      if (this.partsKit.length === 1 && !this.isAdded) {
        this.partsKit.push(this.part)
        this.isAdded = true
      } else this.partsKit.push(this.part)
    },
    hideSlot(el) {
      let idx = this.partsKit.findIndex(c => c.id === el.id)
      this.partsKit.splice(idx, 1)
    },
    save() {
      //TODO: not finished
      this.add(this.partsKit, this.serviceID)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
