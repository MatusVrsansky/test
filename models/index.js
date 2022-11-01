const config = require('../config/db.config.js')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    // operatorsAliases: false,
    operatorsAliases: 0,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
)
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

// prevent Sequelize from outputting SQL to the console on execution of query
db.sequelize.options.logging = false

db.user = require('../models/user.model.js')(sequelize, Sequelize)
db.role = require('../models/role.model.js')(sequelize, Sequelize)
db.notifications = require('../models/notifications.model.js')(sequelize, Sequelize)
db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId'
})
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId'
})
db.ROLES = ['user', 'admin', 'moderator']
module.exports = db
