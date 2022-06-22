<template>
  <div class="vehicle__wrapper">
    <div class="vehicle__inner">
      <div class="vehicle__header">
        <div class="vehicle__header-top">
          <div v-if="vehicleUid" class="vehicle__title">{{ localVehicle.make }} {{ localVehicle.model }}</div>
          <div v-else class="vehicle__title">Add New Vehicle</div>
          <button class="vehicle__search" @click="$emit('changeComponent', 'VehicleVin')">
            <i class="i-find_replace" />
            <span>VIN number lookup</span>
          </button>
        </div>
        <div class="vehicle__header-nav nav">
          <div
            class="nav__link"
            :class="{green: component === 'GeneralComponent', red: generalError}"
            @click="component = 'GeneralComponent'"
          >
            General
          </div>
          <div
            class="nav__link"
            :class="{green: component === 'EngineComponent', red: v$.vehicle.engine.$error}"
            @click="component = 'EngineComponent'"
          >
            Engine
          </div>
          <div
            class="nav__link"
            :class="{green: component === 'AdditionalComponent', red: v$.vehicle.customFields.$error}"
            @click="component = 'AdditionalComponent'"
          >
            Additional
          </div>
        </div>
      </div>
      <div class="vehicle__main main">
        <div class="main__body">
          <component
            :is="component"
            @changeComponent="changeComponent"
            :errors="v$.$errors"
            :asyncErrors="asyncErrors"
          />
        </div>
      </div>
      <div class="vehicle__footer">
        <button class="vehicle__button" @click="save">
          <span>Save</span>
          <Loader :show="isLoading" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import GeneralComponent from './GeneralComponent'
import EngineComponent from './EngineComponent'
import AdditionalComponent from './AdditionalComponent'
import Loader from '@/components/loader'

import useVuelidate from '@vuelidate/core'
import {required, requiredIf, between, minLength, maxLength, numeric, helpers} from '@vuelidate/validators'
import _ from 'lodash'

export default {
  name: 'NewVehicleComponent',
  components: {GeneralComponent, EngineComponent, AdditionalComponent, Loader},
  data() {
    return {
      v$: useVuelidate(),
      component: 'GeneralComponent',
      vehicleUid: this.$route.params.vehicleUid,
      vinError: false,
      isLoading: false,
      asyncErrors: []
    }
  },
  emits: {
    changeComponent: null
  },
  async created() {
    if (this.vehicleUid) this.setNewVehicle(_.cloneDeep(this.localVehicle))
    if (_.isEmpty(this.vehicle?.customFields)) this.changeVehicle({key: 'customFields', value: [{name: '', value: ''}]})
    else {
      const customFields = Object.entries(this.vehicle?.customFields).map(([name, value]) => ({name, value}))
      this.changeVehicle({key: 'customFields', value: customFields})
    }
  },

  computed: {
    ...mapState({
      vehicle: s => s.company.vehicles.newVehicle,
      localVehicle: s => s.company.vehicles.vehicle,
      customer: s => s.company.customers.customer
    }),
    generalError() {
      if (this.asyncErrors.length) return true
      if (!this.v$.$errors.length) return false
      const errors = this.v$.$errors.map(error => error.$property)
      const elementList = ['vin', 'make', 'model', 'year']
      const error = elementList.some(el => errors.find(err => err === el))
      return error
    }
  },
  watch: {
    'vehicle.vin'() {
      this.asyncErrors = []
    },
    localVehicle(vehicle) {
      if (this.vehicleUid) this.setNewVehicle(_.cloneDeep(vehicle))
      if (_.isEmpty(vehicle?.customFields)) this.changeVehicle({key: 'customFields', value: [{name: '', value: ''}]})
      else {
        const customFields = Object.entries(vehicle?.customFields).map(([name, value]) => ({name, value}))
        this.changeVehicle({key: 'customFields', value: customFields})
      }
    }
  },
  methods: {
    ...mapActions({
      addVehicle: 'company/vehicles/add',
      updateVehicle: 'company/vehicles/update'
    }),
    ...mapMutations({
      changeVehicle: 'company/vehicles/changeVehicle',
      addVehicleToCustomer: 'company/customers/addVehicle',
      addVehicleToVehicles: 'company/vehicles/addVehicle',
      updateCustomersVehicle: 'company/customers/updateVehicle',
      updateVehicles: 'company/vehicles/updateVehicle',
      setNewVehicle: 'company/vehicles/setNewVehicle'
    }),
    changeComponent(component) {
      this.component = component
    },
    async save() {
      if (this.isLoading) return
      const result = await this.v$.$validate()
      if (!result) return

      const vehicle = _.cloneDeep(this.vehicle)
      if (vehicle.customFields.length && vehicle.customFields[0].name) {
        const obj = {}
        vehicle.customFields.forEach(item => (obj[item.name] = item.value))
        vehicle.customFields = obj
      } else {
        vehicle.customFields = {}
      }

      try {
        this.isLoading = true
        if (this.vehicleUid) {
          delete vehicle.uid
          // if (vehicle.rims) delete vehicle.rims // TODO: remove after deleted all old vehicles
          const newVehicle = await this.updateVehicle({uid: this.localVehicle.uid, vehicle})
          this.updateCustomersVehicle(newVehicle.data)
          this.updateVehicles(newVehicle.data)
        } else {
          const req = await this.addVehicle({uid: this.customer.uid, vehicle})
          this.addVehicleToCustomer(req?.data)
          this.addVehicleToVehicles(req?.data)
        }
        this.$router.back()
      } catch (err) {
        const vinMessage = 'This vehicle was already added, but is owned by a different customer.'
        const vinMessage1 = 'This vehicle was already added.'
        const errMessage = err.response.data.message
        if (vinMessage === errMessage || vinMessage1 === errMessage) {
          this.asyncErrors = [
            {
              $property: 'vin',
              $message: 'This vehicle was already added.'
            }
          ]
        }
        this.isLoading = false
      } finally {
        this.isLoading = false
      }
    }
  },
  validations() {
    return {
      vehicle: {
        vin: {
          required,
          minLengthValue: minLength(17)
        },
        make: {required},
        model: {required},
        year: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(4),
          between: between(1800, new Date().getFullYear()),
          numeric
        },
        engine: {
          required,
          size: {required},
          cylinders: {required, numeric},
          code: {required}
        },
        vehicleType: {required},
        customFields: {
          $each: helpers.forEach({
            name: {requiredIf: requiredIf(() => this.vehicle.customFields[0]?.name)},
            value: {requiredIf: requiredIf(() => this.vehicle.customFields[0]?.value)}
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
