<template>
  <div class="part__wrapper">
    <div class="part__title">{{ part.name }}</div>

    <div class="part__dropdown">
      <Dropdown v-model="markup" :options="markups" size="small" placeholder="Choose Markup" theme="grey" class="dropdown--part" />
    </div>
    <div class="part__title">{{ part.quantity }}</div>
    <div class="part__title">${{ part.cost }}</div>
    <div class="part__title">${{ (part.cost * part.quantity).toFixed(2) }}</div>
    <div class="part__title">${{ part.price }}</div>
    <div class="part__title">${{ (part.price * part.quantity).toFixed(2) }}</div>
    <Menu :list="actionsList">
      <template #menu>
        <Button icon="i-more_horiz1" border size="small" />
      </template>
    </Menu>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Dropdown from '@/components/Yaro/Dropdown'
import Menu from '@/components/Yaro/Menu'
import Button from '@/components/Yaro/Button'

export default {
  name: 'InfoPart',
  components: {Dropdown, Menu, Button},
  props: {
    part: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      markups: ['Warranty Claim', 'In-house', 'Manufactures'],
      markup: '',
      actionsList: [
        {
          label: 'Remove',
          icon: 'i-remove_circle red',
          command: () => {
            this.$confirm.require({
              title: 'Hey, wait!',
              message: `Are you sure, you want to remove this ${this.part.name}?`,
              icon: 'i-volume_up',
              accept: async () => {
                this.remove(this.part.id)
              }
            })
          }
        }
      ]
    }
  },
  created() {
    this.markup = this.part.markup
  },
  methods: {
    ...mapMutations({
      remove: 'finance/removePart'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
