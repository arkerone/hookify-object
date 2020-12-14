const sinon = require('sinon')
const HookEmitter = require('../../lib/hooks/HookEmitter')

describe('HookEmitter', () => {
  let hooksEmitter
  let target = {}
  before(() => {
    hooksEmitter = new HookEmitter({})
  })

  describe('emitBeforeCall', () => {
    it('Should emit "beforeCall" and "beforeCall:[method_name]" events', () => {
      const methodName = 'test'
      const params = [1, 2, 3]
      const beforeCallSpy = sinon.spy()
      const beforeCallWIthMethodNameSpy = sinon.spy()
      hooksEmitter.on('beforeCall', beforeCallSpy)
      hooksEmitter.on(`beforeCall:${methodName}`, beforeCallWIthMethodNameSpy)
      hooksEmitter.emitBeforeCall(methodName, params)

      const context = {
        self: target,
        name: methodName,
        params,
      }

      sinon.assert.calledOnce(beforeCallSpy)
      sinon.assert.calledWith(beforeCallSpy, context)

      sinon.assert.calledOnce(beforeCallWIthMethodNameSpy)
      sinon.assert.calledWith(beforeCallWIthMethodNameSpy, context)
    })
  })

  describe('emitAfterCall', () => {
    it('Should emit "afterCall" and "afterCall:[method_name]" events',
      () => {
        const methodName = 'test'
        const params = [1, 2, 3]
        const result = 'result'
        const afterCallSpy = sinon.spy()
        const afterCallWIthMethodNameSpy = sinon.spy()
        hooksEmitter.on('afterCall', afterCallSpy)
        hooksEmitter.on(`afterCall:${methodName}`,
          afterCallWIthMethodNameSpy)
        hooksEmitter.emitAfterCall(methodName, params, result)

        const context = {
          self: target,
          name: methodName,
          params,
          result,
        }

        sinon.assert.calledOnce(afterCallSpy)
        sinon.assert.calledWith(afterCallSpy, context)

        sinon.assert.calledOnce(afterCallWIthMethodNameSpy)
        sinon.assert.calledWith(afterCallWIthMethodNameSpy, context)
      })
  })

  describe('emitAfterResolve', () => {
    it('Should emit "afterResolve" and "afterResolve:[method_name]" events',
      () => {
        const methodName = 'test'
        const params = [1, 2, 3]
        const result = 'test'
        const afterResolveSpy = sinon.spy()
        const afterResolveWIthMethodNameSpy = sinon.spy()
        hooksEmitter.on('afterResolve', afterResolveSpy)
        hooksEmitter.on(`afterResolve:${methodName}`,
          afterResolveWIthMethodNameSpy)
        hooksEmitter.emitAfterResolve(methodName, params, result)

        const context = {
          self: target,
          name: methodName,
          params,
          result,
        }

        sinon.assert.calledOnce(afterResolveSpy)
        sinon.assert.calledWith(afterResolveSpy, context)

        sinon.assert.calledOnce(afterResolveWIthMethodNameSpy)
        sinon.assert.calledWith(afterResolveWIthMethodNameSpy, context)
      })
  })

  describe('emitAfterReject', () => {
    it('Should emit "afterReject" and "afterReject:[method_name]" events',
      () => {
        const methodName = 'test'
        const params = [1, 2, 3]
        const errors = [new Error('test')]
        const afterRejectSpy = sinon.spy()
        const afterRejectWIthMethodNameSpy = sinon.spy()
        hooksEmitter.on('afterReject', afterRejectSpy)
        hooksEmitter.on(`afterReject:${methodName}`,
          afterRejectWIthMethodNameSpy)
        hooksEmitter.emitAfterReject(methodName, params, errors)

        const context = {
          self: target,
          name: methodName,
          params,
          errors,
        }

        sinon.assert.calledOnce(afterRejectSpy)
        sinon.assert.calledWith(afterRejectSpy, context)

        sinon.assert.calledOnce(afterRejectWIthMethodNameSpy)
        sinon.assert.calledWith(afterRejectWIthMethodNameSpy, context)
      })
  })

  describe('emitBeforeSet', () => {
    it('Should emit "beforeSet" and "beforeSet:[property_name]" events',
      () => {
        const propertyName = 'test'
        const value = 'test'
        const beforeSetSpy = sinon.spy()
        const beforeSetWIthMethodNameSpy = sinon.spy()
        hooksEmitter.on('beforeSet', beforeSetSpy)
        hooksEmitter.on(`beforeSet:${propertyName}`,
          beforeSetWIthMethodNameSpy)
        hooksEmitter.emitBeforeSet(propertyName, value)

        const context = {
          self: target,
          name: propertyName,
          value,
        }

        sinon.assert.calledOnce(beforeSetSpy)
        sinon.assert.calledWith(beforeSetSpy, context)

        sinon.assert.calledOnce(beforeSetWIthMethodNameSpy)
        sinon.assert.calledWith(beforeSetWIthMethodNameSpy, context)
      })
  })

  describe('emitAfterSet', () => {
    it('Should emit "afterSet" and "afterSet:[property_name]" events',
      () => {
        const propertyName = 'test'
        const value = 'test'
        const afterSetSpy = sinon.spy()
        const afterSetWIthMethodNameSpy = sinon.spy()
        hooksEmitter.on('afterSet', afterSetSpy)
        hooksEmitter.on(`afterSet:${propertyName}`,
          afterSetWIthMethodNameSpy)
        hooksEmitter.emitAfterSet(propertyName, value)

        const context = {
          self: target,
          name: propertyName,
          value,
        }

        sinon.assert.calledOnce(afterSetSpy)
        sinon.assert.calledWith(afterSetSpy, context)

        sinon.assert.calledOnce(afterSetWIthMethodNameSpy)
        sinon.assert.calledWith(afterSetWIthMethodNameSpy, context)
      })
  })

  describe('emitBeforeDelete', () => {
    it('Should emit "beforeDelete" and "beforeDelete:[property_name]" events',
      () => {
        const propertyName = 'test'
        const beforeDeleteSpy = sinon.spy()
        const beforeDeleteWIthMethodNameSpy = sinon.spy()
        hooksEmitter.on('beforeDelete', beforeDeleteSpy)
        hooksEmitter.on(`beforeDelete:${propertyName}`,
          beforeDeleteWIthMethodNameSpy)
        hooksEmitter.emitBeforeDelete(propertyName)

        const context = {
          self: target,
          name: propertyName,
        }

        sinon.assert.calledOnce(beforeDeleteSpy)
        sinon.assert.calledWith(beforeDeleteSpy, context)

        sinon.assert.calledOnce(beforeDeleteWIthMethodNameSpy)
        sinon.assert.calledWith(beforeDeleteWIthMethodNameSpy, context)
      })
  })

  describe('emitAfterDelete', () => {
    it('Should emit "afterDelete" and "afterDelete:[property_name]" events',
      () => {
        const propertyName = 'test'
        const afterDeleteSpy = sinon.spy()
        const afterDeleteWIthMethodNameSpy = sinon.spy()
        hooksEmitter.on('afterDelete', afterDeleteSpy)
        hooksEmitter.on(`afterDelete:${propertyName}`,
          afterDeleteWIthMethodNameSpy)
        hooksEmitter.emitAfterDelete(propertyName)

        const context = {
          self: target,
          name: propertyName,
        }

        sinon.assert.calledOnce(afterDeleteSpy)
        sinon.assert.calledWith(afterDeleteSpy, context)

        sinon.assert.calledOnce(afterDeleteWIthMethodNameSpy)
        sinon.assert.calledWith(afterDeleteWIthMethodNameSpy, context)
      })
  })
})
