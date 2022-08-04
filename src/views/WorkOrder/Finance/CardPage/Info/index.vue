<template>
  <div class="info__wrapper">
    <div class="info__header">
      <Button icon="i-arrow_back" border circle size="small" @click="$router.back()" />
      <div class="info__header-title">Cooling System Service</div>
      <Label label="Recommended" class="-orange" />
      <Label label="No Customer Status" class="-border -grey" border circle />
    </div>
    <Input />
    <Input title="Customer Facing Description:"/>
    <Input title="Permanent Denial Message:" />
    <Input title="Temporal Denial Message:" />
    <Parts />
    <Job />
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'
import Button from '@/components/Yaro/Button'
import Input from '@/components/Yaro/Input'

import Parts from './Parts'
import Job from './Job'
export default {
  name: 'FinanceCardPageInfo',
  components: {Label, Button, Parts, Job, Input}
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
