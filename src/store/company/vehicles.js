import axios from 'axios'

export default {
  namespaced: true,

  state: {
    vehicles: [],
    vehicle: {},
    newVehicle: {}
  },
  mutations: {
    set(state, vehicles) {
      state.vehicles = vehicles
    },
    setVehicle(state, vehicle) {
      state.vehicle = vehicle
    },
    setNewVehicle(state, vehicle) {
      state.newVehicle = vehicle
    },
    removeVehicle(state, uid) {
      state.vehicles = state.vehicles.filter(vehicle => vehicle.uid !== uid)
    },
    changeVehicle(state, {key, value}) {
      state.newVehicle[key] = value
    },
    changeVehicleEngine(state, {key, value}) {
      state.newVehicle.engine[key] = value
    },
    addVehicleFields(state, item) {
      state.newVehicle.customFields.push(item)
    },
    removeVehicleFields(state, idx) {
      state.newVehicle.customFields.splice(idx, 1)
    },
    addVehicle(state, vehicle) {
      state.vehicles.unshift(vehicle)
    },
    updateVehicle(state, newVehicle) {
      if (state.vehicle.uid) state.vehicle = newVehicle
      if (!state.vehicles.length) return
      const vehicleIndex = state.vehicles.findIndex(vehicle => vehicle.uid === newVehicle.uid)
      state.vehicles.splice(vehicleIndex, 1, newVehicle)
    }
  },
  actions: {
    async fetch({commit}, uid) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const vehicles = await axios.get(`${url}company/customers/${uid}/vehicles/`)
        commit('set', vehicles.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async fetchVehicles({commit}, uid) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.get(`${url}company/customers/${uid}/vehicles/`)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async add({commit}, {uid, vehicle}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.post(`${url}company/customers/${uid}/vehicles/`, vehicle)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, {uid, vehicle}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.put(`${url}company/vehicles/${uid}/`, vehicle)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async delete({commit}, uid) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.delete(`${url}company/vehicles/${uid}/`)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async find({commit}, uid) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const vehicle = await axios.get(`${url}company/vehicles/${uid}/`)
        commit('setVehicle', vehicle.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async sync({commit}, uid) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.post(`${url}company/vehicles/${uid}/cards/sync/`)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async addCard({commit}, {uid, card}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.post(`${url}company/vehicles/${uid}/cards/`, card)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async removeCard({commit}, {uid, templateID}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.delete(`${url}company/vehicles/${uid}/cards/${templateID}/`)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
