<template>
  <div class="main__wrapper">
    <y-input
      title="Name"
      placeholder="Name"
      :modelValue="card.name"
      @update:modelValue="setName"
      :error="error('name')"
    />
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
        placeholder="Description"
        :value="card.descriptionForCustomer"
        @input="setCusDesc($event.target.value)"
      />
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'AddCardGeneral',
  data() {
    return {
      isLoading: false
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
