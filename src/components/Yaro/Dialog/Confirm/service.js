import ConfirmationEventBus from './eventBus'

const YaroConfirmSymbol = Symbol()

const ConfirmationService = {
  install: app => {
    const ConfirmationService = {
      require: options => {
        ConfirmationEventBus.emit('confirm', options)
      },
      close: () => {
        ConfirmationEventBus.emit('close')
      }
    }
    app.config.globalProperties.$confirm = ConfirmationService
    app.provide(YaroConfirmSymbol, ConfirmationService)
  }
}

export default ConfirmationService
