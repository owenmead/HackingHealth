function process_subscriber(subscriber) {
  if (subscriber.type == "sms") {
    console.log(subscriber)
    
    console.log("SEND SMS");
  }
  if (subscriber.type == "web") {
    console.log("WEB NOTIFY");
  }
  if (subscriber.type == "call") {
    console.log("CALL THEM");
  }
}