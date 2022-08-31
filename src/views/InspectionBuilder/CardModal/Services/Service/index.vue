<template>
  <div class="service__wrapper">
    <div class="service__header" @click="showService">
      <div class="service__header-left">
        <i class="i-keyboard_arrow_down" :class="{'-revert': show}" />
        <div class="service__title">{{ service.name }}</div>
        <Label :label="service.parts.length" size="small" circle border class="-grey" />
      </div>
      <div class="service__header-right">
        <Label icon="i-time" iconColor="#FF9B70" label="1.4hr" border size="large" class="-grey" />
        <Label icon="i-shield" iconColor="#10B981" label="24 months /  3000 km" border size="large" class="-grey" />
        <div ref="menu" class="service__menu">
          <Menu :list="actionsList">
            <template #menu>
              <Button icon="i-more_horiz" border size="small" />
            </template>
          </Menu>
        </div>
      </div>
    </div>
    <div v-if="show" class="service__body">
      <div class="service__desc">
        <div class="service__desc-title">Service Description</div>
        <div class="service__desc-text">{{service.description}}</div>
      </div>
      <div class="service__parts">
        <Part v-for="(part, idx) of service.parts" :key="idx" :part="part" />
        <div v-if="!isNewPart" class="service__parts-btn" @click="open">
          <i class="i-add_circle" />
          <span>Add new part</span>
        </div>
        <NewPart v-if="isNewPart" :serviceID="service.id" @close="open" />
      </div>
      <div v-if="service.guides && service.guides.length" class="service__guids">
        <div class="service__guids-title">Service guides</div>
        <Guid v-for="(guid, idx) of service.guides" :key="idx" :guid="guid" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Label from '@/components/Yaro/Label'
import Part from './Part'
import Guid from './Guid'
import Button from '@/components/Yaro/Button'
import Menu from '@/components/Yaro/Menu'
import NewPart from './NewPart'
import CreateService from '../CreateService'

export default {
  name: 'CardModalService',
  components: {Label, Part, Guid, Button, Menu, NewPart},
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false,
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {
            this.$vfm.show(
              {
                component: CreateService,
                bind: {
                  name: 'CreateService',
                  'esc-to-close': true,
                  'click-to-close': false
                }
              },
              this.service
            )
          }
        },
        {
          label: 'Remove',
          icon: 'i-remove_circle red',
          command: () => {
            this.$confirm.require({
              title: 'Hey, wait!',
              message: `Are you sure, you want to delete this service?`,
              acceptLabel: 'Yes',
              rejectLabel: 'No',
              icon: 'i-volume_up',
              accept: async () => {
                this.remove(this.service.id)
              }
            })
          }
        }
      ],
      isNewPart: false,
      localPart: null
    }
  },

  computed: {
    ...mapState({
      card: s => s.company.cardTemplates.template
    })
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({
      remove: 'company/cannedServices/remove'
    }),
    open() {
      if (this.isNewPart) this.localPart = null
      this.isNewPart = !this.isNewPart
    },
    showService(e) {
      if (!this.$refs.menu || this.$refs.menu.contains(e.target)) return
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
