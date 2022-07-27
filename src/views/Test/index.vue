<template>
  <div class="wrap">
    <div class="" v-tooltip.bottom="'Enter your username'">asfasfasfasfas</div>
    <div class="tech__list">
      <div v-for="(tech, idx) of techs" :key="idx" class="tech__label">{{ tech }}</div>
      <Multiselect v-model="techs" :options="list" menu>
        <template #menu>
          <div class="tech__add"><i class="i-add" /></div>
        </template>
      </Multiselect>
    </div>

    {{ techs }}
  </div>
</template>

<script>
import Tooltip from '@/components/Yaro/tooltip'
import Multiselect from '@/components/Yaro/Multiselect'
export default {
  name: 'test',
  components: {Multiselect},
  data() {
    return {
      techs: null,
      list: ['MM', 'AA', 'BB', 'BO', 'AS']
    }
  },
  directives: {
    tooltip: Tooltip
  }
}
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.wrap {
  padding: 100px;
}

.tech {
  &__list {
    display: flex;
    align-items: center;
  }
  &__add {
    height: 32px;
    width: 32px;
    display: grid;
    place-items: center;
    font-size: 16px;
    border-radius: 50%;
    border: 1px solid grey;
    background: white;
  }
  &__label {
    height: 32px;
    width: 32px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 12px;
    background: #10b981;
    color: white;
    margin-right: -4px;
  }
}

@import '~primevue/resources/themes/lara-light-indigo/theme.css';
@import '~primevue/resources/primevue.min.css';
@import '~primeicons/primeicons.css';
</style>
