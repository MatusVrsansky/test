module.exports = () => {
  const axios = require('axios')
  const db = require('../models')
  const Notifications = db.notifications
  const User = db.user

  // send email
  const nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'microbitpython@gmail.com',
      pass: 'mbwnqmmpwgopnoga'
    }
  })

  axios.get('https://api.thingspeak.com/channels/1825300/feeds.json?api_key=ERX6U69VZ9F5MSFM&results=1')
    .then(res => {
      checkTemperatureNotification(res.data.feeds[0].field1)
      checkWindSpeedNotification(res.data.feeds[0].field2)
    })
    .catch(err => {
      console.log('Error: ', err.message)
    })

  async function checkTemperatureNotification (value) {
    const results = await Notifications.findAll()
    const test = JSON.stringify(results)

    const dataObj = JSON.parse(test)

    for (let i = 0; i < dataObj.length; i++) {
      // teplota
      if (dataObj[i].notification_type === 'teplota' && dataObj[i].active_notification === true && dataObj[i].notification_sent === false) {
        console.log('teplota')

        switch (dataObj[i].temperature_windSpeed_operator) {
          case '>':
            if (value > dataObj[i].temperature_notification) {
              // console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je VYSSIA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')

              Notifications.update({ notification_sent: true }, { where: { id: dataObj[i].id } })
              sendEmail(dataObj[i].user_id, dataObj[i].text_notification)
            }
            break

          case '<':
            if (value < dataObj[i].temperature_notification) {
              // console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je NIZSIA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
              Notifications.update({ notification_sent: true }, { where: { id: dataObj[i].id } })
              sendEmail(dataObj[i].user_id, dataObj[i].text_notification)
            }
            break
          case '>=':
            if (value >= dataObj[i].temperature_notification) {
              // console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je VYSSIA /ROVNA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
              Notifications.update({ notification_sent: true }, { where: { id: dataObj[i].id } })
              sendEmail(dataObj[i].user_id, dataObj[i].text_notification)
            }
            break
          case '<=':
            if (value <= dataObj[i].temperature_notification) {
              // console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je NIZSIA /ROVNA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
              Notifications.update({ notification_sent: true }, { where: { id: dataObj[i].id } })
              sendEmail(dataObj[i].user_id, dataObj[i].text_notification)
            }
            break
        }
      }
    }
  }

  async function checkWindSpeedNotification (value) {
    const results = await Notifications.findAll()
    const test = JSON.stringify(results)

    const dataObj = JSON.parse(test)

    for (let i = 0; i < dataObj.length; i++) {
      // rychlost vetra
      if (dataObj[i].notification_type === 'rychlost_vetra' && dataObj[i].active_notification === true && dataObj[i].notification_sent === false) {
        console.log('Rychlost vetra')

        switch (dataObj[i].temperature_windSpeed_operator) {
          case '>':
            if (value > dataObj[i].wind_speed_notification) {
              // console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je VYSSIA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')

              Notifications.update({ notification_sent: true }, { where: { id: dataObj[i].id } })
              sendEmail(dataObj[i].user_id, dataObj[i].text_notification)
            }
            break

          case '<':
            if (value < dataObj[i].wind_speed_notification) {
              // console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je NIZSIA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
              Notifications.update({ notification_sent: true }, { where: { id: dataObj[i].id } })
              sendEmail(dataObj[i].user_id, dataObj[i].text_notification)
            }
            break
          case '>=':
            if (value >= dataObj[i].wind_speed_notification) {
              // console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je VYSSIA /ROVNA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
              Notifications.update({ notification_sent: true }, { where: { id: dataObj[i].id } })
              sendEmail(dataObj[i].user_id, dataObj[i].text_notification)
            }
            break
          case '<=':
            if (value <= dataObj[i].wind_speed_notification) {
              // console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je NIZSIA /ROVNA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
              Notifications.update({ notification_sent: true }, { where: { id: dataObj[i].id } })
              sendEmail(dataObj[i].user_id, dataObj[i].text_notification)
            }
            break
        }
      }
    }
  }

  async function sendEmail (userId, notificationText) {
    let emailAddress = ''

    await User.findOne({
      where: {
        id: userId
      }
    })
      .then(user => {
        console.log(user.email)

        emailAddress = user.email
      })

    const mailOptions = {
      from: 'microbitpython@gmail.com',
      to: emailAddress,
      subject: 'Notifikácia zo zariadenia WeatherBit',
      html: '<p><strong>Text notifikácie: </strong>' + notificationText + '</p>'
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}
