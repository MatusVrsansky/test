const { user } = require('../models');

module.exports = () => {

    const axios = require('axios');
    const db = require("../models");
    const Notifications = db.notifications;
    const User = db.user;
    const Config = db.config;

    console.log('\n\n')

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
       checkRaingGaugeNotification(res.data.feeds[0]['field3']);
       checkWindDirectionNotification(res.data.feeds[0]['field4']);
       checkHumidityNotification(res.data.feeds[0]['field5']);
       checkPressureNotification(res.data.feeds[0]['field6']);
       checkSoilTemperatureNotification(res.data.feeds[0]['field7']);
       checkSoilMostureNotification(res.data.feeds[0]['field8']);

       console.log('\n\n')
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });


    async function checkTemperatureNotification(value) {

    

        console.log('idu sa pozriet teploty')
        
        notifications = await getAllNotifications();
        
        for (var i = 0; i < notifications.length; i++) {

            // teplota
            if(notifications[i].dataValues.notification_type == 'temperature' && notifications[i].dataValues.active_notification == true && 
            notifications[i].dataValues.notification_sent == false) {
           // console.log('teplota')

            switch(notifications[i].compare_operator) {
                case '>':
                    if(value > notifications[i].dataValues.temperature_notification) {
                        //console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je VYSSIA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                        console.log('poslem notifikaciu')
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '<':
                    if(value < notifications[i].dataValues.temperature_notification) {
                        //console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je NIZSIA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '>=':
                    if(value >= notifications[i].dataValues.temperature_notification) {
                        //console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je VYSSIA /ROVNA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '<=':
                    if(value <= notifications[i].dataValues.temperature_notification) {
                        //console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je NIZSIA /ROVNA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                default: break;
                }
            }
        }   
    }

    async function checkWindSpeedNotification(value) {

        console.log('ide sa pozriet rychlosti vetra')
        
        notifications = await getAllNotifications();

        for (var i = 0; i < notifications.length; i++) {

            // rychlost vetra
            if(notifications[i].dataValues.notification_type == 'windSpeed' && notifications[i].dataValues.active_notification == true &&
            notifications[i].dataValues.notification_sent == false) {
            //console.log('Rychlost vetra')
    
            switch(notifications[i].dataValues.compare_operator) {
                case '>':
                    if(value > notifications[i].dataValues.wind_speed_notification) {                            
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '<':
                    if(value < notifications[i].dataValues.wind_speed_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '>=':
                    if(value >= notifications[i].dataValues.wind_speed_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '<=':
                    if(value <= notifications[i].dataValues.wind_speed_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                default: break;
                }
            }
        }   
    }

    async function checkRaingGaugeNotification(value) {

        console.log('ide sa pozriet hodnota dazda')
        
        notifications = await getAllNotifications();

        for (var i = 0; i < notifications.length; i++) {

            // rychlost vetra
            if(notifications[i].dataValues.notification_type == 'rainGauge' && notifications[i].dataValues.active_notification == true &&
            notifications[i].dataValues.notification_sent == false) {
            //console.log('Rychlost vetra')
    
            switch(notifications[i].dataValues.compare_operator) {
                case '>':
                    if(value > notifications[i].dataValues.rain_gauge_notification) {                            
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '<':
                    if(value < notifications[i].dataValues.rain_gauge_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '>=':
                    if(value >= notifications[i].dataValues.rain_gauge_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '<=':
                    if(value <= notifications[i].dataValues.rain_gauge_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                default: break;
                }
            }
        }   
    }

    async function checkHumidityNotification(value) {

        console.log('ide sa pozriet VLHKOST')
        
        notifications = await getAllNotifications();

        for (var i = 0; i < notifications.length; i++) {

            // rychlost vetra
            if(notifications[i].dataValues.notification_type == 'humidity' && notifications[i].dataValues.active_notification == true &&
            notifications[i].dataValues.notification_sent == false) {
            //console.log('Rychlost vetra')
    
            switch(notifications[i].dataValues.compare_operator) {
                case '>':
                    if(value > notifications[i].dataValues.humidity_notification) {                            
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '<':
                    if(value < notifications[i].dataValues.humidity_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '>=':
                    if(value >= notifications[i].dataValues.humidity_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '<=':
                    if(value <= notifications[i].dataValues.humidity_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                default: break;
                }
            }
        }   
    }

    async function checkPressureNotification(value) {

        console.log('ide sa pozriet TLAK')
        
        notifications = await getAllNotifications();

        for (var i = 0; i < notifications.length; i++) {

        
            if(notifications[i].dataValues.notification_type == 'pressure' && notifications[i].dataValues.active_notification == true &&
            notifications[i].dataValues.notification_sent == false) {
            //console.log('Rychlost vetra')
    
            switch(notifications[i].dataValues.compare_operator) {
                case '>':
                    if(value > notifications[i].dataValues.pressure_notification) {                            
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '<':
                    if(value < notifications[i].dataValues.pressure_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '>=':
                    if(value >= notifications[i].dataValues.pressure_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '<=':
                    if(value <= notifications[i].dataValues.pressure_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                default: break;
                }
            }
        }   
    }

    async function checkSoilTemperatureNotification(value) {

        console.log('ide sa pozriet TEPLOTA PODY')
        
        notifications = await getAllNotifications();

        for (var i = 0; i < notifications.length; i++) {

            // rychlost vetra
            if(notifications[i].dataValues.notification_type == 'soilTemperature' && notifications[i].dataValues.active_notification == true &&
            notifications[i].dataValues.notification_sent == false) {
            //console.log('Rychlost vetra')
    
            switch(notifications[i].dataValues.compare_operator) {
                case '>':
                    if(value > notifications[i].dataValues.soil_temperature_notification) {                            
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '<':
                    if(value < notifications[i].dataValues.soil_temperature_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '>=':
                    if(value >= notifications[i].dataValues.soil_temperature_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '<=':
                    if(value <= notifications[i].dataValues.soil_temperature_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                default: break;
                }
            }
        }   
    }

    async function checkSoilMostureNotification(value) {

        console.log('ide sa pozriet VLHKOST PODY')
        
        notifications = await getAllNotifications();

        for (var i = 0; i < notifications.length; i++) {

            // rychlost vetra
            if(notifications[i].dataValues.notification_type == 'soilMosture' && notifications[i].dataValues.active_notification == true &&
            notifications[i].dataValues.notification_sent == false) {
            //console.log('Rychlost vetra')
    
            switch(notifications[i].dataValues.compare_operator) {
                case '>':
                    if(value > notifications[i].dataValues.soil_mosture_notification) {                            
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '<':
                    if(value < notifications[i].dataValues.soil_mosture_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '>=':
                    if(value >= notifications[i].dataValues.soil_mosture_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                case '<=':
                    if(value <= notifications[i].dataValues.soil_mosture_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
                    }
                    break;
                default: break;
                }
            }
        }   
    }

    async function checkWindDirectionNotification(value) {
        
        console.log('ide sa pozriet smer vetra')
        
        notifications = await getAllNotifications();

        for (let i = 0; i < notifications.length; i++)  {
            if(notifications[i].dataValues.notification_type == 'windDirection' && value == notifications[i].dataValues.wind_direction_notification &&
            notifications[i].dataValues.active_notification == true && notifications[i].dataValues.notification_sent == false) {
                Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                sendNotifications(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification, notifications[i].dataValues.notification_type);
               // console.log(notifications[i].dataValues.wind_direction_notification);
            }
        }
    }

    async function getAllNotifications() {
        return await Notifications.findAll();
    }

   async function sendNotifications(userId, notificationText, notificationType) {



        console.log('pouzivatel id: '+userId);

        // send SMS
        sendSms = false;

        emailAddress = '';
        phone_number = '';

        await Config.findOne({
            where: {
                name: 'send_phone_notifications'
            }
            })
            .then(respond => {
            // console.log(user.email)
            sendSms = respond.value;
            console.log("Respond for SMS: " + sendSms);
            });

    

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
            html: "<p><strong>Typ notifikácie: </strong>" + await getNotificationType(notificationType) + "</p>" +
            "<p><strong>Text notifikácie: </strong>" + notificationText + "</p>"
            
        };
        
        // send email
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent error: '+ info.response);
            }
        });

        
     

          console.log("send sms: "+sendSms);
          console.log("email: "+emailAddress);
          console.log("user phone: "+phone_number);

        if(sendSms) {
            const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN); 
 
            client.messages 
            .create({ 
                body: notificationText,
                messagingServiceSid: process.env.MESSAGING_SERVICE_SID,   
                to: phone_number
            }) 
            .then(message => console.log(message.sid)) 
            .done();
        }

        else {
            console.log('nejdem poslat sms, admin to zakazal');
        }

       
    }

    async function getNotificationType(notificationType) {

        switch(notificationType) {
          case 'temperature' : notificationType = 'Teplota'; break;
          case 'windDirection' : notificationType = 'Smer vetra'; break;
          case 'windSpeed' : notificationType = 'Rýchlosť vetra'; break;
          case 'soilTemperature' : notificationType = 'Teplota pôdy'; break;
          case 'soilMosture' : notificationType = 'Vlhkosť pôdy'; break;
          case 'humidity' : notificationType = 'Vlhkosť'; break;
          case 'rainGauge' : notificationType = 'Ďaždometer'; break;
          case 'pressure' : notificationType = 'Tlak'; break;
        }
    
        return notificationType;
      }

    

}