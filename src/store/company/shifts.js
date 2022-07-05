import axios from 'axios'
import {shifts as shiftsList} from '../data/shifts'

export default {
  namespaced: true,
  state: {
    shifts: shiftsList,
    shift: {}
  },
  mutations: {
    set(state, shifts) {
      state.shifts = shifts
    },
    setShift(state, shift) {
      state.shift = shift
    },
    add(state, shift) {
      state.shifts.unshift(shift)
    },
    update(state, shift) {
      const shiftIdx = state.shifts.findIndex(s => s.id === shift.id)
      state.shifts.splice(shiftIdx, 1, shift)
    },
    deactivate(state, id) {
      const updatedShift = state.shifts.find(s => s.id === id)
      updatedShift.deactivated = true
      state.shift = updatedShift
    },
    activate(state, id) {
      const updatedShift = state.shifts.find(s => s.id === id)
      updatedShift.deactivated = false
      state.shift = updatedShift
    }
  },
  actions: {
    async fetch({commit, state}) {
      try {
        const shifts = state.shifts
        commit('set', shifts)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async find({commit}, id) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const req = await axios.get(`${url}company/shifts/${id}/`)
        commit('setShift', req.data)
        return req.data
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async create({commit, state}, shift) {
      try {
        state.shift = shift
        commit('add', shift)
        return shift
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit, state}, shift) {
      try {
        state.shift = shift
        commit('update', shift)
        return shift
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async deactivate({commit, state}, id) {
      try {
        commit('deactivate', id)
        return state.shift
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async activate({commit, state}, id) {
      try {
        commit('activate', id)
        return state.shift
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
