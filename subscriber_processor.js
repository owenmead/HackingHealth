function process_subscriber(subscriber) {
  var notification = Notifications.findOne({_id: subscriber.notification });
  var message_to_send = notification.message + ", is complete";

  if (subscriber.type == "sms") {
    Meteor.call('twilio_sms', "+16043564548", message_to_send, notification);
  }
  if (subscriber.type == "web") {
    //console.log("WEB: " + notification.message + " is complete");
  }
  if (subscriber.type == "call") {
    Meteor.call('twilio_call', "+16043564548", message_to_send, notification);
  }
}
