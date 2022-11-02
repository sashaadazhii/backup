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
      />
    </div>
    <!-- <div class="block__archive">
      <div class="block__archive-title">Archive Notes</div>
      <div class="block__archive-list">
        <div v-for="(info, idx) of archive" :key="idx" class="block__archive-item">
          <div class="block__archive-item-title">Work Order {{ info.date }}</div>
          <div class="block__archive-item-list">
            <div v-for="(field, idx) of info.fields" :key="idx" class="block__archive-item-block">{{ field }}</div>
          </div>
        </div>
      </div>
    </div> -->
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
