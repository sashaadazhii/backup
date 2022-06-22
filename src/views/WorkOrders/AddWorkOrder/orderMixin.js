import {mapActions, mapMutations, mapState} from 'vuex'

export default {
  data() {
    return {
      customer: null,
      vehicle: null
    }
  },
  computed: {
    ...mapState({})
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({}),
    selectCustomer({value: cus}) {
      this.$data.vehicle = null
      this.$data.customer = cus
      const cusVehicles = cus?.vehicles || []
      this.vehicles = cusVehicles.map(v => {
        v.name = `${v.make} ${v.model} ${v.year}`
        return v
      })
    }
  }
}
