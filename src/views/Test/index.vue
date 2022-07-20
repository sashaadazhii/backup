<template>
  <div class="wrap">
    <Input type="search" v-model="text" />
    {{text}}
  </div>
</template>

<script>
import Input from '@/components/Yaro/Input'
export default {
  name: 'test',
  components: {Input},
  data() {
    return {
      text: null
    }
  }
}
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.wrap {
  padding: 100px;
}

@import '~primevue/resources/themes/lara-light-indigo/theme.css';
@import '~primevue/resources/primevue.min.css';
@import '~primeicons/primeicons.css';
</style>
