<template>
  <li class="card">
    <div class="card__header">
      <Label :label="card.status" size="small" :color="labelColor()" />
      <div class="card__arrow">
        <router-link :to="{name: 'CardPage', params: {id: card.workOrderID, cardID: card.id}}">
          <Button icon="i-keyboard_arrow_right" border grey class="button--arrow" />
        </router-link>
      </div>
    </div>
    <div class="card__main">
      <div class="card__title">{{ card.title }}</div>
      <div class="card__text">{{ card.description }}</div>
      <div class="card__row">
        <div class="card__text card__text--thin">Total Price</div>
        <div class="card__subtitle">{{ formatter(price) }}</div>
      </div>
    </div>
    <div class="card__footer">
      <div v-if="card.status === 'Recommended'" class="card__footer-buttons">
        <Button icon="i-circle_close" border grey @click="openDeclineModal" />
        <Button label="Approve" @click="openApproveModal" />
      </div>
      <div v-else>
        <Label
          :label="card.approvedWith"
          :icon="card.status === 'Done' ? 'i-check_circle' : 'i-circle_close'"
          :color="card.status === 'Done' ? '#E7F8F2' : '#FEF2F2'"
          :style="card.status === 'Done' ? 'border-color : #9FE3CD' : 'border-color: #FAC9C9'"
          size="large"
          class="label--inspection"
        />
      </div>
    </div>
  </li>
</template>

<script>
import {mapActions} from 'vuex'
import Label from '@/components/Yaro/Label'
import Button from '@/components/Yaro/Button'
import AskingDeclineModal from '../AskingDeclineModal'
import AskingApproveModal from '../AskingApproveModal'

export default {
  name: 'WorkOrderCard',
  components: {Label, Button},
  props: {
    card: {type: Object}
  },
  data() {
    return {
      price: 0
    }
  },
  async created() {
    const id = this.card.id
    this.price = await this.getCardPrice(id)
  },
  methods: {
    ...mapActions({
      getCardPrice: 'cards/getCardPrice',
      update: 'cards/updateCard'
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
    formatter(val) {
      const price = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}).format(val)
      return price
    },
    openApproveModal() {
      this.$vfm.show(
        {
          component: AskingApproveModal,
          bind: {
            name: 'AskingApproveModal'
          }
        },
        this.card.id
      )
    },
    openDeclineModal() {
      this.$vfm.show(
        {
          component: AskingDeclineModal,
          bind: {
            name: 'AskingDeclineModal'
          }
        },
        this.card.id
      )
    }
  }
}
</script>
<style scoped lang="scss">
@import 'style';
</style>
