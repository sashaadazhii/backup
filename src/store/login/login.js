import axios from 'axios'

export default {
  namespaced: true,

  state: {
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
    keepMe: true,
    // Only MVP
    user: {
      role: 'admin'
    }
  },
  mutations: {
    changeKeepMe(state) {
      state.keepMe = !state.keepMe
    },
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    },
    decryptToken(state) {
      if (state.token) state.user = JSON.parse(atob(state.token.split('.')[1]))
    },
    logout(state) {
      state.token = ''
    }
  },
  actions: {
    async loginUser({commit, state}, cus) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const auth = await axios.post(url + 'user/login/', cus)
        const {token, user} = auth.data
        commit('setToken', token)
        if (state.keepMe) {
          localStorage.setItem('token', token)
        } else {
          sessionStorage.setItem('token', token)
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        commit('setUser', user)
        commit('decryptToken')
      } catch (err) {
        commit('setError', err)
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        throw err
      }
    },
    async loginCustomer({commit, state}, cus) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const auth = await axios.post(url + 'customer/login/', cus)
        const {token, user} = auth.data
        commit('setToken', token)
        if (state.keepMe) {
          localStorage.setItem('token', token)
        } else {
          sessionStorage.setItem('token', token)
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        commit('setUser', user)
        commit('decryptToken')
      } catch (err) {
        commit('setError', err)
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        throw err
      }
    },
    logout({commit}) {
      return new Promise(resolve => {
        commit('logout')
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  }
}
