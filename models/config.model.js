module.exports = (sequelize, Sequelize) => {
    const Config = sequelize.define("config", {
      name: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      }
    },
    {timestamps: false}
    );
    return Config;
  };