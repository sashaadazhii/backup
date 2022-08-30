<template>
  <div class="main__wrapper">
    <ServiceTracker />

    <!-- <Dropdown title="Card Type" v-model="type" :options="typesList" optionLabel="label" @change="changeType" /> -->
  </div>
</template>

<script>
import ServiceTracker from './ServiceTracker'
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'AddCardRelation',
  components: {ServiceTracker},
  data() {
    return {
      // type: {id: 'inspection', label: 'Inspection'},
      // typesList: [
      //   {id: 'inspection', label: 'Inspection'},
      //   {id: 'maintenance', label: 'Maintenance'},
      //   {id: 'repair', label: 'Repair'}
      // ]
    }
  },
  created() {
    // if (this.cardType) {
    //   this.type = this.typesList.find(type => type.id === this.cardType)
    // }
  },
  computed: {
    ...mapState({
      // cardType: s => s.company.card.card.cardType
    })
  },
  methods: {
    ...mapMutations({
      // setCardType: 'company/card/setCardType'
    }),
    changeType(e) {
      // this.setCardType(e.value.id)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
