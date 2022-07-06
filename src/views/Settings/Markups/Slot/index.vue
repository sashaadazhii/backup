<template>
  <div class="markup__wrapper">
    <div class="markup__label">
      <i class="i-construction" /> <span>{{ markup.type }}</span>
    </div>
    <div class="markup__text">{{ markup.style }}</div>
    <div class="markup__text">&lt;${{ markup.costs }}</div>
    <div class="markup__text">{{ markup.markup.toFixed(2) }}</div>
    <div class="markup__label markup__label--small">{{ markup.status }}</div>

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
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
