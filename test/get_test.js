var test = require('tap').test
var EventEmitter = require('events').EventEmitter
var ee = new EventEmitter()
var uuid = require('uuid')

require('../')(ee)

test('get a cache item', function (t) {
  var uid = uuid.v4()
  var cid = uuid.v4()
  var gid = uuid.v4()


  ee.once('send', function (event) {
    t.equals(event.object.id, cid)
    ee.once('send', testGet)
    ee.emit('jwt', {
      to: 'jwt',
      from: gid,
      subject: 'jwt',
      verb: 'get',
      object: {
        id: event.object.id
      },
      date: (new Date()).toISOString()
    })
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

  function testGet(event) {
    t.equals(event.object.meta.username, 'twilson63')
    t.end()
  }
})
