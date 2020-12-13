const EventEmitter = require('events')
const { isPromise } = require('./utils')

module.exports = (obj) => {
  obj.hooks = new EventEmitter()
  return new Proxy(obj, {
    get (target, property, receiver) {

      const targetValue = Reflect.get(target, property, receiver)
      if (typeof targetValue !== 'function') {
        return targetValue
      }

      const hooks = Reflect.get(target, 'hooks', receiver)

      return function (...args) {
        hooks.emit('beforeCall', property, ...args)
        hooks.emit(`beforeCall:${property}`, property, ...args)

        const result = targetValue.apply(receiver, args)

        if (isPromise(result)) {
          result.then((...promiseResult) => {
            hooks.emit('onResolve', property, ...promiseResult)
            hooks.emit(`onResolve:${property}`, ...promiseResult)
          }).catch((...errors) => {
            hooks.emit('onReject', property, ...errors)
            hooks.emit(`onReject:${property}`, ...errors)
          })
        }

        hooks.emit('afterCall', property, result, ...args)
        hooks.emit(`afterCall:${property}`, result, ...args)

        return result
      }
    },
    set (target, property, value, receiver) {
      const hooks = Reflect.get(target, 'hooks', receiver)

      hooks.emit('beforeSet', property, value)
      hooks.emit(`beforeSet:${property}`, value)

      let isSuccess = Reflect.set(target, property, value, receiver)

      hooks.emit('afterSet', property, value, isSuccess)
      hooks.emit(`afterSet:${property}`, value, isSuccess)

      return isSuccess
    },
    deleteProperty (target, property) {
      const hooks = Reflect.get(target, 'hooks')

      hooks.emit('beforeDelete', property)
      hooks.emit(`beforeDelete:${property}`)

      let isSuccess = Reflect.deleteProperty(target, property)

      hooks.emit('afterDelete', property, isSuccess)
      hooks.emit(`afterDelete:${property}`, isSuccess)

      return isSuccess
    },
  })
}
