<template>
  <vue-final-modal v-slot="{close}" @before-open="beforeOpen">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__header-title">Cards Library</div>
        <Button label="Create New Card" icon="i-add_circle" size="small" @click="openNewCardModal"/>
        <Button icon="i-circle_close" border grey circle iconSize="20px" size="small" @click="close" />
      </div>
      <Input v-model="cardSearch" icon-left="i-search1" placeholder="Start typing to search card" />
      <div class="modal__block">
        <div class="modal__block-title">CARDS</div>
        <div class="modal__block-inner">
          <Card v-for="card of filteredCards" :key="card.templateID" :card="card" @click="openCard(card)" />
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
/* eslint-disable */
import Input from '@/components/Yaro/Input'
import Button from '@/components/Yaro/Button'
import Card from './Card'
import CardPage from './CardPage'
import Service from './CardPage/Service'
import {mapState, mapMutations, mapActions} from 'vuex'
import AddCardModal from "@/views/InspectionBuilder/AddCardModal";

export default {
  name: 'AddCard',
  components: {Button, Input, Card, Service},
  data() {
    return {
        cardSearch: '',
    }
  },
  async created() {
    await this.fetchCards()
  },
  computed: {
    ...mapState({
      cards: s => s.company.cardTemplates.templates
    }),
      filteredCards() {
          return this.cards.filter(card => {
              return card.name.toLowerCase().includes(this.cardSearch.toLowerCase());
          });
      },
  },
  methods: {
    ...mapActions({
      fetchCards: 'company/cardTemplates/fetch'
    }),
    ...mapMutations({
      // selectAll: 'company/cards/selectAll',
    }),
    beforeOpen(e) {
      // this.part = e.ref.params._rawValue
    },
    openCard(card) {
      this.$vfm.show(
        {
          component: CardPage,
          bind: {
            name: 'CardPage',
            'click-to-close': false
          }
        },
        card
      )
      this.$vfm.hide('AddCard')
    },
      openNewCardModal() {
          this.$vfm.show({
              component: AddCardModal,
              bind: {
                  name: 'AddCardModal'
              }
          })
      },
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
