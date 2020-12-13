const HookEmitter = require('./HookEmitter')

module.exports = {
  createEmitter (target) {
    return new HookEmitter(target)
  },
}
