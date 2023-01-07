const db = require("../models");

const User = db.user;
const Role = db.role;
const Notifications = db.notifications;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
require('dotenv').config();



exports.addNewNotification = (req, res) => {   
  switch(req.body.notificationType) {
    case 'windDirection': req.body.compareOperator = null; break;
    default: req.body.windDirectionNotification = null; break;
  }

  Notifications.create({ 
    user_id: req.body.currentLoggedUserId,
    notification_type: req.body.notificationType,
    description_notification: req.body.descriptionNotification,
    temperature_notification: req.body.temperatureNotification,
    wind_speed_notification: req.body.windSpeedNotification,
    rain_gauge_notification: req.body.rainGaugeNotification,
    wind_direction_notification: req.body.windDirectionNotification,
    humidity_notification: req.body.humidityNotification,
    pressure_notification: req.body.pressureNotification,
    soil_temperature_notification: req.body.soilTemperatureNotification,
    soil_mosture_notification: req.body.soilMostureNotification,    
    text_notification: req.body.textNotification,
    active_notification: req.body.activeNotification,
    compare_operator: req.body.compareOperator
  }).then(test => {
      User.findOne({
        where: {
          id: req.body.currentLoggedUserId
        }
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
      
        // vratit ID novej notifikacie alebo objekt novej notifikaie
        Notifications.findAll({
          where: {
            user_id: user.id 
          }
        }).then(notifications => {
          user_notifications = JSON.stringify(notifications, null, 2);
          user_notifications = JSON.parse(user_notifications);
          res.status(200).send({
            user_notifications
          })
        })
    });
    });
    
}


exports.editNotification = (req, res) => {
  switch(req.body.notificationType) {
    case 'windDirection': req.body.compareOperator = null; break;
    default: req.body.windDirectionNotification = null; break;
  }
  
  Notifications.update(
    {
      temperature_notification: req.body.temperatureNotification,
      text_notification: req.body.textNotification,
      active_notification: req.body.activeNotification,
      wind_speed_notification: req.body.windSpeedNotification,
      rain_gauge_notification: req.body.rainGaugeNotification,
      wind_direction_notification: req.body.windDirectionNotification,
      humidity_notification: req.body.humidityNotification,
      pressure_notification: req.body.pressureNotification,
      soil_temperature_notification: req.body.soilTemperatureNotification,
      soil_mosture_notification: req.body.soilMostureNotification,
      compare_operator: req.body.compareOperator,
      description_notification: req.body.descriptionNotification
    }, 
    { where: {id: req.body.notificationId},
    returning: true,
    plain: true
  })
  .then(result => {
    console.log('////////////////////////////////////////')
    console.log("Reslt " + result)
    console.log('////////////////////////////////////////')
    User.findOne({
      where: {
        id: req.body.currentLoggedUserId
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
    
      // vratit void
      Notifications.findAll({
        where: {
          user_id: user.id 
        }
      }).then(notifications => {
        user_notifications = JSON.stringify(notifications, null, 2);
        user_notifications = JSON.parse(user_notifications);
        res.status(200).send({
          user_notifications
        })
      })    
  })
  })
  /*.catch(function(error) {
    res.status(404).send({
      error: "Error pri editovani notifikacie"
    })
  })*/
}

exports.removeNotification = (req, res) => {

  Notifications.destroy({
    where: {
      id: req.body.notificationId
    }
  }).then(result => {

    console.log('////////////////////////////////////////')
    console.log(result)
    console.log('////////////////////////////////////////')

    // notification was not removed from database
    if(!result) {
      return res.status(404).send({
        error: 'Error na odstranenie notifikacieeee'
      })
    }

    console.log("Resulet na vymazanie notifikacie: " + result);
    User.findOne({
      where: {
        id: req.body.userId
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      
    // vratit void  
    Notifications.findAll({
      where: {
        user_id: user.id 
      }
    }).then(notifications => {
      user_notifications = JSON.stringify(notifications, null, 2);
      user_notifications = JSON.parse(user_notifications);
      res.status(200).send({
        user_notifications
      })
    })
    });
  })
}

exports.getAllNotifications = (req, res) => {
  console.log(req.query.userId);

  User.findOne({
    where: {
      id: 11
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
  
    Notifications.findAll({
      where: {
        user_id: user.id 
      }
    }).then(notifications => {
      user_notifications = JSON.stringify(notifications, null, 2);
      user_notifications = JSON.parse(user_notifications);
      res.status(200).send({
        user_notifications
      })
    })
  
});

}





