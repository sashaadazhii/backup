<template>
  <div class="additional__wrapper">
    <div class="additional__title">Additional Info</div>
    <div class="additional__body">
      <Input v-for="(title, idx) of info" :key="idx" :modelValue="title" theme="white" disabled />
    </div>
  </div>
</template>

<script>
import Input from '@/components/Yaro/Input'
export default {
  name: 'AdditionalInfo',
  components: {Input},
  data() {
    return {
      info: ['Left - Brakepad Width — 5mm', 'Right - Brakepad Width — 5mm']
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
