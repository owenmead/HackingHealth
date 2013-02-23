// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Notifications = new Meteor.Collection("notifications");
Subscribers = new Meteor.Collection("subscribers");

// Regular examples goes here
if (Meteor.isClient) {
  // https://github.com/sqow/multiple-view-example/blob/master/multiple-view-example.js
  var callbacks = {
    '/':		function() {
    },
    '/complete/':		function() {
    },
  },
  noop = function(){};
  function getCallback( data ) {
    return callbacks.hasOwnProperty( data ) ? callbacks[ data ] : noop;
  }
  Template.body.page_is = function( data, options ) {
    if ( Session.equals( 'page', data ) ) {
      setTimeout( getCallback( data ), 0 );
      return options.fn( this );
    }
    return options.inverse( this );
  };


  // This is me doing stuff
  Template.notificationboard.notifications = function() {
    return Notifications.find({}, {sort: {message: 1}});
  }
  Template.notificationitem.helpers({
    formated_date: function() {
      return moment(this.created).format("MMM Do YYYY, hh:mm");
    },
    get_url: function(a, b, c) {
      return URL_ROUTES['completeNotification'](this._id);
    }
  });
  Template.create_notification.events({
    'click button': function (evnt, tmplt) {
      var new_input = tmplt.find('input');
      var new_notification_message = new_input.value;
      if (new_notification_message) {
        Notifications.insert({
          status: "New",
          message: new_notification_message,
          created: new Date()
        });
      }

      new_input.value = "";
      new_input.focus();

      evnt.preventDefault();
    }
  });
}
