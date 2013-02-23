/*
Extra code I don't want to throw out, but don't want clogging things up


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
*/
