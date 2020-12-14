const hooks = require('./hooks')
const util = require('util')

module.exports = (obj) => {
  const hookEmitter = hooks.createEmitter(obj)

  const proxy = new Proxy(obj, {
    get (target, property, receiver) {
      const targetValue = Reflect.get(target, property, receiver)
      if (typeof targetValue !== 'function') {
        return targetValue
      }

      return function (...params) {
        hookEmitter.emitBeforeCall(property, params)
        const result = targetValue.apply(receiver, params)
        hookEmitter.emitAfterCall(property, params, result)

        if (util.types.isPromise(result)) {
          result.then((...promiseResult) => {
            hookEmitter.emitAfterResolve(property, params, result,
              promiseResult)
          }).catch((...errors) => {
            hookEmitter.emitAfterReject(property, params, result, errors)
          })
        }

        return result
      }
    },
    set (target, property, value, receiver) {
      hookEmitter.emitBeforeSet(property, value)
      let isSuccess = Reflect.set(target, property, value, receiver)
      hookEmitter.emitAfterSet(property, value)

      return isSuccess
    },
    deleteProperty (target, property) {
      hookEmitter.emitBeforeDelete(property)
      let isSuccess = Reflect.deleteProperty(target, property)
      hookEmitter.emitAfterDelete(property)

      return isSuccess
    },
  })

  Object.defineProperty(proxy, 'hooks', {
    value: hookEmitter,
  })

  return proxy
}
