module.exports.isPromise = (promise) => {
  return !!promise && typeof promise.then === 'function'
}
