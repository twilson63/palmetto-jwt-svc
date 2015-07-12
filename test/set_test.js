var test = require('tap').test
var EventEmitter = require('events').EventEmitter
var ee = new EventEmitter()
var uuid = require('uuid')

require('../')(ee)

test('set a cache item', function (t) {
  var uid = uuid.v4()
  var cid = uuid.v4()
  ee.once('data', function (event) {
    t.equals(event.object.id, cid)
    t.end()
  })

  ee.emit('jwt', {
    to: 'jwt',
    from: uid,
    subject: 'jwt',
    verb: 'set',
    object: {
      id: cid,
      meta: {
        beep: 'boop',
        username: 'twilson63',
        roles: ['admin']
      }
    },
    date: (new Date()).toISOString()
  })
})
