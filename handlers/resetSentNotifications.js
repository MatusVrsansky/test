const { TrustProductsChannelEndpointAssignmentInstance } = require("twilio/lib/rest/trusthub/v1/trustProducts/trustProductsChannelEndpointAssignment");

module.exports = () => {

    
    const db = require("../models");
    const Notifications = db.notifications;

    // send email
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'microbitpython@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
        }
    });


    async function notifyUser() {

        sendEmail();
        
        const results = await Notifications.findAll();
        const test = JSON.stringify(results)

        dataObj = JSON.parse(test);

        for (var i = 0; i < dataObj.length; i++) {
            await Notifications.update({notification_sent: false}, { where: {id: dataObj[i].id}})
        }
    }

    async function sendEmail() {

        console.log('IDE RESET NOTIFIKACII')
    

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