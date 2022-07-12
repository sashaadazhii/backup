<template>
  <div class="header__wrapper">
    <div class="header">
      <div class="header__search">
        <y-input
          :modelValue="searchParams"
          @update:modelValue="searchVendors"
          placeholder="Start typing to search for vendor"
          iconLeft="i-search1"
          type="search"
          class="custom-search"
        />
      </div>
      <div class="header__btn">
        <Button label="Add New Vendor" size="small" icon="i-add_circle" class="header__btn" @click="openModal" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Button from '@/components/Yaro/Button'
import NewVendorModal from '../NewVendorModal'
import _ from 'lodash'

export default {
  name: 'MainHeader',
  components: {Button},
  computed: {
    ...mapState({
      vendors: s => s.vendors.vendors,
      searchParams: s => s.vendors.searchParams
    })
  },
  methods: {
    ...mapMutations({
      setSearch: 'vendors/setSearch'
    }),
    searchVendors: _.debounce(async function (searchParams) {
      this.setSearch(searchParams)
    }, 300),
    openModal() {
      this.$vfm.show({
        component: NewVendorModal,
        bind: {
          name: 'NewVendorModal'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
