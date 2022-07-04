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
              search
              @change="selectMake"
              searchPlaceholder="Search or select the brand"
              :class="{error: errorRelations({idx, name: 'make'})}"
            >
              <!-- <template #value="{value}">
                <div class="field__dropdown-option">
                  <i class="i-directions_car" />
                  <span>{{ value?.name }}</span>
                </div>
              </template> -->
              <template #option="{option}">
                <div class="field__dropdown-label">
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
              @change="setRelationModel({idx, model: $event.value})"
            />
          </div>
          <div class="field__dropdown">
            <div class="field__title">Selection</div>
            <Dropdown v-model="choice" :options="choiceList" />
          </div>
          <y-input
            v-if="choice === 'Range'"
            title="From"
            :modelValue="vehicle.yearFrom"
            @update:modelValue="setRelationYearFrom({idx, year: $event})"
          />
          <y-input
            v-if="choice === 'Range'"
            title="to"
            :modelValue="vehicle.yearTo"
            @update:modelValue="setRelationYearTo({idx, year: $event})"
          />
          <y-input
            v-if="choice === 'Year'"
            title="Year"
            :modelValue="vehicle.yearFrom"
            @update:modelValue="setRelationYearFrom({idx, year: $event}), setRelationYearTo({idx, year: $event})"
          />
        </div>
        <div class="card__close" @click="remove(idx)">
          <i class="i-remove_circle_outline" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'
import {mapActions, mapMutations, mapState} from 'vuex'

export default {
  name: 'AddCardRelation',
  components: {Dropdown},
  props: {
    idx: {
      type: Number,
      required: true
    },
    vehicle: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      make: null,
      vehicleModelsFormatted: [],
      choiceList: ['Range', 'Year'],
      choice: 'Year'
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
    // await this.fetchVehicleMakes()
  },
  mounted() {
    // this.car.yearFrom === this.car.yearTo ? (this.carInfo.choice = 'Year') : (this.carInfo.choice = 'Range')
  },
  computed: {
    ...mapState({
      vehicleMakes: s => s.modules.vehicleMakes,
      vehicleModels: s => s.modules.vehicleModels,
      errors: s => s.company.card.errors
    })
  },
  watch: {
    // errors(err) {
    //   const errorRelations = err.find(err => err.$property === 'relations')
    // }
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
      fetchVehicleModels: 'modules/fetchVehicleModels'
    }),
    ...mapMutations({
      remove: 'company/card/removeRelation',
      setRelationMake: 'company/card/setRelationMake',
      setRelationModel: 'company/card/setRelationModel',
      setRelationYearFrom: 'company/card/setRelationYearFrom',
      setRelationYearTo: 'company/card/setRelationYearTo'
    }),
    async selectMake(e) {
      if (this.vehicle.make === e.value) return
      this.setRelationMake({idx: this.idx, make: e.value})
      this.setRelationModel({idx: this.idx, model: ''})
      await this.fetchVehicleModels(e.value)
      this.vehicleModelsFormatted = this.vehicleModels
    },
    errorRelations({idx, name}) {
      const errorRelations = this.errors.find(err => err.$property === 'relations')
      if (!errorRelations) return
      if (errorRelations.$response.$errors[idx][name]) return true
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
