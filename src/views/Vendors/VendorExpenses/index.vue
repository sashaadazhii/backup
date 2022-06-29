<template>
  <div class="vendors__inner">
    <Header />
    <div class="table table__wrapper">
      <div class="table__header">
        <div class="table__header-title">Date</div>
        <div class="table__header-title">Part #</div>
        <div class="table__header-title">Expense Account</div>
        <div class="table__header-title">Amount</div>
        <div class="table__header-title">HST Total</div>
        <div class="table__header-title">Bill Total</div>
        <div class="table__header-title"></div>
      </div>
      <div class="table__main">
        <div v-for="(vendor, idx) of vendors" :key="idx" class="table__row">
          <div class="table__cell table__cell--icon">
            <i class="i-calendar" />
            {{ vendor.date }}
          </div>
          <div class="table__cell">{{ vendor.part }}</div>
          <div
            class="table__cell label"
            :class="{
              blue: vendor.expenseAccount === 'Parts for Relase',
              orange: vendor.expenseAccount === 'Meals for Stuff',
              green: vendor.expenseAccount === 'Office Supplies'
            }"
          >
            {{ vendor.expenseAccount }}
          </div>
          <div class="table__cell">{{ formatter(vendor.amount) }}</div>
          <div class="table__cell">{{ vendor.hst.toFixed(2) }}</div>
          <div class="table__cell">{{ formatter(vendor.billTotal) }}</div>
          <div class="table__cell">
            <Menu :list="actionsList" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import Header from './TheHeader'
import Menu from '@/components/Yaro/Menu'
// import _ from 'lodash'

export default {
  name: 'TheVendors',
  components: {Header, Menu},
  data() {
    return {
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {
            // this.setNewVehicle(this.vehicle)
            // this.$router.push(`/customers/${this.vehicle.customerUID}/vehicles/${this.vehicle.uid}/edit`)
          }
        },
        {
          label: 'Delete',
          icon: 'i-remove_circle red',
          command: () => this.openModal()
        }
      ]
    }
  },
  created() {
    console.log(this.vendors)
  },
  computed: {
    ...mapState({
      vendors: s => s.vendors.vendorExpenses
    })
  },
  methods: {
    formatter(val) {
      const price = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}).format(val)
      return price
    },
    ...mapMutations({})
    // openModal() {
    //   this.$confirm.require({
    //     title: 'Hey, wait!',
    //     // message: `Are you sure, you want to delete ${this.vehicle.make}  ${this.vehicle.model} ${this.vehicle.year} from the customer vehicles?`,
    //     acceptLabel: 'Delete',
    //     rejectLabel: 'Cancel',
    //     icon: 'i-volume_up',
    //     accept: async () => {
    //       // await this.delete({vehicleUID: this.vehicle.uid, customerUID: this.vehicle.customerUID})
    //       this.$router.back()
    //     }
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
