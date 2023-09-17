module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "aws.connect.psdb.cloud",
      user: "k3zbuh59hlz6zwhg60sb",
      password: "pscale_pw_dP99i0F9T5ViRK3UVKQtvXJ5Aj37rpuGoKoCWnc7gXr",
      database: "taskwise",
      ssl: {
        rejectUnauthorized: true,
      },
    },
    migrations: {
      directory: "../migrations",
    },
  },
  production: {
    client: "mysql",
    connection: {
      host: "aws.connect.psdb.cloud",
      user: "k3zbuh59hlz6zwhg60sb",
      password: "pscale_pw_dP99i0F9T5ViRK3UVKQtvXJ5Aj37rpuGoKoCWnc7gXr",
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
