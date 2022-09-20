<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__header-title">Initial Walkaround</div>
        <Button icon="i-circle_close" border circle iconSize="20px" size="small" @click="close" />
      </div>
      <div class="modal__main">
        <div class="modal__main-title">Current Inspection</div>
        <div class="modal__main-list">
          <div class="modal__main-item">
            <div class="modal__main-label">
              <Label alias="MB" size="mini" circle />
              <span>Maynard Bauman</span>
            </div>
            <div class="modal__main-label">31 Aug 2022 at 2:30 PM</div>
          </div>
        </div>
        <div class="modal__main-title">Archive</div>
        <div class="modal__main-list">
          <div class="modal__main-item">
            <div class="modal__main-label">
              <Label alias="MB" size="mini" circle />
              <span>Maynard Bauman</span>
            </div>
            <div class="modal__main-label">31 Aug 2022 at 2:30 PM</div>
          </div>
          <div class="modal__main-item">
            <div class="modal__main-label">
              <Label alias="MB" size="mini" circle />
              <span>Maynard Bauman</span>
            </div>
            <div class="modal__main-label">31 Aug 2022 at 2:30 PM</div>
          </div>
          <div class="modal__main-item">
            <div class="modal__main-label">
              <Label alias="MB" size="mini" circle />
              <span>Maynard Bauman</span>
            </div>
            <div class="modal__main-label">31 Aug 2022 at 2:30 PM</div>
          </div>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import Button from '@/components/Yaro/Button'
import Label from '@/components/Yaro/Label'

export default {
  name: 'InitialWalkaround',
  components: {Button, Label},
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
