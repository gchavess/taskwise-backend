module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "aws.connect.psdb.cloud",
      user: "q8ww68jyh1iobhtg1tul",
      password: "pscale_pw_SUaxbEaTgi6UGfAGwTlxXUyIBuWHfaGR2vl9DDE2LrN",
      database: "taskwise",
      ssl: {
        rejectUnauthorized: true,
      },
    },
    migrations: {
      directory: "../migrations",
    },
  },
};
