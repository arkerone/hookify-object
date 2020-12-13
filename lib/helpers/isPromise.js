module.exports = (promise) => {
  return !!promise && typeof promise.then === 'function'
}
