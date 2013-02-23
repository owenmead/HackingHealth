/*
 * URL Routing - Provide endpoints for various things like completing actions
 */

if (Meteor.isClient) {
  var NotificationRouter = Backbone.Router.extend({
    routes: {
      "complete/:notification_id": "completeNotification"
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

