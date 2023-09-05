module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'taskwise',
    },
    migrations: {
      directory: '../migrations',
    },
  },
};
