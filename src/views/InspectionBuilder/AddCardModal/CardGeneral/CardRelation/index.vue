<template>
  <div class="section__wrapper">
    <div class="section__dropdown">
      <div class="section__dropdown-title">Relation to Vehicles</div>
      <Dropdown v-model="type" :options="typesList" :filterFields="['label']" @change="setCardRelationType($event.value.id)" theme="white">
        <template #value="{value}">
          <div class="y-dropdown-label-custom">
            <i v-if="value.id === 'global'" class="i-directions_car" />
            <i v-if="value.id === 'custom-vehicles'" class="i-construction" />
            <i v-if="value.id === 'specific-vehicle'" class="i-user" />
            <span>{{ value.label }}</span>
          </div>
        </template>
        <template #option="{option}">
          <div class="y-dropdown-item-custom">
            <i v-if="option.id === 'global'" class="i-directions_car" />
            <i v-if="option.id === 'custom-vehicles'" class="i-construction" />
            <i v-if="option.id === 'specific-vehicle'" class="i-user" />
            <span>{{ option.label }}</span>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="section__component">
      <CustomerVehicle v-if="type.id === 'specific-vehicle'" />
      <SpecifyVehicle v-if="type.id === 'custom-vehicles'" />
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'
import CustomerVehicle from './CustomerVehicle'
import SpecifyVehicle from './SpecifyVehicle'
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'AddCardRelation',
  components: {Dropdown, SpecifyVehicle, CustomerVehicle},
  data() {
    return {
      type: {id: 'global', label: 'Global'},
      typesList: [
        {id: 'global', label: 'Global'},
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
      cardRelationType: s => s.company.card.card.cardRelationType,
      cardType: s => s.company.card.card.cardType
    })
  },
  watch: {
    cardType(type) {
      if (type === 'public') {
        this.typesList = this.typesList.filter(t => t.id !== 'specific-vehicle')
        if (this.type.id === 'specific-vehicle') {
          this.type = {id: 'global', label: 'Global'}
        }
      }
      if (type === 'local') {
        this.typesList.push({id: 'specific-vehicle', label: 'Customer’s Vehicle'})
      }
    }
  },
  methods: {
    ...mapMutations({
      setCardRelationType: 'company/card/setCardRelationType'
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
