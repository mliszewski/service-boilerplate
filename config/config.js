module.exports = {
  "development": {
    "dialect": "postgres",
    "username": "docker",
    "password": "docker",
    "database": "docker",
    "host": "db"
  },
  "staging": {
    "dialect": "postgres",
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PWD,
    "database": process.env.POSTGRES_DB,
    "host": process.env.POSTGRES_HOST
  }
}