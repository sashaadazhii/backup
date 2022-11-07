<template>
  <div class="request__wrapper" @click="open">
    <div class="request__header">
      <Label :label="request.status" size="small" class="request__label" :class="labelClass(request.status)" />
      <div class="tech__list">
        <Label :alias="order.technician.alias" circle class="tech__label" size="small" />
        <!-- <Label v-for="tech of request.techs" :key="tech.id" 
        :alias="`${tech.firstName[0]}${tech.lastName[0]}`" circle class="tech__label" size="small" /> -->
      </div>
    </div>
    <div class="request__main">
      <i class="i-device_hub request__main-icon" v-if="request?.newCards" />
      <div class="request__main-title"><i v-if="request.cards.length" class="i-device_hub" />Customer Request</div>
      <div class="request__main-text">{{ request.notes }}</div>
    </div>
    <div class="request__footer">
      <div class="request__footer-desc">
        <div class="request__footer-time">
          <i class="i-time" />
          <span>Time Allotted:</span>
          <span>{{ request.estimatedTime }}h</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'
import RequestModal from './RequestModal'
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'VehicleRequest',
  components: {Label},
  props: {
    request: {
      type: Object,
      required: true
    },
    isViewOnlyMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      order: s => s.workOrder.workOrder
    })
  },
  methods: {
    labelClass(status) {
      return {
        '-grey': status === 'Not Processed',
        '-red': status === 'Unable to reproduce',
        '-green': status === 'Done'
      }
    },
    ...mapMutations({
      set: 'requests/setRequest'
    }),
    open() {
      this.set(this.request)
      this.$vfm.show({
        component: RequestModal,
        bind: {
          name: 'RequestModal',
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
