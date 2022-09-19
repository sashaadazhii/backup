<template>
  <div class="service__kit-inner">
    <div class="service__kit-top" @click="showParts">
      <div class="service__kit-left">
        <i class="i-build" />
        <div class="service__kit-title">Parts Kit #121212</div>
      </div>
      <div class="service__kit-right">
        <div class="service__kit-num">{{ formatter(kit.reduce((sum, current) => sum + current.price * current.quantity, 0)) }}</div>
        <div class="service__kit-icon"><i class="i-keyboard_arrow_down" :class="{'-revert': showKit}" /></div>
      </div>
    </div>

    <div v-if="showKit" class="service__kit">
      <Slot v-for="part of kit" :key="part.id" :part="part" class="service__partkit" />
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
      // isEdit: false,
      showKit: false,
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {
            this.isEdit = true
          }
        },
        {
          label: 'Remove',
          icon: 'i-remove_circle red',
          command: () => {
            this.removePartKit(this.part)
          }
        }
      ]
    }
  },

  // computed: {
  //   ...mapState({
  //     card: s => s.cards.card
  //   })
  // },
  methods: {
    // ...mapMutations({
    //   removePartKit: 'company/cannedServices/removePartsKit'
    // }),
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
