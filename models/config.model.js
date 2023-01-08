module.exports = (sequelize, Sequelize) => {
    const Config = sequelize.define("config", {
      name: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.INTEGER
      }
    },
    {timestamps: false}
    );
    return Config;
  };