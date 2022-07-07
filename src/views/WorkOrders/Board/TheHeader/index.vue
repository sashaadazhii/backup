<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__left"></div>
      <div class="header__right">
        <!-- <Filter
          v-model="activeFilters"
          :options="filtersList"
          :filterFields="['firstName', 'lastName']"
          dataKey="id"
          optionListLabel="name"
          optionListChildren="list"
          @change="changeFilters"
        >
          <template #optionlist="{option}">
            <div class="filter__option">
              <i v-if="option.name === 'Technitian'" class="i-build" />
              <i v-if="option.name === 'Service Advisor'" class="i-headset_mic" />
              <span>{{ option.name }}</span>
            </div>
          </template>
          <template #option="{option}">
            <div class="filter__option">
              <div class="filter__option--pin">{{ option.firstName[0] }}{{ option.lastName[0] }}</div>
              <span>{{ option.firstName }} {{ option.lastName }}</span>
            </div>
          </template>
        </Filter> -->
      </div>
    </div>
    <div v-if="activeFilters.length" class="header__chips">
      <div v-for="chip of activeFilters" :key="chip.id" class="chip">
        <div class="chip__icon">
          <i v-if="chip.type === 'Technitian'" class="i-build" />
          <i v-if="chip.type === 'Service Advisor'" class="i-headset_mic green" />
        </div>
        <div class="chip__name">{{ chip.firstName }} {{ chip.lastName }}</div>
        <div class="chip__close" @click="removeChip(chip.id)"><i class="i-close" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import Filter from '@/components/Yaro/Filter'
import {mapActions} from 'vuex'

export default {
  name: 'WorkBoardTaskHeader',
  // components: {Filter},
  data() {
    return {
      activeFilters: [],
      filtersList: []
    }
  },
  async created() {
    const techsList = await this.searchUsers({role: 'technician'})
    // const technicians = {
    //   name: 'Technitian',
    //   id: this.$getID(),
    //   mods: ['filter', 'multiple'],
    //   filterPlaceholder: 'Search Tech',
    //   list: techsList
    // }
    // this.filtersList.push(technicians)
  },
  methods: {
    ...mapActions({
      searchUsers: 'company/users/search',
      fetchBoard: 'workOrder/fetchBoard'
    }),
    removeChip(id) {
      this.activeFilters = this.activeFilters.filter(c => c.id !== id)
    },
    async changeFilters({value}) {
      const techsList = value.filter(v => v.type === 'Technitian')
      const techsIds = techsList.map(t => t.id)
      // await this.fetchBoard()
      // const filters = [techsList]
      //  users: [{name: 'Peter', surname: 'Griffin'}, {name: 'Thomas', surname: 'Anderson'}],
      // filters: [{technicians: 19}]
      // const data = {
      //   x: 1,
      //   arr: [1, 2, 3],
      //   arr2: [1, [2], 3],
      //   users: [
      //     {name: 'Peter', surname: 'Griffin'},
      //     {name: 'Thomas', surname: 'Anderson'}
      //   ]
      // }
      // await this.fetchBoard(data)
      // await this.fetchBoard({filters: [{technicians: techsIds}]})
      // await this.fetchBoard({'filters[technicians]': techsIds})
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
