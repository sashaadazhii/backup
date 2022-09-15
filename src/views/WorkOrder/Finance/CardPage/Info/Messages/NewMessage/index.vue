<template>
  <div class="message__wrapper">
    <div class="message__body">
      <Textarea v-model="message" placeholder="Start typing here..." height="120" />
    </div>
    <div class="message__footer">
      <div class="message__footer-left">
        <Button label="Save" @click="save" />
        <Button label="Cancel" border @click="$emit('onHide')" />
      </div>
      <div class="message__footer-right">
        <Switch v-model="isTemlate" label="Save as a template" textLeft />
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Textarea from '@/components/Yaro/Textarea'
import Button from '@/components/Yaro/Button'
import Switch from '@/components/Yaro/Switch'

export default {
  name: 'FinanceNewMessages',
  components: {Textarea, Button, Switch},
  data() {
    return {
      message: '',
      isTemlate: false
    }
  },
  methods: {
    ...mapMutations({
      addNote: 'finance/addStateNote'
    }),
    save() {
      this.addNote({id: this.$getID(), note: this.message})
      this.$emit('onHide')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
