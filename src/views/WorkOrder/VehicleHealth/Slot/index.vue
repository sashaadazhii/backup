<template>
  <div class="card__wrapper" :class="{'-check': isStart}">
    <div class="y-check" :class="{'-active': card.select, '-hide': !isStart}" @click="select(card.id)" />
    <div class="card__menu">
      <Menu :list="statusesChange" position="left" :disabled="!isStart">
        <template #menu>
          <Label :label="card.status" size="small" class="card__label -hover" :class="labelClass(card.status)" />
        </template>
      </Menu>
    </div>
    <div class="card__title">{{ card.name }}</div>
    <div v-if="card.status === 'Good'" class="card__empty" />
    <Label
      v-else
      :label="card.approvalStatus"
      size="small"
      icon="i-rp_done"
      circle
      class="card__label -shadow"
      :class="labelClass(card.approvalStatus)"
      iconSize="8px"
    />
    <div class="card__progress">
      <div class="card__progress-title">{{ card.service }}%</div>
      <div class="card__progress-bar">
        <span :style="{width: card.service + '%'}" :class="{'-orange': card.service >= 60 && card.service < 89, '-red': card.service > 90}" />
      </div>
      <div class="card__progress-title">{{ card.odometerTrack.toLocaleString('fr-FR') }} KM / {{ card.timeTrackLength }} Month</div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Yaro/Menu'
import Label from '@/components/Yaro/Label'
import {mapMutations, mapState} from 'vuex'
export default {
  name: 'CardSlot',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
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
      ],
      statusesChange: [
        {label: 'No Status', command: () => this.changeStatus({id: this.card.id, status: 'No Status'})},
        {label: 'Good', command: () => this.changeStatus({id: this.card.id, status: 'Good'})},
        {label: 'Recommended', command: () => this.changeStatus({id: this.card.id, status: 'Recommended'})},
        {label: 'Component Unsafe', command: () => this.changeStatus({id: this.card.id, status: 'Component Unsafe'})}
      ]
    }
  },
  computed: {
    ...mapState({
      isStart: s => s.workOrder.isStart
    })
  },
  methods: {
    ...mapMutations({
      select: 'company/cards/select',
      changeStatus: 'company/cards/changeStatus'
    }),
    labelClass(status) {
      return {
        '-orange': status === 'Recommended',
        '-red': status === 'Component Unsafe' || status === 'Permanently Declined',
        '-bluegreen': status === 'Canned Service Completed' || status === 'Temporary Declined',
        '-none': status === 'No Status',
        '-green': status === 'Approved By Service Advisor',
        '-green -border': status === 'Approved By Customer',
        '-purple': status === 'Approved For Next Visit',
        '-disabled': !this.isStart
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
