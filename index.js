let _global

if (typeof self !== 'undefined') {
  _global = self
} else if (typeof window !== 'undefined') {
  _global = window
} else if (typeof global !== 'undefined') {
  _global = global
} else {
  _global = Function('return this')()
}

const nativePromise = _global.Promise

if (process.env.NODE_ENV === 'production') {
  console.error('I warned you not to use this in production')
}

globalThis.Promise = new Proxy(nativePromise, {
  construct(...args) {
    const promise = Reflect.construct(...args)
    const proxy = new Proxy(promise, {
      get: function(target, prop) {
        const value = Reflect.get(target, prop)
        if (prop === 'then') {
          proxy.awaited = true
        }
        return typeof value == 'function' ? value.bind(target) : value
      }
    })
    proxy.awaited = false
    const stack = new Error().stack
      .split('\n')
      .slice(2)
      .join('\n')
    setTimeout(() => {
      if (proxy.awaited === false) {
        console.warn('You may have forgotten to await a promise')
        console.warn(stack)
      }
    }, 0)
    return proxy
  }
})
