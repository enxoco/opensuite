'use strict'

/*
|--------------------------------------------------------------------------
| Redis Configuaration
|--------------------------------------------------------------------------
|
| Here we define the configuration for redis server. A single application
| can make use of multiple redis connections using the redis provider.
|
*/

const Env = use('Env')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | connection
  |--------------------------------------------------------------------------
  |
  | Redis connection to be used by default.
  |
  */
  connection: Env.get('REDIS_CONNECTION', 'local'),

  /*
  |--------------------------------------------------------------------------
  | local connection config
  |--------------------------------------------------------------------------
  |
  | Configuration for a named connection.
  |
  */
  local: {
    host: 'ec2-54-221-197-13.compute-1.amazonaws.com',
    port: 7739,
    password: 'p64e4331fbcf857735866db57fd1a92ae95e92a351bf20e979f35c49848c4aeed',
    db: 0,
    keyPrefix: ''
  },

  /*
  |--------------------------------------------------------------------------
  | cluster config
  |--------------------------------------------------------------------------
  |
  | Below is the configuration for the redis cluster.
  |
  */
  cluster: {
    clusters: [{
      host: '127.0.0.1',
      port: 6379,
      password: null,
      db: 0
    },
    {
      host: '127.0.0.1',
      port: 6380,
      password: null,
      db: 0
    }]
  }
}
