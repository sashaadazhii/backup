import axios from 'axios'
import {vehicles as vehiclesList} from '../data/vehicles'

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
    add(state, vehicle) {
      state.vehicles.unshift(vehicle)
    },
    remove(state, uid) {
      state.vehicles = state.vehicles.filter(vehicle => vehicle.uid !== uid)
    },
    update(state, newVehicle) {
      if (state.vehicle.uid) state.vehicle = newVehicle
      if (!state.vehicles.length) return
      const vehicleIndex = state.vehicles.findIndex(vehicle => vehicle.uid === newVehicle.uid)
      state.vehicles.splice(vehicleIndex, 1, newVehicle)
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
    }
  },
  actions: {
    async fetch({commit}, uid) {
      try {
        const vehicles = vehiclesList.filter(v => v.customerUID === uid)
        commit('set', vehicles)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async fetchVehicles({commit}, uid) {
      try {
        return vehiclesList.filter(v => v.customerUID === uid)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async find({commit}, uid) {
      try {
        const vehicle = vehiclesList.find(v => v.uid === uid)
        commit('setVehicle', vehicle)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async add({commit}, {cusUID, vehicle}) {
      vehicle.uid = Date.now()
      vehicle.customerUID = cusUID
      commit('add', vehicle)
      commit('company/customers/addVehicle', vehicle, {root: true})
      try {
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, {cusUID, vehicle}) {
      vehicle.customerUID = cusUID
      commit('update', vehicle)
      commit('company/customers/updateVehicle', vehicle, {root: true})
      try {
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async delete({commit}, {vehicleUID, customerUID}) {
      try {
        commit('remove', vehicleUID)
        commit('company/customers/removeVehicle', {vehicleUID, customerUID}, {root: true})
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
