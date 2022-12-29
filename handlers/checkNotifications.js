const { user } = require('../models');

module.exports = () => {

    const axios = require('axios');
    const db = require("../models");
    const Notifications = db.notifications;
    const User = db.user;
    const Config = db.config;

     // send email
     const nodemailer = require('nodemailer');

     const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
             user: 'microbitpython@gmail.com',
             pass: process.env.EMAIL_PASSWORD,
         }
     });

    axios.get('https://api.thingspeak.com/channels/1825300/feeds.json?api_key=ERX6U69VZ9F5MSFM&results=1')
    .then(res => {
       checkTemperatureNotification(res.data.feeds[0]['field1']);
       checkWindSpeedNotification(res.data.feeds[0]['field2']);
       checkWindDirectionNotification(res.data.feeds[0]['field4']);
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });


    async function checkTemperatureNotification(value) {


         console.log('funkcia sa mi pustila ')
        notifications = await getAllNotifications();
        
        for (var i = 0; i < notifications.length; i++) {

            console.log('ide cyklus s forom')


            // teplota
            if(notifications[i].dataValues.notification_type == 'temperature' && notifications[i].dataValues.active_notification == true && 
            notifications[i].dataValues.notification_sent != true) {
            console.log('teplota juhuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')

            switch(notifications[i].temperature_windSpeed_operator) {
                case '>':
                    if(value > notifications[i].dataValues.temperature_notification) {
                        //console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je VYSSIA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                        console.log('poslem notifikaciu')
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                case '<':
                    if(value < notifications[i].dataValues.temperature_notification) {
                        //console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je NIZSIA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                case '>=':
                    if(value >= notifications[i].dataValues.temperature_notification) {
                        //console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je VYSSIA /ROVNA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                case '<=':
                    if(value <= notifications[i].dataValues.temperature_notification) {
                        //console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je NIZSIA /ROVNA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                default: break;
                }
            }
        }   
    }

    async function checkWindSpeedNotification(value) {
        
        notifications = await getAllNotifications();

        for (var i = 0; i < notifications.length; i++) {

            // rychlost vetra
            if(notifications[i].dataValues.notification_type == 'windSpeed' && notifications[i].dataValues.active_notification == true &&
            notifications[i].dataValues.notification_sent != true) {
            //console.log('Rychlost vetra')
    
            switch(notifications[i].dataValues.temperature_windSpeed_operator) {
                case '>':
                    if(value > notifications[i].dataValues.wind_speed_notification) {                            
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                case '<':
                    if(value < notifications[i].dataValues.wind_speed_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                case '>=':
                    if(value >= notifications[i].dataValues.wind_speed_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                case '<=':
                    if(value <= notifications[i].dataValues.wind_speed_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                default: break;
                }
            }
        }   
    }

    // tested notification
    async function checkWindDirectionNotification(value) {
        
        notifications = await getAllNotifications();

        for (let i = 0; i < notifications.length; i++)  {
            if(notifications[i].dataValues.notification_type == 'windDirection' && value == notifications[i].dataValues.wind_direction_notification &&
            notifications[i].dataValues.active_notification == true && notifications[i].dataValues.notification_sent != true) {
                Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification);
               // console.log(notifications[i].dataValues.wind_direction_notification);
            }
        }
    }

    async function getAllNotifications() {
        return await Notifications.findAll();
    }

   async function sendNotifications(userId, notificationText) {

        emailAddress = '';
        phone_number = '';

        await User.findOne({
            where: {
              id: userId
            }
          })
          .then(user => {
           // console.log(user.email)
          
            emailAddress = user.email;
            phone_number = user.phone_number;
          });

        const mailOptions = {
            from: 'microbitpython@gmail.com',
            to: emailAddress,
            subject: 'Notifikácia zo zariadenia WeatherBit',
            html: "<p><strong>Text notifikácie: </strong>" + notificationText + "</p>"
        };
        
        // send email
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent error: '+ info.response);
            }
        });

        
        // send SMS
        sendSms = false;

        await Config.findOne({
            where: {
              name: 'send_phone_notifications'
            }
          })
          .then(respond => {
           // console.log(user.email)
            sendSms = respond.value;
          });

          console.log("send sms: "+sendSms);
          console.log("user phone: "+phone_number);

        if(sendSms) {
            const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN); 
 
            client.messages 
            .create({ 
                body: notificationText,
                messagingServiceSid: process.env.MESSAGING_SERVICE_SID,   
                to: "+421918068434"
            }) 
            .then(message => console.log(message.sid)) 
            .done();
        }

        else {
            console.log('nejdem poslat sms, admin to zakazal');
        }

       
    }

    

}