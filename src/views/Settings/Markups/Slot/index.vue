<template>
  <div class="markup__wrapper">
    <div class="markup__label" :class="labelClass">
      <i :class="labelIcon" /> <span>{{ markup.type }}</span>
    </div>
    <div class="markup__text">{{ markup.style }}</div>
    <div class="markup__text">&lt;${{ markup.costs }}</div>
    <div class="markup__text">{{ markup.markup.toFixed(2) }}</div>
    <Menu :list="actionsList" />
  </div>
</template>
<script>
import Menu from '@/components/Yaro/Menu'

export default {
  name: 'CompanySettingsMarkupSlot',
  props: {
    markup: {
      type: Object,
      required: true
    }
  },
  components: {Menu},
  data() {
    return {
      isLoading: false,
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {}
        },
        {label: 'Remove', icon: 'i-remove_circle red', command: () => {}}
      ]
    }
  },
  computed: {
    labelClass() {
      return {
        green: this.markup.type === 'Price & Service',
        blue: this.markup.type === 'Labour'
      }
    },
    labelIcon() {
      const type = this.markup.type
      switch (type) {
        case 'Price & Service':
          return 'i-construction'
        case 'Labour':
          return 'i-build'
        default:
          return 'i-request_page'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
