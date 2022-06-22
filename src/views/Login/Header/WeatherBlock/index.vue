<template>
  <div class="weather__wrapper">
    <div v-if="temp" class="weather__inner" :class="weatherClass">
      <div class="weather__icon">
        <i :class="weatherIcon" />
      </div>
      <div class="weather__num">{{ temp }} ºC</div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: 'WeatherBlock',
  data() {
    return {
      position: null,
      weatherTypes: [
        {type: 'Clear', icon: 'i-brightness_low'},
        {type: 'Snow', icon: 'i-ac_unit'},
        {type: 'Clouds', icon: 'i-cloud'},
        {type: 'Thunderstorm', icon: 'i-flash_on'},
        {type: 'Drizzle', icon: 'i-cloud'},
        {type: 'Rain', icon: 'i-cloud'},
        {type: 'Mist', icon: 'i-cloud'},
        {type: 'Smoke', icon: 'i-cloud'},
        {type: 'Haze', icon: 'i-cloud'},
        {type: 'Dust', icon: 'i-cloud'},
        {type: 'Fog', icon: 'i-cloud'},
        {type: 'Sand', icon: 'i-cloud'},
        {type: 'Ash', icon: 'i-cloud'},
        {type: 'Squall', icon: 'i-cloud'},
        {type: 'Tornado', icon: 'i-cloud'}
      ]
    }
  },
  computed: {
    ...mapState({
      weather: s => s.modules.weather
    }),
    ...mapGetters({
      temp: 'modules/temp',
      weatherType: 'modules/weatherType'
    }),
    weatherClass() {
      if (this.temp <= 4) {
        return 'blue'
      } else if (this.temp >= 32) {
        return 'red'
      }
      return 'orange'
    },
    weatherIcon() {
      return this.weatherTypes.find(t => t.type === this.weatherType)?.icon
    }
  },
  async created() {
    const position = await this.getLocation()
    const {latitude: lat, longitude: lon} = position.coords
    await this.fetchWeather({lat, lon})
  },
  methods: {
    ...mapActions({
      fetchWeather: 'modules/fetchWeather'
    }),
    async getLocation() {
      return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('Geolocation is not available.'))
        }
        navigator.geolocation.getCurrentPosition(
          pos => {
            resolve(pos)
          },
          err => {
            reject(err)
          }
        )
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
