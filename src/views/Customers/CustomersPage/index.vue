<template>
  <div class="page-inner">
    <TheHeader />
    <div class="customers__container">
      <div class="customers__inner">
        <HeaderInner />
        <div class="customers__wrapper">
          <div v-if="isLoading && !customers.length">
            <div v-for="(item, idx) of 20" :key="idx" class="customer__item">
              <div class="customer__skeleton"></div>
              <div class="customer__skeleton"></div>
              <div class="customer__skeleton"></div>
              <div class="customer__skeleton"></div>
            </div>
          </div>
          <ul v-else class="customers__list">
            <Customer v-for="customer of customers" :key="customer.uid" :customer="customer" />
          </ul>
          <infinite-loading v-if="!isLoading && hasMoreResults" @infinite="infLoad" target=".customers__wrapper" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import TheHeader from './TheHeader'
import HeaderInner from './HeaderInner'
import Customer from './CustomerComponent'
import InfiniteLoading from 'v3-infinite-loading'

export default {
  name: 'CustomerComponent',
  components: {TheHeader, HeaderInner, Customer, InfiniteLoading},
  data() {
    return {
      isLoading: false
    }
  },
  async created() {
    try {
      this.isLoading = true
      if (!this.customers.length) await this.fetch()
    } finally {
      this.isLoading = false
    }
  },
  computed: {
    ...mapState({
      customers: s => s.company.customers.customers,
      totalCount: s => s.company.customers.pagination.total,
      page: s => s.company.customers.page
    }),
    hasMoreResults() {
      return this.customers.length < this.totalCount && this.page > 1
    }
  },
  methods: {
    ...mapActions({
      fetch: 'company/customers/fetch'
    }),
    async infLoad() {
      try {
        this.isLoading = true
        await this.fetch()
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
