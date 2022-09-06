<template>
  <div class="guide__wrapper">
    <div class="guide__header">
      <i class="i-arrow_circle_left" @click="$emit('changeSection', 'Guides')" />
      <div class="guide__title" @click="$emit('changeSection', 'Guides')">Back to all</div>
      <Menu :list="actionsList" />
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
          label: 'Delete',
          icon: 'i-remove_circle red'
          // command: () => this.openDeleteModal()
        }
      ]
    }
  },
  computed: {
    ...mapState({
      guide: s => s.company.guides.guide
    })
  },
  methods: {
    ...mapMutations({
      set: 'company/guides/setGuide'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
