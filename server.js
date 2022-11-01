require('dotenv').config()
const express = require('express')
const config = require('./config')
const scheduler = require('./scheduler')
const app = express()
const cors = require('cors')
const http = require('http').createServer(app)
const angularPath = 'dist/angular13-jwt-auth'

// set the static path
app.use(express.static(angularPath))
app.set('view engine', 'pug')

// cors
app.use(
  cors({
    origin: [
      '*'
    ],
    credentials: true
  })
)

// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// synchronize models
const db = require('./models')
const Role = db.role
db.sequelize.sync()
Role.findOrCreate({
  where: { id: 1, name: 'user' }
})
Role.findOrCreate({
  where: { id: 2, name: 'moderator' }
})
Role.findOrCreate({
  where: { id: 3, name: 'admin' }
})

// run cron
scheduler.initCrons(config)

// api routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

// angular spa route
app.get('/*', (req, res) => {
  res.sendFile(`${angularPath}/index.html`, { root: __dirname })
})

// listener
http.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running at port: ${process.env.PORT || 3000}`)
})
