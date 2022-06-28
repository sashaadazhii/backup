<template>
  <div class="note__wrapper">
    <div class="note__alias" :class="{new: note.new}">{{ note.alias }}</div>
    <div class="note__title">
      <div class="note__author">{{ note.author }}</div>
      <div class="note__date">{{ note.date }}</div>
    </div>
    <div class="note__pin"></div>
    <div class="note__text">{{ note.text }}</div>
  </div>
</template>

<script>
export default {
  name: 'WorkOrderGeneralNotesNote',
  props: {
    note: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
