module.exports = {
  hello: {
    frequency: '*/10 * * * * *',
    handler: 'handlers/sayhello'
  },
  resetNotificationsSendState: {
    frequency: '0 0 * * *',
    handler: 'handlers/resetNotificationsSendState'
  }
  /* tacos: {
        frequency: "* * * * *",
        handler: "handlers/tacos"
    } */
}
