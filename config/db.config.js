module.exports = {
  HOST: "localhost",
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  PORT: process.env.PORT,
  DB: process.env.DB,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
