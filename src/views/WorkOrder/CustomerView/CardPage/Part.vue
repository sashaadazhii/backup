<template>
  <div v-for="part in parts" :key="part.id" class="list__item" :class="{hide: card.partsForCustomer === 'Display Total Price Only'}">
    <div v-if="card.partsForCustomer === 'Display Total Price & Parts'" class="list__inner wide">
      <div class="list__icon">
        <i v-if="part.isService || part.isLabour" class="i-monetization_on" :style="[part.isService ? 'color: #BA8AE7' : 'color: #2C9AFF']" />
        <i v-else class="i-build" />
      </div>
      <div class="list__info">
        <div class="list__desc">{{ part.description }}</div>
      </div>
    </div>

    <div v-else-if="card.partsForCustomer === 'Display Total Price Only'" class="list__inner"></div>

    <div v-else-if="card.partsForCustomer === 'Display Parts & Pricing'" class="list__inner">
      <div class="list__icon">
        <i v-if="part.isService || part.isLabour" class="i-monetization_on" :style="[part.isService ? 'color: #BA8AE7' : 'color: #2C9AFF']" />
        <i v-else class="i-build" />
      </div>
      <div class="list__info">
        <div class="list__desc">{{ part.description }}</div>
      </div>
      <div class="list__text amount">{{ formatter(part.price) }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PartCustomerView',
  props: {part: {type: Object}}
}
</script>
