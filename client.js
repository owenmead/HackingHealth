// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Notifications = new Meteor.Collection("notifications");

// Regular examples goes here
if (Meteor.isClient) {
  // This is me doing stuff
  Template.notificationboard.notifications = function() {
    return Notifications.find({}, {sort: {name: 1}});
  }
  Template.notificationitem.helpers({
    formated_date: function() {
      return moment(this.created).format("MMM Do YYYY, hh:mm");
    }
  });
  Template.create_notification.events({
    'click button': function (evnt, tmplt, other) {
      var new_input = tmplt.find('input');
      var new_notification_name = new_input.value;
      if (new_notification_name) {
        Notifications.insert({
          status: "New",
          name: new_notification_name,
          created: new Date()
        });
      }

      new_input.value = "";
      new_input.focus();
    }
  });
}
