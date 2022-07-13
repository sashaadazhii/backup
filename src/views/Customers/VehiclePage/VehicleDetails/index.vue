<template>
  <div class="vehicle__inner">
    <div class="vehicle__left">
      <div class="card">
        <div class="card__title">Vehicle info</div>
        <div class="card__section">
          <div class="card__section-title">Vehicle</div>
          <div class="card__row">
            <i class="i-directions_car" />
            <div class="card__text">
              {{ vehicle.make }} {{ vehicle.model }}
              <span class="card__text card__text--accent"> {{ vehicle.year }}</span>
            </div>
          </div>
        </div>
        <div class="card__section">
          <div class="card__section-title">License:</div>
          <div class="card__row">
            <div class="card__label">{{ vehicle.license }}</div>
            <!-- TODO: update all card.label with LAbel -->
            <!-- <Label :label="vehicle.license" grey border size="medium" /> -->
          </div>
        </div>
        <div class="card__section">
          <div class="card__section-title">VIN:</div>
          <div class="card__row">
            <div class="card__label">{{ vehicle.vin }}</div>
          </div>
        </div>
        <div class="card__section">
          <div class="card__section-title">Type:</div>
          <div class="card__row">
            <div class="card__label">{{ vehicle.vehicleType }}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card__title">Engine info</div>
        <div class="card__section">
          <div class="card__section-title">Engine Code:</div>
          <div class="card__row">
            <div class="card__label">{{ vehicle.engine.code }}</div>
          </div>
        </div>
        <div class="card__section">
          <div class="card__section-title">Engine Size:</div>
          <div class="card__row">
            <div class="card__label">{{ vehicle.engine.size }}</div>
          </div>
        </div>
        <div class="card__section">
          <div class="card__section-title">Cylinders:</div>
          <div class="card__row">
            <div class="card__label">{{ vehicle.engine.cylinders }}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card__title">Additional fields</div>
        <div class="card__section">
          <div class="card__section-title">Field name:</div>
          <!-- TODO: add logic for customFields -->
          <!-- <div v-if="customFields && customFields[0]" class="vehicle__block additional">
            <div class="vehicle__block-header">Additional</div>
            <div class="vehicle__block-body body">
              <div v-for="(field, idx) of customFields" :key="idx" class="body__row">
                <div class="body__row-title blue">{{ field.key }}</div>
                <div class="body__row-text">{{ field.value }}</div>
              </div>
            </div>
          </div> -->
          <div class="card__row">
            <div class="card__label">Field Value</div>
          </div>
        </div>
        <div class="card__section">
          <div class="card__section-title">Field name:</div>
          <div class="card__row">
            <div class="card__label">Field Value</div>
          </div>
        </div>
        <div class="card__section">
          <div class="card__section-title">Field name:</div>
          <div class="card__row">
            <div class="card__label">Field Value</div>
          </div>
        </div>
      </div>
    </div>
    <div class="vehicle__right">
      <div class="card">
        <div class="card__title">work orders history</div>
        <div class="card__list">
          <VehicleWorkOrder v-for="workOrder in workOrders" :key="workOrder.num" :workOrder="workOrder" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import VehicleWorkOrder from './VehicleWorkOrder'

export default {
  name: 'VehiclePageDetails',
  components: {VehicleWorkOrder},
  data() {
    return {
      workOrders: [
        {
          num: 112,
          status: 'Not Scheduled',
          startsAt: '10 AM, May 18',
          endsAt: '11 AM, May 23',
          currentOdometer: 70000,
          technicians: [
            {alias: 'EF', id: 23483, name: 'Enzo Ferrari'},
            {alias: 'FS', id: 13443, name: 'Fredd Smith'}
          ],
          serviceAdvisor: {alias: 'EM', id: 23490, name: 'Emmanuel Macron'}
        },
        {
          num: 113,
          status: 'To Do',
          startsAt: '10 AM, Jun 1',
          endsAt: '11 AM, Jun 2',
          currentOdometer: 70080,
          technicians: [
            {alias: 'EF', id: 23483, name: 'Enzo Ferrari'},
            {alias: 'FS', id: 13443, name: 'Fredd Smith'}
          ],
          serviceAdvisor: {alias: 'EM', id: 23490, name: 'Emmanuel Macron'}
        },
        {
          num: 120,
          status: 'To Do',
          startsAt: '09 AM, Jun 10',
          endsAt: '06 PM, Jun 10',
          currentOdometer: 70100,
          technicians: [
            {alias: 'EF', id: 23483, name: 'Enzo Ferrari'},
            {alias: 'FS', id: 13443, name: 'Fredd Smith'}
          ],
          serviceAdvisor: {alias: 'EM', id: 23490, name: 'Emmanuel Macron'}
        },
        {
          num: 123,
          status: 'In Progress',
          startsAt: '10 AM, Jul 08',
          endsAt: '11 AM, Jul 12',
          currentOdometer: 70000,
          technicians: [
            {alias: 'EF', id: 23483, name: 'Enzo Ferrari'},
            {alias: 'FS', id: 13443, name: 'Fredd Smith'}
          ],
          serviceAdvisor: {alias: 'EM', id: 23490, name: 'Emmanuel Macron'}
        },
        {
          num: 135,
          status: 'Done',
          startsAt: '09 AM, Aug 12',
          endsAt: '10 AM, Aug 12',
          currentOdometer: 70390,
          technicians: [{alias: 'EF', id: 23483, name: 'Enzo Ferrari'}],
          serviceAdvisor: {alias: 'EM', id: 23490, name: 'Emmanuel Macron'}
        },
        {
          num: 189,
          status: 'Cancelled',
          startsAt: '10 AM, Sep 20',
          endsAt: '10 AM, Sep 20',
          currentOdometer: 70600,
          technicians: [
            {alias: 'MC', id: 34567, name: 'Mirro Clodd'},
            {alias: 'FS', id: 13443, name: 'Fredd Smith'}
          ],
          serviceAdvisor: {alias: 'EM', id: 23490, name: 'Emmanuel Macron'}
        },
        {
          num: 345,
          status: 'Done',
          startsAt: '10 AM, Dec 18',
          endsAt: '05 PM, Dec 20',
          currentOdometer: 70790,
          technicians: [
            {alias: 'MC', id: 34567, name: 'Mirro Clodd'},
            {alias: 'FS', id: 13443, name: 'Fredd Smith'}
          ],
          serviceAdvisor: {alias: 'EM', id: 23490, name: 'Emmanuel Macron'}
        },
        {
          num: 346,
          status: 'Done',
          startsAt: '10 AM, Dec 21',
          endsAt: '11 AM, Dec 23',
          currentOdometer: 70790,
          technicians: [
            {alias: 'EF', id: 23483, name: 'Enzo Ferrari'},
            {alias: 'FS', id: 13443, name: 'Fredd Smith'}
          ],
          serviceAdvisor: {alias: 'EM', id: 23490, name: 'Emmanuel Macron'}
        }
      ]
    }
  },
  computed: {
    ...mapState({
      vehicle: s => s.company.vehicles.vehicle
    }),
    customFields() {
      if (!this.vehicle?.customFields) return false
      return Object.entries(this.vehicle?.customFields).map(([key, value]) => ({key, value}))
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
