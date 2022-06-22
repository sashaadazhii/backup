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

      <div class="card__dropdown" ref="dropdown">
        <Dropdown :modelValue="action" :list="actionsList" @update:modelValue="selectAction" actionMenu>
          <template #option="{label: label}">
            <div class="card__dropdown-option">
              <i v-if="label === 'Edit'" class="i-edit" />
              <i v-if="label === 'Delete'" class="i-remove_circle red" />
              <span>{{ label }}</span>
            </div>
          </template>
          <template #menu>
            <div class="card__dropdown-menu">
              <i class="i-more_horiz" />
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown(new)'
import DeleteModal from './DeleteModal'
import EditModal from '../NewCannedServiceModal'
import {mapMutations} from 'vuex'

export default {
  name: 'CannedServiceComponent',
  components: {Dropdown},
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
      action: null,
      actionsList: ['Edit', 'Delete']
    }
  },
  methods: {
    ...mapMutations({
      setActiveService: 'company/cannedServices/setActiveService'
    }),
    async selectAction(action) {
      if (this.isLoading) return
      if (action === 'Delete') {
        this.openModal('delete')
      } else if (action === 'Edit') {
        this.openModal('edit')
      }
    },

    openModal(type) {
      let component = null
      let name = ''
      if (type === 'delete') {
        component = DeleteModal
        name = 'DeleteModal'
      }
      if (type === 'edit') {
        component = EditModal
        name = 'EditModal'
      }
      this.$vfm.show(
        {
          component,
          bind: {
            name
          }
        },
        this.service
      )
    },
    openService(e) {
      if (!this.$refs.dropdown || this.$refs.dropdown.contains(e.target)) return
      this.setActiveService(this.service)
      this.$router.push(`/inspection-builder/card/${this.service.templateID}/parts`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
