<template>
  <div class="item">
    <div class="item__label">
      <Label :label="`#${workOrder.num}`" size="small" circle color="#6B7280" />
    </div>
    <div class="item__label">
      <Label :label="workOrder.status" icon="i-circle" size="small" circle :color="labelColor()" />
    </div>
    <div class="item__period">
      <i class="i-calendar" /> <span>{{ workOrder.startsAt }}</span> <span class="dash">-</span> <span>{{ workOrder.endsAt }}</span>
    </div>
    <div class="item__info">
      <span>{{ workOrder.currentOdometer }}</span
      ><Label alias="KM" size="small" color="#FFA14E" />
    </div>
    <ul class="item__list">
      <li><Label :alias="workOrder.serviceAdvisor.alias" size="small" circle color="#3EB3BB" /></li>
      <li v-for="person of workOrder.technicians" :key="person.id">
        <Label :alias="person.alias" size="small" circle color="#6B7280" />
      </li>
    </ul>
    <div class="item__btn"><Button label="View Invoice" border grey /></div>
    <div class="item__menu"><Menu :list="actionsList" /></div>
  </div>
</template>
<script>
import Label from '@/components/Yaro/Label'
import Menu from '@/components/Yaro/Menu'
import Button from '@/components/Yaro/Button'
export default {
  name: 'VehicleWorkOrder',
  components: {Label, Menu, Button},
  props: {
    workOrder: {type: String}
  },
  data() {
    return {
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {}
        },
        {
          label: 'Delete',
          icon: 'i-remove_circle red',
          command: () => {}
        }
      ]
    }
  },
  methods: {
    labelColor() {
      const status = this.workOrder.status
      switch (status) {
        case 'Not Scheduled':
          return '#6b7280'
        case 'To Do':
          return '#2c9aff'
        case 'In Progress':
          return '#f9b507'
        case 'Done':
          return '#10B981'
        case 'Cancelled':
          return '#F37878'
        default:
          return '#6b7280'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
