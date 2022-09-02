<template>
  <NewNote v-if="isEdit" :note="note" @close="isEdit = false" />
  <div v-else class="note__wrapper">
    <div class="note__hedaer">
      <div class="note__label">
        <Label :alias="note.alias" circle size="small" />
        <span>{{ note.author }}</span>
      </div>
      <div class="note__label">
        <span>{{ note.date }}</span>
      </div>
      <div class="note__menu">
        <Menu :list="actionsList">
          <template #menu>
            <Button icon="i-more_horiz1" border size="small" />
          </template>
        </Menu>
      </div>
    </div>
    <div class="note__body">{{ note.text }}</div>
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'
import Menu from '@/components/Yaro/Menu'
import Button from '@/components/Yaro/Button'
import {mapMutations, mapState} from 'vuex'
import NewNote from '../NewNote'

export default {
  name: 'CardPageNote',
  components: {Label, Menu, Button, NewNote},
  props: {
    note: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      actionsList: [
        {
          label: 'Remove',
          icon: 'i-remove_circle red',
          command: () => {
            this.$confirm.require({
              title: 'Hey, wait!',
              message: `Are you sure, you want to remove this notes?`,
              icon: 'i-volume_up',
              accept: async () => {
                this.remove(this.note.id)
              }
            })
          }
        },
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {
            this.isEdit = true
          }
        }
      ],
      isEdit: false
    }
  },
  methods: {
    ...mapMutations({
      remove: 'company/notes/remove'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
