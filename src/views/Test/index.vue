<template>
  <div class="wrap">
    <Textarea v-model="text" title="asf" placeholder="afasf" error errorMessage="adfasfasf" />
    a{{ text }}
    <Input v-model="text" title="asf" placeholder="afasf" error />
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
import Textarea from '@/components/Yaro/Textarea'
import Input from '@/components/Yaro/Input'

export default {
  name: 'test',
  components: {Textarea, Input},
  data() {
    return {
      text: null
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  padding: 100px;
  // display: flex;
  // justify-content: flex-end;
  // column-gap: 20px;
  // height: inherit;
  // overflow: auto;
}
.y-label--circle {
  border-color: red;
}

.dialog_yohoho {
  background-color: red;
  min-width: 300px;
}

// ::v-deep(.y-dialog) {
//   width: 96%;
//   max-width: 400px;
//   border-radius: 20px;
//   display: none !important;
// }

@import '~primevue/resources/themes/lara-light-indigo/theme.css';
@import '~primevue/resources/primevue.min.css';
@import '~primeicons/primeicons.css';
</style>
