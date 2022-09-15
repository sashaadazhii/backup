<template>
  <div class="card__wrapper" @click="open">
    <div class="card__labels">
      <Label :label="card.status" size="small" class="card__label" :class="labelClass(card.status)" />
      <Label :label="card.approvalStatus" size="small" class="card__label -shadow" :class="labelClass(card.approvalStatus)" />
      <Label v-if="card.done" size="small" label="Done" icon="i-check_circle" border circle class="card__label -shadow -green -end" />
      <Label
        v-else
        size="small"
        label="Mark as Done"
        icon="i-check_circle_outline"
        border
        circle
        class="card__label -hover -shadow -grey -end"
        @click.stop="$emit('onCardDone')"
      />
    </div>
    <div class="card__header">
      <Label size="small" :label="`$${card.price}`" />
      <div class="card__title">{{ card.title }}</div>
    </div>
    <div class="card__body">{{ card.description }}</div>
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'
import {mapMutations} from 'vuex'
export default {
  name: 'FinanceCard',
  components: {Label},
  emits: ['onCardDone'],
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      workOrderUid: 'new'
    }
  },
  created() {
    this.workOrderUid = this.$route.params.uid
  },
  methods: {
    ...mapMutations({
      set: 'finance/set'
    }),
    labelClass(status) {
      return {
        '-orange': status === 'Recommended',
        '-red': status === 'Component Unsafe' || status === 'Permanently Declined',
        '-bluegreen': status === 'Canned Service Completed' || status === 'Temporary Declined',
        '-none': status === 'No Status',
        '-green': status === 'Approved By SA',
        '-green -border': status === 'Approved By Customer',
        '-purple': status === 'Approved For Next Visit'
      }
    },
    open() {
      this.set(this.card)
      this.$router.push(`/work-order/${this.workOrderUid}/finance/${this.card.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
