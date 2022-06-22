<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__left">
        <div class="header__back" @click="back">
          <i class="i-arrow_back" />
          <span>{{ template.name }}</span>
        </div>
        <div class="header__line">/</div>
        <div class="header__title">
          <i class="i-home_repair_service" />
          <span>{{ service.name }}</span>
        </div>
      </div>
      <div class="header__right">
        <Dropdown :modelValue="action" :list="actionsList" @update:modelValue="selectAction" actionMenu>
          <template #option="{label: label}">
            <div class="dropdown-option">
              <i v-if="label === 'Edit'" class="i-edit" />
              <i v-if="label === 'Delete'" class="i-remove_circle red" />
              <span>{{ label }}</span>
            </div>
          </template>
          <template #menu>
            <div class="dropdown-menu">
              <i class="i-more_horiz" />
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Dropdown from '@/components/Dropdown(new)'

import DeleteModal from './DeleteModal'
import EditModal from '../../CardPage/CardPageServices/NewCannedServiceModal'

export default {
  name: 'PartHeader',
  data() {
    return {
      action: null,
      actionsList: ['Edit', 'Delete']
    }
  },
  components: {Dropdown},
  computed: {
    ...mapState({
      service: s => s.company.cannedServices.activeService,
      template: s => s.company.cardTemplates.template
    })
  },
  methods: {
    ...mapMutations({
      setActiveService: 'company/cannedServices/setActiveService'
    }),
    back() {
      this.$router.push({path: `/inspection-builder/card/${this.$route.params.id}`, query: {component: 'CannedServices'}})
    },
    selectAction(action) {
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
