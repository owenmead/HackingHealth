if (Meteor.isClient) {

  Notifications = new Meteor.Collection("notifications");
  Subscribers = new Meteor.Collection("subscribers");
  // Subscriptions in the URLS

  // https://github.com/sqow/multiple-view-example/blob/master/multiple-view-example.js
  // Dealing with showing multiple pages
  var callbacks = {
    '/': function() {},
    '/complete/': function() {},
    '/dashboard/': function() {},
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


  Template.homepage.events({
    'click button': function(evnt, tmplt) {
      evnt.preventDefault();
      window.location = URL_ROUTES['completeNotification'](tmplt.find('input').value);
    }
  });

  // Various controllers for the templates
  Template.notificationboard.notifications = function() {
    return Notifications.find({}, {sort: {message: 1}});
  }
  Template.notificationitem.helpers({
    formated_date: function() {
      return moment(this.created).format("MMM Do YYYY, hh:mm");
    },
    get_url: function() {
      return URL_ROUTES['completeNotification'](this._id);
    }
  });
  
  Template.complete.notification = function() {
    return Session.get('cur_notification');
  }
  Template.complete.formated_created = function() {
    var cur_session = Session.get('cur_notification');
    if (cur_session) {
      return moment(Session.get('cur_notification').created).format("MMM Do YYYY, HH:mm:ss");
    }
    return "";
  }
  Template.complete.formated_done = function() {
    var cur_session = Session.get('cur_notification');
    if (cur_session) {
      return moment(Session.get('cur_notification').done_date).format("MMM Do YYYY, HH:mm:ss");
    }
    return "";
  }
  Template.complete.formated_verified = function() {
    var cur_session = Session.get('cur_notification');
    if (cur_session) {
      return moment(Session.get('cur_notification').verified_date).format("MMM Do YYYY, HH:mm:ss");
    }
    return "";
  }
  
  
  Template.create_notification.events({
    'click button': function (evnt, tmplt) {
      evnt.preventDefault();

      var new_input = tmplt.find('input');
      var new_notification_message = new_input.value;
      if (new_notification_message) {
        // This could be a LOT cleaner
        var send_sms  = tmplt.find('input#subscribe_sms').checked;
        var send_web = tmplt.find('input#subscribe_web').checked;
        var send_call  = tmplt.find('input#subscribe_call').checked;

        var notification = Notifications.insert({
          _id: s6(),
          status: "New",
          message: new_notification_message,
          created: new Date()
        }, function(error, _id) {
          if (send_sms)  { Subscribers.insert({type: "sms",  notification: _id}); }
          if (send_web) { Subscribers.insert({type: "web", notification: _id}); }
          if (send_call)  { Subscribers.insert({type: "call",  notification: _id}); }
        });
      }

      new_input.value = "";
      new_input.focus();

    }
  });
}
