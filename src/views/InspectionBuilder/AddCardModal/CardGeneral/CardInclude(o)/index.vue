<template>
  <div class="card__wrapper">
    <div class="card__main">
      <Dropdown v-model="make" :options="vehicleMakes" title="Brand" search @change="selectMake" searchPlaceholder="Search or select the brand" theme="white">
        <template #option="{option}">
          <div class="y-dropdown-item-custom">
            <i class="i-directions_car" />
            <span>{{ option }}</span>
          </div>
        </template>
      </Dropdown>
      <Dropdown
        v-model="model"
        :options="vehicleModelsFormatted"
        title="Model"
        :disabled="!make || !vehicleModelsFormatted.length"
        placeholder="Model"
        theme="white"
      />
      <Dropdown v-model="choice" :options="choiceList" title="Selection" theme="white" />
      <Input v-if="choice === 'Range'" title="to" theme="white" v-model="yearTo" />
      <Input v-if="choice === 'Year'" title="Year" theme="white" v-model="yearFrom" />
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'
import Input from '@/components/Yaro/Input'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'AddCardRelation',
  components: {Dropdown, Input},
  data() {
    return {
      make: null,
      model: null,
      yearFrom: null,
      yearTo: null,
      vehicleModelsFormatted: [],
      choiceList: ['Range', 'Year'],
      choice: 'Year'
    }
  },
  async created() {
    await this.fetchVehicleMakes()
  },
  computed: {
    ...mapState({
      vehicleMakes: s => s.modules.vehicleMakes,
      vehicleModels: s => s.modules.vehicleModels
    })
  },
  methods: {
    ...mapActions({
      fetchVehicleModels: 'modules/fetchVehicleModels',
      fetchVehicleMakes: 'modules/fetchVehicleMakes'
    }),
    async selectMake(e) {
      await this.fetchVehicleModels(e.value)
      this.vehicleModelsFormatted = this.vehicleModels
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
