module.exports = {
  "development": {
    "dialect": "postgres",
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PWD,
    "database": process.env.POSTGRES_DB,
    "host": process.env.POSTGRES_HOST
  },
  "staging": {
    "dialect": "postgres",
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PWD,
    "database": process.env.POSTGRES_DB,
    "host": process.env.POSTGRES_HOST
  }
}
