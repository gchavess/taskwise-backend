module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "aws.connect.psdb.cloud",
      user: "9lm6v6x0ikna7pdwwnpu",
      password: "pscale_pw_U4bCNN7tRMZoFIH9ETvZKosbMhWp52PV4tdNLCgecMJ",
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
