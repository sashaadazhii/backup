<template>
  <div class="card">
    <div class="card__header">
      <Label :label="card.status" size="small" :color="labelColor()" />
      <div class="card__arrow">
        <router-link :to="{name: 'SAPreview', params: {uid: order.uid, cardID: card.id}}">
          <Button icon="i-keyboard_arrow_right" border grey class="button--arrow" />
        </router-link>
      </div>
    </div>
    <div class="card__main">
      <div class="card__title">{{ card.name }}</div>
      <div class="card__text">{{ card.description }}</div>
      <div class="card__row">
        <div class="card__text card__text--thin">Total Price</div>
        <div v-if="card.customPrice" class="card__subtitle">
          {{ formatter(card.customPrice) }}
        </div>
        <div v-else class="card__subtitle">
          {{ formatter(card.chosenService.parts?.reduce((sum, current) => sum + current.price * current.quantity, 0)) }}
        </div>
      </div>
    </div>
    <div class="card__footer">
      <Label
        v-if="card.approvalStatus !== 'No Status'"
        :label="card.approvalStatus"
        :icon="card.approvalStatus === 'Approved By Customer' || card.approvalStatus === 'Approved By SA' ? 'i-check_circle_outline' : 'i-circle_close'"
        :class="labelClass(card.approvalStatus)"
        size="large"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import Label from '@/components/Yaro/Label'
import Button from '@/components/Yaro/Button'

export default {
  name: 'PreviewCard',
  components: {Label, Button},
  props: {
    card: {type: Object}
  },
  async created() {
    this.uid = this.$route.params.uid
    await this.findOrder(this.uid)
  },
  computed: {
    ...mapState({
      order: s => s.workOrder.workOrder
    })
  },
  methods: {
    ...mapActions({
      findOrder: 'workOrder/find'
    }),
    labelColor() {
      const status = this.card.status
      switch (status) {
        case 'Component Unsafe':
          return '#F37878'
        case 'Recommended':
          return '#FFA14E'
        case 'Done':
          return '#10B981'
        default:
          return '#6b7280'
      }
    },
    labelClass(status) {
      return {
        '-orange': status === 'Recommended',
        '-red': status === 'Component Unsafe',
        '-none': status === 'No Status',
        '-green': status === 'Approved By SA',
        '-green -border': status === 'Approved By Customer',
        '-purple': status === 'Temporarily Decline',
        '-red -border': status === 'Permanently Decline',
        '-blue': status === 'Pre-approved'
      }
    },
    formatter(val) {
      const price = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}).format(val)
      return price
    }
  }
}
</script>
<style scoped lang="scss">
@import 'style';
</style>
