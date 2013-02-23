/*
 * URL Routing - Provide endpoints for various things like completing actions
 */
if (Meteor.isClient) {
  var NotificationRouter = Backbone.Router.extend({
    routes: {
      "" : "index",
      ":notification_id": "completeNotification"
    },
    index: function() {
      Session.set('page', '/');
    },
    completeNotification: function (notification_id) {
      Session.set('page', '/complete/');
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
    return Meteor.absoluteUrl() + notification_id;
  }
}