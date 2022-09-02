<template>
  <div class="note__wrapper">
    <div class="note__hedaer">
      <div class="note__label">
        <Label :alias="note.alias" circle size="small" />
        <span>{{ note.author }}</span>
      </div>
      <div class="note__label">
        <span>{{ note.date }}</span>
      </div>
    </div>
    <div class="note__body">{{ note.text }}</div>
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'

export default {
  name: 'CardPageNote',
  components: {Label},
  props: {
    note: {
      type: Object,
      required: true
    }
  },

  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
