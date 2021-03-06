/*
 * URL Routing - Provide endpoints for various things like completing actions
 */
if (Meteor.isClient) {
  Meteor.Router.add({
    '/': function() {
      Session.set('page', '/');
    },
    "/dashboard": function() {
      Session.set('page', '/dashboard/');
    },
    "/:notification_id": function(notification_id) {
      Session.set('page', '/complete/');
      Notifications.update(notification_id, {$set: {status: 'Complete'}});

      var subscribers_to_fire = Subscribers.find({notification: notification_id});
      subscribers_to_fire.forEach(function (subscriber) {
        process_subscriber(subscriber);
      });
    }
  });

  Meteor.startup(function () {
    Meteor.subscribe("notifications", function(){
      // When the notifications come back
    });

    Meteor.subscribe("subscribers", function(){
      // Backbone.history.start({pushState: true});
    });
  });
}

var URL_ROUTES = {
  completeNotification: function(notification_id) {
    return Meteor.absoluteUrl() + notification_id;
  }
}