<template>
  <div class="info__wrapper">
    <div class="info__header">
      <Button icon="i-arrow_back" border circle size="small" @click="$router.back()" />
      <div class="info__header-title">{{ card.title }}</div>
      <Label :label="card.status" size="small" class="info__label" :class="labelClass(card.status)" />
      <Label :label="card.approvalStatus" size="small" class="info__label -shadow" :class="labelClass(card.approvalStatus)" />
    </div>
    <Input :modelValue="card.title" />
    <Textarea :modelValue="card.description" />
    <Additional />
    <div class="info__body">
      <Textarea title="Technician Notes" height="100" />
      <Textarea title="Quote Notes" height="100" />
      <Input :modelValue="card.permanentDenialMessage?.note" title="Permanent Denial Message:" theme="red" @click="open('pMessage')" />
      <Input :modelValue="card.temporalDenialMessage?.note" title="Temporal Denial Message:" theme="blue" @click="open('tMessage')" />
    </div>
    <Parts />
    <Totals />
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'
import Button from '@/components/Yaro/Button'
import Input from '@/components/Yaro/Input'
import Textarea from '@/components/Yaro/Textarea'
import {mapState} from 'vuex'

import Messages from './Messages'
import Parts from './Parts'
import Totals from './Totals'
import Additional from './Additional'

export default {
  name: 'FinanceCardPageInfo',
  components: {Label, Button, Parts, Totals, Additional, Input, Textarea},
  created() {},
  computed: {
    ...mapState({
      card: s => s.finance.card
    })
  },
  methods: {
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
    open(type) {
      this.$vfm.show(
        {
          component: Messages,
          bind: {
            name: 'Messages',
            'esc-to-close': true
          }
        },
        type
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
