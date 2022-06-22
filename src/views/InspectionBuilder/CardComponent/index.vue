<template>
  <div class="card__wrapper" @click="openCustomerPage">
    <div class="card__cell card__cell--name">
      <span>{{ card.name }}</span>
      <div class="card__counter">{{ card.servicesCount }}</div>
    </div>
    <div class="card__cell card__cell--vehicles">
      <div v-if="!card.relations.length" class="card__vehicle green">
        <i class="i-directions_car" />
        <span>All Vehicles</span>
      </div>
      <div v-else class="card__vehicle">
        <i class="i-directions_car" />
        <span v-if="!card.relations[0].model" class="space">All </span>
        <span> {{ card.relations[0]?.make }} {{ card.relations[0]?.model }} {{ card.relations[0]?.yearFrom }} </span>
        <span v-if="card.relations[0].yearFrom !== card.relations[0].yearTo"> - {{ card.relations[0].yearTo }}</span>
      </div>
      <div class="card__counter-wrapper">
        <div v-if="card.relations.length > 1" class="card__counter">+ {{ card.relations.length - 1 }}</div>
        <div class="card__counter-list">
          <div v-for="car of card.relations.slice(1)" :key="car.uid" class="card__vehicle">
            <i class="i-directions_car" />
            <span> {{ car.make }} {{ car.model }} {{ car.yearFrom }} </span>
            <span v-if="car.yearFrom !== car.yearTo"> - {{ car.yearTo }} </span>
          </div>
        </div>
      </div>
    </div>
    <div class="card__cell">
      <div class="card__indicators">
        <div v-if="card.odometerTrack" class="card__indicator">
          <i class="i-shutter_speed" />
          <span>{{ card.odometerTrack.toLocaleString('fr-FR') }}</span> km
        </div>
        <div v-if="card.timeTrackLength" class="card__indicator orange">
          <i class="i-time" />
          <span>{{ card.timeTrackLength }}</span> {{ card.timeTrackType }}
        </div>
      </div>
    </div>
    <div class="card__cell" ref="dropdown">
      <Dropdown :modelValue="action" :list="actionsList" @update:modelValue="selectAction" actionMenu>
        <template #option="{label: label}">
          <div class="dropdown__label--icon">
            <i v-if="label === 'Edit'" class="i-edit" />
            <i v-if="label === 'Remove'" class="i-remove_circle red" />
            <span>{{ label }}</span>
          </div>
        </template>
        <template #menu>
          <i class="i-more_horiz" />
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Dropdown from '@/components/Dropdown(new)'
import DeleteModal from './DeleteModal'

export default {
  name: 'CardComponent',
  components: {Dropdown},
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      action: null,
      actionsList: ['Edit', 'Remove']
    }
  },

  methods: {
    ...mapMutations({
      setTemplate: 'company/cardTemplates/setTemplate'
    }),
    async selectAction(action) {
      switch (action) {
        case 'Remove':
          this.openModal()
          break
        case 'Edit':
          this.setTemplate(this.card)
          this.$router.push(`/inspection-builder/card/${this.card.templateID}`)
          break
      }
    },

    openCustomerPage(e) {
      if (!this.$refs.dropdown || this.$refs.dropdown.contains(e.target)) return
      this.setTemplate(this.card)
      this.$router.push(`/inspection-builder/card/${this.card.templateID}`)
    },
    openModal() {
      this.$vfm.show(
        {
          component: DeleteModal,
          bind: {
            name: 'DeleteModal'
          }
        },
        this.card
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
