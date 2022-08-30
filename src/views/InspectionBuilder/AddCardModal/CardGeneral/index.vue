<template>
  <div class="main__wrapper">
    <y-input title="Name" placeholder="Name" :modelValue="card.name" @update:modelValue="setName" :error="error('name')" />
    <Dropdown title="Card Type" v-model="type" :options="typesList" optionLabel="label" @change="changeType" />
    <CardRelation />

    <div class="field__label">
      <div class="field__title">Description</div>
      <textarea
        class="field__text"
        placeholder="Description"
        :value="card.description"
        :class="{error: error('description')}"
        @input="setDesc($event.target.value)"
      />
    </div>
    <div class="field__label">
      <div class="field__title">Customer Facing Description</div>
      <textarea class="field__text" placeholder="Description" :value="card.descriptionForCustomer" @input="setCusDesc($event.target.value)" />
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Dropdown from '@/components/Yaro/Dropdown'
import CardRelation from '../CardRelation'

export default {
  name: 'AddCardGeneral',
  components: {Dropdown, CardRelation},

  data() {
    return {
      isLoading: false,
      type: {id: 'inspection', label: 'Inspection'},
      typesList: [
        {id: 'inspection', label: 'Inspection'},
        {id: 'maintenance', label: 'Maintenance'},
        {id: 'repair', label: 'Repair'}
      ]
    }
  },
  computed: {
    ...mapState({
      card: s => s.company.card.card,
      errors: s => s.company.card.errors
    })
  },
  methods: {
    ...mapMutations({
      setName: 'company/card/setName',
      setDesc: 'company/card/setDesc',
      setCusDesc: 'company/card/setCusDesc'
    }),
    error(name) {
      const error = this.errors.find(err => err.$property === name)
      if (error) return true
    },
    changeType() {}
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
