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
        <Menu :list="actionsList" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Menu from '@/components/Yaro/Menu'
import EditModal from '../../CardPage/CardPageServices/NewCannedServiceModal'

export default {
  name: 'PartHeader',
  data() {
    return {
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
          command: () => {
            this.openDeleteModal()
          }
        }
      ]
    }
  },
  components: {Menu},
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
    ...mapActions({
      delete: 'company/cannedServices/delete'
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
      const {id, templateID} = this.service
      this.$confirm.require({
        title: 'Hey, wait!',
        message: `Are you sure, you want to delete ${this.service.name}  from the services?`,
        acceptLabel: 'Delete',
        rejectLabel: 'Cancel',
        icon: 'i-volume_up',
        accept: async () => {
          await this.delete({id, templateID})
          this.$router.back()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
