<template>
  <div class="card__wrapper" @click="openCustomerPage">
    <div class="card__cell card__cell--name">
      <span>{{ card.name }}</span>
      <Label v-if="card.servicesCount" :label="card.servicesCount" border size="small" class="-grey" />
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
        <Label v-if="card.odometerTrack" icon="i-shutter_speed" :label="`${card.odometerTrack.toLocaleString('fr-FR')} KM`" class="-bluegreen" />
        <Label v-if="card.timeTrackLength" icon="i-time" :label="`${card.timeTrackLength} Month`" class="-orange" />
      </div>
    </div>
    <div class="card__cell" ref="menu">
      <Menu :list="actionsList" />
    </div>
  </div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'
import Menu from '@/components/Yaro/Menu'
import Label from '@/components/Yaro/Label'

export default {
  name: 'CardComponent',
  components: {Menu, Label},
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {
            this.setTemplate(this.card)
            this.$router.push(`/inspection-builder/card/${this.card.templateID}`)
          }
        },
        {
          label: 'Delete',
          icon: 'i-remove_circle red',
          command: () => this.openModal()
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      remove: 'company/cardTemplates/remove'
    }),
    ...mapMutations({
      setTemplate: 'company/cardTemplates/setTemplate'
    }),

    openCustomerPage(e) {
      if (!this.$refs.menu || this.$refs.menu.contains(e.target)) return
      this.setTemplate(this.card)
      this.$router.push(`/inspection-builder/card/${this.card.templateID}`)
    },
    openModal() {
      this.$confirm.require({
        title: 'Hey, wait!',
        message: `Are you sure, you want to delete ${this.card.name} ?`,
        acceptLabel: 'Delete',
        rejectLabel: 'Cancel',
        icon: 'i-volume_up',
        accept: async () => {
          await this.remove(this.card.templateID)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
