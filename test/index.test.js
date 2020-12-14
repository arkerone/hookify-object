const util = require('util')
const chai = require('chai')
const sinon = require('sinon')
const hookify = require('../lib')
const HookEmitter = require('../lib/hooks/HookEmitter')

describe('hookify', () => {
  const sandbox = sinon.createSandbox()
  const targetWithHooks = hookify({
    property: 'value',
    test () {
      return 'test'
    },
    async testAsync () {
      return 'test async'
    },
    async testAsyncFailed () {
      throw new Error('Failed !')
    },
  })

  beforeEach(function () {
    sandbox.spy(targetWithHooks.hooks)
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('Initialization', () => {
    it('When a non-object is passed in parameter, should throw an error',
      () => {

        chai.expect(() => hookify('string')).
          to.
          throw(TypeError).
          with.
          property('message',
            'Cannot create proxy with a non-object as target or handler')

        chai.expect(() => hookify()).
          to.
          throw(TypeError).
          with.
          property('message',
            'Cannot create proxy with a non-object as target or handler')

        chai.expect(() => hookify(null)).
          to.
          throw(TypeError).
          with.
          property('message',
            'Cannot create proxy with a non-object as target or handler')
      })

    it('When a object is passed in parameter, should return a Proxy',
      () => {
        const objWithHooks = hookify({})
        chai.expect(util.types.isProxy(objWithHooks)).to.be.true
      })

    it(
      'When a object is passed in parameter, should return a Proxy with a hooks property',
      () => {
        const objWithHooks = hookify({})
        chai.expect(objWithHooks).have.property('hooks')
        chai.expect(objWithHooks.hooks).to.be.an.instanceOf(HookEmitter)
      })
  })

  describe('When call a method', () => {

    it('Should call emitBeforeCall method', () => {
      const params = [1, 2, 3]
      targetWithHooks.test(...params)
      chai.expect(targetWithHooks.hooks.emitBeforeCall.calledOnce).to.be.true
      chai.expect(targetWithHooks.hooks.emitBeforeCall.calledWith('test',
        params)).to.be.true
    })

    it('Should call emitAfterCall method', () => {
      const params = [1, 2, 3]
      targetWithHooks.test(...params)
      chai.expect(targetWithHooks.hooks.emitAfterCall.calledOnce).to.be.true
      chai.expect(targetWithHooks.hooks.emitAfterCall.calledWith('test',
        params, 'test')).to.be.true
    })

    it('Should call emitAfterResolve method', () => {
      const params = [1, 2, 3]
      return targetWithHooks.testAsync(...params).then((...promiseResult) => {
        chai.expect(
          targetWithHooks.hooks.emitAfterResolve.calledOnce).to.be.true
        chai.expect(
          targetWithHooks.hooks.emitAfterResolve.calledWith('testAsync',
            params, promiseResult)).to.be.true
      })
    })

    it('Should call emitAfterReject method', () => {
      const params = [1, 2, 3]
      return targetWithHooks.testAsyncFailed(...params).catch((...errors) => {
        chai.expect(
          targetWithHooks.hooks.emitAfterReject.calledOnce).to.be.true
        chai.expect(
          targetWithHooks.hooks.emitAfterReject.calledWith('testAsyncFailed',
            params, errors)).to.be.true
      })
    })
  })

  describe('When set a property', () => {
    it('Should call emitBeforeSet method', () => {
      targetWithHooks.property = 'new value'
      chai.expect(targetWithHooks.hooks.emitBeforeSet.calledOnce).to.be.true
      chai.expect(targetWithHooks.hooks.emitBeforeSet.calledWith('property',
        'new value')).to.be.true
    })

    it('Should call emitAfterSet method', () => {
      targetWithHooks.property = 'new value'
      chai.expect(targetWithHooks.hooks.emitAfterSet.calledOnce).to.be.true
      chai.expect(targetWithHooks.hooks.emitAfterSet.calledWith('property',
        'new value')).to.be.true
    })
  })

  describe('When delete a property', () => {
    it('Should call emitBeforeDelete method', () => {
      targetWithHooks.newProperty = 'value'
      delete targetWithHooks.newProperty
      chai.expect(targetWithHooks.hooks.emitBeforeDelete.calledOnce).to.be.true
      chai.expect(targetWithHooks.hooks.emitBeforeDelete.calledWith(
        'newProperty')).to.be.true
    })

    it('Should call emitAfterDelete method', () => {
      targetWithHooks.newProperty = 'value'
      delete targetWithHooks.newProperty
      chai.expect(targetWithHooks.hooks.emitAfterDelete.calledOnce).to.be.true
      chai.expect(targetWithHooks.hooks.emitAfterDelete.calledWith(
        'newProperty')).to.be.true
    })
  })
})
