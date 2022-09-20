<template>
  <div class="service__kit-inner">
    <div class="service__kit-top" @click="showParts">
      <div class="service__kit-left">
        <i class="i-build" />
        <div class="service__kit-title">Parts Kit #{{ kit.id }}</div>
      </div>
      <div class="service__kit-right">
        <div class="service__kit-num">{{ formatter(kit.partsList.reduce((sum, current) => sum + current.price * current.quantity, 0)) }}</div>
        <div class="service__kit-icon"><i class="i-keyboard_arrow_down" :class="{'-revert': showKit}" /></div>
      </div>
    </div>
    <div v-if="showKit" class="service__kit">
      <Slot v-for="part of kit.partsList" :key="part.id" :part="part" class="service__partkit" />
    </div>
  </div>
</template>

<script>
import Slot from './Slot'

export default {
  name: 'CardModalServicePartsKit',
  components: {Slot},
  props: {
    kit: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showKit: false
    }
  },
  methods: {
    showParts() {
      this.showKit = !this.showKit
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
