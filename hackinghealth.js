// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Notifications = new Meteor.Collection("notifications");


// API for updating notifications
if (Meteor.is_server) {
  Meteor.startup(function () {

    // All values listed below are default
    collectionApi = new CollectionAPI({
      authToken: undefined,              // Require this string to be passed in on each request
      apiPath: 'api/v1',                 // API path prefix
      standAlone: false,                 // Run as a stand-alone HTTP(S) server
      sslEnabled: false,                 // Disable/Enable SSL (stand-alone only)
      listenPort: 3005,                  // Port to listen to (stand-alone only)
      listenHost: undefined,             // Host to bind to (stand-alone only)
      privateKeyFile: 'privatekey.pem',  // SSL private key file (only used if SSL is enabled)
      certificateFile: 'certificate.pem' // SSL certificate key file (only used if SSL is enabled)
    });

    // Add the collection Players to the API "/players" path
    collectionApi.addCollection(Notifications, 'notifications', {
      // All values listed below are default
      authToken: undefined,                   // Require this string to be passed in on each request
      methods: ['POST','GET','PUT','DELETE']  // Allow creating, reading, updating, and deleting
    });

    // Starts the API server
    collectionApi.start();
  });
}


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
