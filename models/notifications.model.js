module.exports = (sequelize, Sequelize) => {
  const Notifications = sequelize.define('notifications', {
    user_id: {
      type: Sequelize.INTEGER
    },
    notification_type: {
      type: Sequelize.STRING
    },
    temperature_notification: {
      type: Sequelize.INTEGER
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
    wind_speed_notification: {
      type: Sequelize.INTEGER
    },
    other_notification: {
      type: Sequelize.STRING
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
      } */
  },
  { timestamps: false }
  )
  return Notifications
}
