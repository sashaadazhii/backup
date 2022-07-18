<template>
  <div class="block__wrapper">
    <div class="block__header">
      <div class="block__back" @click="back"><i class="i-arrow_back" /></div>
      <div class="block__title">Replace Left</div>
      <button class="block__btn"><i class="i-add_circle" /><span>Add New part</span></button>
    </div>
    <div class="block__body">
      <div class="block__subheader">
        <span></span>
        <span>Part #</span>
        <span>Core</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Total</span>
      </div>
      <div class="block__parts">
        <Part v-for="(part, idx) of parts" :key="idx" :part="part" />
      </div>
    </div>
  </div>
</template>

<script>
import Part from './Part'
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: 'CardPageGeneralParts',
  components: {Part},
  data() {
    return {}
  },
  async created() {
    await this.fetch(1)
  },
  computed: {
    ...mapState({
      parts: s => s.company.parts.parts
    })
  },
  methods: {
    ...mapActions({
      fetch: 'company/parts/fetch'
    }),
    ...mapMutations({
      setActiveService: 'company/cannedServices/setActiveService'
    }),
    back() {
      this.setActiveService({})
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
