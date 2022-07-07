<template>
  <div class="header__wrapper">
    <div class="header__title">
      <span>Create new Work Order</span>
      <Label v-if="order.vehicleInShop" class="header__label" icon="i-directions_car" border iconSize="18px" size="large" />
      <Label v-if="order.talkSA" class="header__label" icon="i-help" border iconColor="#FF9B70" iconSize="18px" size="large" />
    </div>
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
import Label from '@/components/Yaro/Label'
import {mapState} from 'vuex'

export default {
  name: 'OrderHeader',
  components: {Button, Label},
  data() {
    return {
      uid: this.$route.params.uid
    }
  },
  computed: {
    ...mapState({
      order: s => s.workOrder.workOrder
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
