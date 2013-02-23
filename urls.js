/*
 * URL Routing - Provide endpoints for various things like completing actions
 */
if (Meteor.isClient) {
  var NotificationRouter = Backbone.Router.extend({
    routes: {
      ":notification_id": "completeNotification"
    },
    completeNotification: function (notification_id) {
      Notifications.update(notification_id, {$set: {status: 'Complete'}});
    }
  });
  Router = new NotificationRouter;
  Meteor.startup(function () {
    Backbone.history.start({pushState: true});
  });
}

var URL_ROUTES = {
  completeNotification: function(notification_id) {
    return "http://localhost:3000/" + notification_id;
  }
}