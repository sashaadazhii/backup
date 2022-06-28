<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__top">
        <div class="header__left">
          <div class="header__icon"><i class="i-sticky_note"></i></div>
          <div class="header__title">Inspection Builder</div>
        </div>
        <div class="header__right">
          <button class="header__btn" @click="openNewCardModal">
            <i class="i-add_circle" />
            <span>Create New Card</span>
          </button>
        </div>
      </div>
      <div class="header__middle">
        <div class="header__left">
          <div class="header__field field">
            <label class="field__label">
              <i class="i-search1" />
              <input :value="searchParams" class="field__input" type="search" placeholder="Start by typing card name" @input="search" />
              <i class="i-close" @click="resetInput" />
            </label>
          </div>
        </div>
      </div>
      <div class="header__bottom">
        <div class="list-titles">
          <div class="list-titles__item">Card Name</div>
          <div class="list-titles__item">Relation</div>
          <div class="list-titles__item">Service Tracker</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddCardModal from '../AddCardModal'
import {mapActions, mapMutations, mapState} from 'vuex'
import _ from 'lodash'

export default {
  name: 'InspectionBuilderHeader',
  computed: {
    ...mapState({
      searchParams: s => s.company.cardTemplates.searchParams
    })
  },
  methods: {
    ...mapActions({
      fetch: 'company/cardTemplates/fetch'
    }),
    ...mapMutations({
      setSearch: 'company/cardTemplates/setSearch',
      reset: 'company/cardTemplates/reset'
    }),
    async search(e) {
      const param = e.target.value
      this.setSearch(param)
      await this.getCards()
    },
    getCards: _.debounce(async function () {
      this.reset()
      await this.fetch()
    }, 300),
    async resetInput() {
      this.setSearch(null)
      await this.getCards()
    },
    openNewCardModal() {
      this.$vfm.show({
        component: AddCardModal,
        bind: {
          name: 'AddCardModal'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
