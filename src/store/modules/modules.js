import axios from 'axios'

export default {
  namespaced: true,

  state: {
    weather: null,
    vehicleMakes: [],
    vehicleModels: [],
    vehicleByVin: null
  },
  mutations: {
    setWeather(state, weather) {
      state.weather = weather
    },
    setVehicleMakes(state, vehicles) {
      state.vehicleMakes = vehicles
    },
    setVehicleModels(state, vehicles) {
      state.vehicleModels = vehicles
    },
    setVehicleByVin(state, vehicle) {
      state.vehicleByVin = vehicle
    }
  },
  actions: {
    async fetchWeather({commit}, {lat, lon}) {
      const instance = axios.create()
      delete instance.defaults.headers.common['company']
      delete instance.defaults.headers.common['Authorization']
      try {
        const key = process.env.VUE_APP_WEATHER_KEY
        const weather = await instance.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
        )
        commit('setWeather', weather.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async fetchVehicleMakes({commit}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const vehicles = await axios.get(`${url}info/vehicle/makes`, {params: {records: 300}})
        commit('setVehicleMakes', vehicles.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async fetchVehicleModels({commit}, make) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const vehicles = await axios.get(`${url}info/vehicle/${make}/models`, {params: {records: 300}})
        commit('setVehicleModels', vehicles.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async findByVin({commit}, vin) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const vehicle = await axios.get(`${url}info/vehicle/lookup/${vin}/`)
        commit('setVehicleByVin', vehicle.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  },
  getters: {
    temp: s => Math.round(s.weather?.main?.temp),
    weatherType: s => s.weather?.weather[0]?.main
  }
}
