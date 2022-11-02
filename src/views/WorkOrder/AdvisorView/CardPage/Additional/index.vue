<template>
  <div class="block__wrapper">
    <div class="block__additional">
      <Dropdown
        v-for="(info, idx) of additional"
        :key="idx"
        v-model="info.value"
        :options="info.list"
        :title="info.title"
        placeholder="Select"
        :disabled="!isStart"
        class="--theme-white"
      />
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'
import {mapState} from 'vuex'

export default {
  name: 'CardPageAdditional',
  components: {Dropdown},
  data() {
    return {
      list: ['Value 1', 'Value 2', 'Value 3'],
      value: null
    }
  },

  computed: {
    ...mapState({
      additional: s => s.company.cards.card.additional,
      archive: s => s.company.cards.card.archive,
      isStart: s => s.workOrder.isStart
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
