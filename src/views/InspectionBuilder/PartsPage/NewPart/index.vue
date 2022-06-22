<template>
  <div class="card__wrapper">
    <div class="card__left">
      <label class="field__label field__label-empty">
        <input v-model="name" type="text" class="field__input" placeholder="Part Name" ref="newServicePartName" />
      </label>
    </div>
    <div class="card__right">
      <label class="field__label field__label-icon">
        <i class="i-monetization_on" />
        <input v-model.number="price" v-maska="'#######'" type="text" class="field__input" placeholder="Part price" />
      </label>
      <div class="card__buttons">
        <button class="card__btn green" @click="createPart"><span>Save</span></button>
        <button class="card__btn grey" @click="cancelPart"><i class="i-cancel" /></button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
export default {
  name: 'NewCannedServicePart',
  data() {
    return {
      name: '',
      price: '',
      isLoading: false
    }
  },
  mounted() {
    this.$refs.newServicePartName.focus()
  },
  computed: {
    ...mapState({
      service: s => s.company.cannedServices.activeService
    })
  },
  methods: {
    ...mapActions({
      create: 'company/parts/create',
      fetch: 'company/parts/fetch'
    }),
    ...mapMutations({
      changePart: 'company/parts/createPart'
    }),
    async createPart() {
      if (this.isLoading) return
      const id = this.service.id
      const {name, price} = this
      const part = {name, price}
      try {
        this.isLoading = true
        await this.create({id, part})
        await this.fetch(id)
        this.changePart(null)
      } finally {
        this.isLoading = false
      }
    },
    cancelPart() {
      if (this.isLoading) return
      this.changePart(null)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
