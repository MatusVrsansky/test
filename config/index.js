module.exports = {
  checkNotifications: {
    frequency: "*/1 07-21 * * *",
    handler: "handlers/checkNotifications"
  },
  resetSentNotifications: {
    frequency: "0 0 * * *",
    handler: "handlers/resetSentNotifications"
  },
}
