<template>
  <div class="guid__wrapper">
    <i class="i-article_menu" />
    <div class="guid__name">{{ guid.name }}</div>
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
import {mapState} from 'vuex'

export default {
  name: 'CardModalServiceGuid',
  props: {
    guid: {
      type: Object,
      required: true
    }
  },
  components: {Button, Menu},
  data() {
    return {
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {}
        },
        {
          label: 'Remove',
          icon: 'i-remove_circle red',
          command: () => {}
        }
      ]
    }
  },
  computed: {
    ...mapState({
      card: s => s.company.cardTemplates.template
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
