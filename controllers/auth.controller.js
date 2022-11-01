const db = require('../models')
const config = require('../config/auth.config')
const User = db.user
const Role = db.role
const Notifications = db.notifications
const Op = db.Sequelize.Op
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phone_number: req.body.phone_number
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: 'User was registered successfully!' })
          })
        })
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: 'User was registered successfully!' })
        })
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.update = (req, res) => {
  // Update User in database
  const User = db.user

  const objectToUpdate = {
    phone_number: req.body.phone_number
  }

  User.update(objectToUpdate, { where: { id: req.body.id } })

  // res.send({ message: "User was updated successfully!" });

  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      })

      const authorities = []
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase())
        }
        res.send({
          id: req.body.id,
          username: req.body.username,
          email: req.body.email,
          phone_number: req.body.phone_number,
          roles: authorities,
          accessToken: token
        })
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.removeNotification = (req, res) => {
  console.log('remove Notification')
  console.log(req.body.notificationId)

  Notifications.destroy({
    where: {
      id: req.body.notificationId
    }
  }).then(() => {
    User.findOne({
      where: {
        id: req.body.userId
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: 'User Not found.' })
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        })

        const authorities = []
        
        Notifications.findAll({
          where: {
            user_id: user.id
          }
        }).then(notifications => {
          const userNotifications = JSON.stringify(notifications, null, 2)
          console.log(userNotifications);

        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push('ROLE_' + roles[i].name.toUpperCase())
          }
          res.send({
            id: user.id,
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            roles: authorities,
            user_notifications: JSON.parse(userNotifications),
            accessToken: token
          })
        })
      })
          .catch(err => {
            res.status(500).send({ message: err.message })
          })
      })
  })
}

exports.addNewNotification = (req, res) => {
  console.log('addNewnotification, juhuu')
  console.log('Notification type: ' + req.body.notificationType)
  console.log('Operator: ' + req.body.temperatureWindSpeedOperator)
  console.log('Windspeed notification: ' + req.body.windSpeedNotification)
  console.log('Other notification: ' + req.body.otherNotification)
  console.log('Description notification: ' + req.body.descriptionNotification)

  switch (req.body.notificationType) {
    case 'smer_vetra':
    case 'uroven_svetla':
    case 'vlhost_pody':
    case 'vlhkost':
    case 'tlak':
    case 'dazdometer': req.body.temperatureWindSpeedOperator = null; break
    default: break
  }

  Notifications.create({
    user_id: req.body.currentLoggedUserId,
    notification_type: req.body.notificationType,
    description_notification: req.body.descriptionNotification,
    temperature_notification: req.body.temperatureNotification,
    wind_speed_notification: req.body.windSpeedNotification,
    other_notification: req.body.otherNotification,
    text_notification: req.body.textNotification,
    active_notification: req.body.activeNotification,
    temperature_windSpeed_operator: req.body.temperatureWindSpeedOperator
  }).then(() => {
    User.findOne({
      where: {
        id: req.body.currentLoggedUserId
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: 'User Not found.' })
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        })

        
        const authorities = []
        
        Notifications.findAll({
          where: {
            user_id: user.id
          }
        }).then(notifications => {
          const userNotifications = JSON.stringify(notifications, null, 2)
          console.log(userNotifications);

        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push('ROLE_' + roles[i].name.toUpperCase())
          }
          res.send({
            id: user.id,
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            roles: authorities,
            user_notifications: JSON.parse(userNotifications),
            accessToken: token
          })
        })
      })
          .catch(err => {
            res.status(500).send({ message: err.message })
          })
      })
  })
}

exports.editNotification = (req, res) => {
  switch (req.body.notificationType) {
    case 'smer_vetra':
    case 'uroven_svetla':
    case 'vlhost_pody':
    case 'vlhkost':
    case 'tlak':
    case 'dazdometer': req.body.temperatureWindSpeedOperator = null; break
    default: break
  }

  const updateQuery = {
    temperature_notification: req.body.temperatureNotification,
    text_notification: req.body.textNotification,
    active_notification: req.body.activeNotification,
    temperature_windSpeed_operator: req.body.temperatureWindSpeedOperator,
    wind_speed_notification: req.body.windSpeedNotification,
    other_notification: req.body.otherNotification,
    description_notification: req.body.descriptionNotification
  }

  Notifications.update(updateQuery, { where: { id: req.body.notificationId } })
    .then(result => {
      User.findOne({
        where: {
          id: req.body.currentLoggedUserId
        }
      })
        .then(user => {
          if (!user) {
            return res.status(404).send({ message: 'User Not found.' })
          }

          const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          })

          const authorities = []
          
          Notifications.findAll({
            where: {
              user_id: user.id
            }
          }).then(notifications => {
            const userNotifications = JSON.stringify(notifications, null, 2)
            console.log(userNotifications);

          user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push('ROLE_' + roles[i].name.toUpperCase())
            }
            res.send({
              id: user.id,
              username: user.username,
              email: user.email,
              phone_number: user.phone_number,
              roles: authorities,
              user_notifications: JSON.parse(userNotifications),
              accessToken: token
            })
          })
        })
            .catch(err => {
              res.status(500).send({ message: err.message })
            })
        })
    })
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Meno používateľa neexistuje!' })
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Zadali ste zlé heslo!'
        })
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      })

      const authorities = []

      
      Notifications.findAll({
        where: {
          user_id: user.id
        }
      }).then(notifications => {
        const userNotifications = JSON.stringify(notifications, null, 2)
        console.log(userNotifications);
        
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push('ROLE_' + roles[i].name.toUpperCase())
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            roles: authorities,
            accessToken: token,
            user_notifications: JSON.parse(userNotifications)
          })
        })
      })

     
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}
