module.exports = {
  checkNotifications: {
    frequency: "*/1 07-21 * * *",
    handler: "handlers/checkNotifications"
  },
  resetSentNotifications: {
    frequency: "*/10 * * * * *",
    handler: "handlers/resetSentNotifications"
  },
  
}
