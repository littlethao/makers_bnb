module.exports = {

  test: {
    client: 'pg',
    connection: 'postgres://localhost/bnb_test',
    migrations: {
      directory: __dirname + '/db/migrations'
    }
  },

  development: {
    client: 'pg',
    connection: 'postgres://localhost/bnb_development',
    migrations: {
      directory: __dirname + '/db/migrations'
      }
    },

    production: {
      client: 'pg',
      connection: 'postgres://localhost/bnb_production',
      migrations: {
        directory: __dirname + '/db/migrations'
      }
    },
  };
