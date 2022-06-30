<template>
  <div class="vendors__inner">
    <Header />
    <div class="table table__wrapper">
      <div class="table__header">
        <div class="table__header-title">Business Name</div>
        <div class="table__header-title">Main Contact Person</div>
        <div class="table__header-title">Phone</div>
        <div class="table__header-title">Address</div>
        <div class="table__header-title"></div>
      </div>
      <div class="table__main">
        <div v-for="(vendor, idx) of vendors" :key="idx" class="table__row">
          <div class="table__cell">
            {{ vendor.businessName }}
          </div>
          <div class="table__cell">{{ vendor.mainContactPerson }}</div>
          <div class="table__cell table__cell--icon table__cell--link">
            <a class="table__cell-link" :href="`tel:${vendor.phone}`"><i class="i-phone" /> {{ vendor.phone }}</a>
          </div>
          <div class="table__cell table__cell--icon"><i class="i-location_on" />{{ vendor.address }}</div>
          <div class="table__cell">
            <Menu :list="actionsList" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Header from './TheHeader'
import Menu from '@/components/Yaro/Menu'

export default {
  name: 'TheVendors',
  components: {Header, Menu},
  data() {
    return {
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {}
        },
        {
          label: 'Delete',
          icon: 'i-remove_circle red',
          command: () => {}
        }
      ]
    }
  },
  computed: {
    ...mapState({
      vendors: s => s.vendors.vendors
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
