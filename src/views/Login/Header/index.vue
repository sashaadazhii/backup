<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__left">
        <div class="header__title">asn tech</div>
      </div>
      <div class="header__right">
        <div class="header__clock">{{ time }}</div>
        <i v-if="dark" class="i-brightness_3" @click="dark = !dark" />
        <i v-else class="i-brightness_5" @click="dark = !dark" />
        <i class="i-error" />
        <i class="i-lock" />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'LoginHeader',
  data() {
    return {
      timeInterval: null,
      time: dayjs().format('hh:mm a'),
      dark: false
    }
  },
  methods: {},
  mounted() {
    this.timeInterval = setInterval(() => {
      this.time = dayjs().format('hh:mm a')
    }, 1000)
  },
  beforeUnmount() {
    clearInterval(this.timeInterval)
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
