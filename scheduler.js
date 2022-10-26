const cron = require('node-cron');
const {resolve} = require('path');


module.exports = {
  initCrons: (config) => {
    Object.keys(config).forEach(key => {
        if(cron.validate(config[key].frequency)){
            cron.schedule(config[key].frequency, () => {
                const handler = require(resolve(config[key].handler));
                handler();
            })
        }
    })
  }
}