<template>
  <div class="page-inner page-parts">
    <TheHeader />
    <div v-if="service.id" class="parts__body">
      <div class="parts__left block">
        <div class="block__header">
          <div class="block__header-title">{{ service.name }}</div>
        </div>
        <div class="block__main">
          <div v-if="!isLoading && !parts.length" class="block__main--empty empty">
            <div class="empty__inner">
              <div class="empty__icon"><i class="i-build" /></div>
              <div class="empty__title">Add Parts to canned service</div>
              <div class="empty__subtitle">
                Service includes a visual inspection of the brake system, replacement with new fluid that meets or
                exceeds your vehicle manufacturer’s specifications and proper disposal of the used fluid.
              </div>
              <div class="empty__btn" @click="create">
                <i class="i-add_circle" />
                <span>Add Part</span>
              </div>
            </div>
          </div>
          <div v-if="!isLoading && parts.length" class="block__main--list list">
            <div class="list__inner">
              <div class="list__header">
                <div class="list__header-top">
                  <div class="list__header-title">All Parts({{ parts.length }})</div>
                  <div class="list__header-btn" @click="create">
                    <i class="i-add_circle" />
                    <span>Add Part</span>
                  </div>
                </div>
                <div class="list__header-bottom">
                  <span>Name</span>
                  <span>Core, $</span>
                  <span>Price, $</span>
                  <span>Time, h</span>
                </div>
              </div>
              <div class="list__main">
                <Part v-for="part of parts" :key="part.id" :part="part" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="parts__right">
        <div class="parts__service service">
          <div class="service__title">Details</div>
          <div v-if="service.warranty === 'off'" class="service__field">
            <i class="i-remove_moderator red" />
            <span>Warranty off</span>
          </div>
          <div v-else-if="service.warranty === 'global'" class="service__field">
            <i class="i-shield green" />
            <span>Warranty Global</span>
          </div>
          <div v-else class="service__field">
            <i class="i-add_moderator blue" />
            <span v-if="service.warranty.time">{{ service.warranty.time }} months </span>
            <span v-if="service.warranty.time && service.warranty.range"> / </span>
            <span v-if="service.warranty.range">{{ service.warranty.range.toLocaleString('fr-FR') }} km</span>
          </div>
          <div class="service__field">
            <i class="i-time orange" />
            <span>{{ service.hours }}</span> hrs
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import TheHeader from './TheHeader'
import Part from './Part'

export default {
  name: 'PageParts',
  components: {TheHeader, Part},
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      service: s => s.company.cannedServices.activeService,
      parts: s => s.company.parts.parts
    })
  },
  async created() {
    if (!this.service.id) {
      this.$router.back()
      return
    }
    this.isLoading = true
    if (!this.parts.length || this.parts[0]?.serviceID !== this.service.id) await this.fetch(this.service.id)
    this.isLoading = false
  },
  methods: {
    ...mapMutations({
      createPart: 'company/parts/createPart'
    }),
    ...mapActions({
      fetch: 'company/parts/fetch'
    }),
    create() {
      this.createPart({name: '', price: '', isCreate: true})
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
