import axios from 'axios'

export default {
  namespaced: true,

  state: {
    users: [],
    searchingUsers: [],
    technicians: [],
    user: {},
    pagination: {},
    page: 1
  },
  mutations: {
    set(state, users) {
      state.users = users
    },
    setUser(state, user) {
      state.user = user
    },
    setTechs(state, users) {
      state.technicians = users
    },
    pagination(state, pagination) {
      state.pagination = pagination
    },
    changePage(state, page) {
      if (page) state.page = page
      else state.page++
    },
    reset(state) {
      state.users = []
      state.page = 1
    },
    remove(state, id) {
      state.users = state.users.filter(user => user.id !== id)
    },
    add(state, user) {
      state.users.unshift(user)
    },
    update(state, user) {
      const userIdx = state.users.findIndex(u => u.id === user.id)
      state.users.splice(userIdx, 1, user)
    }
  },
  actions: {
    async fetch({commit, state}) {
      const url = process.env.VUE_APP_BACKEND
      const page = state.page

      try {
        const users = await axios.get(`${url}company/users/`, {params: {page}})
        commit('pagination', users.data.pagination)
        commit('set', users.data.data)
        // commit('changePage')
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async find({commit}, id) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const user = await axios.get(`${url}company/users/${id}`)
        commit('setUser', user.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async search({commit}, params) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const users = await axios.get(`${url}company/users/search/`, {params})
        return users.data
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async create({commit}, user) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const req = await axios.post(`${url}company/users/`, user)
        commit('add', req.data)
        return req.data
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, {user, userID}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const req = await axios.put(`${url}company/users/${userID}/`, user)
        commit('update', req.data)
        return req.data
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async delete({commit}, id) {
      const url = process.env.VUE_APP_BACKEND
      try {
        await axios.delete(`${url}company/users/${id}/`)
        commit('remove', id)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
