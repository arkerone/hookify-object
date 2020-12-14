const chai = require('chai')
const hooks = require('../../lib/hooks')
const HookEmitter = require('../../lib/hooks/HookEmitter')

describe('hooks', () => {
  describe('createEmitter', () => {
    it('Should create a new HookEmitter with a "target" property', () => {
      const target = {}
      const hookEmitter = hooks.createEmitter(target)
      chai.expect(hookEmitter).to.be.an.instanceOf(HookEmitter)
      chai.expect(hookEmitter.target).not.to.be.null
      chai.expect(hookEmitter.target).to.be.deep.equal(target)
    })
  })
})
