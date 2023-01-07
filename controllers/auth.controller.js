const db = require("../models");
const config = require("../config/auth.config");
const { refreshToken: RefreshToken } = db;

const User = db.user;
const Role = db.role;
const Notifications = db.notifications;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



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
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.update = (req, res) => {


  // Update User in database
  const User = db.user;

  const objectToUpdate = {
    phone_number: req.body.phone_number
  }


  User.update(objectToUpdate, { where: { id: req.body.id}})

 // res.send({ message: "User was updated successfully!" });

  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
   
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    
    var authorities = [];
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      res.send({
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        phone_number: req.body.phone_number,
        roles: authorities,
        accessToken: token
      });
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });

 
        
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "meno používateľa neexistuje!" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "zadali ste zlé heslo!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];

      Notifications.findAll({
        where: {
          user_id: user.id 
        }
      }).then(notifications => {
        user_notifications = JSON.stringify(notifications, null, 2);
        user_notifications = JSON.parse(user_notifications)
        console.log(typeof(user_notifications));
      }),


      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          phone_number: user.phone_number,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
};
