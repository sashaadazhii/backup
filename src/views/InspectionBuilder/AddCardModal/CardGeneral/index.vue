<template>
  <div class="main__wrapper">
    <y-input title="Name" placeholder="Name" :modelValue="card.name" @update:modelValue="setName" :error="error('name')" />
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
      <textarea
        class="field__text"
        placeholder="Enter customer facing description"
        :value="card.descriptionForCustomer"
        @input="setCusDesc($event.target.value)"
      />
    </div>
    <!-- <Dropdown title="Card Type" v-model="type" :options="typesList" optionLabel="label" @change="setCardType($event.value.id)" />
    <div v-if="type.id === 'public'" class="main__label">
      <i class="i-information-fill" />
      <span>Thanks for helping your network! Card is going to be undergoing review process, though, you can can use it as your local card.</span>
    </div> -->
    <CardRelation />
    <CardInclude />
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Dropdown from '@/components/Yaro/Dropdown'
import CardRelation from './CardRelation'
import CardInclude from './CardInclude'

export default {
  name: 'AddCardGeneral',
  components: {CardRelation, CardInclude}, //Dropdown

  data() {
    return {
      isLoading: false,
      type: {id: 'local', label: 'Local'},
      typesList: [
        {id: 'public', label: 'Public'},
        {id: 'local', label: 'Local'}
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
      setCusDesc: 'company/card/setCusDesc',
      setCardType: 'company/card/setCardType'
    }),
    error(name) {
      const error = this.errors.find(err => err.$property === name)
      if (error) return true
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
