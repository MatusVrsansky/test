const controller = require("../controllers/notification.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/notification/getAllNotifications", controller.getAllNotifications);
  app.post("/api/notification/addNewNotification", controller.addNewNotification);
  app.post("/api/notification/editNotification", controller.editNotification);
  app.post("/api/notification/removeNotification", controller.removeNotification);
  
  /*app.get("/api/notification/removeNotification", controller.removeNotification);
  app.get("/api/notification/updateNotification", controller.updateNotification);*/
};