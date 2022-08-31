<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__header-left">
          <div class="modal__title">{{ card.name }}</div>
          <Label
            v-if="card.cardRelationType === 'custom-vehicles'"
            :label="`${card.relation.make}
            ${card.relation.model}
            ${card.relation.yearFrom} -
            ${card.relation.yearTo}`"
            size="small"
            circle
            class="-grey"
          />
          <Label v-else label="Global" size="small" circle />
        </div>
        <div class="modal__header-right">
          <Button icon="i-circle_close" border circle @click="close" size="small" />
        </div>
      </div>
      <div class="modal__nav">
        <button class="modal__nav-link" :class="{'-active': block === 'Info'}" @click="block = 'Info'">General info</button>
        <button class="modal__nav-link" :class="{'-active': block === 'Services'}" @click="block = 'Services'">Canned Services</button>
      </div>
      <div class="modal__inner">
        <component :is="block" />
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Label from '@/components/Yaro/Label'
import Button from '@/components/Yaro/Button'
import Info from './Info'
import Services from './Services'

export default {
  name: 'CardModal',
  components: {Label, Button, Info, Services},
  data() {
    return {
      block: 'Info'
    }
  },
  computed: {
    ...mapState({
      card: s => s.company.cardTemplates.template
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
