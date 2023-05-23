const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const amqplib = require("amqplib");
var amqplib = require('amqplib');


const {
  APP_SECRET,
  EXCHANGE_NAME,
  QUEUE_NAME,
  SHOPPING_SERVICE,
  MSG_QUEUE_URL,
} = require("../config");

//Utility functions
(module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
}),
  (module.exports.GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
  });

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

(module.exports.GenerateSignature = async (payload) => {
  return await jwt.sign(payload, APP_SECRET, { expiresIn: "90d" });
}),
  (module.exports.ValidateSignature = async (req) => {
    const signature = req.get("Authorization");

    if (signature) {
      const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
      req.user = payload;
      return true;
    }

    return false;
  });

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

//Message Broker

module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MSG_QUEUE_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false)
    return channel;
  } catch (err) {
    throw err;
  }
};


module.exports.PublishMessage = async (channel, bindingKey, msg) => {
  try {
    channel.publish(EXCHANGE_NAME, bindingKey, Buffer.from(msg));
    console.log("Sent: ", msg);
    
  } catch (error) {
    throw error;
  }
}

module.exports.SubscribeMessage = async (channel, service) => {
    const queue = await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(queue.queue, EXCHANGE_NAME, SHOPPING_SERVICE);
    channel.consume(queue.queue, data => {
      console.log("recived data in shopping service")
      console.log(data.content.toString());
      service.SubscribeEvents(data.content.toString())
      channel.ack(data); 
    }
    );
  }
  

