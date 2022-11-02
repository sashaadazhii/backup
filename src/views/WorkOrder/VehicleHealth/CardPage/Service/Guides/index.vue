<template>
  <div class="section__wrapper">
    <div class="section__list">
      <Guide v-for="(guide, idx) of guides" :key="idx" :guide="guide" @openGuide="$emit('changeSection', 'Guide')" />
    </div>
    <div v-if="isStart" class="section__footer">
      <div class="section__btn" @click="open">
        <i class="i-add_circle" />
        <span>Create New Service Guide</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Guide from './Guide'

export default {
  name: 'CardPageGeneralGuides',
  components: {Guide},
  emits: ['changeSection'],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      guides: s => s.company.guides.guides,
      isStart: s => s.workOrder.isStart
    })
  },

  methods: {
    ...mapActions({
      // fetch: 'company/guides/fetch'
    }),
    ...mapMutations({
      setActiveService: 'company/cannedServices/setActiveService'
    }),
    open() {
      this.$emit('changeSection', 'NewGuide')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
