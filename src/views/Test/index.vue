<template>
  <div class="wrap">
    <Dropdown v-model="period" :options="periods" size="medium" id="222">
      <template #value="{value}">
        <div class="y-dropdown-label-custom">
          <span class="-title">Time Period:</span>
          <span v-if="value">{{ value }} </span>
          <span v-else>All</span>
        </div>
      </template>
      <template #option="{option}">
        <div class="field__select-label">
          <span>{{ option }}</span>
        </div>
      </template>
    </Dropdown>

    <Dropdown v-model="sorted" :options="sortList" size="medium">
      <template #value="{value}">
        <div class="y-dropdown-label-custom">
          <span class="-title">Display by:</span>
          <span v-if="value">{{ value }} </span>
          <span v-else>All</span>
        </div>
      </template>
      <template #option="{option}">
        <div class="field__select-label">
          <span>{{ option }}</span>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
import Dropdown from '@/components/Yaro/Dropdown'
export default {
  name: 'test',
  components: {Dropdown, },
  data() {
    return {
      vendor: null,
      periods: ['3 days', 'Week', 'This month', '3 months', '6 months', 'Year'],
      period: 'This month',
      sortList: ['Day', 'Expense Account', 'Amount', 'HST'],
      sorted: 'Day'
    }
  },
  computed: {
    ...mapState({
      vendors: s => s.vendors.vendors
    })
  }
}
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.wrap {
  padding: 100px;
  display: flex;
  // justify-content: flex-end;
  // column-gap: 20px;
  // height: inherit;
  // overflow: auto;
}
.y-label--circle {
  border-color: red;
}

.dialog_yohoho {
  background-color: red;
  min-width: 300px;
}

// ::v-deep(.y-dialog) {
//   width: 96%;
//   max-width: 400px;
//   border-radius: 20px;
//   display: none !important;
// }

@import '~primevue/resources/themes/lara-light-indigo/theme.css';
@import '~primevue/resources/primevue.min.css';
@import '~primeicons/primeicons.css';
</style>
