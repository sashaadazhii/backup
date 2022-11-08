import {customers as customersList} from '../data/customers'

const getDefaultCard = () => {
  return {
    name: null,
    description: null,
    descriptionForCustomer: null,
    cardRelationType: 'global',
    cardType: 'local',
    relation: {
      make: null,
      model: null,
      yearFrom: null,
      yearTo: null
    },
    customer: null,
    vehicle: null,
    vehicleUID: null,
    odometerTrack: null,
    timeTrackLength: null,
    timeTrackType: 'months',
    hasService: false,
    hasOptions: false,
    options: []
  }
}

export default {
  namespaced: true,

  state: {
    card: getDefaultCard(),
    customers: [],
    vehicles: [],
    errors: {}
  },
  mutations: {
    setName(state, name) {
      state.card.name = name
    },
    setDesc(state, desc) {
      state.card.description = desc
    },
    setCusDesc(state, desc) {
      state.card.descriptionForCustomer = desc
    },
    setCardType(state, type) {
      state.card.cardType = type
    },
    setCardRelationType(state, type) {
      state.card.cardRelationType = type
    },
    setRelationMake(state, make) {
      state.card.relation.make = make
    },
    setRelationModel(state, model) {
      state.card.relation.model = model
    },
    setRelationYearFrom(state, year) {
      state.card.relation.yearFrom = year
    },
    setRelationYearTo(state, year) {
      state.card.relation.yearTo = year
    },
    setService(state, hasService) {
      state.card.hasService = hasService
    },
    setErrors(state, errors) {
      state.errors = errors
    },
    setCardLevel(state, lvl) {
      state.card.includedToEachOrder = lvl
    },
    reset(state) {
      Object.assign(state.card, getDefaultCard())
    },
    //========== CUSTOMERRS ==========//
    setCustomers(state, customers) {
      state.customers = customers
    },
    setCustomer(state, customer) {
      state.card.customer = customer
    },
    setVehicle(state, vehicle) {
      state.card.vehicle = vehicle
      state.card.vehicleUID = vehicle?.uid
    },
    //========== Service Tracking ==========//
    setOdometerTrack(state, odometer) {
      state.card.odometerTrack = odometer
    },
    setTimeTrackLength(state, timeTrack) {
      state.card.timeTrackLength = timeTrack
    },
    seTtimeTrackType(state, type) {
      state.card.timeTrackType = type
    },
    //========== Additional Options ==========//
    setOptions(state, options) {
      state.card.options = options
    }
  },
  actions: {
    async fetchCustomers({commit}, search) {
      try {
        const searchValue = search?.toLocaleLowerCase() || ''
        const filteredCustomer = customersList.data.filter(cus => {
          const isFirstName = cus.firstName.toLocaleLowerCase().includes(searchValue)
          const isLastName = cus.lastName.toLocaleLowerCase().includes(searchValue)
          return isFirstName || isLastName
        })
        commit('setCustomers', filteredCustomer)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  },
  // getters: {
  //   relations: s => s.card.relations
  // }
}
