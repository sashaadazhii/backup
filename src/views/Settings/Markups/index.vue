<template>
  <div class="markups__wrapper">
    <div class="markups__container">
      <div class="markups__overflow">
        <div class="markups__header">
          <div class="markups__header-title">
            <span>Markups</span>
          </div>
          <Button label="Add New Markup" icon="i-add_circle" circle size="small" @click="openModal" />
        </div>
        <div class="markups__titles">
          <div class="markups__titles-item">Type/Style</div>
          <div class="markups__titles-item"></div>
          <div class="markups__titles-item">Costs</div>
          <div class="markups__titles-item">Markup</div>
          <div class="markups__titles-item"></div>
        </div>
        <div class="markups__list"><Markup v-for="markup of markups" :key="markup.id" :markup="markup" /></div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Button from '@/components/Yaro/Button'
import Markup from './Slot'
import CreateModal from './CreateModal'

export default {
  name: 'CompanySettingsMarkups',
  components: {Markup, Button},
  computed: {
    ...mapState({
      markups: s => s.company.markups.markups
    })
  },
  methods: {
    openModal() {
      this.$vfm.show({
        component: CreateModal,
        bind: {
          name: 'CreateMarkupModal'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
