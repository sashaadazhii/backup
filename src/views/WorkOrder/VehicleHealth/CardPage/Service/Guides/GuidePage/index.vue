<template>
  <div class="guide__wrapper">
    <div class="guide__header">
      <i class="i-arrow_circle_left" @click="$emit('changeSection', 'Guides')" />
      <div class="guide__title" @click="$emit('changeSection', 'Guides')">Back to all</div>
      <Menu v-if="isStart" :list="actionsList" />
    </div>
    <div class="guide__inner ql-editor ql-snow" v-html="guide.text" />
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Menu from '@/components/Yaro/Menu'

export default {
  name: 'CardPageGeneralGuide',
  emits: ['changeSection'],
  components: {Menu},

  data() {
    return {
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {
            this.set(this.guide)
            this.$emit('changeSection', 'NewGuide')
          }
        },
        {
          label: 'Remove',
          icon: 'i-remove_circle red',
          command: () => {
            this.remove(this.guide.id)
            this.$emit('changeSection', 'Guides')
            this.set({})
          }
        }
      ]
    }
  },
  computed: {
    ...mapState({
      guide: s => s.company.guides.guide,
      isStart: s => s.workOrder.isStart
    })
  },

  methods: {
    ...mapMutations({
      set: 'company/guides/setGuide',
      remove: 'company/guides/remove'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
