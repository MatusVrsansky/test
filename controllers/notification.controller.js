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
      case 'smer_vetra':
      case 'uroven_svetla':
      case 'vlhost_pody':
      case 'vlhkost':
      case 'tlak':
      case 'dazdometer': req.body.temperatureWindSpeedOperator = null; break;
      default: break;
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
      temperature_windSpeed_operator: req.body.temperatureWindSpeedOperator
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
    case 'smer_vetra':
    case 'uroven_svetla':
    case 'vlhost_pody':
    case 'vlhkost':
    case 'tlak':
    case 'dazdometer': req.body.temperatureWindSpeedOperator = null; break;
    default: break;
  }
  
  const updateQuery = {
    temperature_notification: req.body.temperatureNotification,
    text_notification: req.body.textNotification,
    active_notification: req.body.activeNotification,
    temperature_windSpeed_operator: req.body.temperatureWindSpeedOperator,
    wind_speed_notification: req.body.windSpeedNotification,
    rain_gauge_notification: req.body.rainGaugeNotification,
    wind_direction_notification: req.body.windDirectionNotification,
    humidity_notification: req.body.humidityNotification,
    pressure_notification: req.body.pressureNotification,
    soil_temperature_notification: req.body.soilTemperatureNotification,
    soil_mosture_notification: req.body.soilMostureNotification,
    temperature_windSpeed_operator: req.body.temperatureWindSpeedOperator,
    description_notification: req.body.descriptionNotification
  }
  
  Notifications.update(updateQuery, { where: {id: req.body.notificationId}})
  .then(result => {
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
  });

  
    });
}

exports.removeNotification = (req, res) => {

  console.log('remove Notification')
  console.log(req.body.notificationId)

  Notifications.destroy({
    where: {
      id: req.body.notificationId
    }
  }).then(result => {
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
  });

}



exports.getAllNotifications = (req, res) => {
  console.log(req.query.userId);

  User.findOne({
    where: {
      id: req.query.userId
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

};





