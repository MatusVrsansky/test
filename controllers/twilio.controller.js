


exports.getTwilioAccountBalance = (req, res) => {



const client = require('twilio')("ACc78156a11cc1654f2bd4882aa522c735", "8aa963196bc7ae318ad80366bab817ae")
require('dotenv').config();
client.balance.fetch()
  .then((data) => {
    const balance = Math.round(data.balance * 100) / 100;
    const currency = data.currency;
    console.log(`Your account balance is ${balance} ${currency}.`)

    res.status(200).send({
        balance
      })
  })
  .catch(function(error) {
    console.log(error);
  });
  
};

