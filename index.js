var LRU = require("lru-cache")
  , options = { max: 500
              , length: function (n) { return n * 2 }
              , dispose: function (key, n) { n.close() }
              , maxAge: 1000 * 60 * 60 }
  , cache = LRU(options)

module.exports = function (ee) {
  console.log(ee)
  ee.on('jwt', function (event) {
    if (event.verb === 'set') {
      // set key
      cache.set(event.object.id, event.object.meta)
      ee.emit('send', {
        to: event.from,
        from: 'jwt',
        subject: 'cached',
        verb: 'response',
        object: { id: event.object.id },
        date: (new Date()).toISOString()
      })
      return
    }
    if (event.verb === 'get') {
      // get key
      var meta = cache.get(event.object.id)
      ee.emit('send', {
        to: event.from,
        from: 'jwt',
        subject: 'cache',
        verb: 'response',
        object: { id: event.object.id, meta: meta },
        date: (new Date()).toISOString()
      })
      return
    }
  })

}
