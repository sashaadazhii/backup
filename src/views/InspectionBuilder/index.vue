<template>
  <div class="page-inner">
    <TheHeader />
    <div class="services__wrapper">
      <div v-if="isLoading && !cards.length">
        <div v-for="(item, idx) of 20" :key="idx" class="service__item">
          <div class="service__skeleton"></div>
          <div class="service__skeleton"></div>
          <div class="service__skeleton"></div>
        </div>
      </div>
      <ul v-else class="services__list">
        <Card v-for="card of cards" :key="card.id" :card="card" />
      </ul>
      <infinite-loading v-if="!isLoading && hasMoreResults" @infinite="infLoad" target=".services__wrapper" />
    </div>
  </div>
</template>
<script>
import TheHeader from './TheHeader'
import Card from './CardComponent'
import {mapState, mapActions} from 'vuex'
import InfiniteLoading from 'v3-infinite-loading'

export default {
  name: 'InspectionBuilder',
  components: {TheHeader, Card, InfiniteLoading},
  data() {
    return {
      isLoading: false
    }
  },
  async created() {
    try {
      this.isLoading = true
      if (!this.cards.length) await this.fetch()
    } finally {
      this.isLoading = false
    }
  },
  computed: {
    ...mapState({
      cards: s => s.company.cardTemplates.templates,
      totalCount: s => s.company.cardTemplates.pagination.total,
      page: s => s.company.cardTemplates.page
    }),
    hasMoreResults() {
      return this.cards.length < this.totalCount && this.page > 1
    }
  },
  methods: {
    ...mapActions({
      fetch: 'company/cardTemplates/fetch'
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
