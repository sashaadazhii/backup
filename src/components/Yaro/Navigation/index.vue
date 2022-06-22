<template>
  <nav class="y-nav">
    <ul class="y-nav__list">
      <li v-for="(item, idx) of list" :key="idx" class="y-nav__item">
        <router-link class="y-nav__link" :to="item.to">
          <i class="y-nav__icon" :class="{[item.icon]: item.icon}" />
          <div class="y-nav__label">{{ item.label }}</div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
