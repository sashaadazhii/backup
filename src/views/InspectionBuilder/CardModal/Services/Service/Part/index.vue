<template>
  <NewPart v-if="isEdit" :serviceID="part.serviceID" :localPart="part" @close="isEdit = false" />
  <div v-else class="part__wrapper">
    <i class="i-build" />
    <div class="part__name">{{ part.name }}</div>
    <div class="part__num">{{ part.quantity }}</div>
    <div class="part__num">${{ part.price }}</div>
    <Menu :list="actionsList">
      <template #menu>
        <Button icon="i-more_horiz" border size="small" />
      </template>
    </Menu>
  </div>
</template>

<script>
import Button from '@/components/Yaro/Button'
import Menu from '@/components/Yaro/Menu'
import {mapState, mapMutations} from 'vuex'
import NewPart from '../NewPart'

export default {
  name: 'CardModalServicePart',
  components: {Button, Menu, NewPart},
  data() {
    return {
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
            this.remove(this.part)
          }
        }
      ],
      isEdit: false
    }
  },
  props: {
    part: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      card: s => s.cards.card
    })
  },
  methods: {
    ...mapMutations({
      remove: 'company/cannedServices/removePart'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
