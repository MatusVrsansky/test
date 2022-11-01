module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    /* temperature_notification: {
        type: Sequelize.STRING
      },
      text_notification: {
        type: Sequelize.STRING
      },
      temperature_operator: {
        type: Sequelize.STRING
      }, */
    phone_number: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
    /* active_notification: {
        type: Boolean
      } */
  })
  return User
}
