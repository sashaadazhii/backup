<template>
  <div class="service__wrapper" :class="[card.status !== 'Good' && card.status !== 'No Status' ? 'editable' : '']" @click="open">
    <div class="service__top">
      <div class="service__top-left">
        <div class="service__name">
          <div v-if="isStart && card.status !== 'Good' && card.status !== 'No Status'" class="y-radio" :class="{active: service.select}" @click.stop="choose" />
          <div v-else></div>
          <div class="service__title">{{ service.name }}</div>
        </div>
        <div class="service__subtitle">{{ service.description }}</div>
      </div>
      <div class="service__top-right">
        <div @click.stop>
          <Menu :list="actionsList">
            <template #menu @click.stop>
              <Button icon="i-more_horiz" border size="small" />
            </template>
          </Menu>
        </div>
      </div>
    </div>
    <div class="service__bottom">
      <Label
        :label="`${service.estimatedTime} hr`"
        icon="i-time"
        iconColor="#3EB3BB"
        iconSize="18px"
        size="large"
        class="-grey"
        color="#fff"
        v-tooltip.bottom="'Estimated time'"
      />
      <Label
        :label="`${service.averageTime} hr`"
        icon="i-time orange"
        iconSize="18px"
        border
        size="large"
        class="-grey"
        color="#fff"
        v-tooltip.bottom="'Average time'"
      />
      <Label :label="`${service.used} times`" size="large" class="-grey -counter" color="#fff" v-tooltip.bottom="'Number of times used'" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Yaro/Button'
import Tooltip from '@/components/Yaro/tooltip'
import Label from '@/components/Yaro/Label'
import Menu from '@/components/Yaro/Menu'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'Service',
  components: {Button, Label, Menu},
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit'
        }
      ],
      cannedServices: []
    }
  },
  computed: {
    ...mapState({
      activeService: s => s.company.cannedServices.activeService,
      isStart: s => s.workOrder.isStart,
      card: s => s.company.cards.card
    }),
    labelIcon() {
      switch (this.service?.warrantyType) {
        case 'global':
          return 'i-shield green'
        case 'off':
          return 'i-remove_moderator red'
        case 'custom':
          return 'i-add_moderator blue'
        default:
          return ''
      }
    }
  },
  methods: {
    ...mapMutations({
      setActive: 'company/cannedServices/setActiveService',
      set: 'company/cannedServices/setService',
      select: 'company/cannedServices/select'
    }),

    open() {
      this.setActive(this.service)
    },
    choose() {
      const serviceID = this.service.id
      this.select(serviceID)
      this.set(this.service)
      this.$emit('choose')
      this.$emit('unchoose')
    }
  },
  directives: {
    tooltip: Tooltip
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
