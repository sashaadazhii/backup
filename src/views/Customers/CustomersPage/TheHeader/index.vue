<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__top">
        <div class="header__left">
          <div class="header__icon"><i class="i-customers"></i></div>
          <div class="header__title">Customers</div>
        </div>
        <div class="header__right">
          <router-link to="/new-customer" class="header__btn">
            <i class="i-add_circle" />
            <span>Add New Customer</span>
          </router-link>
        </div>
      </div>
      <div class="header__middle">
        <div class="header__left">
          <div class="header__field field">
            <label class="field__label">
              <i class="i-search1" />
              <input
                :value="searchParams"
                class="field__input"
                type="search"
                placeholder="Start by typing customer name"
                @input="search"
              />
              <i class="i-close" @click="resetInput" />
            </label>
          </div>
        </div>
      </div>
      <div class="header__bottom">
        <div class="list-titles">
          <div class="list-titles__item">Name</div>
          <div class="list-titles__item">Email</div>
          <div class="list-titles__item">Phone</div>
          <div class="list-titles__item">Vehicles</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import _ from 'lodash'

export default {
  name: 'CustomersPageHeader',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      searchParams: s => s.company.customers.searchParams
    })
  },
  methods: {
    ...mapActions({
      fetch: 'company/customers/fetch'
    }),
    ...mapMutations({
      setSearch: 'company/customers/setSearch',
      reset: 'company/customers/reset'
    }),
    async search(e) {
      const param = e.target.value
      this.setSearch(param)
      await this.getCusomers()
    },
    getCusomers: _.debounce(async function () {
      this.reset()
      await this.fetch()
    }, 300),
    async resetInput() {
      this.setSearch(null)
      await this.getCusomers()
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
