<template>
  <div class="status__wrapper">
    <div class="status__header">
      <div class="status__header-title">
        <Label icon="i-fiber_smart_record" circle size="large" class="status__header-label" />
        <span v-if="isNew">Add Substatus</span>
        <span v-else>Update Substatus</span>
      </div>
      <div class="status__header-buttons">
        <Button label="Cancel" border @click="$router.back()" />
        <Button label="Save" @click="save" :loading="isLoading" />
      </div>
    </div>
    <div class="status__inner">
      <div class="status__subheader">
        <i class="status__subheader-icon" :class="{[status.icon]: status.icon}" :style="{color}" />
        <div class="status__subheader-title">{{ status.name }}</div>
        <div class="status__subheader-subtitle">{{ status.description }}</div>
      </div>
      <div class="status__main">
        <div class="status__color">
          <div class="status__color-title">Color:</div>
          <Colors v-model="color" :list="colorsList" />
        </div>

        <Input
          v-model="name"
          title="Substatus Name"
          placeholder="Substatus Name"
          :error="v$.name.$error || errorName"
          :errorMessage="errorName"
          @input="errorName = null"
        />
        <Textarea v-model="description" title="Description" placeholder="Description" :error="v$.description.$error" />
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Label from '@/components/Yaro/Label'
import Button from '@/components/Yaro/Button'
import Colors from '@/components/Yaro/Colors'
import Input from '@/components/Yaro/Input'
import Textarea from '@/components/Yaro/Textarea'
import useVuelidate from '@vuelidate/core'
import {required} from '@vuelidate/validators'

export default {
  name: 'CompanySettingsStatusPage',
  components: {Button, Label, Colors, Input, Textarea},
  data() {
    return {
      v$: useVuelidate(),
      isLoading: false,
      colorsList: ['#FFC2BE', '#EA6057', '#FA3225', '#FFBEE5', '#FE7CCA', '#FF4CB8', '#BA8AE7'],
      status: {},
      color: null,
      name: null,
      description: null,
      errorName: null,
      isNew: this.$route.params.id === 'new'
    }
  },
  async created() {
    const statusUID = this.$route.params.id
    if (statusUID === 'new') {
      const status = this.$route.query.status
      this.status = this.statuses.find(s => s.status === status)
      this.color = this.colorsList[0]
    } else {
      if (!this.localStatus.uid) {
        try {
          this.isLoading = true
          await this.find(statusUID)
        } finally {
          this.isLoading = false
        }
      }

      const {logicalStatus: status, color, name, description} = this.localStatus
      this.status = this.statuses.find(s => s.status === status)

      this.color = color
      this.name = name
      this.description = description
    }
  },
  computed: {
    ...mapState({
      statuses: s => s.workOrder.status.logicalStatuses,
      localStatus: s => s.workOrder.status.status
    })
  },
  methods: {
    ...mapActions({
      find: 'workOrder/status/find',
      create: 'workOrder/status/create',
      update: 'workOrder/status/update'
    }),
    async save() {
      if (this.isLoading) return
      const result = await this.v$.$validate()
      if (!result) return
      const {name, description, color} = this
      const logicalStatus = this.status.status
      const status = {
        name,
        description,
        color,
        logicalStatus,
        isGroupDefault: false
      }
      try {
        this.isLoading = true
        if (this.localStatus.uid) {
          await this.update({status, uid: this.localStatus.uid})
        } else {
          await this.create(status)
        }
        this.$router.back()
      } catch (err) {
        const errors = err.response.data.details
        const errorName = errors.find(err => err.field === 'name')
        this.errorName = errorName.message
      } finally {
        this.isLoading = false
      }
    }
  },
  validations() {
    return {
      name: {required},
      description: {required},
      color: {required}
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
