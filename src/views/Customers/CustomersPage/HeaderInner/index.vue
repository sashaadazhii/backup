<template>
  <div class="header__inner">
    <div class="header__middle">
      <div class="header__search">
        <Input
          :modelValue="searchParams"
          @update:modelValue="search"
          placeholder="Start by typing customer name"
          iconLeft="i-search1"
          type="search"
          class="custom-search"
          size="medium"
        />
      </div>
      <router-link to="/new-customer" class="header__btn">
        <i class="i-add_circle" />
        <span>Add New Customer</span>
      </router-link>
    </div>
    <div class="header__bottom">
      <div class="header__titles">
        <div class="header__titles-item">Name</div>
        <div class="header__titles-item">Email</div>
        <div class="header__titles-item">Phone</div>
        <div class="header__titles-item">Vehicles</div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import Input from '@/components/Yaro/Input'
import _ from 'lodash'
export default {
  name: 'CustomersPageInnerHeader',
  components: {Input},
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
    search: _.debounce(async function (searchParams) {
      this.setSearch(searchParams)
      await this.getCusomers()
    }, 300),
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
