<template>
  <div class="header__wrapper">
    <Button icon="i-print" border class="reports__btn--icon" />
    <Button icon="i-email" border class="reports__btn--icon" />
    <Button icon="i-save_alt" border label="Export Report" class="reports__btn" />
  </div>
</template>

<script>
import Button from '@/components/Yaro/Button'

export default {
  name: 'ReportsHeader',
  components: {Button}
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
