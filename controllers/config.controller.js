const db = require("../models");

const Config = db.config;



exports.setSendPhoneNotificationsState = (req, res) => {

  console.log('setSendPhoneNotificationsState : '+ req.body.sendPhoneNotifications);

  const updateQuery = {
    value: req.body.sendPhoneNotifications
  }
  
  Config.update(updateQuery, { where: {name: 'send_phone_notifications'}})

    .then(respond => {
      // vratit void
      res.status(200).send({
      })
     
  });

  
}



exports.getAppConfigurations = (req, res) => {
  console.log(req.query.userId);


  
  Config.findAll({
    }).then(config => {
      config = JSON.stringify(config, null, 2);
      config = JSON.parse(config);
      console.log('user configs');
      console.log(config);
      res.status(200).send({
        config
      })
    })
  
};

