<template>
  <Dialog v-model:visible="visible" :dismissableMask="!isLoading" :position="position" class="y-dialog--confirmation">
    <div class="block__wrap">
      <i :class="iconClass" />
      <div class="block__title">{{ title }}</div>
      <div class="block__subtitle">{{ message }}</div>
      <div v-if="type !== 'simple'" :class="buttonsClass">
        <Button
          v-bind="acceptAttrs"
          :class="acceptClass"
          :label="acceptLabel"
          :icon="acceptIcon"
          :loading="isLoading"
          :autofocus="autoFocusAccept"
          @click="accept"
        />
        <Button
          v-if="type !== 'button'"
          v-bind="rejectAttrs"
          :class="rejectClass"
          :label="rejectLabel"
          :icon="rejectIcon"
          :autofocus="autoFocusReject"
          @click="reject"
        />
      </div>
    </div>
  </Dialog>
</template>

<script>
import ConfirmationEventBus from './eventBus'
import Dialog from '../../Dialog'
import Button from '../../Button'

export default {
  name: 'ConfirmDialog',
  components: {Dialog, Button},
  confirmListener: null,
  closeListener: null,
  data() {
    return {
      visible: false,
      confirmation: null,
      isLoading: false
    }
  },
  mounted() {
    this.confirmListener = options => {
      if (!options) return
      this.confirmation = options
      this.visible = true
    }
    this.closeListener = () => {
      this.visible = false
      this.confirmation = null
    }
    ConfirmationEventBus.on('confirm', this.confirmListener)
    ConfirmationEventBus.on('close', this.closeListener)
  },
  beforeUnmount() {
    ConfirmationEventBus.off('confirm', this.confirmListener)
    ConfirmationEventBus.off('close', this.closeListener)
  },
  methods: {
    async accept() {
      if (this.confirmation.accept) {
        try {
          this.isLoading = true
          await this.confirmation.accept()
          this.visible = false
        } finally {
          this.isLoading = false
        }
      } else {
        this.visible = false
      }
    },
    reject() {
      if (this.confirmation.reject) {
        this.confirmation.reject()
      }
      this.visible = false
    }
  },
  computed: {
    title() {
      return this.confirmation ? this.confirmation.title : null
    }, // Tittle of the confirmation.
    message() {
      return this.confirmation ? this.confirmation.message : null
    }, // Message of the confirmation.
    position() {
      return this.confirmation ? this.confirmation.position : null
    }, // Position of the dialog, options are "center", "top", "bottom", "left", "right", "topleft", "topright", "bottomleft" or "bottomright".
    iconClass() {
      return ['block__icon', this.confirmation ? this.confirmation.icon : null]
    }, // Icon to display next to the message.
    acceptLabel() {
      return this.confirmation ? this.confirmation.acceptLabel || this.$yaro.config.locale.accept : null
    }, // Label of the accept button. Defaults to Yaro Locale configuration.
    rejectLabel() {
      return this.confirmation ? this.confirmation.rejectLabel || this.$yaro.config.locale.reject : null
    }, // Label of the reject button. Defaults to Yaro Locale configuration.
    acceptIcon() {
      return this.confirmation ? this.confirmation.acceptIcon : null
    }, // Icon of the accept button.
    rejectIcon() {
      return this.confirmation ? this.confirmation.rejectIcon : null
    }, // Icon of the reject button.
    acceptClass() {
      return [this.confirmation ? this.confirmation.acceptClass : null]
    }, // Style class of the accept button.
    rejectClass() {
      return [this.confirmation ? this.confirmation.rejectClass : null]
    }, // Style class of the reject button.
    acceptAttrs() {
      return this.confirmation ? this.confirmation.acceptAttrs || {red: true, size: 'large'} : null
    }, // Attributes of the accept button.
    rejectAttrs() {
      return this.confirmation ? this.confirmation.rejectAttrs || {border: true, size: 'large'} : null
    }, // Attributes of the reject button.
    autoFocusAccept() {
      return this.confirmation.defaultFocus === undefined || this.confirmation.defaultFocus === 'accept' ? true : false
    }, // Adding autofocus of the accept button. It the initial focus target when dialog gets shown.
    autoFocusReject() {
      return this.confirmation.defaultFocus === 'reject' ? true : false
    }, // Adding autofocus of the reject button. It the initial focus target when dialog gets shown.
    type() {
      return this.confirmation && this.confirmation.type ? this.confirmation.type : null
    }, // Type of dialog.  simple / button / buttons / vertical-buttons
    buttonsClass() {
      return {
        block__buttons: true,
        'block__buttons--vertical': this.type === 'verticalButtons'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
