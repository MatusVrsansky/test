module.exports = (sequelize, Sequelize) => {
    const Notifications = sequelize.define("notifications", {
      user_id: {
        type: Sequelize.INTEGER
      },
      notification_type: {
        type: Sequelize.STRING
      },
      text_notification: {
        type: Sequelize.STRING
      },
      active_notification: {
        type: Sequelize.INTEGER
      },
      description_notification: {
        type: Sequelize.STRING 
      },
      temperature_notification: {
        type: Sequelize.INTEGER
      },
      wind_speed_notification: {
        type: Sequelize.INTEGER
      },
      rain_gauge_notification: {
        type: Sequelize.INTEGER
      },
      wind_direction_notification: {
        type: Sequelize.STRING
      },
      humidity_notification: {
        type: Sequelize.INTEGER
      },
      pressure_notification: {
        type: Sequelize.INTEGER
      },
      soil_temperature_notification: {
        type: Sequelize.INTEGER
      },
      soil_mosture_notification: {
        type: Sequelize.INTEGER
      },
      temperature_windSpeed_operator: {
        type: Sequelize.STRING 
      },
      notification_sent: {
        type: Sequelize.BOOLEAN
      }
     /* created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }*/
    },
    {timestamps: false}
    );
    return Notifications;
  };