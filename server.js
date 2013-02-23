// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Notifications.find().count() === 0) {
      Notifications.insert({status: "New", created: new Date(), message: 'Get an X-Ray'});
      Notifications.insert({status: "New", created: new Date(), message: 'Buy some meds'});
      Notifications.insert({status: "New", created: new Date(), message: 'Do more excersize'});
    }
  });
}