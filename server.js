// THIS IS A MASSIVE KLUDGE! FIX IT!
var s4 = function() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

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

    // A really basic API endpoint : RIP THIS OUT AND FIX IT! ALL OF IT
    Meteor.Router.add('/api/v1/notifications/', function(id) {
      var body_json = Object.keys(this.request.body)[0];
      var body_obj = JSON.parse(body_json);

      var new_id = s4();

      var notification = Notifications.insert({
        _id: new_id,
        status: "New",
        message: body_obj['message'],
        created: new Date()
      });

      Subscribers.insert({type: "sms",  notification: new_id});
      Subscribers.insert({type: "web", notification: new_id});
      Subscribers.insert({type: "call",  notification: new_id});

      return URL_ROUTES['completeNotification'](new_id);
    });

    Meteor.methods({
      twilio_sms: function(to, body) {
        console.log("SENDING SMS TEMP DISABLED");
        /*
        Meteor.http.post(
          'https://api.twilio.com/2010-04-01/Accounts/AC48016a8fbc5602f2320f4debf8f83169/SMS/Messages.json',
          {
            params:{
              From:'+15874101246',
              To:to,
              Body: body
            },
            auth: 'AC48016a8fbc5602f2320f4debf8f83169:5888eb4a3a2b799f9feeb57b442a6af4',
            headers: {'content-type':'application/x-www-form-urlencoded'}
          }, function () {
            // callback, but not using it right now
          }
        );
        */
      },

      twilio_call: function(to, body) {
        console.log("CALLING SERVICE TEMP DISABLED");
        /*
        var encode_body = encodeURI(body);

        Meteor.http.post(
          'https://api.twilio.com/2010-04-01/Accounts/AC48016a8fbc5602f2320f4debf8f83169/Calls.json',
          {
            params:{
              From:'+15874101246',
              To:to,
              //Url: 'http://twimlets.com/echo?Twiml=%3CResponse%3E%3CSay%3EThis+is+my+test+message%2C+kind+of+fun%21%3C%2FSay%3E%3C%2FResponse%3E'
              Url: 'http://twimlets.com/echo?Twiml=%3CResponse%3E%3CSay%3E'+encode_body+'%21%3C%2FSay%3E%3C%2FResponse%3E'
            },
            auth: 'AC48016a8fbc5602f2320f4debf8f83169:5888eb4a3a2b799f9feeb57b442a6af4',
            headers: {'content-type':'application/x-www-form-urlencoded'}
          }, function () {
            // callback, but not using it right now
          }
        );
        */
      }
    })
  });
}

