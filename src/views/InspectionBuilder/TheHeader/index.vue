<template>
  <div class="header__wrapper">
    <div class="header__inner" :class="{'-open': sidebarOpen}">
      <div class="header__icon"><i class="i-sticky_note"></i></div>
      <div class="header__title">Inspection Builder</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import _ from 'lodash'

export default {
  name: 'InspectionBuilderHeader',
  computed: {
    ...mapState({
      sidebarOpen: s => s.modules.sidebarOpen
    })
  },
  methods: {
    async resetInput() {
      this.setSearch(null)
      await this.getCards()
    },
    openNewCardModal() {
      this.$vfm.show({
        component: AddCardModal,
        bind: {
          name: 'AddCardModal'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
