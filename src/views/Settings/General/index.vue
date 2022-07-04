<template>
  <div class="general__wrapper">
    <component :is="card" :card="card" @changeComponent="changeComponent" />
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Overview from './Overview'
import Edit from './Edit'

export default {
  name: 'CompanySettingsGeneral',
  components: {Overview, Edit},
  data() {
    return {
      card: 'Overview'
    }
  },
  computed: {
    ...mapState({
      settings: s => s.company.settings.settings
    })
  },
  methods: {
    changeComponent(cmp) {
      this.card = cmp
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
