# JWT Service

The JWT Service is a simple service that maintains a 
cache of a secret token and some metadata. Once a user
is authenticated, you can create a JWT and add the users
identification information in this service. Then other
services can request it when they need it. This can enable
applets and mobile applications to access your system without
having to have session cookies, but still be secure. The token
is only good x amount of time since the last get, you can 
configure but the default is 2 minutes.

This is a palmetto flow component and you can setup different
adapters to be used.

## API

set JWT token

```
ee.emit('send', { 
  to: 'jwt', 
  from: '1234',
  subject: 'jwt',
  verb: 'set',
  object: {
    id: uuid.v4(),
    meta: {
      username: 'twilson63',
      roles: ['admin']
    }
  }
})
```

get JWT token
```
ee.once()

ee.emit('send', {
  to: 'jwt',
  from: '5678',
  subject: 'jwt',
  verb: 'get',
  object: {
    id: '8989989',
  }
})
```
