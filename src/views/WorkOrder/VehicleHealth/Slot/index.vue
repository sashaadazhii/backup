<template>
  <div class="card__wrapper">
    <div class="y-check" :class="{'-active': card.select}" @click="select(card.uid)" />
    <Label :label="card.status" size="small" class="card__label" :class="labelClass(card.status)" />
    <div class="card__title">{{ card.name }}</div>
    <Label :label="card.approvalStatus" size="small" icon="i-rp_done" circle class="card__label -shadow" :class="labelClass(card.approvalStatus)" iconSize="8px" />
    <div class="card__progress">
      <div class="card__progress-title">{{ card.progress }}%</div>
      <div class="card__progress-bar"><span :style="{width: card.progress + '%'}" /></div>
      <div class="card__progress-title">{{ card.service }}</div>
    </div>
    <Menu :list="actionsList" />
  </div>
</template>

<script>
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
    }),
    labelClass(status) {
      return {
        '-orange': status === 'Recommended',
        '-red': status === 'Component Unsafe',
        '-bluegreen': status === 'Canned Service Completed',
        '-none': status === 'No Status',
        '-green': status === 'Approved By Service Advisor',
        '-green -border': status === 'Approved By Customer',
        '-bluegreen': status === 'Temporary Declined',
        '-red': status === 'Permanently Declined',
        '-purple': status === 'Approved For Next Visit'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
