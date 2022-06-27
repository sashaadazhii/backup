<template>
  <div class="page-inner">
    <div class="template__header header">
      <div class="header__top">
        <div class="header__left">
          <div class="header__icon">
            <i class="i-sticky_note" />
          </div>
          <div class="header__title">{{ template.name }}</div>

          <div class="header__indicators">
            <div v-if="!template.relations?.length" class="header__indicator">
              <i class="i-directions_car" />
              <span>All Vehicles</span>
            </div>
            <div v-else v-for="car of template.relations" :key="car.id" class="header__indicator">
              <i class="i-directions_car" />
              <span v-if="!car.model" class="space">All </span>
              <span>
                {{ car.make }} {{ car.model }} {{ car.yearFrom }}
                <span v-if="car.yearFrom !== car.yearTo"> - {{ car.yearTo }}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="header__right">
          <button class="header__close" @click="$router.push('/inspection-builder')">
            <i class="i-circle_close" />
          </button>
        </div>
      </div>
      <div class="header__nav">
        <div class="header__nav-item" :class="{active: templateBlock === 'Overview'}" @click="templateBlock = 'Overview'">Overview</div>
        <div class="header__nav-item" :class="{active: templateBlock === 'CannedServices'}" @click="templateBlock = 'CannedServices'">Canned Services</div>
        <div class="header__nav-item" :class="{active: templateBlock === 'ServiceTracking'}" @click="templateBlock = 'ServiceTracking'">Service Tracking</div>
      </div>
    </div>
    <div class="template__body">
      <component :is="templateBlock"></component>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Overview from './CardPageOverview'
import CannedServices from './CardPageServices'
import ServiceTracking from './CardPageTracking'

export default {
  name: 'CardTemplatePage',
  components: {Overview, CannedServices, ServiceTracking},
  data() {
    return {
      templateBlock: 'Overview'
    }
  },
  computed: {
    ...mapState({
      template: s => s.company.cardTemplates.template,
      services: s => s.company.cannedServices.services
    })
  },
  async created() {
    // const templateID = +this.$route.params.id
    // if (this.$route.query.component) this.templateBlock = this.$route.query.component
    // if (!this.template.templateID) await this.fetchTemplate(templateID)
    // if (this.services[0]?.templateID !== templateID) await this.fetchServices(this.template.templateID)
  },
  methods: {
    ...mapActions({
      fetchTemplate: 'company/cardTemplates/fetchTemplate',
      fetchServices: 'company/cannedServices/fetch'
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
