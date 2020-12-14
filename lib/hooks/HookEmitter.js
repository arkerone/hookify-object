const EventEmitter = require('events')

class HookEmitter extends EventEmitter {
  constructor (target) {
    super()
    this.target = target
  }

  emitBeforeCall (name, params) {
    const context = {
      self: this.target,
      name,
      params,
    }

    this.emit('beforeCall', context)
    this.emit(`beforeCall:${name}`, context)
  }

  emitAfterResolve (name, params, result) {
    const context = {
      self: this.target,
      name,
      params,
      result,
    }

    this.emit('afterResolve', context)
    this.emit(`afterResolve:${name}`, context)
  }

  emitAfterReject (name, params, errors) {
    const context = {
      self: this.target,
      name,
      params,
      errors,
    }

    this.emit('afterReject', context)
    this.emit(`afterReject:${name}`, context)
  }

  emitAfterCall (name, params, result) {
    const context = {
      self: this.target,
      name,
      params,
      result,
    }

    this.emit('afterCall', context)
    this.emit(`afterCall:${name}`, context)
  }

  emitBeforeSet (name, value) {
    const context = {
      self: this.target,
      name,
      value,
    }

    this.emit('beforeSet', context)
    this.emit(`beforeSet:${name}`, context)
  }

  emitAfterSet (name, value) {
    const context = {
      self: this.target,
      name,
      value,
    }

    this.emit('afterSet', context)
    this.emit(`afterSet:${name}`, context)
  }

  emitBeforeDelete (name) {
    const context = {
      self: this.target,
      name,
    }

    this.emit('beforeDelete', context)
    this.emit(`beforeDelete:${name}`, context)
  }

  emitAfterDelete (name) {
    const context = {
      self: this.target,
      name,
    }

    this.emit('afterDelete', context)
    this.emit(`afterDelete:${name}`, context)
  }
}

module.exports = HookEmitter
