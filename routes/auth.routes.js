const { verifySignUp } = require('../middleware')
const controller = require('../controllers/auth.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })
  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateRegistration,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  )
  app.post('/api/auth/signin', controller.signin)
  app.post('/api/auth/update',
    [
      verifySignUp.checkDuplicateUpdate,
      verifySignUp.checkRolesExisted
    ],
    controller.update)
  app.post('/api/auth/removeNotification', controller.removeNotification)
  app.post('/api/auth/addNewNotification', controller.addNewNotification)
  app.post('/api/auth/editNotification', controller.editNotification)
}
