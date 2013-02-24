// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Notifications = new Meteor.Collection("notifications");
  Subscribers = new Meteor.Collection("subscribers");

  Meteor.startup(function () {
    Meteor.publish('notifications', function() {
      return Notifications.find();
    });
    Meteor.publish('subscribers', function() {
      return Subscribers.find();
    });


    if (Notifications.find().count() === 0) {
      Notifications.insert({status: "New", created: new Date(), message: 'Get an X-Ray'});
      Notifications.insert({status: "New", created: new Date(), message: 'Buy some meds'});
      Notifications.insert({status: "New", created: new Date(), message: 'Do more excersize'});
    }
  });
}