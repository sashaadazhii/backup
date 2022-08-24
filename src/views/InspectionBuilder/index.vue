<template>
  <div class="page-inner">
    <TheHeader />
    <div class="services__wrapper">
      <div class="services__header header">
        <div class="header__middle">
          <Input
            :modelValue="searchParams"
            @update:modelValue="search"
            placeholder="Start by typing customer name"
            iconLeft="i-search1"
            type="search"
            class="custom-search"
            size="medium"
          />
          <Button icon="i-add_circle" label="Create New Card" @click="openNewCardModal" />
        </div>
        <div class="header__bottom">
          <div class="list-titles">
            <div class="list-titles__item">Card Name</div>
            <div class="list-titles__item">Relation</div>
            <div class="list-titles__item">Service Tracker</div>
          </div>
        </div>
      </div>
      <div class="services__inner">
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
      </div>
      <infinite-loading v-if="!isLoading && hasMoreResults" @infinite="infLoad" target=".services__wrapper" />
    </div>
  </div>
</template>
<script>
import TheHeader from './TheHeader'
import Card from './CardComponent'
import {mapState, mapActions, mapMutations} from 'vuex'
import InfiniteLoading from 'v3-infinite-loading'
import Input from '@/components/Yaro/Input'
import Button from '@/components/Yaro/Button'
import _ from 'lodash'
import AddCardModal from './AddCardModal'

export default {
  name: 'InspectionBuilder',
  components: {TheHeader, Card, InfiniteLoading, Button, Input},
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
      page: s => s.company.cardTemplates.page,
      searchParams: s => s.company.cardTemplates.searchParams
    }),
    hasMoreResults() {
      return this.cards.length < this.totalCount && this.page > 1
    }
  },
  methods: {
    ...mapActions({
      fetch: 'company/cardTemplates/fetch'
    }),
    ...mapMutations({
      setSearch: 'company/cardTemplates/setSearch',
      reset: 'company/cardTemplates/reset'
    }),
    async search(e) {
      const param = e.target.value
      this.setSearch(param)
      await this.getCards()
    },
    getCards: _.debounce(async function () {
      this.reset()
      await this.fetch()
    }, 300),
    openNewCardModal() {
      this.$vfm.show({
        component: AddCardModal,
        bind: {
          name: 'AddCardModal'
        }
      })
    },
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
