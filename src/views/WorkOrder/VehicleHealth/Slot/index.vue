<template>
  <div class="card__wrapper">
    <div class="y-check" :class="{'-active': card.select}" @click="select(card.uid)" />
    <Label :label="card.status" size="small" border class="card__label" />
    <div class="card__title">{{ card.name }}</div>
    <Label :label="card.approvalStatus" size="small" icon="i-rp_done" border circle class="card__label" />
    <div class="card__progress">
      <div class="card__progress-title">{{ card.progress }}%</div>
      <div class="card__progress-bar"><span :style="{width: card.progress + '%'}" /></div>
      <div class="card__progress-title">{{ card.service }}</div>
    </div>
    <Menu :list="actionsList" />
  </div>
</template>

<script>
// import Request from './RequestComponent'
import Menu from '@/components/Yaro/Menu'
import Label from '@/components/Yaro/Label'
import {mapMutations} from 'vuex'
export default {
  name: 'CardSlot',
  components: {Label, Menu},
  data() {
    return {
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {}
        },
        {
          label: 'Delete',
          icon: 'i-remove_circle red',
          command: () => {}
        }
      ]
    }
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations({
      select: 'company/cards/select'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
