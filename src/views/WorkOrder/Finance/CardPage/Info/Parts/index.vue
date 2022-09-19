<template>
  <div class="parts__wrapper">
    <div class="parts__header">
      <div class="parts__title">Parts</div>
      <div class="parts__buttons">
        <Button label="Add Part manually" icon="i-add_circle" size="small" grey @click="showAdd = true" />
        <Button label="Add Parts from PartsTech" icon="i-add_circle" size="small" grey disabled />
      </div>
    </div>
    <div class="parts__list">
      <div class="parts__head">
        <span>Part #</span>
        <span>Markup</span>
        <span>#</span>
        <span>Cost/Unit</span>
        <span>Cost</span>
        <span>Price/Unit</span>
        <span>Price</span>
      </div>
      <Part v-for="part of parts" :key="part.id" :part="part" />
      <NewPart v-if="showAdd" @close="showAdd = false" />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Button from '@/components/Yaro/Button'
import Part from './Part'
import NewPart from './NewPart'

export default {
  name: 'InfoParts',
  components: {Button, Part, NewPart},
  data() {
    return {
      showAdd: false
    }
  },
  computed: {
    ...mapState({
      parts: s => s.finance.parts
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
