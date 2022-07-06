<template>
  <div class="header__wrapper">
    <div class="header__title">Create new Work Order</div>
    <div class="header__nav">
      <router-link class="header__nav-link" :to="`/work-order/${uid}/general`">General</router-link>
      <router-link class="header__nav-link" :to="`/work-order/${uid}/vehicle-health`">Vehicle Health</router-link>
      <router-link class="header__nav-link" :to="`/work-order/${uid}/vehicle-info`">Vehicle Info</router-link>
      <router-link class="header__nav-link" :to="`/work-order/${uid}/finance`">Finance</router-link>
    </div>
    <div class="header__menu">
      <router-link class="header__nav-link" :to="'/work-orders/board'"><Button label="Cancel" border /></router-link>
      <Button label="Save" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Yaro/Button'

export default {
  name: 'OrderHeader',
  components: {Button},
  data() {
    return {
      uid: this.$route.params.uid
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
