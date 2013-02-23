// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Notifications.find().count() === 0) {
      Notifications.insert({status: "New", created: new Date(), name: 'Get an X-Ray'});
      Notifications.insert({status: "New", created: new Date(), name: 'Buy some meds'});
      Notifications.insert({status: "New", created: new Date(), name: 'Do more excersize'});
    }
  });
}