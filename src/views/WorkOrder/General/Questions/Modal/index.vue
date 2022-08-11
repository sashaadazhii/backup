<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <span>Questions</span>
        <div class="modal__header-btn">
          <i class="i-settings_menu" />
          <span>Manage questions</span>
        </div>
        <Button icon="i-circle_close" border grey circle iconSize="20px" size="small" @click="close" />
      </div>
      <div class="modal__inner">
        <Block v-for="(group, idx) of groups" :key="idx" :group="group" :idx="idx" />
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Button from '@/components/Yaro/Button'
import Block from './Block'
export default {
  name: 'QuestionsModal',
  components: {Button, Block},
  data() {
    return {
      groups: [
        {
          title: 'When you feel these vibrations:',
          time: 0,
          blocks: [
            {
              type: 'input',
              title: 'At what approximate speed you’re usually going?',
              placeholder: 'Enter Speed',
              value: null
            },
            {
              type: 'select',
              title: 'Do you feel it while you’re braking?',
              list: ['Yes', 'No'],
              value: null
            },
            {
              type: 'select',
              title: 'Is this vibration constant?',
              list: ['Yes', 'No'],
              value: null
            }
          ]
        },
        {
          title: 'When you hear these sounds:',
          time: 0,
          blocks: [
            {
              type: 'input',
              title: 'Where do you generally hear them from?',
              placeholder: 'Choose Side',
              value: null
            }
          ]
        },
        {
          title: 'When do you generally hear the noise when you’re driving?',
          time: 0,
          blocks: [
            {
              type: 'dropdown',
              title: 'Choose option or a few options:',
              placeholder: 'Chose option',
              value: null,
              list: ['off road', 'highway', 'when turning']
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState({
      // card: s => s.company.card.card
    })
  },
  methods: {
    ...mapMutations({
      // setErrors: 'company/card/setErrors',
    })
    // open() {
    //   this.$vfm.hide('Mileage')
    //   this.$vfm.show({
    //     component: Initial,
    //     bind: {
    //       name: 'Initial'
    //     }
    //   })
    // },
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
