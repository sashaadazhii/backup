<template>
  <div class="part">
    <div class="part__inner">
      <i class="i-build" />
      <div class="part__name">{{ part.name }}</div>
      <div class="part__num">{{ part.quantity }}</div>
      <div class="part__num">{{ formatter(part.price) }}</div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import _ from 'lodash'

export default {
  name: 'CardModalServicePartKit',
  props: {
    part: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
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
            this.removePartKit(this.part.id)
          }
        }
      ]
    }
  },

  computed: {
    ...mapState({
      card: s => s.cards.card
    })
  },
  methods: {
    ...mapMutations({
      removePartKit: 'company/cannedServices/removePartsKit'
    }),
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
