module.exports = {
  
  development: {
    client: 'sqlite3',
    connection: { filename: './database/auth.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
 
    test: {
     client:'sqlite3',
     connection:{
      filename: './database/authTest.db3'
     },
     useNullAsDefault:true,
     migrations: {
      directory: './database/migrations',
         },
  },

  pool:{
    afterCreate: (conn, done) => {
      //runs after a conection is made to the sqlite engine
      conn.run("PRAGMA foreign_keys = ON", done); //turn 
    }
  },
};
