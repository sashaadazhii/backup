<template>
  <div class="block__wrapper">
    <div class="block__lsit">
      <Vehicle v-for="(vehicle, idx) of vehicles" :key="idx" :vehicle="vehicle" :idx="idx" />
      <!-- <button class="block__add" @click="add">
        <i class="i-add_circle_outline" />
        <span>Add Vehicle</span>
      </button> -->
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
import Vehicle from './SpecifyVehicle'

export default {
  name: 'AddCardRelation',
  components: {Vehicle},
  data() {
    return {
      // type: {id: 'all', label: 'All Vehicles'},
      // typesList: [
      //   {id: 'all', label: 'All Vehicles'},
      //   {id: 'specific-vehicle', label: 'Specify Vehicle'},
      //   {id: 'custom-vehicles', label: 'Customer’s Vehicle'}
      // ],
      // vehicles: [
      //   {
      //     make: null,
      //     model: null,
      //     yearFrom: null,
      //     yearTo: null
      //   }
      // ]
    }
  },
  // computed: {
  //   ...mapState({})
  // },
  // methods: {
  //   ...mapActions({}),
  // ...mapMutations({})
  // }

  async created() {
    // TODO: reduce queries -> props from parent
    await this.fetchVehicleMakes()
  },
  mounted() {
    // this.car.yearFrom === this.car.yearTo ? (this.carInfo.choice = 'Year') : (this.carInfo.choice = 'Range')
  },
  computed: {
    ...mapState({
      // vehicles: s => s.company.card.relations
      // vehicleMakes: s => s.modules.vehicleMakes,
      // vehicleModels: s => s.modules.vehicleModels
    }),
    ...mapGetters({
      vehicles: 'company/card/relations'
    })
  },
  watch: {
    // vehicleModels(models) {
    //   if (models.length) this.vehicleModelsFormatted = models
    // },
    // carInfo: {
    //   handler(info) {
    //     this.$emit('changeCar', info)
    //   },
    //   deep: true
    // }
  },
  methods: {
    ...mapActions({
      fetchVehicleMakes: 'modules/fetchVehicleMakes'
      // fetchVehicleModels: 'modules/fetchVehicleModels'
    }),
    ...mapMutations({
      add: 'company/card/addRelation'
    })
    // async selectMake(e) {
    //   if (this.make === e) return
    //   this.make = e
    //   this.model = ''
    //   await this.fetchVehicleModels(e)
    //   this.vehicleModelsFormatted = this.vehicleModels
    // }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
