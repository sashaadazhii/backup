<template>
  <div class="block__wrapper">
    <Dropdown v-model="value" :options="list" title="Title" placeholder="Select" />
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'

export default {
  name: 'CardPageAdditional',
  components: {Dropdown},
  data() {
    return {
      list: ['Value 1', 'Value 2', 'Value 3'],
      value: null
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
