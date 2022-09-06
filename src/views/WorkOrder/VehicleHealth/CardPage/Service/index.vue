<template>
  <div class="block__wrapper">
    <div class="block__header">
      <i class="i-arrow_circle_left" @click="back" />
      <div class="block__title">{{ service.name }}</div>
      <div class="block__desc">{{ service.description || 'service description ' }}</div>
    </div>
    <div class="block__nav">
      <button class="block__nav-link" :class="{'-green': section === 'Parts'}" @click="section = 'Parts'">Parts</button>
      <button class="block__nav-link" :class="{'-green': section === 'Guides'}" @click="section = 'Guides'">Service Guide (2)</button>
      <button class="block__nav-link" :class="{'-green': section === 'Warranty'}" @click="section = 'Warranty'">Warranty</button>
    </div>
    <div class="block__section">
      <component :is="section" />
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Parts from './Parts'
import Warranty from './Warranty'
import Guides from './Guides'

export default {
  name: 'CardPageService',
  components: {Parts, Warranty, Guides},

  data() {
    return {
      section: 'Parts'
    }
  },
  computed: {
    ...mapState({
      service: s => s.company.cannedServices.activeService
    })
    // parts() {
    //   return this.service.parts
    // },
    // selectedParts() {
    //   return this.parts.filter(p => p.select)
    // }
  },
  methods: {
    ...mapMutations({
      setActiveService: 'company/cannedServices/setActiveService'
    }),
    back() {
      // this.service.parts.forEach(p => {
      //   p.select = false
      // })
      this.setActiveService({})
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
