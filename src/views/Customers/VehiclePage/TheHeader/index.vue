<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__top">
        <div class="header__left">
          <div class="header__icon"><i class="i-customers"></i></div>
          <div class="header__title">Customers</div>
          <div class="header__line">/</div>
          <div class="header__name">{{ customer?.firstName }} {{ customer?.lastName }}</div>
          <div class="header__line">/</div>
          <div class="header__vehicle">
            <i class="i-directions_car" />
            {{ vehicle.make }} {{ vehicle.model }}
            <span> {{ vehicle.year }}</span>
          </div>
        </div>
        <div class="header__right">
          <button class="header__close" @click="$router.back()">
            <i class="i-circle_close" />
          </button>
        </div>
      </div>
      <div class="header__bottom">
        <div class="header__left">
          <div class="header__vehicle-icon">
            <i class="i-directions_car" />
          </div>
          <div class="header__vehicle">
            {{ vehicle.make }} {{ vehicle.model }}
            <span> {{ vehicle.year }}</span>
          </div>
          <div class="header__vehicle-odometer">
            Mileage
            <span>{{ vehicle.odometer }} mi.</span>
          </div>
        </div>
        <div class="header__right">
          <Dropdown :modelValue="action" :list="actionsList" @update:modelValue="selectAction" actionMenu>
            <template #option="{label: label}">
              <div class="vehicle__select-option">
                <i v-if="label === 'Edit'" class="i-edit" />
                <i v-if="label === 'Delete'" class="i-remove_circle red" />
                <span>{{ label }}</span>
              </div>
            </template>
            <template #menu>
              <div class="vehicle__select-menu">
                <i class="i-more_horiz" />
              </div>
            </template>
          </Dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Dropdown from '@/components/Dropdown(new)'
import DeleteModal from './DeleteModal'

export default {
  name: 'CustomerPageHeader',
  data() {
    return {
      isLoading: false,
      action: null,
      actionsList: ['Edit', 'Delete']
    }
  },
  components: {Dropdown},
  async created() {
    const uid = this.$route.params.uid
    const vehicleUid = this.$route.params.vehicleUid
    if (!this.customer?.uid) await this.find(uid)
    if (!this.vehicle?.uid) await this.findVehicle(vehicleUid)
  },
  computed: {
    ...mapState({
      customer: s => s.company.customers.customer,
      vehicle: s => s.company.vehicles.vehicle
    })
  },

  methods: {
    ...mapActions({
      find: 'company/customers/find',
      findVehicle: 'company/vehicles/find'
    }),
    ...mapMutations({
      setVehicle: 'company/vehicles/setVehicle',
      setNewVehicle: 'company/vehicles/setNewVehicle'
    }),
    async selectAction(action) {
      if (this.isLoading) return
      if (action === 'Delete') {
        this.openModal()
      } else if (action === 'Edit') {
        this.setNewVehicle(this.vehicle)
        this.$router.push(`/customers/${this.vehicle.customerUID}/vehicles/${this.vehicle.uid}/edit`)
      }
    },
    openModal() {
      this.$vfm.show(
        {
          component: DeleteModal,
          bind: {
            name: 'DeleteModal'
          }
        },
        this.vehicle
      )
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
