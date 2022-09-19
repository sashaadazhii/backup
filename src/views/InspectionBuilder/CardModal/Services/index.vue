<template>
  <div class="services__wrapper">
    <Button icon="i-add_circle" label="Create Canned Service" border style="background-color: #e5e7eb" @click="open" />
    <div class="services__list">
      <Service v-for="(service, idx) of services" :key="idx" :service="service" />
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Button from '@/components/Yaro/Button'
import Service from './Service'
import CreateService from './CreateService'

export default {
  name: 'CardModalServices',
  components: {Service, Button},
  created() {
    this.fetch(this.card.templateID)
  },
  computed: {
    ...mapState({
      services: s => s.company.cannedServices.services,
      card: s => s.company.cardTemplates.template
    })
  },
  methods: {
    ...mapActions({
      fetch: 'company/cannedServices/fetch'
    }),
    open() {
      this.$vfm.show({
        component: CreateService,
        bind: {
          name: 'CreateService',
          'esc-to-close': true,
          'click-to-close': false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
