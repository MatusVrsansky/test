module.exports = {
    HOST: "sql.freedb.tech",
    USER: "freedb_matus",
    PASSWORD: "xZVCxX6EwN!h28v",
    DB: "freedb_weatherstation",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };