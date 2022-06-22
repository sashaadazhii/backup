<template>
  <div v-if="customer" class="customer__wrapper">
    <div class="customer__title">
      <div class="customer__title-name">{{ customer.firstName }} {{ customer.lastName }}</div>
      <router-link :to="`/new-customer/${customer.uid}`" class="customer__title-edit">
        <i class="i-edit" />
        <span>Edit</span>
      </router-link>
    </div>
    <div v-if="customer.cellPhones" class="customer__row">
      <div class="customer__row-left">Phone:</div>
      <a :href="'tel:' + customer.cellPhones[0]" class="customer__row-right">
        <i class="i-call bluegreen" />
        <span>{{ customer.cellPhones[0] }}</span>
      </a>
    </div>
    <div class="customer__row">
      <div class="customer__row-left">E-mail:</div>
      <a :href="'mailto:' + customer.email" class="customer__row-right">
        <i class="i-mail orange" />
        <span>{{ customer.email }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'CustomerPageComponent',
  computed: {
    ...mapState({
      customer: s => s.company.customers.customer
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
