/* eslint-disable no-unused-vars */

module.exports = () => {
  const db = require('../models')
  const Notifications = db.notifications

  // send email
  const nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'microbitpython@gmail.com',
      pass: 'mbwnqmmpwgopnoga'
    }
  })

  async function notifyUser () {

    sendEmail();

    const results = await Notifications.findAll()
    const test = JSON.stringify(results)

    const dataObj = JSON.parse(test)

    // get current weather data from ThingSpeak API
    const weatherBitTemperature = 23

    const result = []

    for (let i = 0; i < dataObj.length; i++) {
      await Notifications.update({ notification_sent: false }, { where: { id: dataObj[i].id } })

      /* result.push(dataObj[i].username + ' ' + dataObj[i].email);

            if(dataObj[i].active_notification) {
                console.log(dataObj[i].username)
                switch(dataObj[i].temperature_operator) {
                    case '>':
                        if(weatherBitTemperature > dataObj[i].temperature_notification) {
                            console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je VYSSIA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                            sendEmail(dataObj[i].email, dataObj[i].text_notification)
                        }

                    case '<':
                        if(weatherBitTemperature < dataObj[i].temperature_notification) {
                            console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je NIZSIA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                            sendEmail(dataObj[i].email, dataObj[i].text_notification)
                        }
                        break;
                    case '>=':
                        if(weatherBitTemperature >= dataObj[i].temperature_notification) {
                            console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je VYSSIA /ROVNA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                            sendEmail(dataObj[i].email, dataObj[i].text_notification)
                        }
                        break;
                    case '<=':
                        if(weatherBitTemperature <= dataObj[i].temperature_notification) {
                            console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je NIZSIA /ROVNA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                            sendEmail(dataObj[i].email, dataObj[i].text_notification)
                        }
                        break;
                }
            } */
    }
  }

  async function sendEmail() {
    

    const mailOptions = {
      from: 'microbitpython@gmail.com',
      to: 'vrsansky.matus@gmail.com',
      subject: 'Notifikácia zo zariadenia WeatherBit',
      html: 'reset notifikacii prebehol :)'
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }

  notifyUser();
}
