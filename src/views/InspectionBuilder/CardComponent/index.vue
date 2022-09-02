<template>
  <div class="card__wrapper" @click="openCustomerPage">
    <div class="card__cell card__cell--name">
      <span>{{ card.name }}</span>
      <Label v-if="card.servicesCount" :label="card.servicesCount" border size="small" class="-grey" />
    </div>
    <div class="card__cell card__cell--vehicles">
      <div v-if="card.cardRelationType === 'global'" class="card__vehicle green">
        <i class="i-directions_car" />
        <span>Global</span>
      </div>
      <div v-else class="card__vehicle">
        <i class="i-directions_car" />
        <span> {{ card.relation.make }} {{ card.relation.model }} {{ card.relation.yearFrom }} </span>
        <span v-if="card.relation.yearFrom !== card.relation.yearTo"> - {{ card.relation.yearTo }}</span>
      </div>
    </div>
    <div class="card__cell">
      <div class="card__indicators">
        <Label v-if="card.timeTrackLength" icon="i-time" iconColor="#3EB3BB" :label="`${card.timeTrackLength} Month`" border class="-shadow" />
        <Label v-if="card.odometerTrack" icon="i-shutter_speed" iconColor="#3EB3BB" :label="`${card.odometerTrack.toLocaleString('fr-FR')} KM`" border class="-shadow" />
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
import CardModal from '../CardModal'
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
            // this.setTemplate(this.card)
            // this.$router.push(`/inspection-builder/card/${this.card.templateID}`)
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
      this.$vfm.show({
        component: CardModal,
        bind: {
          name: 'CardModal',
          'click-to-close': false,
          'esc-to-close': true
          // 'hide-overlay': true,
          // 'focus-trap': true
        }
      })
      // this.$router.push(`/inspection-builder/card/${this.card.templateID}`)
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
