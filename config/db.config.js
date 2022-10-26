module.exports = {
    HOST: "sql.freedb.tech",
    USER: "freedb_matus",
    PASSWORD: "xZVCxX6EwN!h28v",
    DB: "freedb_weatherstation",
    dialect: "mysql",
    pool: {
      max: 50000,
      min: 0,
      acquire: 300000,
      idle: 100000
    }
  };