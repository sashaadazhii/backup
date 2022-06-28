import axios from 'axios'
import {cars, carsModels} from '../data/cars'

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
        const weather = await instance.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
        commit('setWeather', weather.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async fetchVehicleMakes({commit}) {
      try {
        commit('setVehicleMakes', cars)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async fetchVehicleModels({commit}, make) {
      try {
        const vehiclesMake = carsModels.filter(c => c.make === make)
        if (vehiclesMake) commit('setVehicleModels', vehiclesMake.map(v => v.model))
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async findByVin({commit}, vin) {
      const apikey = process.env.VUE_APP_VIN_API_KEY
      try {
        const req = await axios.get(`https://auto.dev/api/vin/${vin}`, {params: {apikey}})
        const vehicle = req.data
        const newVehicle = {
          vin,
          make: vehicle.make.name,
          model: vehicle.model.name,
          year: vehicle.years[0]?.year,
          engine: {
            size: vehicle.engine.size,
            cylinders: vehicle.engine.cylinder,
            code: vehicle.engine.code
          },
          vehicleType: vehicle.categories.vehicleStyle
        }
        commit('setVehicleByVin', newVehicle)
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
