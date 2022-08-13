<template>
  <div class="block__wrapper">
    <div class="block__header">
      <div class="block__title">{{ group.title }}</div>
      <Menu :list="actionsList">
        <template #menu>
          <Button icon="i-more_horiz" border size="small" class="menu-btn" />
        </template>
      </Menu>
    </div>
    <div class="block__body">
      <div v-for="(block, idx) of group.blocks" :key="idx" class="block__elem element">
        <Label
          :label="getLabel(block.type)"
          size="small"
          class="element__label"
          :class="{'-orange': block.type === 'select', '-blue': block.type === 'dropdown'}"
        />
        <div class="element__title">{{ block.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Button from '@/components/Yaro/Button'
import Menu from '@/components/Yaro/Menu'
import Label from '@/components/Yaro/Label'

export default {
  name: 'QuestionsModalBlock',
  components: {Button, Menu, Label},
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {
            alert('Edit action')
          }
        },
        {
          label: 'Remove',
          icon: 'i-remove_circle red',
          command: () => {
            alert('Remove action')
          }
        }
      ]
    }
  },

  computed: {
    ...mapState({
      // card: s => s.company.card.card
    })
  },
  methods: {
    ...mapMutations({
      // setErrors: 'company/card/setErrors',
    }),
    // TODO: Field Number Component
    dec() {
      if (!this.time) return
      this.time -= 0.5
    },
    inc() {
      this.time += 0.5
    },
    // TODO: Field Number Component
    getLabel(label) {
      switch (label) {
        case 'input':
          return 'Input'
        case 'dropdown':
          return 'Drop-down'
        case 'select':
          return 'Select'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
