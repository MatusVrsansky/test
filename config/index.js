module.exports = {
  checkNotifications: {
    frequency: "* * * * *",
    handler: "handlers/checkNotifications"
  },
  resetSentNotifications: {
    frequency: "0 0 * * *",
    handler: "handlers/resetSentNotifications"
  },
  
}
