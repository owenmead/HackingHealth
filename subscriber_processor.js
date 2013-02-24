function process_subscriber(subscriber) {
  notification = Notifications.findOne({_id: subscriber.notification });

  if (subscriber.type == "sms") {
    console.log("SMS: " + notification.message + " is complete");
  }
  if (subscriber.type == "web") {
    console.log("WEB: " + notification.message + " is complete");
  }
  if (subscriber.type == "call") {
    console.log("CALL: " + notification.message + " is complete");
  }
}
