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
        <Label :label="block.type" size="small" class="element__label" :class="{'-orange': block.type === 'Select', '-blue': block.type === 'Drop-Down'}" />
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
import New from '../../New'

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
          command: () => this.openEditModal()
        },
        {
          label: 'Remove',
          icon: 'i-remove_circle red',
          command: () => this.openDeleteModal()
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
      remove: 'workOrder/questions/remove',
      set: 'workOrder/questions/set'
    }),
    openDeleteModal() {
      this.$confirm.require({
        title: 'Hey, wait!',
        message: `Are you sure, you want to remove this questions?`,
        acceptLabel: 'Remove',
        rejectLabel: 'Cancel',
        icon: 'i-volume_up',
        accept: () => this.remove(this.group.id)
      })
    },
    openEditModal() {
      this.set(this.group)
      this.$vfm.hide('Questions')
      this.$vfm.show({
        component: New,
        bind: {
          name: 'New'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
