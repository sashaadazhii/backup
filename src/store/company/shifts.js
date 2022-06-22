import axios from 'axios'

export default {
  namespaced: true,
  state: {
    shifts: [],
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
    }
  },
  actions: {
    async fetch({commit}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const shifts = await axios.get(`${url}company/shifts/`)
        commit('set', shifts.data)
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
    async create({commit}, shift) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const req = await axios.post(`${url}company/shifts/`, shift)
        commit('add', req.data)
        return req.data
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, {shift, id}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const req = await axios.put(`${url}company/shifts/${id}/`, shift)
        commit('update', req.data)
        return req.data
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async deactivate({commit},id) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const req = await axios.delete(`${url}company/shifts/${id}/deactivate/`)
        return req.data
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async activate({commit},id) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const req = await axios.put(`${url}company/shifts/${id}/activate/`)
        return req.data
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
