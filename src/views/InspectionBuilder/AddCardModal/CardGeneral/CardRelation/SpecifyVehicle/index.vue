<template>
  <div class="vehicle__wrapper">
    <div class="vehicle__lsit">
      <div class="card__wrapper">
        <div class="card__main">
          <div class="field__dropdown main">
            <div class="field__title">Brand</div>
            <Dropdown
              :modelValue="vehicle.make"
              :options="vehicleMakes"
              :class="{error: errorRelations('make')}"
              search
              @change="selectMake"
              searchPlaceholder="Search or select the brand"
              theme="white"
            >
              <template #option="{option}">
                <div class="y-dropdown-item-custom">
                  <i class="i-directions_car" />
                  <span>{{ option }}</span>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="field__dropdown">
            <div class="field__title">Model</div>
            <Dropdown
              :modelValue="vehicle.model"
              :options="vehicleModelsFormatted"
              :disabled="!vehicle.make || !vehicleModelsFormatted.length"
              placeholder="Model"
              @change="setRelationModel($event.value)"
              theme="white"
            />
          </div>
          <div class="field__dropdown">
            <div class="field__title">Selection</div>
            <Dropdown v-model="choice" :options="choiceList" theme="white" />
          </div>
          <y-input v-if="choice === 'Range'" title="From" theme="white" :modelValue="vehicle.yearFrom" @update:modelValue="setRelationYearFrom($event)" />
          <Input v-if="choice === 'Range'" title="to" theme="white" :modelValue="vehicle.yearTo" @update:modelValue="setRelationYearTo($event)" />
          <Input
            v-if="choice === 'Year'"
            title="Year"
            theme="white"
            :modelValue="vehicle.yearFrom"
            @update:modelValue="setRelationYearFrom($event), setRelationYearTo($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'
import Input from '@/components/Yaro/Input'
import {mapActions, mapMutations, mapState} from 'vuex'

export default {
  name: 'AddCardRelation',
  components: {Dropdown, Input},
  data() {
    return {
      make: null,
      vehicleModelsFormatted: [],
      choiceList: ['Range', 'Year'],
      choice: 'Year'
    }
  },
  async created() {
    await this.fetchVehicleMakes()
    console.log(this.card)
  },
  computed: {
    ...mapState({
      vehicleMakes: s => s.modules.vehicleMakes,
      vehicleModels: s => s.modules.vehicleModels,
      errors: s => s.company.card.errors,
      vehicle: s => s.company.card.card.relation
    })
  },
  methods: {
    ...mapActions({
      fetchVehicleModels: 'modules/fetchVehicleModels',
      fetchVehicleMakes: 'modules/fetchVehicleMakes',
    }),
    ...mapMutations({
      setRelationMake: 'company/card/setRelationMake',
      setRelationModel: 'company/card/setRelationModel',
      setRelationYearFrom: 'company/card/setRelationYearFrom',
      setRelationYearTo: 'company/card/setRelationYearTo'
    }),
    async selectMake(e) {
      if (this.vehicle.make === e.value) return
      this.setRelationMake(e.value)
      this.setRelationModel('')
      await this.fetchVehicleModels(e.value)
      this.vehicleModelsFormatted = this.vehicleModels
    },
    errorRelations(name) {
      // const errorRelations = this.errors.find(err => err.$property === 'relations')
      // if (!errorRelations) return
      // if (errorRelations.$response.$errors[idx][name]) return true
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
