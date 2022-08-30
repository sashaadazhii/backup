<template>
  <div class="section__wrapper">
    <div class="section__dropdown">
      <div class="section__dropdown-title">Relation to Vehicles</div>
      <Dropdown v-model="type" :options="typesList" :filterFields="['label']" @change="changeType" theme="white">
        <template #value="{value}">
          <div class="y-dropdown-label-custom">
            <i v-if="value.id === 'all'" class="i-directions_car" />
            <i v-if="value.id === 'custom-vehicles'" class="i-construction" />
            <i v-if="value.id === 'specific-vehicle'" class="i-user" />
            <span>{{ value.label }}</span>
          </div>
        </template>
        <template #option="{option}">
          <div class="y-dropdown-item-custom">
            <i v-if="option.id === 'all'" class="i-directions_car" />
            <i v-if="option.id === 'custom-vehicles'" class="i-construction" />
            <i v-if="option.id === 'specific-vehicle'" class="i-user" />
            <span>{{ option.label }}</span>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="section__component">
      <CustomerVehicle v-if="type.id === 'specific-vehicle'" />
      <SpecifyVehicles v-if="type.id === 'custom-vehicles'" />
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'
import CustomerVehicle from './CustomerVehicle'
import SpecifyVehicles from './SpecifyVehicles'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

export default {
  name: 'AddCardRelation',
  components: {Dropdown, SpecifyVehicles, CustomerVehicle},
  data() {
    return {
      type: {id: 'all', label: 'All Vehicles'},
      typesList: [
        {id: 'all', label: 'All Vehicles'},
        {id: 'custom-vehicles', label: 'Specify Vehicle'},
        {id: 'specific-vehicle', label: 'Customer’s Vehicle'}
      ]
    }
  },
  created() {
    if (this.cardRelationType) {
      this.type = this.typesList.find(type => type.id === this.cardRelationType)
    }
  },
  computed: {
    ...mapState({
      cardRelationType: s => s.company.card.card.cardRelationType
    })
  },
  methods: {
    ...mapMutations({
      setCardRelationType: 'company/card/setCardRelationType'
    }),
    changeType(e) {
      this.setCardRelationType(e.value.id)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
