<template>
  <div class="block__wrapper">
    <div class="block__header">
      <div class="block__title">Notes</div>
      <button class="block__btn"><i class="i-add_circle" /><span>Add New Note</span></button>
    </div>
    <div class="block__body">
      <div class="note__wrapper -bluegreen">
        <div class="note__line" />
        <div class="note__inner">
          <div class="note__header">Lorem ipsum dolor sit amet</div>
          <div class="note__body">
            Praesent et dolor non justo commodo ultrices. Quisque laoreet ante non neque aliquet, sit amet hendrerit tellus tristique. Nulla fermentum ...
          </div>
          <div class="note__footer">
            <Label alias="MB" circle size="small" class="-dark" />
            <span>Maynard Bauman</span>
            <span>at 22 Sep 2019 </span>
          </div>
        </div>
      </div>
      <div class="note__wrapper -orange">
        <div class="note__line" />
        <div class="note__inner">
          <div class="note__header">Lorem ipsum dolor sit amet</div>
          <div class="note__body">
            Praesent et dolor non justo commodo ultrices. Quisque laoreet ante non neque aliquet, sit amet hendrerit tellus tristique. Nulla fermentum ...
          </div>
          <div class="note__footer">
            <Label alias="MB" circle size="small" class="-dark" />
            <span>Maynard Bauman</span>
            <span>at 22 Sep 2019 </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'

export default {
  name: 'CardPageNotes',
  components: {Label},
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
