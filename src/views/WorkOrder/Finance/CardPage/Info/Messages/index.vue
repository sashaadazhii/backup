<template>
  <vue-final-modal @before-open="beforeOpen">
    <div class="modal__wrapper">
      <Input v-model="searchValue" placeholder="Search" iconLeft="i-search1" type="search" theme="white" />
      <NewMessage v-if="show" @onHide="show = false" />
      <div class="modal__list">
        <div v-for="note of localNotes" :key="note.id" class="modal__item" @click="select(note)">{{ note.note }}</div>
      </div>
      <Button label="Add template" icon="i-add_circle" position="center" size="large" grey @click="show = true" />
    </div>
  </vue-final-modal>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Input from '@/components/Yaro/Input'
import Button from '@/components/Yaro/Button'
import NewMessage from './NewMessage'

export default {
  name: 'FinanceMessages',
  components: {Input, Button, NewMessage},
  data() {
    return {
      searchValue: '',
      type: '',
      show: false
    }
  },
  async created() {
    // if (!this.company.id) await this.fetchCompanySettings()
    // if (this.company.hasGlobalWarranty) {
    //   const {warrantyRange, warrantyTime} = this.company
    //   const globalWarranty = {
    //     id: 'global',
    //     label: `Global Warranty — ${warrantyRange.toLocaleString('fr-FR')} KM/ ${warrantyTime} years`
    //   }
    //   this.warrantyList.unshift(globalWarranty)
    //   this.warranty = globalWarranty
    // }
  },
  computed: {
    ...mapState({
      notes: s => s.finance.stateNotes
    }),
    localNotes() {
      return this.notes.filter(note => note.note.toLowerCase().includes(this.searchValue.toLowerCase()))
    }
  },
  methods: {
    ...mapMutations({
      setPMessage: 'finance/setPMessage',
      setTMessage: 'finance/setTMessage'
    }),
    beforeOpen(e) {
      this.type = e.ref.params.value
    },
    select(message) {
      if (this.type === 'tMessage') {
        this.setTMessage(message)
      }
      if (this.type === 'pMessage') {
        this.setPMessage(message)
      }
      this.$vfm.hide('Messages')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
