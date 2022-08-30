<template>
  <div class="board__wrapper">
    <TheHeader />
    <div class="board__inner">
      <div v-for="(shift, idx) of shifts" :key="idx" class="board__col">
        <div class="shift__wrapper">
          <div class="shift__header">
            <div class="shift__color" :style="{'background-color': shift.color}">{{ idx + 1 }}</div>
            <div class="shift__title">
              <div class="shift__name">{{ shift.name }}</div>
              <div class="shift__time">Shift: {{ shift.startTime }} {{ shift.endTime }}</div>
            </div>
          </div>
          <div class="shift__progress">
            <div class="shift__bar"><span style="width: 30%" /></div>
            <div class="shift__hours">5.5/11 h</div>
          </div>
        </div>
        <div v-for="(tech, idx) of techs" :key="idx" class="tech__wrapper">
          <div class="tech__header">
            <Label :alias="`${tech.firstName[0]}${tech.lastName[0]}`" class="-grey" circle size="small" />
            <div class="tech__name">{{ tech.firstName }} {{ tech.lastName }}</div>
          </div>
          <div class="tech__body">{{ Math.floor(Math.random() * (12 - 1 + 1)) + 1}} h</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from './HeaderInner'
import Label from '@/components/Yaro/Label'
import {mapState} from 'vuex'

export default {
  name: 'EmployeeProductivity',
  components: {TheHeader, Label},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      techs: s => s.company.users.users.filter(u => u.role === 'technician'),
      shifts: s => s.company.shifts.shifts
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
