const db = require('../models')
const ROLES = db.ROLES
const User = db.user
const checkDuplicateRegistration = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: 'Používateľské meno sa už používa!'
      })
      return
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: 'Email sa už používa!'
        })
        return
      }

      // next();

      // Phone
      User.findOne({
        where: {
          phone_number: req.body.phone_number
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: 'Telefónne číslo sa už používa!'
          })
          return
        }
        next()
      })
    })
  })
}

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: 'Failed! Role does not exist = ' + req.body.roles[i]
        })
        return
      }
    }
  }

  next()
}

const checkDuplicateUpdate = (req, res, next) => {
  // Username

  // next();

  // Phone
  User.findOne({
    where: {
      phone_number: req.body.phone_number
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: 'Telefónne číslo sa už používa!'
      })
      return
    }
    next()
  })
}

const verifySignUp = {
  checkDuplicateRegistration,
  checkDuplicateUpdate,
  checkRolesExisted
}
module.exports = verifySignUp
