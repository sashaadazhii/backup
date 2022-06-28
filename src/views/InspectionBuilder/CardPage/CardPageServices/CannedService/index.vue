<template>
  <div class="card__wrapper" @click="openService">
    <div class="card__left">
      <div class="card__name">
        <span>{{ service.name }}</span>
      </div>
    </div>
    <div class="card__right">
      <div class="card__label">
        <i class="i-time orange" />
        <span>{{ service.hours }}</span> hrs
      </div>
      <div v-if="service.warranty === 'off'" class="card__label">
        <i class="i-remove_moderator red" />
        <span>Warranty off</span>
      </div>
      <div v-else-if="service.warranty === 'global'" class="card__label">
        <i class="i-shield green" />
        <span>Warranty Global</span>
      </div>
      <div v-else class="card__label">
        <i class="i-add_moderator blue" />
        <span v-if="service.warranty.time">{{ service.warranty.time }} months </span>
        <span v-if="service.warranty.time && service.warranty.range"> / </span>
        <span v-if="service.warranty.range">{{ service.warranty.range.toLocaleString('fr-FR') }} km</span>
      </div>

      <div class="card__dropdown" ref="menu">
        <Menu :list="actionsList" />
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Yaro/Menu'
import EditModal from '../NewCannedServiceModal'
import {mapActions, mapMutations} from 'vuex'

export default {
  name: 'CannedServiceComponent',
  components: {Menu},
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      isLoading: false,
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {
            this.openEditModal()
          }
        },
        {
          label: 'Delete',
          icon: 'i-remove_circle red',
          command: () => this.openDeleteModal()
        }
      ]
    }
  },
  methods: {
    ...mapMutations({
      setActiveService: 'company/cannedServices/setActiveService'
    }),
    ...mapActions({
      delete: 'company/cannedServices/delete'
    }),
    openEditModal() {
      this.$vfm.show(
        {
          component: EditModal,
          bind: {
            name: 'EditModal'
          }
        },
        this.service
      )
    },
    openDeleteModal() {
      this.$confirm.require({
        title: 'Hey, wait!',
        message: `Are you sure, you want to delete ${this.service.name} from the services?`,
        acceptLabel: 'Delete',
        rejectLabel: 'Cancel',
        icon: 'i-volume_up',
        accept: async () => {
          await this.delete({id: this.service.id, templateID: this.service.templateID})
        }
      })
    },
    openService(e) {
      if (!this.$refs.menu || this.$refs.menu.contains(e.target)) return
      this.setActiveService(this.service)
      this.$router.push(`/inspection-builder/card/${this.service.templateID}/parts`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
