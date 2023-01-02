


exports.sendContactEmail = (req, res) => {
    // send email
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'microbitpython@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const mailOptions = {
        from: 'microbitpython@gmail.com',
        to: 'microbitpython@gmail.com',
        replyTo: req.body.email,
        subject: 'Email z kontaktného formulára',
        html: req.body.message
      }
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(400).send({status: 400, message: "Email sa neodoslal"});
        } else {
           // vratit void
           res.status(200).send()
        }
      })
}

