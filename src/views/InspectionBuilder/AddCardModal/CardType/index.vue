<template>
  <div class="main__wrapper">
    <Dropdown title="Card Type" v-model="type" :options="typesList" optionLabel="label" @change="changeType" />
    <ServiceTracker v-if="type.id === 'maintenance'" />
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'
import ServiceTracker from './ServiceTracker'
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'AddCardRelation',
  components: {Dropdown, ServiceTracker},
  data() {
    return {
      type: {id: 'inspection', label: 'Inspection'},
      typesList: [
        {id: 'inspection', label: 'Inspection'},
        {id: 'maintenance', label: 'Maintenance'},
        {id: 'repair', label: 'Repair'}
      ]
    }
  },
  created() {
    if (this.cardType) {
      this.type = this.typesList.find(type => type.id === this.cardType)
    }
  },
  computed: {
    ...mapState({
      cardType: s => s.company.card.card.cardType
    })
  },
  methods: {
    ...mapMutations({
      setCardType: 'company/card/setCardType'
    }),
    changeType(e) {
      this.setCardType(e.value.id)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
