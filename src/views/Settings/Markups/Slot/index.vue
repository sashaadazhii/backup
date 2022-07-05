<template>
  <div class="markup__wrapper">
    <Label :label="markup.type" icon="i-construction" size="huge" />
    <div class="markup__name">{{ markup.name }}</div>
    <div class="markup__text">&lt;{{ markup.costs }}$</div>
    <div class="markup__text">{{ markup.markup.toFixed(2) }}</div>
    <div class="markup__label">{{ markup.status }}</div>

    <Menu :list="actionsList" />
  </div>
</template>
<script>
import Menu from '@/components/Yaro/Menu'
import Label from '@/components/Yaro/Label'

export default {
  name: 'CompanySettingsMarkupSlot',
  props: {
    markup: {
      type: Object,
      required: true
    }
  },
  components: {Menu, Label},
  data() {
    return {
      isLoading: false,
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {}
        },
        {
          icon: 'i-remove_circle red',
          command: () => {}
        }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
