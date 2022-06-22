<template>
  <div class="customer__wrapper" @click="openCustomerPage" :class="{active: customer.isUpdated}">
    <div class="customer__cell customer__cell--name">{{ customer.lastName }} {{ customer.firstName }}</div>
    <div class="customer__cell customer__cell--icon">
      <a :href="'mailto:' + customer.email" class="customer__link" @click.stop>
        <i class="i-email" />
        <span>{{ customer.email }}</span>
      </a>
    </div>
    <div class="customer__cell customer__cell--icon">
      <a :href="'tel:' + customer.cellPhone" class="customer__link" @click.stop>
        <i class="i-phone" />
        <span>{{ customer.cellPhones[0] }}</span>
      </a>
    </div>
    <div class="customer__cell customer__cell--vehicles">
      <div v-if="customer.vehicles && customer.vehicles.length" class="customer__vehicle">
        <i class="i-directions_car" />
        <span>{{ customer.vehicles[0]?.make }} {{ customer.vehicles[0]?.model }} {{ customer.vehicles[0]?.year }}</span>
      </div>
      <div v-if="customer.vehicles && customer.vehicles.length > 1" class="customer__counter">+ {{ customer.vehicles.length - 1 }}</div>
    </div>
    <div class="customer__cell" ref="dropdown">
      <Menu :list="actionsList" />
    </div>
  </div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'
import Menu from '@/components/Yaro/Menu'
export default {
  name: 'CustomerComponent',
  components: {Menu},
  data() {
    return {
      isLoading: false,
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {
            this.setCustomer(this.customer)
            this.$router.push(`/new-customer/${this.customer.uid}`)
          }
        },
        {
          label: 'Delete',
          icon: 'i-remove_circle red',
          command: () => this.openModal()
        },
        {
          label: 'Add New Vehicle',
          icon: 'i-add_circle green',
          command: () => {
            this.setCustomer(this.customer)
            this.$router.push(`/customers/${this.customer.uid}/new-vehicle`)
          }
        }
      ]
    }
  },
  props: {
    customer: {
      type: Object,
      required: true
    }
  },
  created() {
    if (this.customer.isUpdated) {
      setTimeout(() => {
        this.update(this.customer)
      }, 300)
    }
  },
  methods: {
    ...mapMutations({
      setCustomer: 'company/customers/setCustomer',
      update: 'company/customers/update',
      removeCustomer: 'company/customers/remove'
    }),
    ...mapActions({
      deleteCustomer: 'company/customers/delete'
    }),
    openCustomerPage(e) {
      if (!this.$refs.dropdown || this.$refs.dropdown.contains(e.target)) return
      this.setCustomer(this.customer)
      this.$router.push(`/customers/${this.customer.uid}`)
    },
    openModal() {
      this.$confirm.require({
        title: 'Hey, wait!',
        message: `Are you sure, you want to delete ${this.customer.firstName}  ${this.customer.lastName} from the customers?`,
        acceptLabel: 'Delete',
        rejectLabel: 'Cancel',
        icon: 'i-volume_up',
        accept: async () => {
          await this.deleteCustomer(this.customer.uid)
          this.removeCustomer(this.customer.uid)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
