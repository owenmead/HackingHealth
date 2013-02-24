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

      var subscribers_to_fire = Subscribers.find({notification: notification_id});
      subscribers_to_fire.forEach(function (subscriber) {
        process_subscriber(subscriber)
      });
    }
  });
  Router = new NotificationRouter;

  Meteor.startup(function () {
    Meteor.subscribe("subscribers", function(){
      Backbone.history.start({pushState: true});
    });

    Meteor.subscribe("notifications", function(){
      // When the notifications come back
    });
  });
}

var URL_ROUTES = {
  completeNotification: function(notification_id) {
    return Meteor.absoluteUrl() + notification_id;
  }
}